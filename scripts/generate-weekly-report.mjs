import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const MANIFEST_PATH = path.join(process.cwd(), "src", "generated", "content-manifest.json");
const CONTENT_DIR = path.join(process.cwd(), "content");

function main() {
  // Regenerate manifest first
  try {
    execSync("node scripts/generate-content-manifest.mjs", { stdio: "inherit" });
  } catch (err) {
    console.warn(`⚠️ manifest 재생성 실패 — stale manifest 사용: ${err.message}`);
  }

  const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf-8"));
  const now = new Date();
  const weekStart = new Date(now);
  weekStart.setDate(weekStart.getDate() - 7);
  const startStr = weekStart.toISOString().split("T")[0];
  const endStr = now.toISOString().split("T")[0];

  // This week's entries
  const weekEntries = manifest.entries.filter(
    (e) => e.frontmatter.date >= startStr && e.frontmatter.date <= endStr
  );

  const year = now.getFullYear();
  const weekNum = Math.ceil(
    ((now - new Date(year, 0, 1)) / 86400000 + new Date(year, 0, 1).getDay() + 1) / 7
  );

  // Category breakdown
  const catCounts = {};
  for (const e of weekEntries) {
    catCounts[e.frontmatter.category] = (catCounts[e.frontmatter.category] || 0) + 1;
  }

  // Avg confidence
  const avgConf = weekEntries.length > 0
    ? (weekEntries.reduce((s, e) => s + e.frontmatter.confidence, 0) / weekEntries.length).toFixed(1)
    : "0";

  // Recommendations: categories with 0 entries this week
  const allCats = [...new Set(manifest.entries.map((e) => e.frontmatter.category))];
  const weakCats = allCats.filter((c) => !catCounts[c]);

  // Source mix (이번 주) — pipeline 건강도 지표. scout/gap-pull/manual 분포.
  const sourceCounts = { scout: 0, "gap-pull": 0, manual: 0 };
  for (const e of weekEntries) {
    const src = e.frontmatter.source || "manual";
    if (src in sourceCounts) sourceCounts[src]++;
  }
  const sourceTotal = weekEntries.length;
  const pct = (n) => (sourceTotal === 0 ? 0 : Math.round((n / sourceTotal) * 100));

  const _slug = `reports/week-${year}-${String(weekNum).padStart(2, "0")}`;
  const title = `${year}년 ${weekNum}주차 학습 리포트`;

  const content = `---
title: "${title}"
category: harness-engineering
date: "${endStr}"
tags: [weekly-report, 학습리포트]
confidence: 5
connections: []
status: complete
description: "${startStr} ~ ${endStr} 주간 학습 요약"
type: entry
---

## 이번 주 학습 요약

**기간:** ${startStr} ~ ${endStr}
**학습한 엔트리:** ${weekEntries.length}개
**평균 Confidence:** ${avgConf}/5
**연속 학습:** ${manifest.streak.current}일째

## 카테고리별 학습

${Object.entries(catCounts).length > 0
  ? Object.entries(catCounts).map(([cat, count]) => `- **${cat}**: ${count}개`).join("\n")
  : "- (이번 주 학습 없음)"}

## Source Mix (파이프라인 건강도)

${sourceTotal > 0
  ? `- **scout** (긱뉴스 외부): ${sourceCounts.scout}개 (${pct(sourceCounts.scout)}%)
- **gap-pull** (커버리지 갭 자동): ${sourceCounts["gap-pull"]}개 (${pct(sourceCounts["gap-pull"])}%)
- **manual** (수동): ${sourceCounts.manual}개 (${pct(sourceCounts.manual)}%)`
  : "- (이번 주 엔트리 없음 — 파이프라인 점검 필요)"}

## 이번 주 학습한 엔트리

${weekEntries.length > 0
  ? weekEntries.map((e) => `- [${e.frontmatter.title}](/wiki/${e.slug}) (${e.frontmatter.category}, confidence ${e.frontmatter.confidence})`).join("\n")
  : "- (없음)"}

## 다음 주 추천

${weakCats.length > 0
  ? weakCats.slice(0, 3).map((c) => `- **${c}** 카테고리에 아직 이번 주 학습이 없습니다`).join("\n")
  : "- 모든 카테고리에 골고루 학습했습니다!"}
`;

  const dir = path.join(CONTENT_DIR, "reports");
  fs.mkdirSync(dir, { recursive: true });

  const filePath = path.join(dir, `week-${year}-${String(weekNum).padStart(2, "0")}.mdx`);
  if (fs.existsSync(filePath)) {
    console.log(`⚠️  이미 존재: ${filePath}`);
    process.exit(0);
  }

  fs.writeFileSync(filePath, content);
  console.log(`✅ 주간 리포트 생성: ${path.relative(process.cwd(), filePath)}`);

  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `file_path=${path.relative(process.cwd(), filePath)}\n`);
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `title=${title}\n`);
  }
}

main();
