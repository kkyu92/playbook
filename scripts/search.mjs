#!/usr/bin/env node
/**
 * Layer 3 (JIT Retrieval) POC Phase 1 — 검색 CLI
 *
 * 쿼리 → 임베딩 → 코사인 유사도 → Top-K
 *
 * 사용:
 *   node scripts/search.mjs "<query>" [topK=5]
 *
 * 예시:
 *   node scripts/search.mjs "Mermaid 노드 라벨 따옴표 누락"
 *   node scripts/search.mjs "프롬프트 캐싱 적용 방법" 3
 *
 * 전제:
 *   public/embeddings.json 이 존재해야 함 (먼저 npm run embed-content 실행)
 *
 * 설계:
 *  - 코사인 유사도 = dot product (벡터가 이미 정규화됨)
 *  - 100% in-memory brute force — 106 엔트리 × ~500 청크 수준은 ANN 불필요
 *    (vector-search-basics §6: 1000 미만 문서는 brute force 가 더 빠르고 단순)
 *  - 출력: rank · score · slug · h2_title · chunk_text 처음 200자
 */

import fs from "fs";
import path from "path";
import { routeQuery } from "./lib/query-router.mjs";

const INDEX_FILE = path.join(process.cwd(), "public", "embeddings.json");
const HITS_FILE = path.join(process.cwd(), "data", "search-hits.json");

/**
 * 검색 invocation 메트릭을 영구 저장.
 * 3축 측정:
 *  - engagement: 실제 검색 / 전체 invocation (라우터가 얼마나 skip 시키나)
 *  - hit rate: ≥1 매치 / 실제 검색 (wiki에 답이 있는 비율)
 *  - slug hit: 어떤 엔트리가 실제 활용되나 (무덤 진단)
 *
 * outcome: "skipped" | "no_match" | "hit"
 */
function recordInvocation(outcome, slugs = []) {
  // legacyQueries 는 schema v1 (totalQueries + hits dict 만 있던) 시절 누적치.
  // hit/noMatch/skip 분리 측정이 불가능했으므로 rate 분모에서 제외한다.
  const defaults = {
    legacyQueries: 0,
    totalInvocations: 0,
    skipped: 0,
    searched: 0,
    hit: 0,
    noMatch: 0,
    lastUpdated: null,
    hits: {},
  };
  let data = { ...defaults };
  try {
    if (fs.existsSync(HITS_FILE)) {
      const loaded = JSON.parse(fs.readFileSync(HITS_FILE, "utf-8"));
      data = { ...defaults, ...loaded };
      // 구 schema (totalQueries + hits dict) → 신 schema 1회 마이그레이션
      if (loaded.totalQueries != null && loaded.totalInvocations == null) {
        data.legacyQueries = loaded.totalQueries;
      }
    }
  } catch (err) {
    console.warn("[search] HITS_FILE parse failed — resetting to empty (path:", HITS_FILE, "):", err);
  }
  data.totalInvocations++;
  if (outcome === "skipped") {
    data.skipped++;
  } else {
    data.searched++;
    if (outcome === "hit") {
      data.hit++;
      for (const slug of slugs) {
        data.hits[slug] = (data.hits[slug] || 0) + 1;
      }
    } else if (outcome === "no_match") {
      data.noMatch++;
    }
  }
  data.lastUpdated = new Date().toISOString();
  // 호환 필드: 외부 도구가 참조할 수 있도록 누적치 노출
  data.totalQueries = data.legacyQueries + data.totalInvocations;
  fs.mkdirSync(path.dirname(HITS_FILE), { recursive: true });
  fs.writeFileSync(HITS_FILE, JSON.stringify(data, null, 2));
}

function cosineSimilarity(a, b) {
  // 둘 다 정규화된 벡터 → dot product 가 코사인
  let dot = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
  }
  return dot;
}

function getPathPrefix(source) {
  return source === "entry" || !source ? "/wiki/" : "/";
}

