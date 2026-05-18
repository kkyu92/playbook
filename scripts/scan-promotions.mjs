#!/usr/bin/env node
/**
 * Solution Promotion Scanner
 *
 * docs/solutions/ 카테고리별 솔루션 수를 스캔 → N≥3 카테고리 대상으로
 * 공통 패턴 분석 + 승격 제안 출력.
 *
 * 사용법:
 *   node scripts/scan-promotions.mjs                  — 전체 스캔 + 제안
 *   node scripts/scan-promotions.mjs --json           — JSON 출력 (CI 연동)
 *   node scripts/scan-promotions.mjs --threshold 5    — 승격 기준 변경 (기본 3)
 *
 * 기록:
 * - 원본: Mino777/ai-study 의 scripts/scan-promotions.mjs (2026-04-20 이식)
 * - 차이: _compiled-truth.md / README.md 제외 카운트, llm-generation 카테고리 휴리스틱 추가
 */

import fs from "fs";
import path from "path";

const SOLUTIONS_DIR = path.join(process.cwd(), "docs", "solutions");
const HOOKS_DIR = path.join(process.cwd(), ".claude", "hooks");
const COMMANDS_DIR = path.join(process.cwd(), ".claude", "commands");
const SCRIPTS_LIB_DIR = path.join(process.cwd(), "scripts", "lib");

const args = process.argv.slice(2);
const jsonMode = args.includes("--json");
const thresholdIdx = args.indexOf("--threshold");
const THRESHOLD = thresholdIdx !== -1 ? parseInt(args[thresholdIdx + 1]) || 3 : 3;

const EXCLUDED_FILES = new Set(["_compiled-truth.md", "README.md"]);

function scanCategories() {
  if (!fs.existsSync(SOLUTIONS_DIR)) {
    console.error("❌ docs/solutions/ not found");
    process.exit(1);
  }

  const categories = fs.readdirSync(SOLUTIONS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => {
      const dirPath = path.join(SOLUTIONS_DIR, d.name);
      // 실제 solution 만 카운트 — _compiled-truth / README 제외
      const files = fs.readdirSync(dirPath)
        .filter((f) => f.endsWith(".md") && !EXCLUDED_FILES.has(f));
      return {
        name: d.name,
        count: files.length,
        files: files.map((f) => ({
          name: f,
          path: path.join(dirPath, f),
          date: f.match(/^(\d{4}-\d{2}-\d{2})/)?.[1] || "unknown",
        })),
      };
    })
    .sort((a, b) => b.count - a.count);

  return categories;
}

function isAlreadyPromoted(category) {
  // _compiled-truth.md 안 "**코드 게이트 승격**: ✅" 패턴 매치 시 이미 승격 완료로 판정.
  // gap: gates 디렉토리 매칭 (llm-gen-validate.mjs vs llm-generation) 은 fuzzy 라 unreliable.
  // _compiled-truth.md 의 명시 marker 가 source of truth.
  const compiledTruthPath = path.join(SOLUTIONS_DIR, category.name, "_compiled-truth.md");
  try {
    const content = fs.readFileSync(compiledTruthPath, "utf-8");
    return /\*\*코드 게이트 승격\*\*:\s*✅/.test(content);
  } catch {
    return false;
  }
}

function checkExistingGates() {
  const gates = { hooks: [], commands: [], validators: [] };

  if (fs.existsSync(HOOKS_DIR)) {
    gates.hooks = fs.readdirSync(HOOKS_DIR).filter((f) => f.endsWith(".sh"));
  }
  if (fs.existsSync(COMMANDS_DIR)) {
    gates.commands = fs.readdirSync(COMMANDS_DIR).filter((f) => f.endsWith(".md"));
  }
  if (fs.existsSync(SCRIPTS_LIB_DIR)) {
    gates.validators = fs.readdirSync(SCRIPTS_LIB_DIR).filter((f) => f.endsWith(".mjs") || f.endsWith(".js"));
  }

  return gates;
}

