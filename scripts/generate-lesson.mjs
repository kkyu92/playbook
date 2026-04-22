/**
 * Entry 생성 파이프라인 (post-pivot).
 *
 * 설계 근거: CEO plan 2026-04-21-geeknews-pipeline-pivot (Task 4)
 * - topic-pool.json 폐기 → coverage-analyzer 기반 gap-pull
 * - entry 생성은 1 call (본문 + title + desc + tags + slug + connections 통합, responseSchema)
 * - 양방향 sync + cap 15 (lib/bidirectional-sync)
 * - source 필드 주입 (scout | gap-pull | manual)
 * - ping 호출 / 별도 slug 호출 제거 (쿼터 최적화)
 *
 * CLI:
 *   suggest          — coverage-analyzer + Gemini 2개 추천 (dev/debug)
 *   auto             — 2개 자동 생성 (gap-pull). daily workflow 가 호출
 *   generate <slug>  — 특정 slug 수동 생성 (source=manual)
 *   generate-custom <topic text>  — 자유 주제 (source=manual default)
 *
 * scout 은 generateCustomEntry 를 직접 import 하여 source="scout" 으로 호출.
 */

import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import matter from "gray-matter";
import yaml from "js-yaml";

import { generateStructured } from "./lib/gemini-client.mjs";
import { validateConnections, MAX_CONNECTIONS } from "./lib/bidirectional-sync.mjs";
import { analyzeCoverage } from "./coverage-analyzer.mjs";
import { CATEGORIES, CATEGORY_LABELS } from "./lib/categories.mjs";
import { validateMdxContent } from "./lib/mdx-validate.mjs";

const CONTENT_DIR = path.join(process.cwd(), "content");
const MANIFEST_PATH = path.join(process.cwd(), "src", "generated", "content-manifest.json");

// ─── Manifest ──────────────────────────────────────────────────

function regenerateManifest() {
  try {
    execSync("node scripts/generate-content-manifest.mjs", { stdio: "inherit" });
  } catch {
    console.warn("⚠️  Manifest regen warnings — continuing");
  }
}

function loadManifest() {
  if (!fs.existsSync(MANIFEST_PATH)) {
    return { entries: [], graph: { nodes: [], edges: [] } };
  }
  return JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf-8"));
}

// ─── 양방향 파일 write (backfill 패턴 재사용) ──────────────────

function loadAllEntryFiles() {
  const entries = [];
  const walk = (dir, rel = "") => {
    for (const item of fs.readdirSync(dir)) {
      const full = path.join(dir, item);
      const relPath = rel ? `${rel}/${item}` : item;
      const stat = fs.statSync(full);
      if (stat.isDirectory()) walk(full, relPath);
      else if (item.endsWith(".mdx")) {
        const slug = relPath.replace(/\.mdx$/, "");
        const raw = fs.readFileSync(full, "utf8");
        const parsed = matter(raw);
        entries.push({
          slug,
          path: full,
          raw,
          frontmatter: parsed.data,
          body: parsed.content,
        });
      }
    }
  };
  walk(CONTENT_DIR);
  return entries;
}

// gray-matter 는 field 순서 변경. backfill 과 동일한 preserving stringify 사용.
function stringifyPreservingOrder(raw, newFm, body) {
  const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n/);
  if (!fmMatch) throw new Error(`No frontmatter in ${raw.slice(0, 80)}`);
  const newFmYaml = yaml.dump(newFm, {
    lineWidth: -1,
    flowLevel: -1,
    noRefs: true,
    quotingType: '"',
    forceQuotes: false,
  });
  const processed = inlineConnectionsArray(newFmYaml);
  return `---\n${processed}---\n${body}`;
}

