#!/usr/bin/env node
// 허브 content/ 변경 → 워커별 영향 entries 묶음 → JSON 출력.
// 호출: pnpm node scripts/notify-workers.mjs file1.mdx file2.mdx ...
//   또는: pnpm node scripts/notify-workers.mjs < changed.txt
// 출력: stdout JSON `{ "moneyball": [{path,title,description,workers}], ... }`
//   (playbook 자체는 제외 — self-sync 의미 X)
//   (workers: [] 또는 누락 entry 도 제외 — 명시 워커만)
//   (workers: ["all"] 은 모든 등록 워커에 매핑)

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const REPO_ROOT = process.cwd();
const WORKERS_CONFIG_PATH = path.join(REPO_ROOT, "workers.config.json");

function loadRegisteredWorkers() {
  const cfg = JSON.parse(fs.readFileSync(WORKERS_CONFIG_PATH, "utf-8"));
  return {
    registered: cfg.registered || [],
    special: cfg.special || [],
  };
}

function readFiles() {
  if (process.argv.length > 2) return process.argv.slice(2);
  const stdin = fs.readFileSync(0, "utf-8");
  return stdin
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

function summarize(filePath, registered) {
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(raw);
  const workersField = data.workers;
  let targets = [];
  if (Array.isArray(workersField)) targets = workersField;
  else if (typeof workersField === "string") targets = [workersField];

  // ["all"] = 등록된 모든 워커 (playbook 제외)
  if (targets.includes("all")) {
    targets = registered.filter((w) => w !== "playbook");
  }
  // 빈 배열 / 미명시 = skip
  if (!targets.length) return null;

  return {
    path: filePath,
    title: data.title || path.basename(filePath),
    description: data.description || "",
    category: data.category || "",
    workers: targets.filter((w) => w !== "playbook"),
  };
}

function main() {
  const { registered } = loadRegisteredWorkers();
  const files = readFiles();
  const buckets = {};

  for (const f of files) {
    const summary = summarize(f, registered);
    if (!summary) continue;
    for (const worker of summary.workers) {
      if (!registered.includes(worker)) {
        process.stderr.write(`⚠️ unknown worker '${worker}' in ${f} — skip\n`);
        continue;
      }
      if (worker === "playbook") continue;
      if (!buckets[worker]) buckets[worker] = [];
      buckets[worker].push({
        path: summary.path,
        title: summary.title,
        description: summary.description,
        category: summary.category,
      });
    }
  }

  process.stdout.write(JSON.stringify(buckets, null, 2));
}

main();
