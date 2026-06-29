/**
 * develop-cycle-hub 패턴 #2 코드 게이트
 *
 * connections slug 에 category/ 접두사가 없으면 checkOrphans 에서 잡히기 전에
 * 이른 경고를 발생시켜 MDX 작성 시점에 선제 차단.
 *
 * Why: `some-slug` 형식은 slug Set 에서 `category/some-slug` 로 검색되므로 orphan 판정.
 * Fix: connections 는 항상 `<category>/<slug>` 형식.
 *
 * 박제 근거: docs/solutions/develop-cycle-hub/_compiled-truth.md 패턴 #2
 * (2026-05-20 솔루션 — cycle 1083 4건 수정 후 2nd 재발 방지)
 */

/**
 * @param {Array<{slug: string, frontmatter: {connections?: string[]}, filePath: string}>} entries
 * @returns {Array<{entry: string, connection: string}>}
 */
export function checkConnectionPrefix(entries) {
  const results = [];
  for (const e of entries) {
    for (const conn of e.frontmatter.connections || []) {
      if (!conn.includes("/")) {
        results.push({ entry: e.slug, connection: conn });
      }
    }
  }
  return results;
}