function inlineConnectionsArray(yamlText) {
  return yamlText.replace(
    /^connections:\n((?:  - [^\n]+\n)+)/m,
    (_, itemsBlock) => {
      const items = itemsBlock
        .split("\n")
        .filter((l) => l.startsWith("  - "))
        .map((l) => l.slice(4).trim().replace(/^["']|["']$/g, ""));
      return `connections: [${items.join(", ")}]\n`;
    },
  );
}

/**
 * 새 entry 생성 + 역방향 sync 적용 + 변경된 파일들 write.
 *
 * 동작:
 *  1. 새 entry 파일 write (fresh)
 *  2. connections 타겟 파일들 load + 역방향 연결 추가
 *  3. cap 15 초과 시 축출 (lib/bidirectional-sync 규칙)
 *  4. 변경된 파일만 write
 *
 * @param {object} newEntry — { slug, category, topicSlug, frontmatter, body }
 * @returns {{ newPath: string, updatedFiles: string[], evictions: Array }}
 */
function persistNewEntryWithSync(newEntry) {
  const dir = path.join(CONTENT_DIR, newEntry.category);
  fs.mkdirSync(dir, { recursive: true });
  const newPath = path.join(dir, `${newEntry.topicSlug}.mdx`);

  if (fs.existsSync(newPath)) {
    throw new Error(`File already exists: ${newPath}`);
  }

  // 새 파일 write
  const newRaw = stringifyPreservingOrder(
    `---\n\n---\n`, // dummy raw (stringifyPreservingOrder 는 body 만 참조)
    newEntry.frontmatter,
    `\n${newEntry.body}`,
  );
  fs.writeFileSync(newPath, newRaw);

  // 역방향 파일 업데이트
  const allEntries = loadAllEntryFiles();
  const working = allEntries.map((e) => ({
    slug: e.slug,
    original: e,
    newConnections: Array.isArray(e.frontmatter.connections)
      ? [...e.frontmatter.connections]
      : [],
  }));

  // 역방향 연결: newEntry.connections 의 각 target 의 connections 에 newEntry.slug 추가
  const evictions = [];
  for (const targetSlug of newEntry.frontmatter.connections) {
    const target = working.find((w) => w.slug === targetSlug);
    if (!target) continue;
    if (!target.newConnections.includes(newEntry.slug)) {
      target.newConnections.push(newEntry.slug);
    }
    // cap 15 초과 시 축출 — newEntry 는 보호
    while (target.newConnections.length > MAX_CONNECTIONS) {
      const candidates = target.newConnections
        .filter((s) => s !== newEntry.slug)
        .map((slug) => {
          const ent = working.find((x) => x.slug === slug)?.original;
          const lv =
            ent?.frontmatter?.last_verified || ent?.frontmatter?.date || "1970-01-01";
          return { slug, lv };
        })
        .sort((a, b) => {
          if (a.lv !== b.lv) return a.lv.localeCompare(b.lv);
          return b.slug.localeCompare(a.slug);
        });
      if (candidates.length === 0) break;
      const toEvict = candidates[0].slug;
      target.newConnections = target.newConnections.filter((s) => s !== toEvict);
      const other = working.find((x) => x.slug === toEvict);
      if (other) {
        other.newConnections = other.newConnections.filter((s) => s !== target.slug);
      }
      evictions.push({ from: target.slug, evicted: toEvict });
    }
  }

  // 변경된 파일만 write
  const updatedFiles = [];
  for (const w of working) {
    const before = Array.isArray(w.original.frontmatter.connections)
      ? w.original.frontmatter.connections
      : [];
    const after = w.newConnections;
    const changed =
      before.length !== after.length || before.some((s, i) => s !== after[i]);
    if (!changed) continue;
    const newFm = { ...w.original.frontmatter, connections: after };
    const newRaw2 = stringifyPreservingOrder(w.original.raw, newFm, w.original.body);
    fs.writeFileSync(w.original.path, newRaw2);
    updatedFiles.push(w.original.path);
  }

  return { newPath, updatedFiles, evictions };
}

// ─── Entry 생성 Core ──────────────────────────────────────────

function inferCategoryFromText(topicText) {
  const lower = topicText.toLowerCase();
  const keywords = {
    "prompt-engineering": ["프롬프트", "prompt", "system prompt"],
    "context-engineering": ["컨텍스트", "context", "window", "토큰"],
    "harness-engineering": ["하네스", "harness", "방법론", "워크플로우", "skill", "slash", "agent"],
    agents: ["에이전트", "agent", "tool", "mcp", "function calling"],
    evaluation: ["평가", "eval", "벤치마크", "환각", "hallucination"],
    infrastructure: ["인프라", "서빙", "캐싱", "게이트웨이", "배포", "ci", "workflow", "github action"],
    "frontend-ai": ["프론트", "react", "next", "frontend", "react native"],
    "project-ops": ["ops", "프로젝트", "관리", "release", "monorepo"],
    "data-engineering": ["data", "etl", "파이프라인", "pipeline", "embedding", "vector", "rag"],
  };
  let best = "harness-engineering";
  let score = 0;
  for (const [cat, ks] of Object.entries(keywords)) {
    const s = ks.filter((k) => lower.includes(k)).length;
    if (s > score) { score = s; best = cat; }
  }
  return best;
}

function slugifyTitle(title) {
  // ASCII kebab. 한글 제거 후 fallback. Gemini 가 "slug" 필드를 생성하지만 validation + fallback.
  return title
    .toLowerCase()
    .replace(/[가-힣]+/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60)
    .replace(/-$/, "") || "untitled";
}

/**
 * Gemini 1 call 로 본문 + 메타 전부 생성. responseSchema JSON 강제.
 *
 * 입력: topicText, category, existingSlugs (pool for connections), extraContext (scout 시 RSS 정보)
 * 출력: { title, description, tags, slug, connections, body }
 */
async function generateEntryPayload({ topicText, category, existingSlugs, extraContext }) {
  const catLabel = CATEGORY_LABELS[category] || category;
  const slugList = existingSlugs.slice(0, 40).map((s) => `- ${s}`).join("\n");

  const schema = {
    type: "object",
    properties: {
      title: { type: "string", description: "기술 블로그 스타일 정제 제목. 구어체 제거, 핵심 키워드 + 부제" },
      description: { type: "string", description: "한 줄 설명" },
      tags: { type: "array", items: { type: "string" }, minItems: 3, maxItems: 6 },
      slug: { type: "string", description: "kebab-case 영문 slug (최대 60자)" },
      connections: {
        type: "array",
        items: { type: "string" },
        minItems: 3,
        maxItems: 7,
        description: "아래 existing slug 리스트 중에서 관련성 높은 5~7개. 정확한 slug (category/slug) 형식",
      },
      body: {
        type: "string",
        description: "마크다운 본문 2000-3000자, ## / ### 헤딩, 코드 블록, Mermaid 1개 이상, ## 트레이드오프 + ## 실전 체크리스트 섹션 포함",
      },
    },
    required: ["title", "description", "tags", "slug", "connections", "body"],
  };

  const basePrompt = `당신은 기술 블로그 작가입니다. 아래 주제로 위키 엔트리를 작성하세요.

## 주제
${topicText}

## 카테고리
${catLabel}

${extraContext ? `## 참고 컨텍스트\n${extraContext}\n` : ""}

## Existing entry slugs (connections 후보)
${slugList || "(없음)"}

## 요구사항

1. body (마크다운 본문):
   - 인사말/자기소개 없이 바로 시작
   - 핵심 개념부터 (왜 중요한지)
   - 실제 동작하는 코드 예제 (카테고리에 맞는 언어)
   - Mermaid 다이어그램 1개 이상 (\`\`\`mermaid 코드 블록)
   - 2026년 최신 트렌드 반영
   - 중간에 "## 트레이드오프" 섹션: 이 패턴/접근의 장단점 3~5개. 각 항목에 "언제 좋고/언제 나쁜지" 명시 (다른 엔트리가 이 문서를 참조할 때 판단 근거)
   - 마지막에 "## 실전 체크리스트" 섹션: 이 지식을 프로젝트에 적용할 때 검증할 항목 5~7개 (구체적 / 측정 가능 / 체크박스 형식 "- [ ] ...")
   - 1인칭 학습 관점 금지 — "이해했는가?" "공부해보라" 같은 표현 금지. 프로젝트 지식 그래프의 노드 관점으로 작성.
   - 한국어 + 영어 기술 용어 원문
   - 2000-3000자
   - h2(##), h3(###) 적절히 사용
   - MDX 문법 제약:
     * HTML void 태그는 self-closing (<br />, <hr />, <img />)
     * {중괄호} 는 인라인 코드(\`) 로 감싸거나 괄호()로 교체 (JSX expression 파싱 방지)
     * <숫자 (예: <3) 는 공백 추가(< 3) 또는 인라인 코드
     * Mermaid subgraph 이름 공백은 id ["Label"] 형식

2. title: 구어체/요청문 제거, "핵심 키워드 — 부제" 형식
3. description: 한 줄 요약
4. tags: 영문 키워드 3-6개 (카테고리 자동 추가되므로 생략), 한국어 금지
5. slug: kebab-case 영문 60자 이내
6. connections: 위 existing slugs 리스트에서 관련성 높은 것 **5~7개 선택**. 정확한 형식 (category/topic-slug). 리스트에 없는 slug 는 절대 생성하지 말 것. 최소 3개 필수.`;

  // MDX validation + retry (최대 3회)
  const MAX_VALIDATION = 3;
  let lastIssues = [];
  let payload;

  for (let vAttempt = 0; vAttempt < MAX_VALIDATION; vAttempt++) {
    const prompt = vAttempt === 0
      ? basePrompt
      : `${basePrompt}\n\n---\n\n이전 응답 문제. 반드시 수정:\n${lastIssues.map((i) => `- ${i}`).join("\n")}`;

    payload = await generateStructured({
      prompt,
      responseSchema: schema,
      validate: (p) => {
        if (!p || typeof p !== "object") return "not object";
        if (!p.body || typeof p.body !== "string") return "body missing";
        if (!Array.isArray(p.connections)) return "connections not array";
        if (!Array.isArray(p.tags)) return "tags not array";
        return true;
      },
    });

    // MDX 본문 validation
    const validation = await validateMdxContent(payload.body);
    const issues = [];
    if (!validation.valid) issues.push(`MDX 컴파일 에러: ${validation.compileError}`);
    for (const w of validation.jsxWarnings) {
      issues.push(`Line ~${w.line}: ${w.message}`);
    }
    if (!payload.body.includes("## ")) issues.push("## 헤딩 누락");
    if (!payload.body.includes("```")) issues.push("코드 블록 누락");
    if (payload.body.length < 500) issues.push(`본문 길이 부족 (${payload.body.length}자)`);

    if (issues.length === 0) {
      if (vAttempt > 0) console.log(`✅ Validation 통과 (재생성 ${vAttempt}회 후)`);
      return payload;
    }

    lastIssues = issues;
    console.warn(`⚠️  Validation 실패 (${vAttempt + 1}/${MAX_VALIDATION}):`);
    issues.forEach((i) => console.warn(`   - ${i}`));
  }

  throw new Error(`Validation ${MAX_VALIDATION}회 실패: ${lastIssues.join(", ")}`);
}

function buildFrontmatter({ payload, category, connections, source }) {
  const today = new Date().toISOString().split("T")[0];
  const tags = [...new Set([...(payload.tags || []), category])];
  return {
    title: payload.title,
    category,
    date: today,
    tags,
    confidence: 1,
    connections,
    status: "draft",
    description: payload.description,
    type: "entry",
    source,
  };
}

// ─── 공용 entry 생성 흐름 (export) ────────────────────────────

/**
 * 외부 호출 가능 — scout 이 import 하여 사용.
 * @param {object} opts
 * @param {string} opts.topicText — 주제 요청 텍스트
 * @param {string} [opts.category] — 지정 없으면 inferCategoryFromText
 * @param {string} [opts.extraContext] — 스카우트: RSS 기사 링크/요약
 * @param {"scout"|"gap-pull"|"manual"} [opts.source="manual"]
 * @returns {Promise<{slug: string, path: string, evictions: Array}>}
 */
export async function generateCustomEntry({ topicText, category, extraContext, source = "manual" }) {
  regenerateManifest();
  const manifest = loadManifest();
  const existingSlugs = manifest.entries.map((e) => e.slug);
  const cat = category || inferCategoryFromText(topicText);

  console.log(`\n🎓 생성: ${topicText}`);
  console.log(`   카테고리: ${CATEGORY_LABELS[cat] || cat}`);
  console.log(`   Source: ${source}`);

  const payload = await generateEntryPayload({
    topicText,
    category: cat,
    existingSlugs,
    extraContext,
  });

  // Connections validation — existingSlugs 에 있는 것만 유지
  const validConnections = validateConnections(payload.connections, existingSlugs);
  if (validConnections.length === 0) {
    throw new Error(`connections validation 후 0개 남음. Gemini 제안: ${payload.connections.join(", ")}`);
  }
  console.log(`   Connections: ${payload.connections.length} → ${validConnections.length} (validated)`);

  // Slug: Gemini payload.slug 우선, 실패/충돌 시 fallback
  let topicSlug = (payload.slug || "").toLowerCase().replace(/[^a-z0-9-]/g, "").replace(/-+/g, "-").replace(/^-|-$/g, "");
  if (!topicSlug || topicSlug.length < 3) topicSlug = slugifyTitle(payload.title);
  if (topicSlug.length > 60) topicSlug = topicSlug.slice(0, 60).replace(/-$/, "");
  const fullSlug = `${cat}/${topicSlug}`;

  // Collision handling
  if (existingSlugs.includes(fullSlug)) {
    topicSlug = `${topicSlug}-${Date.now().toString(36).slice(-4)}`;
  }
  const newSlug = `${cat}/${topicSlug}`;

  // Quiz 생성 제거 — 1인칭 학습 관점 유산. 프로젝트 지식 그래프 목표와 불일치.
  // 본문 자체가 트레이드오프 + 실전 체크리스트 섹션을 포함.

  const frontmatter = buildFrontmatter({
    payload,
    category: cat,
    connections: validConnections,
    source,
  });

  const newEntry = {
    slug: newSlug,
    category: cat,
    topicSlug,
    frontmatter,
    body: payload.body,
  };

  const { newPath, updatedFiles, evictions } = persistNewEntryWithSync(newEntry);

  console.log(`✅ Written: ${path.relative(process.cwd(), newPath)}`);
  if (updatedFiles.length > 0) {
    console.log(`🔗 역방향 업데이트: ${updatedFiles.length} 파일`);
  }
  if (evictions.length > 0) {
    console.log(`✂️  cap 15 축출: ${evictions.length}건`);
    for (const e of evictions) console.log(`   ${e.from} ✂ ${e.evicted}`);
  }

  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `file_path=${path.relative(process.cwd(), newPath)}\n`);
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `topic_title=${payload.title}\n`);
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `category=${cat}\n`);
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `source=${source}\n`);
  }

  return { slug: newSlug, path: newPath, evictions };
}

