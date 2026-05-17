#!/usr/bin/env node
// A2 Shadow Mode — Gemini Cross-Update Agent (observe-only)
//
// PR merged 시 호출. 머지된 Journal entry 기반으로 LLM 가 cross-update 제안.
// JSON output → PR comment (commit/push X — Phase 0).
//
// 2주 observe-only 후 Phase 1 (critical/high fix) → Phase 2 (auto-merge 활성).
// 위험 0 — 적용 안 함, 데이터 누적만.
//
// Gemini 사용 이유:
// - 이미 GEMINI_API_KEY 등록됨 (daily-lesson, ai-review 와 stack 통일)
// - 추가 비용 거의 0 (Gemini 무료 한도 일별 ~1500 calls)
// - structured output (responseMimeType=application/json) → subagent finding #4
//   "JSON schema strict" 자연 해소
// - subagent finding #9 (ai-review.yml overlap) 같은 stack 으로 통합 검토 가능

import { GoogleGenerativeAI } from "@google/generative-ai";
import { readFileSync, writeFileSync } from "fs";
import { execSync } from "child_process";
import matter from "gray-matter";
import { loadMdxEntries } from "./lib/fs-helpers.mjs";

const MERGED_FILE = process.env.MERGED_FILE;
const PR_NUMBER = process.env.PR_NUMBER;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!MERGED_FILE || !PR_NUMBER) {
  console.error("MERGED_FILE / PR_NUMBER env required");
  process.exit(1);
}
if (!GEMINI_API_KEY) {
  console.error("GEMINI_API_KEY env required");
  process.exit(1);
}

const SYSTEM_PROMPT = readFileSync("prompts/cross-update.md", "utf-8");

const mergedRaw = readFileSync(MERGED_FILE, "utf-8");
const merged = matter(mergedRaw);
console.log(`Merged entry: ${MERGED_FILE}`);
console.log(`  title: ${merged.data.title}`);
console.log(`  category: ${merged.data.category}`);
console.log(`  tags: ${(merged.data.tags || []).join(", ")}`);

const index = readFileSync("INDEX.md", "utf-8");

const allEntries = loadMdxEntries("content")
  .filter(({ slug }) => `content/${slug}.mdx` !== MERGED_FILE)
  .map(({ slug, frontmatter: fm }) => ({
    slug,
    title: fm.title,
    category: fm.category,
    description: fm.description,
    tags: fm.tags || [],
    confidence: fm.confidence || 1,
    status: fm.status || "draft",
    connections: fm.connections || [],
  }));

console.log(`All entries (excluding merged): ${allEntries.length}`);

// Gemini SDK 호출 — Pro 우선, 503 시 Flash 폴백 (daily-lesson 패턴 동일)
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Cross-update JSON schema (structured output 강제 — subagent #4 자연 해소)
const responseSchema = {
  type: "object",
  properties: {
    promote: { type: "boolean" },
    promotion_reasoning: { type: "string" },
    score: {
      type: "object",
      properties: {
        generalization: { type: "number" },
        actionability: { type: "number" },
      },
      required: ["generalization", "actionability"],
    },
    connections: { type: "array", items: { type: "string" } },
    cross_updates: {
      type: "array",
      items: {
        type: "object",
        properties: {
          slug: { type: "string" },
          add_connections: { type: "array", items: { type: "string" } },
          related_link: { type: "string" },
        },
        required: ["slug", "add_connections"],
      },
    },
  },
  required: ["promote", "score", "connections", "cross_updates"],
};

const userMessage = `MERGED ENTRY (frontmatter + body):

\`\`\`mdx
${mergedRaw}
\`\`\`

INDEX (current wiki structure):

${index}

ALL EXISTING ENTRIES (excluding merged):

${JSON.stringify(allEntries, null, 2)}

Output strict JSON per the response schema. Use exact slugs from ALL EXISTING ENTRIES (do not invent).`;

const MODELS = ["gemini-2.5-pro", "gemini-2.5-flash"];
let modelName;
let response;
let elapsed;
let lastError;

for (const m of MODELS) {
  try {
    const model = genAI.getGenerativeModel({
      model: m,
      systemInstruction: SYSTEM_PROMPT,
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema,
        maxOutputTokens: 4096,
        temperature: 0.3,
      },
    });
    console.log(`Calling Gemini ${m}...`);
    const start = Date.now();
    response = await model.generateContent(userMessage);
    elapsed = Date.now() - start;
    modelName = m;
    console.log(`API response: ${elapsed}ms`);
    break;
  } catch (e) {
    lastError = e;
    console.warn(`${m} failed: ${e.message}, trying next...`);
  }
}

if (!response) {
  console.error(`All Gemini models failed: ${lastError?.message}`);
  process.exit(1);
}

const responseText = response.response.text();
const usage = response.response.usageMetadata || {};

let parsed = null;
let parseError = null;
try {
  parsed = JSON.parse(responseText);
} catch (e) {
  parseError = e.message;
}

const commentBody = `## 🔬 A2 Shadow — LLM Cross-Update 제안 (observe-only)

> 이 comment 는 **Phase 0 Shadow mode** 결과입니다. 자동 적용 X — 사람이 검토 후 수동 적용 또는 무시.
> 2주 observe-only 후 critical/high finding fix → Phase 1 → Phase 2 auto-merge.

**Merged entry**: \`${MERGED_FILE}\`
**Model**: \`${modelName}\`
**API call**: ${elapsed}ms, ${usage.promptTokenCount || "?"} prompt / ${usage.candidatesTokenCount || "?"} output tokens
**Total tokens**: ${usage.totalTokenCount || "?"}

${
  parseError
    ? `### ⚠️ JSON parse 실패\n\n**Error**: \`${parseError}\`\n\n**Raw output**:\n\n\`\`\`\n${responseText.slice(0, 2000)}\n\`\`\``
    : `### ✅ JSON parse OK (Gemini structured output 강제)\n\n**Promote**: \`${parsed.promote}\` ${parsed.promotion_reasoning ? `\n**Reasoning**: ${parsed.promotion_reasoning}` : ""}\n**Score**: generalization=${parsed.score?.generalization}/10, actionability=${parsed.score?.actionability}/10\n\n**Connections to add to merged entry** (${parsed.connections?.length || 0}):\n\`\`\`\n${(parsed.connections || []).map((s) => `- ${s}`).join("\n") || "(none)"}\n\`\`\`\n\n**Cross-updates** (${parsed.cross_updates?.length || 0} entries):\n${(parsed.cross_updates || []).map((cu) => `- \`${cu.slug}\`\n  - Add connections: ${(cu.add_connections || []).join(", ")}\n  - Related link: ${cu.related_link || "(none)"}`).join("\n") || "(none)"}`
}

---

<details>
<summary>Phase 0 평가 (사용자가 채워주세요 — eval set 데이터)</summary>

- [ ] LLM 제안이 적절한가? (Y/N + 이유)
- [ ] 잘못된 connection 있나? (slug 매칭, 의미 매칭)
- [ ] 누락된 명백한 connection 있나?
- [ ] promote 결정이 맞나? (incident 인 경우)
- [ ] 수동 적용 여부 (Y/N)

이 데이터 5건+ 누적 → Phase 1 진입 전 LLM eval set 빌드.

</details>`;

console.log(`Posting PR comment...`);
const tmpFile = `/tmp/a2-shadow-comment-${Date.now()}.md`;
writeFileSync(tmpFile, commentBody);
execSync(`gh pr comment ${PR_NUMBER} --body-file "${tmpFile}"`, { stdio: "inherit" });
console.log(`✅ PR #${PR_NUMBER} comment posted`);
