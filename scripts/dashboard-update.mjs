#!/usr/bin/env node
// closed-loop-health.mdx 자동 갱신 — develop-cycle-hub spec E2 (cycle 39~40)
//
// Source:
//   - ~/.develop-cycle-hub/cycles/*.json (cycle_state)
//   - git log --grep "subtype: <X>" (dispatch counts)
//
// 사용법:
//   node scripts/dashboard-update.mjs --dry-run
//   node scripts/dashboard-update.mjs

import fs from "fs";
import path from "path";
import os from "os";
import { execSync } from "child_process";
import matter from "gray-matter";

const DASHBOARD = path.join(process.cwd(), "content", "reports", "closed-loop-health.mdx");
const CYCLES_DIR = path.join(os.homedir(), ".develop-cycle-hub", "cycles");
const DRY_RUN = process.argv.includes("--dry-run");

function git(cmd) {
  try {
    return execSync(cmd, { encoding: "utf-8" }).trim();
  } catch (err) {
    console.warn(`⚠️ git ${cmd.slice(0, 80)} failed: ${err.message?.slice(0, 200)}`);
    return "";
  }
}

function countDispatch(subtype) {
  const out = git(`git log --all --grep "subtype: ${subtype}" --oneline`);
  return out ? out.split("\n").length : 0;
}

function loadCycles() {
  if (!fs.existsSync(CYCLES_DIR)) return [];
  return fs
    .readdirSync(CYCLES_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      try {
        const data = JSON.parse(fs.readFileSync(path.join(CYCLES_DIR, f), "utf-8"));
        return data;
      } catch (err) {
        console.warn(`⚠️ loadCycles parse failed for ${f}: ${err.message?.slice(0, 200)}`);
        return null;
      }
    })
    .filter((c) => c && typeof c.cycle_n === "number")
    .sort((a, b) => a.cycle_n - b.cycle_n);
}

function chainDistribution(cycles, lastN) {
  const recent = cycles.slice(-lastN);
  const dist = new Map();
  let retroOnly = 0;
  for (const c of recent) {
    const chain = c.chain_selected || "unknown";
    dist.set(chain, (dist.get(chain) || 0) + 1);
    const outcome = c.execution?.outcome || c.outcome || "";
    if (String(outcome).includes("retro-only")) retroOnly += 1;
  }
  return { dist, retroOnly, total: recent.length };
}

function chainsZeroInLastN(cycles, lastN, chainPool) {
  const recent = cycles.slice(-lastN);
  const used = new Set(recent.map((c) => c.chain_selected));
  return chainPool.filter((c) => !used.has(c));
}

function shipCount(cycles, lastN) {
  const recent = cycles.slice(-lastN);
  return recent.filter((c) => c.pr_number).length;
}

function buildMetrics(cycles) {
  const lessonCount = countDispatch("lesson");
  const metaPatternCount = countDispatch("meta-pattern");
  const chainEvolutionCount = countDispatch("chain-evolution");
  const lastN = 20;
  const chainPool = [
    "fix-incident", "explore-idea", "polish-ui", "review-code", "curate",
    "worker-incident-triage", "closed-loop-design", "dimension-cycle",
    "expand-scope", "design-system", "skill-evolution",
  ];
  const { dist, retroOnly, total } = chainDistribution(cycles, lastN);
  const zeroChains = chainsZeroInLastN(cycles, lastN, chainPool);
  const ship = shipCount(cycles, 10);
  const lastCycle = cycles[cycles.length - 1] || { cycle_n: 0 };
  const last5 = cycles.slice(-5).reverse();

  // Trigger 평가
  const triggers = {
    1: { current: chainEvolutionCount, threshold: 5, met: chainEvolutionCount >= 5 },
    2: { current: "N/A", threshold: 5, met: false },
    3: { current: lastCycle.cycle_n, threshold: 50, met: lastCycle.cycle_n % 50 === 0 && lastCycle.cycle_n > 0 },
    4: { current: 0, threshold: 1, met: false }, // body grep needs review
    5: { current: zeroChains.length, threshold: "자율", met: zeroChains.length > 0 && metaPatternCount > 0 },
  };

  return {
    lastCycle: lastCycle.cycle_n,
    dispatch: { lesson: lessonCount, metaPattern: metaPatternCount, chainEvolution: chainEvolutionCount },
    chainDist: Array.from(dist.entries()).sort((a, b) => b[1] - a[1]),
    retroOnly: { count: retroOnly, total, percent: total ? ((retroOnly / total) * 100).toFixed(0) : "0" },
    zeroChains,
    ship10: ship,
    last5,
    triggers,
  };
}