async function main() {
  const query = process.argv[2];
  const topK = parseInt(process.argv[3] || "5", 10);

  const forceSearch = process.argv.includes("--force");
  const injectMode = process.argv.includes("--inject");

  if (!query) {
    console.error('Usage: node scripts/search.mjs "<query>" [topK=5] [--force] [--inject]');
    console.error("  --inject: 에이전트 컨텍스트 주입용 — 청크 본문만 출력 (verbose 없음)");
    process.exit(1);
  }

  // 쿼리 라우터 — Phase 2c
  const route = routeQuery(query);
  if (!route.shouldSearch && !forceSearch && !injectMode) {
    recordInvocation("skipped");
    console.log(`🚫 검색 스킵 (reason: ${route.reason}, confidence: ${route.confidence})`);
    console.log("   --force 플래그로 강제 검색 가능");
    process.exit(0);
  }
  if (!injectMode && route.shouldSearch) {
    console.log(`🔍 라우터: 검색 실행 (reason: ${route.reason}, confidence: ${route.confidence})`);
  }

  if (!fs.existsSync(INDEX_FILE)) {
    console.error(`❌ Index not found: ${INDEX_FILE}`);
    console.error("   먼저 npm run embed-content 실행");
    process.exit(1);
  }

  if (!injectMode) {
    console.log(`🔍 Query: "${query}"`);
    console.log("📦 Loading index + model...");
  }

  const index = JSON.parse(fs.readFileSync(INDEX_FILE, "utf-8"));
  if (!injectMode) {
    console.log(`   Index: ${index.chunks.length} chunks, ${index.dim}d, model=${index.model}`);
  }

  const { pipeline } = await import("@xenova/transformers");
  const extractor = await pipeline("feature-extraction", index.model);

  // 쿼리 임베딩
  const queryOutput = await extractor(query, { pooling: "mean", normalize: true });
  const queryVec = Array.from(queryOutput.data);

  // 모든 청크와 코사인 유사도 계산
  const start = Date.now();
  const scored = index.chunks.map((chunk) => ({
    ...chunk,
    score: cosineSimilarity(queryVec, chunk.vector),
  }));
  scored.sort((a, b) => b.score - a.score);
  const elapsed = Date.now() - start;

  const SCORE_THRESHOLD = 0.88;
  const top = scored.filter((c) => c.score >= SCORE_THRESHOLD).slice(0, topK);

  // 히트 카운트 기록 (unique slugs만)
  const hitSlugs = [...new Set(top.map((r) => r.slug))];
  recordInvocation(hitSlugs.length > 0 ? "hit" : "no_match", hitSlugs);

  if (injectMode) {
    if (top.length === 0) {
      console.log(`<!-- JIT: no match (threshold=${SCORE_THRESHOLD}, best=${scored[0]?.score.toFixed(4)}) -->`);
      process.exit(0);
    }
    // 에이전트 컨텍스트 주입 모드: 청크 본문만 구조화 출력
    // 중복 slug 제거 — 같은 엔트리의 여러 청크는 하나로 합침
    const bySlug = new Map();
    for (const r of top) {
      if (!bySlug.has(r.slug)) bySlug.set(r.slug, []);
      bySlug.get(r.slug).push(r);
    }
    console.log(`<!-- JIT: ${bySlug.size} entries, ${top.length} chunks, ${elapsed}ms -->`);
    for (const [slug, chunks] of bySlug) {
      const first = chunks[0];
      const pathPrefix = getPathPrefix(first.source);
      console.log(`\n## ${first.title} (${pathPrefix}${slug})\n`);
      for (const c of chunks) {
        console.log(`### ${c.h2_title}\n`);
        console.log(c.chunk_text);
        console.log("");
      }
    }
  } else {
    // 사람용 verbose 모드
    if (top.length === 0) {
      console.log(`\n🚫 No match (threshold=${SCORE_THRESHOLD}, best score=${scored[0]?.score.toFixed(4)} — wiki에 관련 entry 없음)\n`);
    } else {
    console.log(`\n⚡ Top ${topK} (검색 ${elapsed}ms, threshold=${SCORE_THRESHOLD})\n`);
    for (let i = 0; i < top.length; i++) {
      const r = top[i];
      const preview = r.chunk_text.replace(/\n+/g, " ").slice(0, 200);
      const sourceTag = r.source ? `[${r.source}]` : "";
      const pathPrefix = getPathPrefix(r.source);
      console.log(`#${i + 1}  score=${r.score.toFixed(4)}  ${sourceTag}`);
      console.log(`     ${r.title}`);
      console.log(`     ${pathPrefix}${r.slug} § ${r.h2_title}`);
      console.log(`     ${preview}${r.chunk_text.length > 200 ? "…" : ""}`);
      console.log("");
    }
    }
  }
}

main().catch((err) => {
  console.error("❌ Search failed:", err);
  process.exit(1);
});
