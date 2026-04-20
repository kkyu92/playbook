#!/usr/bin/env node
// A2 Shadow Mode — LLM Cross-Update Agent (observe-only)
//
// PR merged 시 호출. 머지된 Journal entry 기반으로 LLM 가 cross-update 제안.
// JSON output → PR comment (commit/push X — Phase 0).
//
// 2주 observe-only 후 Phase 1 (critical/high fix) → Phase 2 (auto-merge 활성).
// 위험 0 — 적용 안 함, 데이터 누적만.

import Anthropic from "@anthropic-ai/sdk";
import { readFileSync, readdirSync, writeFileSync } from "fs";
import { join } from "path";
import { execSync } from "child_process";
import matter from "gray-matter";

const MERGED_FILE = process.env.MERGED_FILE;
const PR_NUMBER = process.env.PR_NUMBER;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

if (!MERGED_FILE || !PR_NUMBER) {
  console.error("MERGED_FILE / PR_NUMBER env required");
  process.exit(1);
}
if (!ANTHROPIC_API_KEY) {
  console.error("ANTHROPIC_API_KEY env required");
  process.exit(1);
}

const SYSTEM_PROMPT = readFileSync("prompts/cross-update.md", "utf-8");

// 머지된 entry 읽기
const mergedRaw = readFileSync(MERGED_FILE, "utf-8");
const merged = matter(mergedRaw);
console.log(`Merged entry: ${MERGED_FILE}`);
console.log(`  title: ${merged.data.title}`);
console.log(`  category: ${merged.data.category}`);
console.log(`  tags: ${(merged.data.tags || []).join(", ")}`);

// INDEX.md
const index = readFileSync("INDEX.md", "utf-8");

// 모든 entries metadata (frontmatter only)
function findMdx(dir) {
  const out = [];
  for (const item of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, item.name);
    if (item.isDirectory()) out.push(...findMdx(full));
    else if (item.name.endsWith(".mdx")) out.push(full);
  }
  return out;
}

const allEntries = findMdx("content")
  .map((path) => {
    const fm = matter(readFileSync(path, "utf-8")).data;
    const slug = path.replace(/^content\//, "").replace(/\.mdx$/, "");
    return {
      slug,
      title: fm.title,
      category: fm.category,
      description: fm.description,
      tags: fm.tags || [],
      confidence: fm.confidence || 1,
      status: fm.status || "draft",
      connections: fm.connections || [],
    };
  })
  // 머지된 entry 자체는 제외
  .filter((e) => `content/${e.slug}.mdx` !== MERGED_FILE);

console.log(`All entries (excluding merged): ${allEntries.length}`);

// Anthropic SDK 호출
const client = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

const userMessage = `MERGED ENTRY (frontmatter + body):

\`\`\`mdx
${mergedRaw}
\`\`\`

INDEX (current wiki structure):

${index}

ALL EXISTING ENTRIES (excluding merged):

${JSON.stringify(allEntries, null, 2)}

Output strict JSON per system prompt schema. No markdown wrapping.`;

console.log(`Calling Anthropic API (claude-sonnet-4-6)...`);
const start = Date.now();
const response = await client.messages.create({
  model: "claude-sonnet-4-6",
  max_tokens: 4096,
  system: [
    { type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } },
  ],
  messages: [{ role: "user", content: userMessage }],
});
const elapsed = Date.now() - start;
console.log(`API response: ${elapsed}ms, ${response.usage.input_tokens} in, ${response.usage.output_tokens} out`);
console.log(`Cache: ${response.usage.cache_read_input_tokens || 0} read, ${response.usage.cache_creation_input_tokens || 0} created`);

const responseText = response.content
  .filter((c) => c.type === "text")
  .map((c) => c.text)
  .join("");

// JSON parse 시도 (Phase 0 = relaxed, Phase 1 에서 strict Zod)
let parsed = null;
let parseError = null;
try {
  parsed = JSON.parse(responseText.trim());
} catch (e) {
  parseError = e.message;
}

// PR comment 작성 (observe-only — commit/push X)
const commentBody = `## 🔬 A2 Shadow — LLM Cross-Update 제안 (observe-only)

> 이 comment 는 **Phase 0 Shadow mode** 결과입니다. 자동 적용 X — 사람이 검토 후 수동 적용 또는 무시.
> 2주 observe-only 후 critical/high finding fix → Phase 1 → Phase 2 auto-merge.

**Merged entry**: \`${MERGED_FILE}\`
**API call**: ${elapsed}ms, ${response.usage.input_tokens} in / ${response.usage.output_tokens} out tokens
**Cache**: ${response.usage.cache_read_input_tokens || 0} read, ${response.usage.cache_creation_input_tokens || 0} created
**Model**: claude-sonnet-4-6
**Request ID**: ${response.id}

${
  parseError
    ? `### ⚠️ JSON parse 실패\n\n**Error**: \`${parseError}\`\n\n**Raw output**:\n\n\`\`\`\n${responseText}\n\`\`\`\n\n**의미**: Phase 1 진입 전 strict Zod schema validator + retry 로직 필수 (subagent finding #4).`
    : `### ✅ JSON parse OK\n\n**Promote**: \`${parsed.promote}\` ${parsed.promotion_reasoning ? `\n**Reasoning**: ${parsed.promotion_reasoning}` : ""}\n**Score**: generalization=${parsed.score?.generalization}/10, actionability=${parsed.score?.actionability}/10\n\n**Connections to add to merged entry** (${parsed.connections?.length || 0}):\n\`\`\`\n${(parsed.connections || []).map((s) => `- ${s}`).join("\n") || "(none)"}\n\`\`\`\n\n**Cross-updates** (${parsed.cross_updates?.length || 0} entries):\n${(parsed.cross_updates || []).map((cu) => `- \`${cu.slug}\`\n  - Add connections: ${(cu.add_connections || []).join(", ")}\n  - Related link: ${cu.related_link || "(none)"}`).join("\n") || "(none)"}`
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

// gh pr comment 호출
console.log(`Posting PR comment...`);
const tmpFile = `/tmp/a2-shadow-comment-${Date.now()}.md`;
writeFileSync(tmpFile, commentBody);
execSync(`gh pr comment ${PR_NUMBER} --body-file "${tmpFile}"`, { stdio: "inherit" });
console.log(`✅ PR #${PR_NUMBER} comment posted`);