function extractPatterns(category) {
  const patterns = {
    keywords: new Map(),
    fileRefs: new Map(),
    errorPatterns: [],
  };

  for (const file of category.files) {
    let content;
    try {
      content = fs.readFileSync(file.path, "utf-8");
    } catch {
      console.warn(`⚠️ 읽기 실패: ${file.path}`);
      continue;
    }

    const words = content.match(/`[^`]+`/g) || [];
    for (const word of words) {
      const clean = word.replace(/`/g, "").toLowerCase();
      if (clean.length > 2 && clean.length < 60) {
        patterns.keywords.set(clean, (patterns.keywords.get(clean) || 0) + 1);
      }
    }

    const paths = content.match(/(?:src|scripts|content|\.claude|docs)\/[\w./-]+/g) || [];
    for (const p of paths) {
      patterns.fileRefs.set(p, (patterns.fileRefs.get(p) || 0) + 1);
    }

    const errors = content.match(/(?:error|Error|❌|실패|에러|버그).*$/gm) || [];
    patterns.errorPatterns.push(...errors.slice(0, 3));
  }

  const topKeywords = [...patterns.keywords.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([k, v]) => ({ keyword: k, count: v }));

  const topFiles = [...patterns.fileRefs.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([f, v]) => ({ file: f, count: v }));

  return { topKeywords, topFiles, errorSample: patterns.errorPatterns.slice(0, 5) };
}

const PROMOTION_MAP = {
  "mdx":                { type: "auto-fix validator",  location: "scripts/lib/mdx-fix.mjs",                                    reason: "문법/빌드 에러는 자동 수정 가능 + idempotent 보장 용이" },
  "build-errors":       { type: "auto-fix validator",  location: "scripts/lib/build-errors-fix.mjs",                           reason: "문법/빌드 에러는 자동 수정 가능 + idempotent 보장 용이" },
  "llm-generation":     { type: "slash command + lib", location: ".claude/commands/validate-ai-output.md + scripts/lib/llm-validate.mjs", reason: "LLM 출력 검증은 multi-step (schema + compile + retry) — 커맨드 형태 + 공용 lib" },
  "ai-pipeline":        { type: "slash command + lib", location: ".claude/commands/validate-ai-output.md + scripts/lib/llm-validate.mjs", reason: "LLM 출력 검증은 multi-step (schema + compile + retry) — 커맨드 형태 + 공용 lib" },
  "ci-github-actions":  { type: "slash command",       location: ".claude/commands/ci-github-actions-guard.md",                reason: "워크플로우 패턴은 multi-step 검증 + 맥락 판단 필요 — 커맨드가 적합" },
  "workflow":           { type: "slash command",       location: ".claude/commands/workflow-guard.md",                         reason: "워크플로우 패턴은 multi-step 검증 + 맥락 판단 필요 — 커맨드가 적합" },
  "next-patterns":      { type: "warning-only detector", location: "scripts/lib/next-patterns-check.mjs",                     reason: "프레임워크 패턴은 false positive 위험 — warning-only로 시작" },
  "framework":          { type: "warning-only detector", location: "scripts/lib/framework-check.mjs",                         reason: "프레임워크 패턴은 false positive 위험 — warning-only로 시작" },
};

function suggestPromotionType(category) {
  const name = category.name;
  return PROMOTION_MAP[name] ?? {
    type: "warning-only detector",
    location: `scripts/lib/${name}-check.mjs`,
    reason: "기본: warning-only 시작, 충분한 데이터 축적 후 auto-fix 전환 검토",
  };
}

