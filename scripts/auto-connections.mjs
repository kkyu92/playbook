#!/usr/bin/env node
/**
 * auto-connections — auto-ingest 생성 journal entry 의 connections 자동 생성
 *
 * 사용: node scripts/auto-connections.mjs <journal_file_path> [topK=8]
 *
 * 동작:
 *  1. journal 파일에서 title + description 읽기
 *  2. embeddings.json 에 Xenova 모델로 쿼리 임베딩
 *  3. 코사인 유사도 Top-K 슬러그 추출 (자기 자신 제외)
 *  4. journal frontmatter connections: [] 교체
 *  5. 연결된 entry 에 journal slug 양방향 추가
 */

import fs from "fs";
import path from "path";

const INDEX_FILE = path.join(process.cwd(), "public", "embeddings.json");
const CONTENT_DIR = path.join(process.cwd(), "content");
const MIN_SCORE = 0.5;

function cosineSimilarity(a, b) {
  let dot = 0;
  for (let i = 0; i < a.length; i++) dot += a[i] * b[i];
  return dot;
}

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  const fm = {};
  for (const line of match[1].split("\n")) {
    const m = line.match(/^(\w[\w_-]*):\s*"?([^"]*)"?\s*$/);
    if (m) fm[m[1]] = m[2];
  }
  return fm;
}

// connections: [...] 라인에 slug 추가 (inline array 형식만)
function addConnectionToFile(filePath, newSlug) {
  if (!fs.existsSync(filePath)) return false;
  const content = fs.readFileSync(filePath, "utf-8");
  if (content.includes(newSlug)) return false;
  if (/^connections: \[\]$/m.test(content)) {
    const updated = content.replace(/^connections: \[\]$/m, `connections: [${newSlug}]`);
    fs.writeFileSync(filePath, updated);
    return true;
  }
  if (/^connections: \[/m.test(content)) {
    const updated = content.replace(/^connections: \[/m, `connections: [${newSlug}, `);
    fs.writeFileSync(filePath, updated);
    return true;
  }
  return false;
}

async function main() {
  const journalPath = process.argv[2];
  const topK = parseInt(process.argv[3] || "8", 10);

  if (!journalPath || !fs.existsSync(journalPath)) {
    console.error(`Usage: node scripts/auto-connections.mjs <journal_file> [topK=8]`);
    process.exit(1);
  }

  if (!fs.existsSync(INDEX_FILE)) {
    console.error("❌ embeddings.json 없음 — connections skip");
    process.exit(0);
  }

  const journalContent = fs.readFileSync(journalPath, "utf-8");
  const fm = parseFrontmatter(journalContent);
  const query = [fm.title, fm.description].filter(Boolean).join(" ");

  if (!query.trim()) {
    console.error("❌ title/description 추출 실패 — connections skip");
    process.exit(0);
  }

  console.log(`🔗 auto-connections: "${query.slice(0, 60)}..."`);

  const index = JSON.parse(fs.readFileSync(INDEX_FILE, "utf-8"));

  const { pipeline } = await import("@xenova/transformers");
  const extractor = await pipeline("feature-extraction", index.model);
  const queryOutput = await extractor(query, { pooling: "mean", normalize: true });
  const queryVec = Array.from(queryOutput.data);

  // self-slug (category/slug 형식)
  const journalRel = path.relative(CONTENT_DIR, journalPath).replace(/\.mdx$/, "");
  const journalSlug = path.basename(journalPath, ".mdx");

  const scored = index.chunks
    .filter((c) => c.slug !== journalSlug)
    .map((c) => ({ ...c, score: cosineSimilarity(queryVec, c.vector) }));
  scored.sort((a, b) => b.score - a.score);

  // 슬러그 중복 제거 후 top-K
  const seen = new Set();
  const topSlugs = [];
  for (const r of scored) {
    if (!seen.has(r.slug) && r.score >= MIN_SCORE) {
      seen.add(r.slug);
      topSlugs.push({ slug: r.slug, category: r.category, score: r.score });
      if (topSlugs.length >= topK) break;
    }
  }

  if (topSlugs.length === 0) {
    console.log(`⚠️ 유사도 ≥ ${MIN_SCORE} connections 없음 — connections: [] 유지`);
    process.exit(0);
  }

  const connStrings = topSlugs.map((r) => `${r.category}/${r.slug}`);
  const connLine = `connections: [${connStrings.join(", ")}]`;

  // journal frontmatter 업데이트
  const updated = journalContent.replace(/^connections: \[\]$/m, connLine);
  fs.writeFileSync(journalPath, updated);
  console.log(`✅ connections 생성: ${topSlugs.length}건`);
  for (const r of topSlugs) {
    console.log(`   ${r.score.toFixed(3)} ${r.category}/${r.slug}`);
  }

  // 양방향 연결: 연결된 entry 에도 journal slug 추가
  let biUpdated = 0;
  for (const r of topSlugs) {
    const targetFile = path.join(CONTENT_DIR, r.category, `${r.slug}.mdx`);
    if (addConnectionToFile(targetFile, journalRel)) {
      biUpdated++;
      console.log(`   🔗 양방향: ${r.category}/${r.slug} ← ${journalRel}`);
    }
  }
  if (biUpdated > 0) {
    console.log(`✅ 양방향 연결 ${biUpdated}건 완료`);
  }
}

main().catch((err) => {
  console.error("auto-connections 실패:", err.message);
  process.exit(0); // 실패해도 auto-ingest 전체를 막지 않음
});
