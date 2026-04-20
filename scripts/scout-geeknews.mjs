#!/usr/bin/env node
/**
 * 긱뉴스 데일리 스카우트 (playbook 적응판)
 *
 * 매일 22:00 KST — 긱뉴스 RSS 를 전체 스캔하여 2개 프로젝트
 * (playbook + moneyballscore) 방향성에 맞는 기사를 찾고, 이식/반영 계획을
 * 수립하여 각 레포에 hub-dispatch Issue 생성.
 *
 * 원본: Mino777/ai-study scripts/scout-geeknews.mjs (2026-04-20 이식).
 * 차이: PROJECTS 리스트 재정의 (4개 → 2개), 방향성 playbook/moneyballscore 기반.
 *
 * 기존 curate-geeknews.mjs 와 별도 — 그쪽은 "1개 골라 위키 엔트리 생성",
 * 이쪽은 "전체 스캔 → 프로젝트별 이식 계획 Issue 생성".
 *
 * 사용:
 *   node scripts/scout-geeknews.mjs              — 스카우트 + Issue 생성
 *   node scripts/scout-geeknews.mjs --dry-run    — 스카우트만 (Issue 미생성)
 *
 * 환경변수:
 *   GEMINI_API_KEY — Gemini API 키
 *   GH_TOKEN       — GH_PAT (크로스 레포) 또는 GITHUB_TOKEN (현재 레포)
 */

import fs from "fs";
import path from "path";
import { execFileSync } from "child_process";
import { GoogleGenerativeAI } from "@google/generative-ai";

const FEED_URL = "https://news.hada.io/rss/news";

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");

// ─── 프로젝트 컨텍스트 ────────────────────────────────────────────
// CLAUDE.md 에서 추출한 방향성. Gemini 매칭 판단 기준.

const PROJECTS = [
  {
    id: "playbook",
    repo: "kkyu92/playbook",
    name: "playbook",
    direction: `개인 비공개 지식 허브 + 프로젝트 관제탑 (Claude Code 하네스).
- Karpathy LLM Wiki 패턴 (raw-sources/, docs/solutions/, content/, INDEX.md)
- 허브-워커 복리 자동화 (워커 lesson/error dispatch → 허브 cross-update → ambient 배포)
- LLM 출력 검증 파이프라인 (MDX validation 루프, Zod schema, Gemini retry)
- JIT 의미 검색 (Xenova multilingual-e5-small, 로컬 임베딩)
- 드리프트 감지 (4-Level: 메모리 / 존재 / 작동 / 완전성)
- Next.js 16 + MDX + Tailwind + Vercel + GitHub Actions + Gemini
관심: AI 에이전트 하네스, 지식 그래프, prompt engineering, 가드 테스트, 자동화 워크플로`,
  },
  {
    id: "moneyballscore",
    repo: "kkyu92/moneyballscore",
    name: "moneyballscore",
    direction: `KBO 야구 예측 워커 (playbook 의 1번 워커).
- 데이터 수집 파이프라인 (KBO 공식 사이트 scraper, 경기 정보)
- DB 기반 분석 엔진 (recent form, H2H, asOfDate 필터)
- Sentry 관측 + PII 스크러빙 + beforeSend 훅
- Telegram 알림 + 픽 로직
- Node.js + pnpm + Vitest
- 실 상용 워커 — playbook 에 lesson:/error dispatch 발생 소스
관심: 데이터 파이프라인, 관측 / silent 실패 방어, CI race condition, LLM 기반 분석, 시계열 데이터`,
  },
];

// ─── 1. RSS 피드 가져오기 ──────────────────────────────────────────

async function fetchGeekNews() {
  const res = await fetch(FEED_URL, {
    redirect: "follow",
    headers: { "User-Agent": "playbook-scout-bot/1.0" },
  });

  if (!res.ok) {
    const fallbackRes = await fetch("http://feeds.feedburner.com/geeknews-feed", {
      headers: { "User-Agent": "playbook-scout-bot/1.0" },
    });
    if (!fallbackRes.ok) throw new Error(`Feed fetch failed: ${fallbackRes.status}`);
    return fallbackRes.text();
  }
  return res.text();
}

function parseAtomFeed(xml) {
  const entries = [];
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
  let match;

  while ((match = entryRegex.exec(xml)) !== null) {
    const entry = match[1];
    const title =
      entry.match(/<title[^>]*>([\s\S]*?)<\/title>/)?.[1]
        ?.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/, "$1")
        .trim() || "";
    const link = entry.match(/<link[^>]*href="([^"]+)"/)?.[1] || "";
    const published = entry.match(/<published>([\s\S]*?)<\/published>/)?.[1]?.trim() || "";
    const content = entry.match(/<content[^>]*>([\s\S]*?)<\/content>/)?.[1]
      ?.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/, "$1")
      .trim() || "";
    const description = content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 500);

    if (title) entries.push({ title, link, published, description });
  }
  return entries;
}

