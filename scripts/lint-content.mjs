import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { findMdxFiles } from "./lib/fs-helpers.mjs";

// /lint 의 결정론적 검사 부분.
// 의미 판단 (중복 감지, 패턴 → wiki 승격 권장) 은 Claude 가 /lint 호출 시 추가로 수행.

const CONTENT_DIR = path.join(process.cwd(), "content");
const WORKERS_CONFIG = path.join(process.cwd(), "workers.config.json");
const HITS_FILE = path.join(process.cwd(), "data", "search-hits.json");
const STALE_DAYS = 30;
const PATTERN_MIN_COUNT = 3;
const UNUSED_WARN_DAYS = 30;   // hit=0 + 이 일수 경과 → 미사용 경고
const UNUSED_WARN_MIN_TOTAL = 10;  // totalQueries 가 이 이상일 때만 의미 있는 신호
// 모든 journal 에 공통으로 들어가는 메타 태그 — 패턴 감지에서 제외
// + workers.config.json 의 registered 워커 이름 (도메인-only 태그) 도 제외
function loadNoiseTags() {
  const base = ["playbook-journal", "auto-ingest", "lesson"];
  try {
    const cfg = JSON.parse(fs.readFileSync(WORKERS_CONFIG, "utf-8"));
    return new Set([...base, ...(cfg.registered || []), ...(cfg.special || [])]);
  } catch (err) {
    console.warn(`[lint-content] workers.config.json 읽기 실패 — base tags 만 사용: ${err.message}`);
    return new Set(base);
  }
}
const NOISE_TAGS = loadNoiseTags();


function loadEntries() {
  return findMdxFiles(CONTENT_DIR).map((filePath) => {
    const raw = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(raw);
    const slug = path
      .relative(CONTENT_DIR, filePath)
      .replace(/\.mdx$/, "")
      .replace(/\\/g, "/");
    return { slug, frontmatter: data, filePath };
  });
}

function daysSince(dateStr) {
  if (!dateStr) return Infinity;
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return Infinity;
  return Math.floor((Date.now() - d.getTime()) / 86400000);
}

function checkOrphans(entries) {
  const slugs = new Set(entries.map((e) => e.slug));
  const out = [];
  for (const e of entries) {
    for (const t of e.frontmatter.connections || []) {
      if (!slugs.has(t)) out.push({ from: e.slug, to: t });
    }
  }
  return out;
}

function checkIsolated(entries) {
  return entries
    .filter((e) => !e.frontmatter.connections || e.frontmatter.connections.length === 0)
    .map((e) => e.slug);
}

function checkStale(entries) {
  const results = [];
  for (const e of entries) {
    const conf = e.frontmatter.confidence || 1;
    const days = daysSince(e.frontmatter.date);
    if (conf < 3 && days > STALE_DAYS) results.push({ slug: e.slug, confidence: conf, days });
  }
  return results;
}

function checkPatterns(entries) {
  // journal 시리즈 안에서 메타 태그 제외하고 빈도 카운트
  const journals = entries.filter((e) => e.frontmatter.series === "playbook-journal");
  const nonJournals = entries.filter((e) => e.frontmatter.series !== "playbook-journal");
  const tagCount = {};
  for (const e of journals) {
    for (const tag of e.frontmatter.tags || []) {
      if (NOISE_TAGS.has(tag)) continue;
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    }
  }
  const tagToSlug = new Map();
  for (const e of nonJournals) {
    for (const tag of e.frontmatter.tags || []) {
      if (!tagToSlug.has(tag)) tagToSlug.set(tag, e.slug);
    }
  }
  return Object.entries(tagCount)
    .filter(([_, n]) => n >= PATTERN_MIN_COUNT)
    .map(([tag, count]) => ({ tag, count, promoted: tagToSlug.get(tag) || null }))
    .sort((a, b) => b.count - a.count);
}

function checkInProgressOldEntries(entries) {
  // status: in-progress 인 채로 오래된 entry — 보강 또는 status 변경 후보
  const results = [];
  for (const e of entries) {
    if (e.frontmatter.status !== "in-progress") continue;
    const days = daysSince(e.frontmatter.date);
    if (days > STALE_DAYS) results.push({ slug: e.slug, days });
  }
  return results;
}

