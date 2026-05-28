#!/usr/bin/env node
/**
 * Wiki Grave 진단 — noMatch query 분석
 *
 * scripts/search.mjs 의 noMatchQueries / noMatchQueryCounts 박제 데이터를 읽어
 * 빠진 wiki entry topic 후보를 식별한다.
 *
 * 사용:
 *   node scripts/analyze-no-match.mjs [--top=20] [--minCount=2]
 *
 * 출력:
 *   - top-K noMatch query (count desc)
 *   - 각 query 의 최고 점수 (얼마나 threshold 에서 벗어났는지)
 *   - 신규 entry / alias 작성 후보 sort
 */

import fs from "fs";
import path from "path";

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v ?? true];
  })
);

const topK = args.top ? parseInt(args.top, 10) : 20;
const minCount = args.minCount ? parseInt(args.minCount, 10) : 1;

const HITS_FILE = path.join(process.cwd(), "data", "search-hits.json");

if (!fs.existsSync(HITS_FILE)) {
  console.error(`❌ ${HITS_FILE} 부재 — 검색 1회 이상 실행 후 다시 시도`);
  process.exit(1);
}

const data = JSON.parse(fs.readFileSync(HITS_FILE, "utf-8"));

const queryCounts = data.noMatchQueryCounts ?? {};
const queryLog = data.noMatchQueries ?? [];

if (Object.keys(queryCounts).length === 0) {
  console.log("# noMatch query 박제 데이터 부재");
  console.log("");
  console.log(`legacy noMatch counter: ${data.noMatch ?? 0}`);
  console.log("");
  console.log("→ search.mjs noMatch query 박제 patch 적용 (cycle 1044 mid-review) 후 데이터 축적 대기.");
  console.log("→ baseline noMatch count 만 보존됨 (query 텍스트 미박제).");
  console.log("");
  console.log("다음 사이클부터 자연 발화 noMatch query 박제. N=20~50 축적 후 본 분석 의미 있음.");
  process.exit(0);
}

const ranked = Object.entries(queryCounts)
  .filter(([, count]) => count >= minCount)
  .sort((a, b) => b[1] - a[1])
  .slice(0, topK);

// query 별 최고 topScore (가장 가까이 갔던 score)
const bestScores = {};
for (const item of queryLog) {
  const cur = bestScores[item.query];
  if (cur == null || (item.topScore != null && item.topScore > cur)) {
    bestScores[item.query] = item.topScore;
  }
}

console.log(`# noMatch query top-${topK} (count ≥ ${minCount})\n`);
console.log("rank\tcount\tbestScore\tquery");
console.log("---\t---\t---\t---");
for (const [i, [query, count]] of ranked.entries()) {
  const best = bestScores[query];
  const bestStr = best != null ? best.toFixed(3) : "—";
  // query 너무 길면 자르기
  const q = query.length > 80 ? query.slice(0, 77) + "..." : query;
  console.log(`${i + 1}\t${count}\t${bestStr}\t${q}`);
}

console.log(`\n# 요약`);
console.log(`- 총 noMatch query (dedup): ${Object.keys(queryCounts).length}`);
console.log(`- 총 noMatch invocation: ${Object.values(queryCounts).reduce((s, n) => s + n, 0)}`);
console.log(`- 최근 ring buffer 보존: ${queryLog.length} (max=200)`);

// threshold 0.87 — bestScore 가 0.85+ 인 query = "거의 매칭" → alias/title 보강 후보
const nearMisses = ranked.filter(([q]) => bestScores[q] != null && bestScores[q] >= 0.85);
if (nearMisses.length > 0) {
  console.log(`\n# 거의 매칭 (bestScore ≥ 0.85, alias/title 보강 후보)`);
  for (const [q, count] of nearMisses) {
    console.log(`  - [${count}× score=${bestScores[q].toFixed(3)}] ${q.slice(0, 100)}`);
  }
}

// bestScore < 0.80 = 신규 entry 작성 후보
const totalMisses = ranked.filter(([q]) => bestScores[q] != null && bestScores[q] < 0.80);
if (totalMisses.length > 0) {
  console.log(`\n# 완전 부재 (bestScore < 0.80, 신규 entry 작성 후보)`);
  for (const [q, count] of totalMisses) {
    console.log(`  - [${count}× score=${bestScores[q].toFixed(3)}] ${q.slice(0, 100)}`);
  }
}

console.log(`\n# 다음 행동`);
console.log(`1. 거의 매칭 query → 기존 entry frontmatter description/tags 보강 (cycle 1043 entry #295 YAML escape 정밀 사례 참조)`);
console.log(`2. 완전 부재 query → 신규 wiki entry 작성 (/expand-plan + /office-hours 또는 직접)`);
console.log(`3. pnpm embed-content 재실행 → hit rate 측정 (target ≥ 50%)`);
