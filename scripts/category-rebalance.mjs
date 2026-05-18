#!/usr/bin/env node
/**
 * Category Rebalance Scanner — self-gating
 *
 * 목적: 카테고리 분포 쏠림 / coherence / outlier / 선언-현실 드리프트를 탐지.
 * 실행 시점 N 에 따라 silent-skip. 오늘 N=17 이면 조용히 종료, 3개월 뒤 N=80 이면 활성화.
 *
 * 사용:
 *   node scripts/category-rebalance.mjs              — markdown 리포트
 *   node scripts/category-rebalance.mjs --json       — JSON (CI 연동)
 *   node scripts/category-rebalance.mjs --verbose    — skip 이유까지 출력
 *
 * Gate:
 *   N_total < GATE_TOTAL (30)  → silent exit, JSON { skip: true }
 *   N_cluster < GATE_CLUSTER (10) → 그 카테고리 coherence/outlier 분석만 skip (count 는 항상 보고)
 *
 * 입력: public/embeddings.json (source_type: 'entry' 만 사용)
 * 참조: memory/feedback_snapshot_as_constraint_fallacy.md
 */

import fs from "fs";
import path from "path";
import { CATEGORIES } from "./lib/categories.mjs";

const ROOT = process.cwd();
const EMBEDDINGS_PATH = path.join(ROOT, "public", "embeddings.json");
const CONTENT_DIR = path.join(ROOT, "content");

const args = process.argv.slice(2);
const jsonMode = args.includes("--json");
const verbose = args.includes("--verbose");

function argVal(name, fallback) {
  const i = args.indexOf(name);
  if (i === -1) return fallback;
  const v = parseFloat(args[i + 1]);
  return Number.isFinite(v) ? v : fallback;
}

const GATE_TOTAL = argVal("--gate-total", 30);
const GATE_CLUSTER = argVal("--gate-cluster", 10);
const OUTLIER_MARGIN = argVal("--outlier-margin", 0.03);
const IMBALANCE_RATIO = argVal("--imbalance-ratio", 3.0);

function cosine(a, b) {
  let dot = 0;
  for (let i = 0; i < a.length; i++) dot += a[i] * b[i];
  return dot;
}

function meanVector(vectors) {
  const dim = vectors[0].length;
  const out = new Float32Array(dim);
  for (const v of vectors) for (let i = 0; i < dim; i++) out[i] += v[i];
  for (let i = 0; i < dim; i++) out[i] /= vectors.length;
  let norm = 0;
  for (let i = 0; i < dim; i++) norm += out[i] * out[i];
  norm = Math.sqrt(norm) || 1;
  for (let i = 0; i < dim; i++) out[i] /= norm;
  return Array.from(out);
}

function loadEntryVectors() {
  if (!fs.existsSync(EMBEDDINGS_PATH)) {
    throw new Error(`embeddings.json 없음 — pnpm embed-content 먼저 실행 (${EMBEDDINGS_PATH})`);
  }
  const data = JSON.parse(fs.readFileSync(EMBEDDINGS_PATH, "utf8"));
  const entries = new Map();
  for (const ch of data.chunks) {
    if (ch.source !== "entry") continue;
    if (ch.category === "journal") continue;
    if (!entries.has(ch.slug)) {
      entries.set(ch.slug, { slug: ch.slug, category: ch.category, title: ch.title, vectors: [] });
    }
    entries.get(ch.slug).vectors.push(ch.vector);
  }
  for (const e of entries.values()) {
    e.vector = meanVector(e.vectors);
    delete e.vectors;
  }
  return Array.from(entries.values());
}

function detectSchemaDrift() {
  const declared = new Set(CATEGORIES);
  const onDisk = new Set();
  if (fs.existsSync(CONTENT_DIR)) {
    for (const d of fs.readdirSync(CONTENT_DIR, { withFileTypes: true })) {
      if (d.isDirectory()) onDisk.add(d.name);
    }
  }
  const declaredButMissing = [...declared].filter((c) => !onDisk.has(c));
  const presentButUndeclared = [...onDisk].filter((c) => !declared.has(c) && c !== "journal");
  return { declaredButMissing, presentButUndeclared, journalSeparate: onDisk.has("journal") };
}