function renderMarkdown(m) {
  const updated = new Date().toISOString();
  const distStr = m.chainDist.map(([c, n]) => `${c}=${n}`).join(" / ");

  const last5Rows = m.last5
    .map((c) => {
      const outcome = c.execution?.outcome || c.outcome || "?";
      const pr = c.pr_number ? `#${c.pr_number}` : "—";
      return `| ${c.cycle_n} | ${c.chain_selected || "?"} | ${outcome} | ${pr} |`;
    })
    .join("\n");

  const trigStr = (n) => {
    const t = m.triggers[n];
    return `| ${n} | ${triggerLabel(n)} | ${t.current} | ${t.threshold} | ${t.met ? "✅" : "❌"} |`;
  };

  return `# Closed-Loop Health Dashboard

> **자동 갱신** — develop-cycle-hub 매 사이클 retro 끝 + cron daily.
> 직전 cycle: **${m.lastCycle}**. 마지막 update: ${updated}.

## 4차원 Metric

| 차원 | Metric | 현재 |
|---|---|---|
| **Input** | dispatch 누적 (lesson / meta-pattern / chain-evolution) | ${m.dispatch.lesson} / ${m.dispatch.metaPattern} / ${m.dispatch.chainEvolution} |
| **Process** | chain pool 분포 (직전 20) | ${distStr} |
| **Process** | retro-only 비율 | ${m.retroOnly.count}/${m.retroOnly.total} (${m.retroOnly.percent}%) |
| **Output** | PR ship (직전 10) | ${m.ship10} |
| **Feedback** | 0회 chain (직전 20) | ${m.zeroChains.join(", ") || "(없음)"} |

## skill-evolution Trigger 평가

| # | 조건 | 현재 | 임계 | 상태 |
|---|---|---|---|---|
${trigStr(1)}
${trigStr(2)}
${trigStr(3)}
${trigStr(4)}
${trigStr(5)}

## 최근 Cycles (직전 5)

| Cycle | Chain | Outcome | PR |
|---|---|---|---|
${last5Rows}

## Methodology

차원 정의:
- **Input**: 외부 (워커 dispatch / 사용자 호출) 가 hub 에 들어오는 신호 양
- **Process**: hub 의 chain pool 사용 패턴
- **Output**: hub 가 외부에 내보내는 가시 산출물
- **Feedback**: hub 가 자기 자신 갱신하는 루프

자동 갱신: \`scripts/dashboard-update.mjs\` (본 스크립트). 매 cycle retro 끝 호출 권장.
Source: \`~/.develop-cycle-hub/cycles/*.json\` + \`git log --grep "subtype: ..."\`.

Reference:
- develop-cycle-hub SKILL spec — chain pool + dispatch 채널
- cycle 35 meta-pattern dispatch — chain pool 분포 26 사이클 누적
- cycle 39~42 expand-scope — 본 dashboard 도입 spec
`;
}

function triggerLabel(n) {
  return [
    "",
    "`chain-evolution` commit 누적",
    "같은 chain 5회 연속 fail",
    "`cycle_n % 50 == 0` (milestone)",
    "`meta-pattern` body \"SKILL 갱신 필요\"",
    "0회 chain × 직전 20 + meta-pattern 1+",
  ][n];
}

function main() {
  const cycles = loadCycles();
  if (cycles.length === 0) {
    console.error("⚠️ cycle_state 없음 — 갱신 skip");
    return;
  }

  const metrics = buildMetrics(cycles);
  const newBody = renderMarkdown(metrics);

  if (!fs.existsSync(DASHBOARD)) {
    console.error(`⚠️ dashboard 없음: ${DASHBOARD}`);
    return;
  }

  const current = fs.readFileSync(DASHBOARD, "utf-8");
  const parsed = matter(current);
  const newFrontmatter = {
    ...parsed.data,
    last_updated: new Date().toISOString(),
    last_cycle: metrics.lastCycle,
    auto_updated: true,
  };
  const next = matter.stringify(newBody, newFrontmatter);

  if (DRY_RUN) {
    console.log("[dry-run] 변경 없음. 갱신 후 metric:");
    console.log(`  cycle: ${metrics.lastCycle}`);
    console.log(`  dispatch: lesson ${metrics.dispatch.lesson} / meta ${metrics.dispatch.metaPattern} / chain-evo ${metrics.dispatch.chainEvolution}`);
    console.log(`  retro-only: ${metrics.retroOnly.percent}%`);
    console.log(`  0회 chains: ${metrics.zeroChains.join(", ") || "(없음)"}`);
    console.log(`  ship 10: ${metrics.ship10}`);
    return;
  }

  fs.writeFileSync(DASHBOARD, next);
  console.log(`✅ dashboard 갱신: ${path.relative(process.cwd(), DASHBOARD)}`);
  console.log(`   cycle ${metrics.lastCycle} / retro-only ${metrics.retroOnly.percent}% / 0회 ${metrics.zeroChains.length}`);
}

main();