function main() {
  const categories = scanCategories();
  const gates = checkExistingGates();
  const overThreshold = categories.filter((c) => c.count >= THRESHOLD);
  const promotedCache = new Map(overThreshold.map((c) => [c.name, isAlreadyPromoted(c)]));
  const promoted = (c) => promotedCache.get(c.name) ?? false;
  const alreadyPromoted = overThreshold.filter(promoted);
  const promotable = overThreshold.filter((c) => !promoted(c));
  const below = categories.filter((c) => c.count < THRESHOLD && c.count > 0);

  if (jsonMode) {
    const result = {
      scannedAt: new Date().toISOString(),
      threshold: THRESHOLD,
      categories: categories.map((c) => ({
        name: c.name,
        count: c.count,
        promotable: c.count >= THRESHOLD && !promoted(c),
        alreadyPromoted: promoted(c),
      })),
      promotable: promotable.map((c) => ({
        ...suggestPromotionType(c),
        category: c.name,
        count: c.count,
      })),
      alreadyPromoted: alreadyPromoted.map((c) => ({
        category: c.name,
        count: c.count,
      })),
      existingGates: gates,
    };
    console.log(JSON.stringify(result, null, 2));
    return;
  }

  console.log("\n📊 솔루션 승격 스캔 보고\n");
  console.log(`기준: N ≥ ${THRESHOLD}\n`);

  console.log("  카테고리              | 솔루션 수 | 승격 대상");
  console.log("  ----------------------|-----------|----------");
  for (const cat of categories) {
    let status;
    if (cat.count === 0) status = "⬜ 없음";
    else if (cat.count < THRESHOLD) status = "⏳ 관찰 중";
    else if (promoted(cat)) status = "✅ 승격 완료";
    else status = "🚀 승격 후보";
    console.log(`  ${cat.name.padEnd(22)} | ${String(cat.count).padStart(9)} | ${status}`);
  }

  console.log(`\n  합계: ${categories.reduce((s, c) => s + c.count, 0)}건 (${categories.length} 카테고리)\n`);

  console.log("🔒 기존 코드 게이트:");
  console.log(`  hooks: ${gates.hooks.join(", ") || "(없음)"}`);
  console.log(`  commands: ${gates.commands.length}개`);
  console.log(`  validators: ${gates.validators.join(", ") || "(없음)"}`);
  console.log();

  if (alreadyPromoted.length > 0) {
    console.log(`✅ 이미 승격 완료 (${alreadyPromoted.length} 카테고리, _compiled-truth.md "코드 게이트 승격: ✅" marker 검출):`);
    for (const cat of alreadyPromoted) {
      console.log(`  ${cat.name}: ${cat.count}건`);
    }
    console.log();
  }

  if (promotable.length === 0) {
    console.log(`✅ 현재 승격 대상 없음 (모든 카테고리 N < ${THRESHOLD} 또는 이미 승격 완료)`);

    if (below.length > 0) {
      console.log(`\n⏳ 관찰 중 (N < ${THRESHOLD}):`);
      for (const cat of below) {
        console.log(`  ${cat.name}: ${cat.count}건 (${THRESHOLD - cat.count}건 더 필요)`);
      }
    }
    return;
  }

  console.log(`🚀 승격 제안 (${promotable.length} 카테고리):\n`);

  for (const cat of promotable) {
    const patterns = extractPatterns(cat);
    const suggestion = suggestPromotionType(cat);

    console.log(`  📂 ${cat.name} (${cat.count}건)`);
    console.log(`     승격 형태: ${suggestion.type}`);
    console.log(`     위치: ${suggestion.location}`);
    console.log(`     이유: ${suggestion.reason}`);

    if (patterns.topKeywords.length > 0) {
      console.log(`     주요 키워드: ${patterns.topKeywords.slice(0, 5).map((k) => `${k.keyword}(${k.count})`).join(", ")}`);
    }

    if (patterns.topFiles.length > 0) {
      console.log(`     관련 파일: ${patterns.topFiles.slice(0, 3).map((f) => f.file).join(", ")}`);
    }

    const existingHook = gates.hooks.find((h) => h.includes(cat.name));
    const existingValidator = gates.validators.find((v) => v.includes(cat.name));
    if (existingHook || existingValidator) {
      console.log(`     ⚡ 기존 게이트: ${existingHook || existingValidator} (보강 검토)`);
    } else {
      console.log(`     ⚠️ 게이트 없음 — 신규 생성 필요`);
    }
    console.log();
  }

  if (below.length > 0) {
    console.log(`⏳ 관찰 중 (N < ${THRESHOLD}):`);
    for (const cat of below) {
      console.log(`  ${cat.name}: ${cat.count}건 (${THRESHOLD - cat.count}건 더 필요)`);
    }
    console.log();
  }

  console.log("💡 다음 액션: 위 제안 검토 후 hook/command/lib 승격 작업 시작");
}

main();