function analyze() {
  const entries = loadEntryVectors();
  const drift = detectSchemaDrift();

  const byCategory = new Map();
  for (const e of entries) {
    if (!byCategory.has(e.category)) byCategory.set(e.category, []);
    byCategory.get(e.category).push(e);
  }

  const N_total = entries.length;

  const categoryReports = [];
  for (const cat of CATEGORIES) {
    const members = byCategory.get(cat) ?? [];
    categoryReports.push({
      category: cat,
      count: members.length,
      analyzed: false,
      coherence: null,
      nearestOther: null,
      nearestOtherSim: null,
    });
  }

  if (N_total < GATE_TOTAL) {
    return {
      skipped: true,
      reason: `N_total=${N_total} < GATE_TOTAL=${GATE_TOTAL}`,
      n_total: N_total,
      n_by_category: Object.fromEntries(categoryReports.map((r) => [r.category, r.count])),
      drift,
    };
  }

  const catMeanVec = new Map();
  for (const [cat, members] of byCategory) {
    if (members.length === 0) continue;
    catMeanVec.set(cat, meanVector(members.map((m) => m.vector)));
  }

  for (const report of categoryReports) {
    const members = byCategory.get(report.category) ?? [];
    if (members.length < GATE_CLUSTER) continue;

    let coh = 0;
    let pairs = 0;
    for (let i = 0; i < members.length; i++) {
      for (let j = i + 1; j < members.length; j++) {
        coh += cosine(members[i].vector, members[j].vector);
        pairs++;
      }
    }
    report.coherence = pairs > 0 ? coh / pairs : null;

    let bestOther = null;
    let bestSim = -1;
    const ownMean = catMeanVec.get(report.category);
    for (const [other, otherMean] of catMeanVec) {
      if (other === report.category) continue;
      const sim = cosine(ownMean, otherMean);
      if (sim > bestSim) {
        bestSim = sim;
        bestOther = other;
      }
    }
    report.nearestOther = bestOther;
    report.nearestOtherSim = bestSim;
    report.analyzed = true;
  }

  const outliers = [];
  for (const e of entries) {
    const ownMembers = byCategory.get(e.category) ?? [];
    if (ownMembers.length < GATE_CLUSTER) continue;

    let ownSim = 0;
    let n = 0;
    for (const m of ownMembers) {
      if (m.slug === e.slug) continue;
      ownSim += cosine(e.vector, m.vector);
      n++;
    }
    ownSim = n > 0 ? ownSim / n : 0;

    let bestOther = null;
    let bestOtherSim = -1;
    for (const [cat, catMean] of catMeanVec) {
      if (cat === e.category) continue;
      const catMembers = byCategory.get(cat) ?? [];
      if (catMembers.length < GATE_CLUSTER) continue;
      const s = cosine(e.vector, catMean);
      if (s > bestOtherSim) {
        bestOtherSim = s;
        bestOther = cat;
      }
    }

    if (bestOther && bestOtherSim > ownSim + OUTLIER_MARGIN) {
      outliers.push({
        slug: e.slug,
        title: e.title,
        current: e.category,
        suggested: bestOther,
        ownSim: +ownSim.toFixed(4),
        suggestedSim: +bestOtherSim.toFixed(4),
        delta: +(bestOtherSim - ownSim).toFixed(4),
      });
    }
  }
  outliers.sort((a, b) => b.delta - a.delta);

  const counts = categoryReports.map((r) => r.count).filter((c) => c > 0);
  const maxCount = Math.max(...counts, 0);
  const minCount = Math.min(...counts, 0);
  const imbalance = minCount > 0 ? maxCount / minCount : null;
  const imbalanceFlag = imbalance !== null && imbalance >= IMBALANCE_RATIO;

  return {
    skipped: false,
    n_total: N_total,
    categories: categoryReports,
    outliers,
    imbalance: { ratio: imbalance, flagged: imbalanceFlag, max: maxCount, min: minCount },
    drift,
  };
}

function toMarkdown(r) {
  if (r.skipped) {
    return `## 🗂️ Category Rebalance — SKIP\n\n${r.reason}\n\nN_total=${r.n_total}. 카테고리별: ${Object.entries(
      r.n_by_category,
    )
      .map(([k, v]) => `${k}:${v}`)
      .join(", ")}`;
  }

  const out = [];
  out.push("## 🗂️ Category Rebalance Report");
  out.push("");
  out.push(`**N_total** = ${r.n_total} entries`);
  if (r.imbalance.ratio !== null) {
    out.push(`**Imbalance ratio** = ${r.imbalance.ratio.toFixed(2)} (max=${r.imbalance.max}, min=${r.imbalance.min})${r.imbalance.flagged ? " ⚠️" : ""}`);
  }
  out.push("");
  out.push("### 카테고리별 지표");
  out.push("");
  out.push("| 카테고리 | count | coherence | nearest-other | sim |");
  out.push("|---|---|---|---|---|");
  for (const c of r.categories) {
    const coh = c.coherence !== null ? c.coherence.toFixed(3) : "—";
    const near = c.nearestOther ?? "—";
    const sim = c.nearestOtherSim !== null ? c.nearestOtherSim.toFixed(3) : "—";
    const gated = !c.analyzed && c.count > 0 ? ` (< GATE_CLUSTER=${GATE_CLUSTER})` : "";
    out.push(`| ${c.category} | ${c.count}${gated} | ${coh} | ${near} | ${sim} |`);
  }
  out.push("");

  if (r.outliers.length > 0) {
    out.push(`### Outlier entries (${r.outliers.length})`);
    out.push("");
    out.push("| entry | 현재 | 제안 | ownSim | suggestedSim | Δ |");
    out.push("|---|---|---|---|---|---|");
    for (const o of r.outliers) {
      out.push(`| \`${o.slug}\` | ${o.current} | **${o.suggested}** | ${o.ownSim} | ${o.suggestedSim} | +${o.delta} |`);
    }
    out.push("");
  }

  const drift = r.drift;
  const driftLines = [];
  if (drift.declaredButMissing.length > 0) {
    driftLines.push(`- **선언됐지만 디렉터리 없음**: ${drift.declaredButMissing.join(", ")}`);
  }
  if (drift.presentButUndeclared.length > 0) {
    driftLines.push(`- **디렉터리 있지만 선언 안 됨**: ${drift.presentButUndeclared.join(", ")}`);
  }
  if (driftLines.length > 0) {
    out.push("### 선언-현실 드리프트");
    out.push("");
    out.push(...driftLines);
    out.push("");
  }

  return out.join("\n");
}

function main() {
  const r = analyze();
  if (jsonMode) {
    console.log(JSON.stringify(r, null, 2));
    return;
  }
  if (r.skipped && !verbose) {
    console.log(`SKIP: ${r.reason}`);
    return;
  }
  console.log(toMarkdown(r));
}

main();
