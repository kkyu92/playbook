import fs from "node:fs";
import path from "node:path";

/**
 * Recursively collect all .mdx files under dir.
 * @param {string} dir
 * @returns {string[]} absolute paths
 */
export function findMdxFiles(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) results.push(...findMdxFiles(full));
    else if (item.name.endsWith(".mdx")) results.push(full);
  }
  return results;
}
