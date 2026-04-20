#!/usr/bin/env node
/**
 * GeekNews 큐레이션 스크립트 (playbook 적응판)
 *
 * 긱뉴스(news.hada.io) RSS 에서 최신 글을 가져와 위키 방향성에 가장 맞는
 * 1개를 Gemini 로 선정 → generate-lesson 의 generate-custom 타고 entry 생성.
 *
 * 원본: Mino777/ai-study scripts/curate-geeknews.mjs (2026-04-20 이식).
 * 차이: 위키 방향성 재정의 (playbook-centric), 프로젝트 리스트 2개 (playbook + moneyballscore).
 *
 * 사용:
 *   node scripts/curate-geeknews.mjs              — 큐레이션 + 엔트리 생성
 *   node scripts/curate-geeknews.mjs --dry-run    — 큐레이션만 (엔트리 미생성)
 *
 * 환경변수: GEMINI_API_KEY
 */

import fs from "fs";
import path from "path";
import { GoogleGenerativeAI } from "@google/generative-ai";

const FEED_URL = "https://news.hada.io/rss/news";
const MANIFEST_PATH = path.join(process.cwd(), "src", "generated", "content-manifest.json");

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");

// ─── 1. RSS 피드 가져오기 ──────────────────────────────────────

async function fetchGeekNews() {
  const res = await fetch(FEED_URL, {
    redirect: "follow",
    headers: { "User-Agent": "playbook-wiki-bot/1.0" },
  });

  if (!res.ok) {
    const fallbackRes = await fetch("http://feeds.feedburner.com/geeknews-feed", {
      headers: { "User-Agent": "playbook-wiki-bot/1.0" },
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
    const title = entry.match(/<title[^>]*>([\s\S]*?)<\/title>/)?.[1]?.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/, "$1").trim() || "";
    const link = entry.match(/<link[^>]*href="([^"]+)"/)?.[1] || "";
    const published = entry.match(/<published>([\s\S]*?)<\/published>/)?.[1]?.trim() || "";
    const content = entry.match(/<content[^>]*>([\s\S]*?)<\/content>/)?.[1]?.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/, "$1").trim() || "";
    const description = content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().slice(0, 500);

    if (title) {
      entries.push({ title, link, published, description });
    }
  }

  return entries;
}

// ─── 2. Gemini 로 최적 글 선정 ──────────────────────────────────

async function selectBestArticle(articles, existingTitles) {
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
    .map((a, i) => `${i + 1}. [${a.title}] — ${a.description.slice(0, 200)}`)
    .join("\n");

  const prompt = `아래는 긱뉴스(GeekNews)의 최신 기술 뉴스 목록입니다.

이 위키 (playbook) 의 방향성:
- 허브-워커 복리 자동화 (지식 그래프 확장, cross-update, 양방향 지식 흐름)
- AI 에이전트 하네스 (Claude Code, 드리프트 감지, 가드 테스트 패턴)
- LLM 출력 검증 (prompt engineering, 재생성 루프, Zod schema)
- 프론트엔드/웹 배포 (Next.js, Vercel, CI/CD 자동화)
- 관측 + silent 실패 방어 (Sentry, PII 스크러빙, guard test)

이미 존재하는 위키 엔트리 (중복 피하기):
${existingTitles.slice(0, 50).join("\n")}

목록:
${articleList}

위 목록에서 이 위키의 방향성에 **가장 부합하는** 글 1개를 선택하세요.
선택 기준:
1. AI/LLM/자동화 관련 실무 적용 가능한 주제 우선
2. 이미 존재하는 엔트리와 중복되지 않는 주제
3. 개발자에게 실질적 인사이트를 제공하는 글
4. 단순 뉴스/발표보다 기술적 깊이가 있는 글

반드시 아래 JSON 형식으로만 응답하세요 (마크다운 코드 펜스 없이):
{
  "index": 번호,
  "reason": "선택 이유 (한 줄)",
  "topic": "위키 엔트리로 변환할 때의 주제 제목 (한국어, 기술 블로그 스타일)"
}`;

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const result = await model.generateContent(prompt);
      let text = result.response.text().trim();
      text = text.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/i, "").trim();
      const parsed = JSON.parse(text);

      if (typeof parsed.index !== "number" || !parsed.topic) {
        throw new Error("Invalid response structure");
      }

      const selectedIdx = parsed.index - 1;
      if (selectedIdx < 0 || selectedIdx >= articles.length) {
        throw new Error(`Invalid index: ${parsed.index}`);
      }

      return {
        article: articles[selectedIdx],
        reason: parsed.reason,
        topic: parsed.topic,
      };
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

// ─── 3. 이식 가능성 평가 (playbook + moneyballscore) ───────────