// ─── suggest / auto (gap-pull) ────────────────────────────────

/**
 * coverage-analyzer 결과를 Gemini 에게 주고 구체 주제 2개 제안 받음.
 */
async function pickGapTopicsByGemini(coverage) {
  const catSummary = coverage.categories
    .map((c) => `- ${c.name} (${CATEGORY_LABELS[c.name] || c.name}): ${c.count} entries, avgConf ${c.avgConfidence}, gapScore ${c.gapScore}, status=${c.status}`)
    .join("\n");

  const topGaps = coverage.gaps.slice(0, 5).map((g) => g.name).join(", ");

  const schema = {
    type: "array",
    items: {
      type: "object",
      properties: {
        category: { type: "string", enum: CATEGORIES },
        topic_text: { type: "string", description: "구체적 엔트리 주제. '~하는 방법' 수준 구체성" },
        rationale: { type: "string", description: "왜 이 갭을 채워야 하는지 한 줄" },
      },
      required: ["category", "topic_text", "rationale"],
    },
    minItems: 2,
    maxItems: 2,
  };

  const prompt = `당신은 AI 엔지니어링 위키 큐레이터입니다. 아래 커버리지 분석을 보고, 갭을 가장 잘 채울 **구체적 엔트리 주제 2개** 를 제안하세요.

## 카테고리 현황 (9개)
${catSummary}

## Top gaps
${topGaps}

## 기준
- gapScore 높은 카테고리 우선
- 두 제안은 **서로 다른 카테고리** (편향 교정)
- 주제는 "~하는 방법", "~패턴", "~디자인" 수준 구체성 (추상적 "AI" 금지)
- 2026년 실무에서 바로 적용 가능한 것

반드시 2개만 제안. category 는 위 9개 카테고리 중에서만.`;

  return await generateStructured({
    prompt,
    responseSchema: schema,
    validate: (p) => Array.isArray(p) && p.length === 2 || "need 2",
  });
}

