#!/usr/bin/env node
/**
 * backfill-frontmatter.mjs
 *
 * MDX 파일에 `last_verified` 필드가 없으면 `date` 값으로 추가.
 * 향후 추가 필드도 여기에 백필 로직 추가.
 *
 * 우리는 `applicable_to` 대신 `workers` 필드를 쓰므로 해당 백필은 안 함.
 * 이식: Mino777/ai-study scripts/backfill-frontmatter.mjs 를 단순화 (2026-04-20).
 *
 * 사용:
 *   node scripts/backfill-frontmatter.mjs            # dry-run
 *   node scripts/backfill-frontmatter.mjs --apply    # 실제 적용
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = path.join(__dirname, "../content");
const DRY_RUN = !process.argv.includes("--apply");

if (DRY_RUN) {
  console.log("🔍 Dry-run 모드 (--apply 로 실제 적용)\n");
}

function extractDate(content) {
  const match = content.match(/^date:\s*['"]?(\d{4}-\d{2}-\d{2})['"]?/m);
  return match ? match[1] : null;
}

function addFieldAfter(content, afterField, newField, newValue) {
  const regex = new RegExp(`^(${afterField}:.*)$`, "m");
  return content.replace(regex, `$1\n${newField}: ${newValue}`);
}

let totalFiles = 0;
let patchedFiles = 0;
let skippedFiles = 0;

function processDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      processDir(fullPath);
    } else if (entry.name.endsWith(".mdx")) {
      processFile(fullPath);
    }
  }
}

function processFile(filePath) {
  totalFiles++;
  let content = fs.readFileSync(filePath, "utf8");

  const hasLastVerified = /^last_verified:/m.test(content);
  if (hasLastVerified) {
    skippedFiles++;
    return;
  }

  const relPath = path.relative(path.join(__dirname, ".."), filePath);
  const date = extractDate(content);

  if (!date) {
    console.warn(`⚠️  ${relPath}: date 필드 없음 — skip`);
    skippedFiles++;
    return;
  }

  content = addFieldAfter(content, "confidence", "last_verified", `"${date}"`);

  patchedFiles++;
  console.log(`${DRY_RUN ? "[dry]" : "[add]"} ${relPath}  + last_verified: "${date}"`);

  if (!DRY_RUN) {
    fs.writeFileSync(filePath, content, "utf8");
  }
}

processDir(CONTENT_DIR);

console.log(`\n결과: ${totalFiles}개 파일 / ${patchedFiles}개 패치 대상 / ${skippedFiles}개 스킵`);
if (DRY_RUN && patchedFiles > 0) {
  console.log("\n실제 적용하려면: node scripts/backfill-frontmatter.mjs --apply");
}
