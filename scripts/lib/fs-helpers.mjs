import fs from "node:fs";
import path from "node:path";

/**
 * Recursively collect all .mdx files under dir.
 * @param {string} dir
 * @returns {string[]} absolute paths
 */
export function findMdxFiles(dir) {
  const results = [];
  function walk(d) {
    if (!fs.existsSync(d)) return;
    for (const item of fs.readdirSync(d, { withFileTypes: true })) {
      const full = path.join(d, item.name);
      if (item.isDirectory()) walk(full);
      else if (item.name.endsWith(".mdx")) results.push(full);
    }
  }
  walk(dir);
  return results;
}
