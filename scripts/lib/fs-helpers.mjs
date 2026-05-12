import fs from "node:fs";
import path from "node:path";

/**
 * Recursively collect all files with the given extension under dir.
 * @param {string} dir
 * @param {string} ext e.g. ".mdx" or ".md"
 * @returns {string[]} absolute paths
 */
export function findFilesByExt(dir, ext) {
  const results = [];
  function walk(d) {
    if (!fs.existsSync(d)) return;
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
