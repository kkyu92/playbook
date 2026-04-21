/**
 * Coverage Analyzer — 위키 커버리지/갭/staleness 분석 모듈.
 *
 * 설계 근거: CEO plan 2026-04-21-geeknews-pipeline-pivot (E5 독립 모듈화)
 * 목적: (1) daily-lesson 이 gap 기반 주제 추천 시 호출, (2) /dashboard 가 지표 표시 시 호출, (3) 워커 재사용 가능.
 *
 * 순수 함수 — side effect 0, 테스트 쉬움.
 *
 * Dynamic target: max(8, floor(median(entry_counts)))
 *   - 초반: 8 이 floor 로 작동 (현재 16 entries 면 median 낮음)
 *   - 성숙: median 이 커지면서 자동 상향 → 무한 성장 목표 정렬
 *
 * Gap ranking formula:
 *   score(category) =
 *     (target - min(entry_count, target)) * 3
 *   + sum((3 - confidence) for entry in category where confidence < 3)
 *   + months_since_oldest_last_verified * 0.5
 *
 *   tiebreak: 카테고리 알파벳 ASC
 */

import { CATEGORIES as ALL_CATEGORIES } from "./lib/categories.mjs";

const TARGET_FLOOR = 8;
const STALE_MONTHS = 6;

/**
 * @param {object} manifest — { entries: Array<{ slug, frontmatter: { category, confidence, last_verified, date, source } }> }
 * @returns {object} coverage analysis
 */
export function analyzeCoverage(manifest) {
  const entries = manifest?.entries || [];
  const now = new Date();

  // 카테고리별 집계
  const byCategory = {};
  for (const cat of ALL_CATEGORIES) {
    byCategory[cat] = { name: cat, entries: [], count: 0 };
  }
  // journal 은 커버리지 대상이 아님 (series)
  for (const e of entries) {
    const cat = e.frontmatter.category;
    if (!byCategory[cat]) continue; // journal 등 제외
    byCategory[cat].entries.push(e);
    byCategory[cat].count++;
  }

  const counts = Object.values(byCategory).map((c) => c.count);
  const target = computeTarget(counts);

  // 각 카테고리 메트릭 계산
  const categories = ALL_CATEGORIES.map((name) => {
    const bucket = byCategory[name];
    const count = bucket.count;
    const confs = bucket.entries.map((e) => e.frontmatter.confidence || 0);
    const avgConfidence = count > 0 ? confs.reduce((a, b) => a + b, 0) / count : 0;
    const lowConfidenceCount = confs.filter((c) => c < 3).length;
    const confidenceDeficit = confs.reduce(
      (acc, c) => acc + (c < 3 ? 3 - c : 0),
      0,
    );

    // oldest last_verified (없으면 date 로 fallback)
    const verifiedDates = bucket.entries.map((e) => e.frontmatter.last_verified || e.frontmatter.date);
    const oldestVerified = verifiedDates.sort()[0] || null;
    const monthsStale = oldestVerified ? monthsSince(oldestVerified, now) : 0;

    const gapScore = computeGapScore({
      count,
      target,
      confidenceDeficit,
      monthsStale,
    });

    const status = determineStatus(count, target);

    return {
      name,
      count,
      avgConfidence: round(avgConfidence, 2),
      lowConfidenceCount,
      confidenceDeficit,
      oldestVerified,
      monthsStale,
      gapScore,
      status, // "empty" | "low" | "ok" | "over"
    };
  });

  // Top gaps (score 높은 순, tiebreak 알파벳)
  const gaps = [...categories]
    .filter((c) => c.gapScore > 0)
    .sort((a, b) => {
      if (b.gapScore !== a.gapScore) return b.gapScore - a.gapScore;
      return a.name.localeCompare(b.name);
    });

  // Stale entries (last_verified > 6 months)
  const staleEntries = entries
    .filter((e) => {
      const lv = e.frontmatter.last_verified || e.frontmatter.date;
      if (!lv) return false;
      return monthsSince(lv, now) >= STALE_MONTHS;
    })
    .sort((a, b) => {
      const av = a.frontmatter.last_verified || a.frontmatter.date;
      const bv = b.frontmatter.last_verified || b.frontmatter.date;
      return av.localeCompare(bv); // 오래된 순
    });

  // Source mix
  const sourceMix = { scout: 0, "gap-pull": 0, manual: 0 };
  for (const e of entries) {
    const src = e.frontmatter.source || "manual";
    if (src in sourceMix) sourceMix[src]++;
  }

  // Balance — 편향도. 높을수록 균형.
  // 공식: 1 - (max-min) / (max + 1). max 0 이면 0.
  const maxCount = Math.max(...counts, 0);
  const minCount = Math.min(...counts);
  const balance = maxCount > 0 ? round(1 - (maxCount - minCount) / (maxCount + 1), 2) : 0;
  const topCategory = categories.reduce((a, b) => (b.count > a.count ? b : a), categories[0]);
  const balanceLabel = balance < 0.3
    ? `${topCategory.name} 편향`
    : balance < 0.7
      ? "성장 중"
      : "균형 유지";

  return {
    totalEntries: entries.length,
    target,
    targetFloor: TARGET_FLOOR,
    balance,
    balanceLabel,
    categories,
    gaps,
    staleEntries,
    sourceMix,
  };
}

/**
 * target = max(8, floor(median(counts)))
 * 초반: 8 이 floor. 성숙: median 이 커지면 자동 상향.
 */
export function computeTarget(counts) {
  if (counts.length === 0) return TARGET_FLOOR;
  const sorted = [...counts].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  const median = sorted.length % 2
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
  return Math.max(TARGET_FLOOR, Math.floor(median));
}

export function computeGapScore({ count, target, confidenceDeficit, monthsStale }) {
  const sizePart = (target - Math.min(count, target)) * 3;
  const stalePart = monthsStale * 0.5;
  return round(sizePart + (confidenceDeficit || 0) + stalePart, 2);
}

function determineStatus(count, target) {
  if (count === 0) return "empty";
  if (count < target * 0.5) return "low"; // 50% 미만
  if (count <= target) return "ok";
  return "over";
}

function monthsSince(isoDate, now) {
  const d = new Date(isoDate);
  if (isNaN(d.getTime())) return 0;
  const months = (now.getFullYear() - d.getFullYear()) * 12 + (now.getMonth() - d.getMonth());
  return Math.max(0, months);
}

function round(n, digits = 2) {
  const factor = 10 ** digits;
  return Math.round(n * factor) / factor;
}

export { ALL_CATEGORIES, TARGET_FLOOR, STALE_MONTHS };

// CLI smoke test: node scripts/coverage-analyzer.mjs
if (import.meta.url === `file://${process.argv[1]}`) {
  const fs = await import("fs");
  const path = await import("path");
  const manifestPath = path.join(process.cwd(), "src", "generated", "content-manifest.json");
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  const result = analyzeCoverage(manifest);
  console.log(JSON.stringify(result, null, 2));
}
