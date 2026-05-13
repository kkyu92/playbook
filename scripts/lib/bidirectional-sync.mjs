/**
 * Bidirectional connections sync + validation + cap enforcement.
 *
 * 설계 근거: CEO plan 2026-04-21-geeknews-pipeline-pivot (E2 체리픽)
 * - 양방향: 새 entry.connections 추가 + 연결된 각 target entry 의 connections 에도 새 slug 역방향 추가
 * - Validation: target slug 이 manifest 에 존재하는지 확인, 없으면 drop
 * - Cap 15: target 의 connections 가 15 초과하면 last_verified 가 가장 오래된 것 1개 제거 (dangling edge 방지 위해 반대편도 제거, cascading 없음)
 */

import yaml from "js-yaml";

const MAX_CONNECTIONS = 15;

/**
 * manifest 에 존재하는 slug 만 남기고, 중복 제거.
 *
 * @param {string[]} candidates — Gemini 가 제안한 slug 리스트
 * @param {string[]} existingSlugs — manifest.entries 의 slug 집합
 * @returns {string[]}
 */
export function validateConnections(candidates, existingSlugs) {
  const existingSet = new Set(existingSlugs);
  const seen = new Set();
  return candidates.filter((slug) => {
    if (!existingSet.has(slug)) return false;
    if (seen.has(slug)) return false;
    seen.add(slug);
    return true;
  });
}

/**
 * 양방향 sync: 새 entry 를 기존 entries 에 연결하고, 역방향으로도 연결.
 * Cap 초과 시 축출 (dangling edge 방지 — 반대편도 제거).
 *
 * @param {object} newEntry — { slug, frontmatter: { connections: string[] } }
 * @param {Array} entries — manifest.entries 전체 (frontmatter 에 connections 있는 배열)
 * @returns {{ updatedEntries: Array, evictions: Array<{from: string, evicted: string}> }}
 */
export function syncBidirectional(newEntry, entries) {
  const byS = new Map(entries.map((e) => [e.slug, e]));
  const evictions = [];

  for (const targetSlug of newEntry.frontmatter.connections) {
    const target = byS.get(targetSlug);
    if (!target) continue; // validated 된 후 들어와야 함. 방어적 체크.

    // 역방향: target.connections 에 newEntry.slug 추가 (이미 있으면 skip)
    if (!target.frontmatter.connections.includes(newEntry.slug)) {
      target.frontmatter.connections.push(newEntry.slug);
    }

    // Cap 검사
    if (target.frontmatter.connections.length > MAX_CONNECTIONS) {
      const evicted = evictOldest(target, newEntry.slug, byS);
      if (evicted) {
        evictions.push({ from: target.slug, evicted });
        // Dangling 방지: 축출된 반대편에서도 target 제거
        const evictedEntry = byS.get(evicted);
        if (evictedEntry) {
          evictedEntry.frontmatter.connections = evictedEntry.frontmatter.connections.filter(
            (s) => s !== target.slug,
          );
        }
      }
    }
  }

  return { updatedEntries: entries, evictions };
}

/**
 * target.connections 에서 가장 오래된 연결 1개 제거 (newSlug 는 보호).
 *
 * 기준:
 *   1. 연결된 target entry 의 last_verified 가 가장 오래된 것
 *   2. last_verified 없으면 무한 옛날 취급 (1970)
 *   3. 동점이면 알파벳 slug 뒤쪽
 *
 * @returns {string | null} — 제거된 slug, 또는 null (newSlug 만 남은 경우)
 */
function evictOldest(targetEntry, protectSlug, byS) {
  const candidates = targetEntry.frontmatter.connections
    .filter((s) => s !== protectSlug)
    .map((slug) => {
      const entry = byS.get(slug);
      const lv = entry?.frontmatter?.last_verified || "1970-01-01";
      return { slug, lv };
    });

  if (candidates.length === 0) return null;

  candidates.sort((a, b) => {
    if (a.lv !== b.lv) return a.lv.localeCompare(b.lv); // 오래된 것 먼저
    return b.slug.localeCompare(a.slug); // 알파벳 뒤쪽 먼저 (DESC)
  });

  const toEvict = candidates[0].slug;
  targetEntry.frontmatter.connections = targetEntry.frontmatter.connections.filter(
    (s) => s !== toEvict,
  );
  return toEvict;
}

/**
 * Convert YAML block-style connections array to inline format.
 * connections:\n  - foo\n  - bar → connections: [foo, bar]
 * @param {string} yamlText
 * @returns {string}
 */
export function inlineConnectionsArray(yamlText) {
  return yamlText.replace(
    /^connections:\n((?:  - [^\n]+\n)+)/m,
    (_, itemsBlock) => {
      const items = itemsBlock
        .split("\n")
        .filter(Boolean)
        .map((l) => l.slice(4).trim().replace(/^["']|["']$/g, ""));
      return `connections: [${items.join(", ")}]\n`;
    },
  );
}

/**
 * MDX frontmatter 재조립. gray-matter field 순서 변경 방지.
 * yaml.dump + connections inline array 포맷 강제.
 */
export function stringifyPreservingOrder(raw, newFm, body) {
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n/);
  if (!fmMatch) throw new Error(`No frontmatter in ${raw.slice(0, 80)}`);
  const newFmYaml = yaml.dump(newFm, {
    lineWidth: -1,
    flowLevel: -1,
    noRefs: true,
    quotingType: '"',
    forceQuotes: false,
  });
  const processed = inlineConnectionsArray(newFmYaml);
  return `---\n${processed}---\n${body}`;
}

export { MAX_CONNECTIONS };
