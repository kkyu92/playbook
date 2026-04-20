import fs from "fs";
import path from "path";
import matter from "gray-matter";

// /lint 의 결정론적 검사 부분.
// 의미 판단 (중복 감지, 패턴 → wiki 승격 권장) 은 Claude 가 /lint 호출 시 추가로 수행.

const CONTENT_DIR = path.join(process.cwd(), "content");
const WORKERS_CONFIG = path.join(process.cwd(), "workers.config.json");
const STALE_DAYS = 30;
const PATTERN_MIN_COUNT = 3;
// 모든 journal 에 공통으로 들어가는 메타 태그 — 패턴 감지에서 제외
// + workers.config.json 의 registered 워커 이름 (도메인-only 태그) 도 제외
function loadNoiseTags() {
  const base = ["playbook-journal", "auto-ingest", "lesson"];
  try {
    const cfg = JSON.parse(fs.readFileSync(WORKERS_CONFIG, "utf-8"));
    return new Set([...base, ...(cfg.registered || []), ...(cfg.special || [])]);
  } catch {
    return new Set(base);
  }
}
const NOISE_TAGS = loadNoiseTags();

function findMdxFiles(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) results.push(...findMdxFiles(full));
    else if (item.name.endsWith(".mdx")) results.push(full);
  }
  return results;
}

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
  return entries
    .filter((e) => {
      const conf = e.frontmatter.confidence || 1;
      return conf < 3 && daysSince(e.frontmatter.date) > STALE_DAYS;
    })
    .map((e) => ({
      slug: e.slug,
      confidence: e.frontmatter.confidence || 1,
      days: daysSince(e.frontmatter.date),
    }));
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
  return Object.entries(tagCount)
    .filter(([_, n]) => n >= PATTERN_MIN_COUNT)
    .map(([tag, count]) => {
      // 이미 비-journal wiki entry 의 tags 에 포함된 tag 면 "승격됨" 으로 표시
      const promoted = nonJournals.find((e) => (e.frontmatter.tags || []).includes(tag));
      return { tag, count, promoted: promoted?.slug || null };
    })
    .sort((a, b) => b.count - a.count);
}

function checkInProgressOldEntries(entries) {
  // status: in-progress 인 채로 오래된 entry — 보강 또는 status 변경 후보
  return entries
    .filter((e) => e.frontmatter.status === "in-progress" && daysSince(e.frontmatter.date) > STALE_DAYS)
    .map((e) => ({ slug: e.slug, days: daysSince(e.frontmatter.date) }));
}

function main() {
  const entries = loadEntries();
  const orphans = checkOrphans(entries);
  const isolated = checkIsolated(entries);
  const stale = checkStale(entries);
  const inProgress = checkInProgressOldEntries(entries);
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
  const newPatterns = patterns.filter((p) => !p.promoted);
  console.log(`${newPatterns.length === 0 ? "  " : "💡"} Pattern Candidates:  ${newPatterns.length}건 신규 / ${patterns.length}건 전체 (Journal 태그 ${PATTERN_MIN_COUNT}회+)`);
  console.log("");

  if (orphans.length > 0) {
    console.log("=== Orphans (참조하지만 엔트리 없음) ===");
    for (const o of orphans) console.log(`  ${o.from} → ${o.to}`);
    console.log("");
  }
  if (isolated.length > 0) {
    console.log("=== Isolated (connections 없음) ===");
    for (const s of isolated) console.log(`  ${s}`);
    console.log("");
  }
  if (stale.length > 0) {
    console.log("=== Stale (보강 또는 아카이브) ===");
    for (const s of stale) console.log(`  ${s.slug} — confidence ${s.confidence}, ${s.days}일 전`);
    console.log("");
  }
  if (inProgress.length > 0) {
    console.log("=== Long In-Progress (status 변경 또는 보강) ===");
    for (const s of inProgress) console.log(`  ${s.slug} — ${s.days}일 전 작성, 여전히 in-progress`);
    console.log("");
  }
  if (patterns.length > 0) {
    console.log("=== Pattern Promotion Candidates ===");
    for (const p of patterns) {
      if (p.promoted) {
        console.log(`  ✓ '${p.tag}' (Journal ${p.count}건) — 이미 승격: ${p.promoted}`);
      } else {
        console.log(`  💡 '${p.tag}' (Journal ${p.count}건) — Wiki 엔트리화 검토`);
      }
    }
    console.log("");
  }

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
  process.exit(0);
}

main();