async function assessActionability(topic, article) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const prompt = `당신은 AI 엔지니어링 프로젝트의 실무 적용 가능성을 평가하는 전문가입니다.

아래 긱뉴스 기사를 학습 위키 엔트리로 작성했습니다. 이 내용이 아래 2개 프로젝트에 **실제로 이식/반영할 수 있는 구체적 액션**이 있는지 평가하세요.

기사 제목: ${article.title}
위키 주제: ${topic}

프로젝트 정보:
1. **playbook** — 허브 위키 + Claude Code 하네스. Next.js 16 + MDX + Gemini 파이프라인.
   주요 관심: LLM 출력 검증, 드리프트 감지, 지식 그래프 cross-update, JIT 검색, docs/solutions/ 승격, 워크플로 자동화.
2. **moneyballscore** — KBO 야구 예측 워커. Node.js + DB 파이프라인 + Sentry + 에러 dispatch.
   주요 관심: 데이터 수집 파이프라인, 관측(Sentry), LLM 기반 분석, CI race condition, 에러 dispatch.

평가 기준 (모두 AND 조건):
- 해당 프로젝트의 기존 코드에 **구체적으로 적용 가능한** 변경이 있는가?
- 변경이 **즉시 실행 가능**한가? (리서치만 필요한 건 제외)
- 변경의 **효과가 측정 가능**한가? (성능, 비용, 안정성 등)

3 조건 모두 만족하는 경우에만 아래 JSON 으로 응답:
{
  "actionable": true,
  "target": "프로젝트명 (playbook / moneyballscore)",
  "action": "한 줄 액션 요약",
  "detail": "구체적 이식 계획 (어떤 파일에 무엇을 변경, 3줄 이내)",
  "priority": "high | medium | low"
}

3 조건 중 하나라도 불만족하면:
{ "actionable": false }

마크다운 코드 펜스 없이 JSON 만 응답.`;

  try {
    const result = await model.generateContent(prompt);
    let text = result.response.text().trim();
    text = text.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/i, "").trim();
    const parsed = JSON.parse(text);

    if (parsed.actionable) {
      return {
        target: parsed.target,
        action: parsed.action,
        detail: parsed.detail,
        priority: parsed.priority || "medium",
      };
    }
    return null;
  } catch (err) {
    console.warn(`   ⚠️ 평가 실패 (스킵): ${err.message}`);
    return null;
  }
}

// ─── 4. Main ───────────────────────────────────────────────────

async function main() {
  console.log("📰 긱뉴스 큐레이션 시작...\n");

  console.log("1️⃣ RSS 피드 가져오는 중...");
  const xml = await fetchGeekNews();
  const articles = parseAtomFeed(xml);
  console.log(`   ${articles.length}개 기사 파싱 완료\n`);

  if (articles.length === 0) {
    console.error("❌ 기사를 찾을 수 없습니다");
    process.exit(1);
  }

  let existingTitles = [];
  if (fs.existsSync(MANIFEST_PATH)) {
    const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, "utf-8"));
    existingTitles = manifest.entries.map((e) => `- ${e.frontmatter.title}`);
  }

  console.log("2️⃣ Gemini 로 최적 글 선정 중...");
  const { article, reason, topic } = await selectBestArticle(articles, existingTitles);
  console.log(`\n   ✅ 선정: "${article.title}"`);
  console.log(`   📝 이유: ${reason}`);
  console.log(`   🏷️  주제: ${topic}`);
  console.log(`   🔗 원본: ${article.link}\n`);

  if (dryRun) {
    console.log("🔍 --dry-run 모드: 엔트리 생성 생략");
    if (process.env.GITHUB_OUTPUT) {
      fs.appendFileSync(process.env.GITHUB_OUTPUT, `selected_title=${article.title}\n`);
      fs.appendFileSync(process.env.GITHUB_OUTPUT, `selected_topic=${topic}\n`);
      fs.appendFileSync(process.env.GITHUB_OUTPUT, `selected_link=${article.link}\n`);
      fs.appendFileSync(process.env.GITHUB_OUTPUT, `selected_reason=${reason}\n`);
    }
    return;
  }

  console.log("3️⃣ 엔트리 생성 중...");
  const { execFileSync } = await import("child_process");
  const topicWithSource = `${topic} (출처: 긱뉴스 — ${article.title})`;

  try {
    // execFileSync (args 배열) — title 에 백틱 / shell metachar 있어도 안전
    execFileSync(
      "node",
      ["scripts/generate-lesson.mjs", "generate-custom", topicWithSource],
      { stdio: "inherit", env: { ...process.env } },
    );
  } catch (err) {
    console.error("❌ 엔트리 생성 실패:", err.message);
    process.exit(1);
  }

  if (process.env.GITHUB_OUTPUT) {
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `selected_title=${article.title}\n`);
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `selected_topic=${topic}\n`);
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `selected_link=${article.link}\n`);
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `generated=true\n`);
  }

  console.log("\n4️⃣ 프로젝트 이식 가능성 평가 중...");
  const assessment = await assessActionability(topic, article);
  if (assessment) {
    console.log(`   ✅ 이식 가능: ${assessment.target}`);
    console.log(`   📋 액션: ${assessment.action}`);
    if (process.env.GITHUB_OUTPUT) {
      fs.appendFileSync(process.env.GITHUB_OUTPUT, `actionable=true\n`);
      fs.appendFileSync(process.env.GITHUB_OUTPUT, `action_target=${assessment.target}\n`);
      fs.appendFileSync(process.env.GITHUB_OUTPUT, `action_summary=${assessment.action}\n`);
      fs.appendFileSync(process.env.GITHUB_OUTPUT, `action_detail=${assessment.detail.replace(/\n/g, '%0A')}\n`);
    }
  } else {
    console.log("   ℹ️ 이식 대상 없음 — 지식 축적용 엔트리");
    if (process.env.GITHUB_OUTPUT) {
      fs.appendFileSync(process.env.GITHUB_OUTPUT, `actionable=false\n`);
    }
  }
}

main().catch((err) => {
  console.error("❌ Fatal:", err);
  process.exit(1);
});
