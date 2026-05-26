#!/usr/bin/env node
// 임베딩 인덱서: content/**/*.mdx + docs/solutions/** + docs/retros/**
// → H2 단위 청킹 → Xenova/multilingual-e5-small (100% 로컬, benchmark-models.mjs 검증) → public/embeddings.json
// 사용: node scripts/embed-content.mjs

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { findFilesByExt } from "./lib/fs-helpers.mjs";
import { EMBEDDING_MODEL, PASSAGE_PREFIX, EMBEDDING_VERSION } from "./lib/embedding-config.mjs";

const OUTPUT_FILE = path.join(process.cwd(), "public", "embeddings.json");

// Phase 2 (Journal 025의 발견): docs/solutions, docs/retros 도 인덱싱.
// "에러 메시지 → 과거 솔루션" JIT 검색의 핵심 high-value 자산.
// Phase 1 v0는 content/ 만 보고 가장 가치 있는 자산을 누락했었음.
const SOURCES = [
  { dir: "content", source_type: "entry", slug_prefix: "", ext: ".mdx" },
  { dir: "docs/solutions", source_type: "solution", slug_prefix: "solutions", ext: ".md" },
  { dir: "docs/retros", source_type: "retro", slug_prefix: "retros", ext: ".md" },
];

const MIN_CHUNK_LEN = 200;
const MAX_CHUNK_LEN = 2000;

function chunkByH2(content) {
  const lines = content.split("\n");
  const chunks = [];
  let current = { h2: null, body: [] };

  for (const line of lines) {
    if (/^## /.test(line)) {
      // 이전 청크 확정
      if (current.body.length > 0 || current.h2) {
        chunks.push({
          h2: current.h2,
          text: current.body.join("\n").trim(),
        });
      }
      current = { h2: line.replace(/^##\s+/, "").trim(), body: [] };
    } else {
      current.body.push(line);
    }
  }
  if (current.body.length > 0 || current.h2) {
    chunks.push({
      h2: current.h2,
      text: current.body.join("\n").trim(),
    });
  }

  // 짧은 청크는 다음 청크와 합치기
  const merged = [];
  let buffer = null;
  for (const chunk of chunks) {
    if (!buffer) {
      buffer = chunk;
      continue;
    }
    if (buffer.text.length < MIN_CHUNK_LEN) {
      buffer = {
        h2: buffer.h2 || chunk.h2,
        text: buffer.text + "\n\n" + (chunk.h2 ? `## ${chunk.h2}\n` : "") + chunk.text,
      };
    } else {
      merged.push(buffer);
      buffer = chunk;
    }
  }
  if (buffer) merged.push(buffer);

  // 너무 긴 청크는 잘라내기 (단순 cut, 향후 재청킹 검토)
  const final = [];
  for (const chunk of merged) {
    if (chunk.text.length <= MAX_CHUNK_LEN) {
      final.push(chunk);
    } else {
      // 단순 분할 — 향후 토큰 기반으로 개선
      let remaining = chunk.text;
      let part = 0;
      while (remaining.length > 0) {
        final.push({
          h2: chunk.h2 + (part > 0 ? ` (cont. ${part})` : ""),
          text: remaining.slice(0, MAX_CHUNK_LEN),
        });
        remaining = remaining.slice(MAX_CHUNK_LEN);
        part++;
      }
    }
  }

  return final.filter((c) => c.text.length >= 50); // 너무 짧은 잔여물 제거
}

// h2 제목을 텍스트에 포함 — 섹션 주제가 핵심 검색 시그널
// "passage: " prefix = E5 모델 명세 요건 (query prefix 와 짝)
function buildEmbeddingText(entryTitle, h2, text) {
  const parts = [];
  if (entryTitle) parts.push(`# ${entryTitle}`);
  if (h2) parts.push(`## ${h2}`);
  parts.push(text);
  return PASSAGE_PREFIX + parts.join("\n\n");
}

function deriveSlug(source, parts, basename) {
  if (source.source_type === "entry") {
    const category = parts[1];
    return { category, slug: `${category}/${basename}` };
  }
  if (source.source_type === "solution") {
    const category = parts[2] || "uncategorized";
    return { category, slug: `${source.slug_prefix}/${category}/${basename}` };
  }
  return { category: "retro", slug: `${source.slug_prefix}/${basename}` };
}

async function main() {
  console.log(`📦 Loading embedding model (${EMBEDDING_MODEL})...`);
  console.log("   첫 실행 시 ~120MB 다운로드 (이후 캐시)");

  const { pipeline } = await import("@xenova/transformers");
  const extractor = await pipeline("feature-extraction", EMBEDDING_MODEL);

  const allChunks = [];
  let totalChunks = 0;
  const sourceCounts = {};

  for (const source of SOURCES) {
    const sourceDir = path.join(process.cwd(), source.dir);
    const files = findFilesByExt(sourceDir, source.ext);
    sourceCounts[source.source_type] = files.length;
    console.log(`\n🔍 [${source.source_type}] ${files.length} ${source.ext} files in ${source.dir}/`);

    for (const file of files) {
      const rel = path.relative(process.cwd(), file);
      const raw = fs.readFileSync(file, "utf-8");
      const { data, content } = matter(raw);

      const parts = rel.split(path.sep);
      const basename = parts[parts.length - 1].slice(0, -source.ext.length);
      const { category, slug } = deriveSlug(source, parts, basename);

      const chunks = chunkByH2(content);
      totalChunks += chunks.length;

      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        allChunks.push({
          source: source.source_type,
          slug,
          category,
          title: data.title || basename,
          tags: data.tags || [],
          date: data.date || null,
          confidence: data.confidence ?? null,
          h2_title: chunk.h2 || "(intro)",
          chunk_index: i,
          chunk_text: chunk.text,
        });
      }
    }
  }

  const totalFiles = Object.values(sourceCounts).reduce((a, b) => a + b, 0);
  console.log(`\n🧮 ${totalChunks} chunks total from ${totalFiles} files (entry: ${sourceCounts.entry}, solution: ${sourceCounts.solution}, retro: ${sourceCounts.retro}). Embedding...`);

  const start = Date.now();
  for (let i = 0; i < allChunks.length; i++) {
    const meta = allChunks[i];
    const text = buildEmbeddingText(meta.title, meta.h2_title, meta.chunk_text);
    const output = await extractor(text, { pooling: "mean", normalize: true });
    meta.vector = Array.from(output.data);

    if ((i + 1) % 50 === 0 || i === allChunks.length - 1) {
      const pct = (((i + 1) / allChunks.length) * 100).toFixed(0);
      process.stdout.write(`\r   [${pct}%] ${i + 1}/${allChunks.length}`);
    }
  }
  const elapsed = ((Date.now() - start) / 1000).toFixed(1);
  console.log(`\n   완료 (${elapsed}s)`);

  const index = {
    model: EMBEDDING_MODEL,
    embedding_version: EMBEDDING_VERSION,
    dim: allChunks[0]?.vector?.length || 0,
    created_at: new Date().toISOString(),
    chunks: allChunks,
  };

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(index));

  const sizeKB = (fs.statSync(OUTPUT_FILE).size / 1024).toFixed(0);
  console.log(`\n✅ Index saved: public/embeddings.json (${sizeKB} KB, ${totalChunks} chunks, ${index.dim}d)`);
}

main().catch((err) => {
  console.error("❌ Embedding failed:", err);
  process.exit(1);
});