async function suggest() {
  regenerateManifest();
  const manifest = loadManifest();
  const coverage = analyzeCoverage(manifest);

  console.log(`📊 현재: ${coverage.totalEntries} entries, target ${coverage.target}, balance ${coverage.balance} (${coverage.balanceLabel})`);
  console.log(`📉 Top gaps: ${coverage.gaps.slice(0, 3).map((g) => `${g.name}(${g.gapScore})`).join(", ")}\n`);

  const topics = await pickGapTopicsByGemini(coverage);

  console.log("📚 추천 주제 2개:\n");
  topics.forEach((t, i) => {
    console.log(`  ${i + 1}. [${CATEGORY_LABELS[t.category]}] ${t.topic_text}`);
    console.log(`     이유: ${t.rationale}`);
  });

  if (process.env.GITHUB_OUTPUT) {
    topics.forEach((t, i) => {
      fs.appendFileSync(process.env.GITHUB_OUTPUT, `topic_${i + 1}_text=${t.topic_text}\n`);
      fs.appendFileSync(process.env.GITHUB_OUTPUT, `topic_${i + 1}_category=${t.category}\n`);
    });
  }

  return topics;
}

async function auto() {
  const topics = await suggest();
  console.log("\n🚀 auto 모드 — 2개 주제 자동 생성 시작\n");
  const results = [];
  for (const t of topics) {
    try {
      const r = await generateCustomEntry({
        topicText: t.topic_text,
        category: t.category,
        extraContext: `갭 분석: ${t.rationale}`,
        source: "gap-pull",
      });
      results.push(r);
    } catch (err) {
      console.error(`❌ 생성 실패 [${t.category}] ${t.topic_text}: ${err.message}`);
      // E6: 실패 시 Issue 자동 생성은 workflow 레벨에서 처리. 여기서는 log + continue.
    }
  }
  console.log(`\n✅ auto 완료: ${results.length}/${topics.length} 생성`);
  if (results.length === 0 && topics.length > 0) {
    process.exit(1); // 전부 실패는 fail-loud
  }
}

