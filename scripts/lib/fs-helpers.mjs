import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * Recursively collect all files with the given extension under dir.
 * @param {string} dir
 * @param {string} ext e.g. ".mdx" or ".md"
 * @returns {string[]} absolute paths
 */
export function findFilesByExt(dir, ext) {
  if (!fs.existsSync(dir)) return [];
  const results = [];
  function walk(d) {
    for (const item of fs.readdirSync(d, { withFileTypes: true })) {
      const full = path.join(d, item.name);
      if (item.isDirectory()) walk(full);
      else if (item.name.endsWith(ext)) results.push(full);
    }
  }
  walk(dir);
  return results;
}

/** Convenience wrapper — collect all .mdx files under dir. */
export function findMdxFiles(dir) {
  return findFilesByExt(dir, ".mdx");
}

/** Load all MDX entries under dir, returning parsed frontmatter + body. */
export function loadMdxEntries(dir) {
  return findMdxFiles(dir).map((full) => {
    const slug = path.relative(dir, full).replace(/\.mdx$/, "");
    const raw = fs.readFileSync(full, "utf8");
    const parsed = matter(raw);
    return { slug, path: full, raw, frontmatter: parsed.data, body: parsed.content };
  });
}
