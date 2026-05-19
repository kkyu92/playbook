/**
 * Category 단일 원천 — scripts/ 쪽.
 *
 * ⚠️ SYNC WITH `src/lib/schema.ts` CATEGORIES.
 * TS type narrowing 보존을 위해 양쪽에 유지. vitest 가 배열 동일 검증.
 *
 * 왜 여기: scripts/coverage-analyzer, scout, generate-lesson 등 JS ESM 코드가
 * TS import 를 피하고 단일 원천 보장하기 위함.
 */

export const CATEGORIES = [
  "prompt-engineering",
  "context-engineering",
  "harness-engineering",
  "agents",
  "evaluation",
  "infrastructure",
  "frontend-ai",
  "project-ops",
  "data-engineering",
  "android-ai",
  "reports",
];

export const CATEGORY_LABELS = {
  "prompt-engineering": "Prompt Engineering",
  "context-engineering": "Context Engineering",
  "harness-engineering": "Harness Engineering",
  agents: "Agents",
  evaluation: "Evaluation",
  infrastructure: "Infrastructure",
  "frontend-ai": "Frontend + AI",
  "project-ops": "Project Ops",
  "data-engineering": "Data Engineering",
  "android-ai": "Android AI",
  reports: "Reports",
};
