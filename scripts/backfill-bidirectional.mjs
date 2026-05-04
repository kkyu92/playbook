#!/usr/bin/env node
/**
 * Backfill Bidirectional Migration (1회 실행).
 *
 * 목적:
 *   1. 기존 entries 의 connections 양방향 정규화 (A → B 면 B → A 도)
 *   2. source 필드 없는 entry 에 "manual" 명시 주입
 *   3. MAX_CONNECTIONS 15 초과 시 가장 오래된 last_verified 기준 축출
 *
 * 특성:
 *   - Idempotent: 2회 실행 = 1회 결과 동일
 *   - Dry-run 지원: --dry-run 시 변경 사항만 출력
 *   - gray-matter 로 frontmatter 파싱 (quiz 등 복합 필드 안전)
 *
 * 사용:
 *   node scripts/backfill-bidirectional.mjs           — apply
 *   node scripts/backfill-bidirectional.mjs --dry-run — preview
 */

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import yaml from "js-yaml";
import { validateConnections, MAX_CONNECTIONS } from "./lib/bidirectional-sync.mjs";

const CONTENT_DIR = path.join(process.cwd(), "content");
const DRY_RUN = process.argv.includes("--dry-run");

// ─── 1. 모든 MDX entry 로드 ─────────────────────────────────────────

function loadAllEntries() {
  const entries = [];
  const walk = (dir, rel = "") => {
    for (const item of fs.readdirSync(dir)) {
      const full = path.join(dir, item);
      const relPath = rel ? `${rel}/${item}` : item;
      const stat = fs.statSync(full);
      if (stat.isDirectory()) {
        walk(full, relPath);
      } else if (item.endsWith(".mdx")) {
        const slug = relPath.replace(/\.mdx$/, "");
        const raw = fs.readFileSync(full, "utf8");
        const parsed = matter(raw);
        entries.push({
          slug,
          path: full,
          raw,
          frontmatter: parsed.data,
          body: parsed.content,
        });
      }
    }
  };
  walk(CONTENT_DIR);
  return entries;
}

// ─── 2. Backfill 적용 ────────────────────────────────────────────

function run() {
  const entries = loadAllEntries();
  console.log(`📦 로드: ${entries.length} entries`);

  const allSlugs = entries.map((e) => e.slug);

  // 정규화된 카피 (원본 frontmatter 보존)
  const working = entries.map((e) => ({
    slug: e.slug,
    original: e,
    newConnections: Array.isArray(e.frontmatter.connections)
      ? [...e.frontmatter.connections]
      : [],
    newSource: e.frontmatter.source || "manual",
  }));

  // Step 1: invalid connection 제거 (manifest 에 없는 slug)
  for (const w of working) {
    const before = w.newConnections.length;
    w.newConnections = validateConnections(w.newConnections, allSlugs);
    if (w.newConnections.length !== before) {
      console.log(
        `  🧹 ${w.slug}: invalid connection ${before - w.newConnections.length}개 제거`,
      );
    }
  }

  // Step 2: 양방향 정규화
  let addedCount = 0;
  for (const source of working) {
    for (const targetSlug of [...source.newConnections]) {
      const target = working.find((w) => w.slug === targetSlug);
      if (!target) continue;
      if (!target.newConnections.includes(source.slug)) {
        target.newConnections.push(source.slug);
        addedCount++;
      }
    }
  }
  console.log(`  🔗 역방향 링크 ${addedCount}개 추가`);

  // Step 3: cap 초과 축출 (반대편도 제거)
  const evictions = [];
  for (const w of working) {
    while (w.newConnections.length > MAX_CONNECTIONS) {
      const candidates = w.newConnections
        .map((slug) => {
          const ent = working.find((x) => x.slug === slug)?.original;
          const lv =
            ent?.frontmatter?.last_verified || ent?.frontmatter?.date || "1970-01-01";
          return { slug, lv };
        })
        .sort((a, b) => {
          if (a.lv !== b.lv) return a.lv.localeCompare(b.lv);
          return b.slug.localeCompare(a.slug);
        });
      const toEvict = candidates[0].slug;
      w.newConnections = w.newConnections.filter((s) => s !== toEvict);
      const other = working.find((x) => x.slug === toEvict);
      if (other) {
        other.newConnections = other.newConnections.filter((s) => s !== w.slug);
      }
      evictions.push({ from: w.slug, evicted: toEvict });
    }
  }
  if (evictions.length > 0) {
    console.log(`  ✂️  cap 초과 축출 ${evictions.length}건:`);
    for (const ev of evictions) console.log(`     ${ev.from} ✂ ${ev.evicted}`);
  }

  // Step 4: 파일 업데이트 — 변경된 것만
  let writes = 0;
  for (const w of working) {
    const original = w.original;
    const beforeConn = Array.isArray(original.frontmatter.connections)
      ? original.frontmatter.connections
      : [];
    const afterConn = w.newConnections;
    const beforeSource = original.frontmatter.source;
    const afterSource = w.newSource;

    const connChanged =
      beforeConn.length !== afterConn.length ||
      beforeConn.some((s, i) => s !== afterConn[i]);
    const sourceChanged = beforeSource !== afterSource;

    if (!connChanged && !sourceChanged) continue;

    // gray-matter 로 rewrite — quiz 등 복합 필드 안전
    const newFrontmatter = {
      ...original.frontmatter,
      connections: afterConn,
      source: afterSource,
    };

    // matter.stringify 는 field 순서 고정. 원본 순서 보존 위해 커스텀 stringify.
    const newRaw = stringifyPreservingOrder(
      original.raw,
      original.frontmatter,
      newFrontmatter,
      original.body,
    );

    if (DRY_RUN) {
      console.log(`  📝 [dry] would update: ${w.slug}`);
      if (connChanged)
        console.log(`     connections: ${beforeConn.length} → ${afterConn.length}`);
      if (sourceChanged)
        console.log(`     source: ${beforeSource || "(none)"} → ${afterSource}`);
    } else {
      fs.writeFileSync(original.path, newRaw);
      writes++;
    }
  }

  if (DRY_RUN) {
    console.log(`\n🧪 DRY RUN 완료 — 실제 변경 없음`);
  } else {
    console.log(`\n✅ ${writes}개 파일 업데이트 완료`);
  }
}

/**
 * 원본 frontmatter 순서를 최대한 보존하면서 connections / source 만 교체.
 * 다른 필드는 원형 유지. 새 필드 (source) 는 끝에 append.
 */
function stringifyPreservingOrder(raw, oldFm, newFm, body) {
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n/);
  if (!fmMatch) throw new Error("No frontmatter found");
  const _oldFmRaw = fmMatch[1];

  // js-yaml dump 로 inline array + single-quoted preserve
  const newFmYaml = yaml.dump(newFm, {
    lineWidth: -1, // inline array 강제
    flowLevel: -1,
    noRefs: true,
    quotingType: '"',
    forceQuotes: false,
  });

  // Connections 는 inline array 포맷 유지 — 가독성
  const processedYaml = inlineConnectionsArray(newFmYaml);

  return `---\n${processedYaml}---\n${body}`;
}

function inlineConnectionsArray(yamlText) {
  // connections: 블록을 한 줄 array 로 변환
  return yamlText.replace(
    /^connections:\n((?:  - [^\n]+\n)+)/m,
    (_, itemsBlock) => {
      const items = itemsBlock
        .split("\n")
        .filter((l) => l.startsWith("  - "))
        .map((l) => l.slice(4).trim().replace(/^["']|["']$/g, ""));
      return `connections: [${items.join(", ")}]\n`;
    },
  );
}

run();