// ─── 2. Gemini 로 전체 스캔 + 프로젝트 매칭 ────────────────────────

async function scoutArticles(articles) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("❌ GEMINI_API_KEY not set");
    process.exit(1);
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  // Pro 는 free tier quota 0 이라 fallback 대상 안 됨 — Flash 만 사용 + exponential backoff
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const articleList = articles
    .slice(0, 30)
    .map((a, i) => `${i + 1}. [${a.title}] — ${a.description.slice(0, 300)}`)
    .join("\n");

  const projectDescriptions = PROJECTS.map(
    (p) => `### ${p.name} (${p.repo})\n${p.direction}`,
  ).join("\n\n");

  const projectIds = PROJECTS.map((p) => p.id).join(" | ");

  const prompt = `당신은 기술 스카우터입니다. 긱뉴스 기사 목록을 보고, 아래 ${PROJECTS.length}개 프로젝트에 **실제로 이식/반영할 수 있는** 기사를 찾아주세요.

## 프로젝트 정보

${projectDescriptions}

## 긱뉴스 기사 목록

${articleList}

## 평가 기준 (모두 AND 조건)

1. **구체적 적용 가능**: 해당 프로젝트의 기존 코드/아키텍처에 구체적으로 적용 가능한 변경이 있는가?
2. **즉시 실행 가능**: 추가 리서치 없이 바로 작업에 착수할 수 있는가?
3. **측정 가능한 효과**: 성능, 비용, 안정성, UX 등 효과를 측정할 수 있는가?

## 응답 형식

반드시 아래 JSON 형식으로만 응답하세요 (마크다운 코드 펜스 없이).
매칭되는 기사가 없으면 빈 배열 \`[]\` 을 반환.
한 기사가 여러 프로젝트에 매칭될 수 있음.
**최대 5개까지만** 반환 (가장 임팩트 큰 순서).

[
  {
    "article_index": 기사번호,
    "article_title": "기사 제목",
    "project_id": "${projectIds}",
    "relevance": "high | medium",
    "action_title": "이식 액션 제목 (한국어, 명령형, 예: 'MDX validation 루프에 zod schema 추가')",
    "action_plan": "구체적 이식 계획 3-5줄. 어떤 파일/모듈에 무엇을 어떻게 변경할지. 기대 효과 포함.",
    "reason": "이 기사가 이 프로젝트에 왜 relevant 한지 한 줄"
  }
]

주의:
- 단순 뉴스/발표 기사는 제외 (기술적 깊이가 있는 것만)
- "흥미롭지만 적용할 곳이 없는" 기사는 제외
- 억지로 매칭하지 말 것 — 3 조건 AND 를 엄격히 적용
- relevance: high = 즉시 착수 권장, medium = 다음 스프린트 고려`;

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const result = await model.generateContent(prompt);
      let text = result.response.text().trim();
      text = text.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/i, "").trim();
      const parsed = JSON.parse(text);

      if (!Array.isArray(parsed)) throw new Error("Response is not an array");

      const valid = parsed.filter(
        (m) =>
          typeof m.article_index === "number" &&
          m.project_id &&
          PROJECTS.some((p) => p.id === m.project_id) &&
          m.action_title &&
          m.action_plan,
      );

      return valid;
    } catch (err) {
      console.warn(`⚠️  Attempt ${attempt + 1} failed: ${err.message}`);
      if (attempt === 2) {
        console.error("❌ All Flash retries failed");
        process.exit(1);
      }
      // Exponential backoff: 3s, 9s, 27s — 503 transient 대응
      await new Promise((r) => setTimeout(r, Math.pow(3, attempt + 1) * 1000));
    }
  }
}

// ─── 3. GitHub Issue 생성 ──────────────────────────────────────────