async function generateBySlug(slug) {
  // 수동 픽 — source="manual"
  const parts = slug.split("/");
  const category = parts[0];
  const topicSlug = parts.slice(1).join("/");
  if (!CATEGORIES.includes(category)) {
    throw new Error(`Invalid category: ${category}. Must be one of: ${CATEGORIES.join(", ")}`);
  }
  // slug 의 topicSlug 를 topicText 로 사용 (대시 → 공백)
  const topicText = topicSlug.replace(/-/g, " ");
  return await generateCustomEntry({
    topicText,
    category,
    source: "manual",
  });
}

async function generateCustomCli(topicText) {
  return await generateCustomEntry({
    topicText,
    source: "manual",
  });
}

// ─── CLI ───────────────────────────────────────────────────────

const args = process.argv.slice(2);
const mode = args[0];

// Only run CLI if this file was executed directly (not imported by scout)
if (import.meta.url === `file://${process.argv[1]}`) {
  const run = async () => {
    if (mode === "suggest" || !mode) await suggest();
    else if (mode === "auto") await auto();
    else if (mode === "generate") {
      const slug = args[1];
      if (!slug) { console.error("❌ Usage: generate <slug>"); process.exit(1); }
      await generateBySlug(slug);
    } else if (mode === "generate-custom") {
      const topic = args.slice(1).join(" ");
      if (!topic) { console.error("❌ Usage: generate-custom <topic text>"); process.exit(1); }
      await generateCustomCli(topic);
    } else {
      console.error(`❌ Unknown mode: ${mode}. Use suggest | auto | generate <slug> | generate-custom <topic>`);
      process.exit(1);
    }
  };
  run().catch((err) => { console.error("❌", err.message); process.exit(1); });
}
