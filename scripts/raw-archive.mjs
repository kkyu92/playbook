#!/usr/bin/env node
// raw-sources auto-archive — entry 변환 완료된 raw 를 _archive/ 로 이동
// cycle 39~42 expand-scope α-1 — TODOS [P2] cycle 7 carry-over 해소
//
// 사용법:
//   node scripts/raw-archive.mjs --dry-run   (변경 없이 list)
//   node scripts/raw-archive.mjs             (실제 mv)

import fs from "fs";
import path from "path";
import matter from "gray-matter";

const RAW_DIR = path.join(process.cwd(), "raw-sources");
const ARCHIVE_DIR = path.join(RAW_DIR, "_archive");
const CONTENT_DIR = path.join(process.cwd(), "content");
const DRY_RUN = process.argv.includes("--dry-run");

function listRawFiles() {
  if (!fs.existsSync(RAW_DIR)) return [];
  return fs
    .readdirSync(RAW_DIR)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map((f) => path.join(RAW_DIR, f));
}

function listEntryRawSources() {
  // content/**/*.mdx frontmatter raw_source field 모음
  const refs = new Set();
  function walk(dir) {
    if (!fs.existsSync(dir)) return;
    for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, ent.name);
      if (ent.isDirectory()) walk(p);
      else if (ent.name.endsWith(".mdx")) {
        try {
          const fm = matter(fs.readFileSync(p, "utf-8")).data;
          if (fm.raw_source) refs.add(path.basename(fm.raw_source));
        } catch {
          // ignore parse error
        }
      }
    }
  }
  walk(CONTENT_DIR);
  return refs;
}

function isSelfPolicy(rawPath) {
  // self-policy raw = audit-only (entry 변환 안 함). frontmatter type 체크
  try {
    const fm = matter(fs.readFileSync(rawPath, "utf-8")).data;
    return fm.subtype === "self-policy" || fm.payload_type === "self-policy";
  } catch {
    return false;
  }
}

function main() {
  const rawFiles = listRawFiles();
  const entryRefs = listEntryRawSources();

  const toArchive = [];
  for (const rawPath of rawFiles) {
    const base = path.basename(rawPath);
    if (entryRefs.has(base) || isSelfPolicy(rawPath)) {
      toArchive.push(rawPath);
    }
  }

  if (toArchive.length === 0) {
    console.log("✓ 처리할 raw 없음 (모두 active)");
    return;
  }

  console.log(`📦 archive 후보: ${toArchive.length}건 / 전체 active ${rawFiles.length}`);
  console.log(
    `   archive 비율 (after): ${((entryRefs.size + toArchive.length) / (rawFiles.length + entryRefs.size) * 100).toFixed(1)}%`
  );

  if (DRY_RUN) {
    console.log("\n[dry-run] 변경 없음. 후보 list:");
    for (const p of toArchive.slice(0, 10)) {
      console.log(`  - ${path.basename(p)}`);
    }
    if (toArchive.length > 10) console.log(`  ... +${toArchive.length - 10} more`);
    return;
  }

  if (!fs.existsSync(ARCHIVE_DIR)) fs.mkdirSync(ARCHIVE_DIR, { recursive: true });

  let archived = 0;
  for (const src of toArchive) {
    const dest = path.join(ARCHIVE_DIR, path.basename(src));
    if (fs.existsSync(dest)) {
      // 이미 archive 에 있는 경우 = 중복. src 만 삭제 (idempotent)
      fs.unlinkSync(src);
    } else {
      fs.renameSync(src, dest);
    }
    archived += 1;
  }
  console.log(`✅ archive 완료: ${archived}건 → ${path.relative(process.cwd(), ARCHIVE_DIR)}/`);
}

main();
