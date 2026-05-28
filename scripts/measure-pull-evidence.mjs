#!/usr/bin/env node
/**
 * Hub-Pull Evidence Tracking — measure-pull-evidence.mjs
 *
 * 워커 repo 의 git log 에서 'from-hub:' 컨벤션 라인 grep → Pull 3+4 측정.
 *
 * 사용:
 *   node scripts/measure-pull-evidence.mjs [--since=DATE] [--worker=PATH]
 *
 * 옵션:
 *   --since   ISO date (default: 7일 전)
 *   --worker  단일 워커 repo path (default: 3 fork 전체)
 */

import { execSync } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs';

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, '').split('=');
    return [k, v ?? true];
  })
);

const sinceDays = args.sinceDays ? parseInt(args.sinceDays, 10) : 7;
const sinceDate = args.since ?? (() => {
  const d = new Date();
  d.setDate(d.getDate() - sinceDays);
  return d.toISOString().slice(0, 10);
})();

const HOME = process.env.HOME;
const DEFAULT_WORKERS = [
  { name: 'moneyball', path: `${HOME}/projects/moneyballscore` },
  { name: 'blog-autopilot', path: `${HOME}/projects/blog-autopilot` },
];

const workers = args.worker
  ? [{ name: path.basename(args.worker), path: args.worker }]
  : DEFAULT_WORKERS;

function grep(workerPath, pattern) {
  try {
    const out = execSync(
      `git -C ${workerPath} log --all --grep "${pattern}" --since="${sinceDate}" --pretty=format:"%H" 2>/dev/null`,
      { encoding: 'utf8' }
    );
    return out.split('\n').filter(Boolean).length;
  } catch {
    return 0;
  }
}

function totalCommits(workerPath) {
  try {
    const out = execSync(
      `git -C ${workerPath} log --since="${sinceDate}" --oneline 2>/dev/null | wc -l`,
      { encoding: 'utf8' }
    );
    return parseInt(out.trim(), 10);
  } catch {
    return 0;
  }
}

console.log(`# Hub-Pull Evidence — measurement (since ${sinceDate})\n`);

const headers = ['worker', 'total', 'from-hub', 'wiki', 'issue', 'memory', 'cross-update', 'other', 'rate'];
console.log(headers.join('\t'));
console.log(headers.map(() => '---').join('\t'));

const totals = { workers: 0, total: 0, fromHub: 0, wiki: 0, issue: 0, memory: 0, cross: 0, other: 0 };

for (const w of workers) {
  if (!fs.existsSync(w.path)) {
    console.log(`${w.name}\tNOT_FOUND`);
    continue;
  }
  const total = totalCommits(w.path);
  const fromHub = grep(w.path, '^from-hub:');
  const wiki = grep(w.path, '^from-hub: wiki/');
  const issue = grep(w.path, '^from-hub: issue');
  const memory = grep(w.path, '^from-hub: memory/');
  const cross = grep(w.path, '^from-hub: cross-update-shadow');
  const other = fromHub - wiki - issue - memory - cross;
  const rate = total > 0 ? ((fromHub / total) * 100).toFixed(1) + '%' : '0%';
  console.log([w.name, total, fromHub, wiki, issue, memory, cross, Math.max(0, other), rate].join('\t'));
  totals.workers += 1;
  totals.total += total;
  totals.fromHub += fromHub;
  totals.wiki += wiki;
  totals.issue += issue;
  totals.memory += memory;
  totals.cross += cross;
  totals.other += Math.max(0, other);
}

console.log(headers.map(() => '---').join('\t'));
const sumRate = totals.total > 0 ? ((totals.fromHub / totals.total) * 100).toFixed(1) + '%' : '0%';
console.log(
  ['SUM', totals.total, totals.fromHub, totals.wiki, totals.issue, totals.memory, totals.cross, totals.other, sumRate].join('\t')
);

console.log(`\n# Notes`);
console.log(`- baseline target: ≥ 30% (cycle 당 0.3+ from-hub)`);
console.log(`- 측정 기간: 직전 ${sinceDays}일 (--sinceDays=N 또는 --since=ISO 로 조정)`);
console.log(`- source 형식: wiki/<slug> | issue #N | memory/<slug> | cross-update-shadow | <SHA>`);