function checkUnusedEntries(entries) {
  // JIT 검색 hit=0 + UNUSED_WARN_DAYS 경과 → "검색 안 되는" 사각지대 의심
  // totalQueries 가 충분히 쌓였을 때만 (n<10 이면 통계 무의미)
  let hitsData;
  try {
    hitsData = JSON.parse(fs.readFileSync(HITS_FILE, "utf-8"));
  } catch (err) {
    if (err.code !== "ENOENT") console.warn(`[lint-content] hits.json 파싱 실패 — unused 체크 skip: ${err.message}`);
    return [];
  }
  if ((hitsData.totalQueries || 0) < UNUSED_WARN_MIN_TOTAL) return [];

  const hits = hitsData.hits || {};
  return entries
    .filter((e) => !e.frontmatter.series)  // journal/series entries are series-read, not JIT-retrieved
    .map((e) => ({ slug: e.slug, days: daysSince(e.frontmatter.date), count: hits[e.slug] || 0 }))
    .filter((e) => e.days >= UNUSED_WARN_DAYS && e.count === 0)
    .map(({ slug, days }) => ({ slug, days }));
}

function printSection(title, items, formatItem, footer) {
  if (items.length === 0) return;
  console.log(`=== ${title} ===`);
  for (const item of items) console.log(`  ${formatItem(item)}`);
  if (footer) console.log(`  ${footer}`);
  console.log("");
}

function main() {
  const entries = loadEntries();
  const orphans = checkOrphans(entries);
  const isolated = checkIsolated(entries);
  const stale = checkStale(entries);
  const inProgress = checkInProgressOldEntries(entries);
  const unused = checkUnusedEntries(entries);
  const patterns = checkPatterns(entries);
  const date = new Date().toISOString().slice(0, 10);

  const sym = (n) => (n === 0 ? "✓" : "⚠");

  console.log(`LINT REPORT — ${date}`);
  console.log("═".repeat(50));
  console.log(`Total entries: ${entries.length}`);
  console.log("");
  console.log(`${sym(orphans.length)} Orphan Links:        ${orphans.length}건`);
  console.log(`${sym(isolated.length)} Isolated Nodes:      ${isolated.length}건`);
  console.log(`${sym(stale.length)} Stale:               ${stale.length}건 (confidence<3, ${STALE_DAYS}일+)`);
  console.log(`${sym(inProgress.length)} Long In-Progress:    ${inProgress.length}건 (${STALE_DAYS}일+)`);
  console.log(`${sym(unused.length)} JIT Unused:          ${unused.length}건 (hit=0, ${UNUSED_WARN_DAYS}일+) — search-hits.json 기반`);
  const newPatterns = patterns.filter((p) => !p.promoted);
  console.log(`${newPatterns.length === 0 ? "  " : "💡"} Pattern Candidates:  ${newPatterns.length}건 신규 / ${patterns.length}건 전체 (Journal 태그 ${PATTERN_MIN_COUNT}회+)`);
  console.log("");

  printSection("Orphans (참조하지만 엔트리 없음)", orphans, (o) => `${o.from} → ${o.to}`);
  printSection("Isolated (connections 없음)", isolated, (s) => s);
  printSection("Stale (보강 또는 아카이브)", stale, (s) => `${s.slug} — confidence ${s.confidence}, ${s.days}일 전`);
  printSection("Long In-Progress (status 변경 또는 보강)", inProgress, (s) => `${s.slug} — ${s.days}일 전 작성, 여전히 in-progress`);
  printSection("JIT Unused (검색 hit 0, 사각지대 의심)", unused, (s) => `${s.slug} — ${s.days}일 전 작성, JIT 검색 한 번도 안 걸림`, "💡 실 활용 없으면 wiki 에서 archive 또는 connections 재검토 권장");
  printSection("Pattern Promotion Candidates", patterns, (p) =>
    p.promoted
      ? `✓ '${p.tag}' (Journal ${p.count}건) — 이미 승격: ${p.promoted}`
      : `💡 '${p.tag}' (Journal ${p.count}건) — Wiki 엔트리화 검토`,
  );

  console.log("───");
  console.log("의미 판단 (제목 유사도 / 중복 / 패턴→entry 결정) 은 Claude 가 /lint 호출 시 추가 분석.");
  console.log(`Frontmatter 검증 + INDEX 동기화 + Workers 이름 검증은 generate-content-manifest.mjs 에서 처리.`);

  // --strict 모드 — orphan/isolated > 0 이면 exit 1 (회귀 가드)
  // A2 Phase 1 진입 base. subagent finding #4 (lint:wiki 통과 강제) 의 진짜 fix.
  // CI/workflow 에서 strict 모드 사용 → LLM hallucination (잘못된 connections) 자동 차단
  const strict = process.argv.includes("--strict");
  if (strict && (orphans.length > 0 || isolated.length > 0)) {
    console.error("");
    console.error(`❌ STRICT MODE FAIL — orphans=${orphans.length}, isolated=${isolated.length}`);
    console.error("   회귀 가드: connections 변경 후 재검증 필요. orphan/isolated 0 이어야 통과.");
    process.exit(1);
  }
}

main();