function createIssue(match, article) {
  const project = PROJECTS.find((p) => p.id === match.project_id);
  if (!project) return;

  const today = new Date().toLocaleDateString("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const title = `🔭 [Scout] ${match.action_title}`;
  const body = `## 긱뉴스 스카우트 — ${today}

### 원본 기사
- **제목**: ${article.title}
- **링크**: ${article.link}
- **관련도**: ${match.relevance}

### 왜 이 프로젝트에 relevant 한가
${match.reason}

### 이식/반영 계획
${match.action_plan}

---
> 🤖 자동 생성 by \`scout-geeknews.mjs\` — 긱뉴스 데일리 스카우트`;

  if (dryRun) {
    console.log(`   [DRY-RUN] Would create issue in ${project.repo}`);
    console.log(`   Title: ${title}`);
    console.log(`   Body preview: ${body.slice(0, 200)}...\n`);
    return;
  }

  // body 를 temp 파일에 써서 --body-file 로 전달. shell injection / 백틱 해석 방지.
  const tmpFile = path.join(fs.mkdtempSync(path.join(process.env.RUNNER_TEMP || "/tmp", "scout-")), "body.md");
  fs.writeFileSync(tmpFile, body);

  try {
    // 라벨 self-bootstrap (silent fail OK)
    try {
      execFileSync("gh", [
        "label", "create", "hub-dispatch",
        "--repo", project.repo,
        "--color", "1d76db",
        "--description", "Scout 이 자동 감지한 이식 후보",
      ], { encoding: "utf-8", timeout: 15000, stdio: "pipe" });
    } catch { /* 이미 있으면 OK */ }

    const result = execFileSync("gh", [
      "issue", "create",
      "--repo", project.repo,
      "--title", title,
      "--body-file", tmpFile,
      "--label", "hub-dispatch",
    ], { encoding: "utf-8", timeout: 30000 });
    console.log(`   ✅ Issue created in ${project.repo}: ${result.trim()}`);
  } catch (err) {
    console.error(`   ❌ Issue creation failed for ${project.repo}: ${err.message}`);
  } finally {
    try { fs.unlinkSync(tmpFile); fs.rmdirSync(path.dirname(tmpFile)); } catch {}
  }
}

// ─── 4. 리포트 생성 (GitHub Actions Summary) ──────────────────────

function generateSummary(matches, articles) {
  if (matches.length === 0) {
    return "## 🔭 긱뉴스 데일리 스카우트\n\n오늘은 프로젝트에 이식할 만한 기사가 없습니다.";
  }

  let summary = "## 🔭 긱뉴스 데일리 스카우트\n\n";
  summary += `| 프로젝트 | 기사 | 액션 | 관련도 |\n|---|---|---|---|\n`;
  for (const m of matches) {
    const article = articles[m.article_index - 1];
    const articleTitle = article ? article.title : m.article_title;
    summary += `| ${m.project_id} | ${articleTitle} | ${m.action_title} | ${m.relevance} |\n`;
  }
  return summary;
}

// ─── 5. Main ──────────────────────────────────────────────────────

async function main() {
  console.log("🔭 긱뉴스 데일리 스카우트 시작...\n");

  console.log("1️⃣ RSS 피드 가져오는 중...");
  const xml = await fetchGeekNews();
  const articles = parseAtomFeed(xml);
  console.log(`   ${articles.length}개 기사 파싱 완료\n`);

  if (articles.length === 0) {
    console.log("ℹ️ 기사를 찾을 수 없습니다. 종료.");
    process.exit(0);
  }

  console.log("2️⃣ Gemini 로 프로젝트 매칭 중...");
  const matches = await scoutArticles(articles);
  console.log(`\n   📊 ${matches.length}개 매칭 발견\n`);

  if (matches.length === 0) {
    console.log("ℹ️ 오늘은 이식할 만한 기사가 없습니다.");
    if (process.env.GITHUB_STEP_SUMMARY) {
      fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, generateSummary([], articles));
    }
    if (process.env.GITHUB_OUTPUT) {
      fs.appendFileSync(process.env.GITHUB_OUTPUT, "match_count=0\n");
    }
    return;
  }

  console.log("3️⃣ 매칭 결과:\n");
  for (const m of matches) {
    const article = articles[m.article_index - 1];
    console.log(`   📰 [${m.project_id}] ${m.action_title}`);
    console.log(`      기사: ${article?.title || m.article_title}`);
    console.log(`      관련도: ${m.relevance}`);
    console.log(`      이유: ${m.reason}`);
    console.log(`      계획: ${m.action_plan.split("\n")[0]}...`);
    console.log();
  }

  console.log("4️⃣ GitHub Issue 생성 중...\n");
  for (const m of matches) {
    const article = articles[m.article_index - 1];
    if (article) createIssue(m, article);
  }

  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `match_count=${matches.length}\n`);
    const projectIds = [...new Set(matches.map((m) => m.project_id))].join(",");
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `matched_projects=${projectIds}\n`);
  }
  if (process.env.GITHUB_STEP_SUMMARY) {
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, generateSummary(matches, articles));
  }

  console.log("\n✅ 스카우트 완료!");
}

main().catch((err) => {
  console.error("❌ Fatal:", err);
  process.exit(1);
});
