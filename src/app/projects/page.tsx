import { Header } from "@/components/header";
import { ProjectsPageClient } from "@/components/projects-page-client";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vibe Coding",
  description: "AI가 자유롭게 달릴 수 있는 환경을 만든다. 코드가 아니라 코드를 만드는 시스템 — Compound / Context / Harness Engineering으로 운영한 네 프로젝트.",
};

// ─────────────────────────────────────────────────────────────
// FOUNDATION — 두 프로젝트 모두에 깔린 AI 운영 토대
// ─────────────────────────────────────────────────────────────

const FOUNDATION_COMPOUND = [
  {
    code: "C-1",
    title: "Pre-commit QA Gate",
    detail: ".claude/settings.json의 PreToolUse 훅이 git commit 직전 vitest + next build를 자동 실행. 하나라도 실패하면 커밋 자체가 차단된다. AI가 \"통과했다고 생각함\"으로 잘못 판단할 여지를 구조적으로 제거.",
  },
  {
    code: "C-2",
    title: "Post-push /compound 리마인더",
    detail: "git push 직후 PostToolUse 훅이 \"/compound 실행\" 메시지를 자동 출력. 사람의 기억력 대신 훅이 다음 단계를 강제. 회고가 누락되는 것 자체를 시스템이 막는다.",
  },
  {
    code: "C-3",
    title: "/compound 슬래시 커맨드",
    detail: "CHANGELOG.md + docs/retros/ + docs/solutions/ + 메모리 업데이트를 한 번에 처리. 회고 → 솔루션 → 메모리 → 다음 사이클 입력으로 이어지는 루프를 5분 안에 닫는다.",
  },
  {
    code: "C-4",
    title: "Retro \"다음 후보\" → 다음 사이클의 입력",
    detail: "매 회고의 마지막 섹션에 \"다음에 할 만한 것\" 후보를 명시. 다음 세션은 그 후보를 그대로 입력으로 받는다. 사람의 to-do list가 아니라 *문서 기반 큐*. v0.9.10 → v0.9.11에서 ROI 한 사이클 만에 검증됨.",
  },
  {
    code: "C-5",
    title: "5 commit batched push",
    detail: "Vercel 무료 100 deploys/day 제한을 넘기지 않기 위해 커밋은 자유롭게, push는 스프린트 단위로 모아서. 배포 비용 자체가 아키텍처 결정에 들어간다.",
  },
];

const FOUNDATION_CONTEXT = [
  {
    code: "CE-1",
    title: "Layered Context Loading",
    detail: "매 세션 시작 시 CLAUDE.md → MEMORY.md → git log -10 → PLAN.md → git status 순서로 컨텍스트 주입. \"이전 세션이 어디까지 했는지\"를 사람의 기억이 아닌 *파일*에서 복원.",
  },
  {
    code: "CE-2",
    title: "Signal-to-Noise 압축",
    detail: "2000줄 파일 전체를 절대 읽지 않음. offset/limit으로 필요한 줄 범위만, 타입/인터페이스 우선(정보 밀도 3-5배), 마크다운 테이블 > JSON. 컨텍스트 창 유한성을 디자인 제약으로 받아들임.",
  },
  {
    code: "CE-3",
    title: "Search Before Assume",
    detail: "\"비슷한 게 있을 것 같다\"는 추측 금지. Grep/Glob으로 먼저 확인. v0.9.11 retro의 grep 한 줄(\"reflection\" 사용처 0건)이 그 자체로 안티패턴 후보를 즉시 확정한 사례.",
  },
  {
    code: "CE-4",
    title: "Write-back으로 다음 세션에 전달",
    detail: "결정·학습은 즉시 CLAUDE.md / 메모리 / docs/retros 에 기록. 같은 사고를 두 번째 세션에서 다시 발견하지 않도록 *문서가 곧 채널*.",
  },
  {
    code: "CE-5",
    title: "Pattern Following",
    detail: "새 기능 추가 시 grep으로 유사 기능 먼저 찾고 그 패턴을 따라 만든다. \"더 나은 방법\"이 있어도 일관성 우선 — 다음 에이전트가 읽을 수 있어야 함.",
  },
  {
    code: "CE-6",
    title: "에이전트별 컨텍스트 격리",
    detail: "멀티 에이전트에서 각자 자기 전문 영역만 본다. 기술 분석 에이전트는 기술 지표만, 뉴스 에이전트는 뉴스만. 자기 영역 밖의 데이터를 보면 환각이 늘어난다는 걸 운영 데이터로 학습.",
  },
];

const FOUNDATION_HARNESS = [
  {
    code: "HE-1",
    title: "입력 검증 — 쓰레기 in, 쓰레기 out",
    detail: "AI에 데이터를 넘기기 전 타입/범위/null/길이 검증. 잘못된 입력을 받지 않는 게 잘못된 출력을 사후에 잡는 것보다 100배 싸다.",
  },
  {
    code: "HE-2",
    title: "출력 검증 — AI 말 맹신 금지",
    detail: "JSON 스키마 / 숫자 합리적 범위 / 내부 일관성 / 입력 데이터와의 일치 검증. \"STRONG_BUY인데 confidence 30%\" 같은 모순을 자동 차단. AI는 자신감 있게 틀린다.",
  },
  {
    code: "HE-3",
    title: "Bounded Retry + 폴백 계층",
    detail: "재시도 → 대체 모델(Gemini→Claude→GPT) → 경량 처리 → 안전 기본값. 같은 방법 2회 실패 시 다른 접근법으로 강제 전환. \"에러를 삼키고 잘못된 결과 반환\"은 절대 금지.",
  },
  {
    code: "HE-4",
    title: "Conditional Routing",
    detail: "단순 작업 → 저비용 모델, 복잡한 판단 → 고비용 모델, 합의 높으면 토론 축소, 불확실하면 심층 분석. 라우팅 자체가 비용 제어이자 품질 제어.",
  },
  {
    code: "HE-5",
    title: "5단계 Quality Gate",
    detail: "Read → Edit → Build(0 에러) → Browser QA(최소 3페이지) → Commit. 단계 건너뛰기 불가. 게이트 자체가 사람 검토보다 더 꼼꼼한 경우가 많음(타로사주 R21에서 RLS 정적 회귀 테스트가 수동 감사를 능가).",
  },
  {
    code: "HE-6",
    title: "비용 인식 — API 콜 = 돈, 배포 = 한도",
    detail: "maxTokens 적정화(4096 → 800-1500), 프롬프트 캐싱(반복 시스템 메시지 90% 할인), 동일 요청 캐싱, 5 커밋 묶어 1 push. \"무제한\"은 존재하지 않는다.",
  },
  {
    code: "HE-7",
    title: "실패도 영구 자산화",
    detail: "타로사주 R23의 eslint 9→10 업그레이드 실패는 docs/maintenance/deferred-upgrades.md로 기록됨. 다음 시도자가 같은 조사를 반복하지 않는다. *실패도 compound 자산*이라는 것이 핵심 통찰.",
  },
  {
    code: "HE-8",
    title: "Spec-First Multi-Agent Orchestration",
    detail: "Aidy에서 검증. api-contract.md가 source of truth → 4개 AI 에이전트가 독립 구현 → Gate 1(스펙 준수) + Gate 2(통합 빌드+크로스 플랫폼 필드 동기화)로 검증. 코드가 아니라 *문서*가 진실의 원천. 20라운드 autoceo에서 Gate 1 FAIL 초기 2건 → 이후 0건.",
  },
];

// ─────────────────────────────────────────────────────────────
// PROJECTS — 같은 토대 위에서 각 프로젝트가 만든 AI 환경
// ─────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    name: "MoneyBall",
    category: "moneyball" as const,
    url: "https://moneyball-ecosystem.vercel.app/",
    color: "#10b981",
    period: "2026.04 ~",
    version: "v0.9.44",
    tagline: "13개 AI 에이전트가 적대적 토론으로 투자 판단을 도출하는 SaaS — 그러나 진짜 작업은 에이전트들이 서로 견제하도록 만든 *환경 설계*에 있다.",
    stack: ["Next.js 16", "TypeScript", "Supabase", "Claude", "Gemini", "GPT", "Upstash Redis"],
    metrics: {
      tests: 1177,
      agents: 13,
      providers: 3,
      compoundCycles: "20+ (PM v2 + 안전성 + Harness Journal 012-018)",
      smokeTests: 19,
    },
    environment: [
      {
        title: "Multi-Agent 적대적 토론 파이프라인",
        detail: "4 병렬 분석가(기술/펀더멘털/뉴스/매크로) → Bull/Bear 토론 → Judge → Trader → Risk → CIO → Devil's Advocate. 단일 에이전트가 결론을 내리는 게 아니라 *논쟁하는 구조* 자체가 환각을 줄인다. 토론 에이전트는 반드시 상대방의 가장 강한 논거(Steelman)를 먼저 제시한 후에야 반박 가능 — 허수아비 논증을 구조로 차단.",
      },
      {
        title: "Multi-Provider Circuit Breaker",
        detail: "Claude 429가 피크 시간에 10분 3회 발생. Circuit Breaker 없으면 서비스 중단. 3회 연속 실패 → 2분 쿨다운 → 반개방에서 1회 재시도. 에이전트별로 최적 모델 라우팅(데이터 분석→Gemini, 비판적 분석→Claude, 토론→GPT). 프로바이더별 독립 상태 관리.",
      },
      {
        title: "Memory-Based Learning Loop",
        detail: "BM25로 과거 유사 트레이딩을 검색해서 Bull/Bear 토론에 교훈을 주입. 단, \"현재 데이터를 우선하라\" 앵커링 방지 프롬프트를 항상 같이 넣는다. 에이전트가 자기 과거를 보고 학습하는 루프 — *AI 시스템이 시간을 가로질러 자기 자신과 협업*.",
      },
      {
        title: "Trading Reflection 회고 자동화",
        detail: "trade_memories.reflection + lessons_learned 필드 — 분석 결과의 1주/1달 후 alpha 측정, was_correct 여부와 함께 회고를 자동 생성. 적중/빗나감 색상 분기로 사용자에게도 노출. AI가 자기 트레이딩을 *돌아보고 다음 분석에 반영*하는 두 번째 루프.",
      },
      {
        title: "Confidence Calibration (3 버킷 + 단조성)",
        detail: "lib/portfolio/calibration.ts: confidence를 low(<60)/mid(60-75)/high(≥75) 3 버킷으로 분류해서 실제 alpha와 비교. 단조성 검사로 \"높은 confidence가 정말 더 높은 성과를 내는지\"를 측정. AI 자신감과 실제 적중률의 간극을 데이터로 추적.",
      },
      {
        title: "Layered Quality Guards 프롬프트 조립",
        detail: "공통 가드(베이스레이트, 정량적 근거 필수) → 역할별 가드(PM에게만 프리모템, 펀더멘탈에게만 기대치 갭) → 상황별 가드(모멘텀 다이버전스). 3단 레이어로 시스템 프롬프트를 조립 + Claude cache_control: ephemeral로 90% 할인.",
      },
      {
        title: "Runtime Validation 5 Layer (Journal 012-018)",
        detail: "10/10 에이전트에 Layer 1-4 적용 완료. JSON 파싱 → type guard 검증 → retry → instruction augmentation. validator 실패 시 구체적 오류를 프롬프트에 추가해서 LLM이 자기 출력을 교정. Zod 대신 순수 TypeScript type guard 선택 — 동시 세션 lock file 충돌 방지 + 기존 패턴 일관성.",
      },
      {
        title: "LLM-as-a-Judge 품질 자동 측정",
        detail: "분석 완료 후 Gemini Flash로 4차원 채점(data_accuracy, logic_consistency, risk_awareness, actionability). fire-and-forget으로 비차단 실행, DB에 quality_score 저장. 프롬프트 A/B 테스트의 정량적 근거.",
      },
    ],
    cycles: [
      {
        title: "PM v2 Phase 1~5 — 백엔드와 UI 가시화를 한 사이클 안에",
        detail: "v0.9.7 retro에서 검증한 \"한 사이클은 백엔드만 하지 말고 UI 가시화까지\" 패턴이 v0.9.8/9/10에 모두 적용됨. 매 사이클 끝에 *유저가 보이는 결과물*. 순수 로직은 lib/portfolio/ 모듈로 분리해서 테스트 100%, UI 컴포넌트는 모듈 호출만 — 테스트 부담 분리.",
      },
      {
        title: "안티패턴 발견 → 즉시 솔루션 → 다음 사이클 입력 (Compound Learning 실증)",
        detail: "v0.9.9에서 \"DB 저장 + UI 미사용 필드\" 안티패턴 1건 발견 → docs/solutions/workflow/2026-04-11-db-stored-ui-unused-fields.md 작성 → 메모리에 기록 → v0.9.10에서 두 번째 사례를 *retro가 가이드한 대로* 즉시 발견 → v0.9.11에서 세 번째 케이스 청소(reflection+lessons_learned 가시화). retro→solution→memory→다음 사이클 입력 회로가 의도대로 작동한 첫 사례.",
      },
      {
        title: "안전성 5라운드 × 여러 사이클 (currency, react-patterns, runtime-errors)",
        detail: "R1 → R5(=compound) 5라운드 × 다회차로 환율 fetch 정리, useEffect race condition cancellation token, useQuery r.ok 가드, mutation onError 누락 차단, 외부 fetch timeout 등을 한 묶음씩 처리. 매 사이클의 R5는 compound 단계 — 회고와 솔루션이 다음 사이클의 입력이 됨.",
      },
    ],
    retrospective:
      "이 프로젝트의 진짜 산출물은 \"트레이딩 분석\"이 아니라 \"AI 에이전트들이 서로 견제하도록 만든 환경\"이다. 13개 에이전트를 일렬로 호출하는 건 누구나 할 수 있다. 어려운 건 *어떤 에이전트가 어떤 데이터만 봐야 환각이 줄어드는지*, *어느 시점에 토론을 끊어야 비용이 폭주하지 않는지*, *어느 confidence 구간이 실제로 신뢰할 만한지*를 데이터로 측정하면서 환경을 조정하는 일이다.\n\nCompound Engineering이 가장 강하게 와닿은 순간은 v0.9.10 → v0.9.11이었다. v0.9.10 retro에 \"DB 저장 + UI 미사용 필드 청소\"를 다음 사이클 후보로 명시해뒀더니, 다음 세션이 그 후보를 그대로 입력으로 받아 reflection+lessons_learned 가시화를 만들었다. 사람의 to-do list가 아니라 *문서 기반 큐*. 메모리 시스템의 ROI가 한 사이클 만에 검증된 것.\n\n가장 큰 교훈: 에이전트를 1개 더 추가하는 것보다, 에이전트가 *자기 결과를 회고하고 다음 분석에 반영하는 루프*를 만드는 게 훨씬 큰 변화를 만든다. 14개에서 멈춘 건 비용 상한($5/day) 때문이지만, 사실 그 이후는 \"몇 개를 더 붙이느냐\"가 아니라 \"이미 있는 에이전트들이 시간을 가로질러 어떻게 학습하느냐\"가 본질이었다.",
  },
];

// ─────────────────────────────────────────────────────────────
// COMPONENTS
// ─────────────────────────────────────────────────────────────

function StatBadge({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-[var(--radius-sm)] bg-bg px-3 py-1.5 text-center">
      <div className="font-data text-lg font-semibold text-text">{value}</div>
      <div className="text-xs text-muted">{label}</div>
    </div>
  );
}

function PrincipleCard({
  code,
  title,
  detail,
  accentClass,
}: {
  code: string;
  title: string;
  detail: string;
  accentClass: string;
}) {
  return (
    <div className="rounded-[var(--radius-md)] border border-border bg-surface p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className={`rounded px-1.5 py-0.5 text-xs font-bold font-code ${accentClass}`}>
          {code}
        </span>
        <h4 className="font-display text-sm font-bold text-text">{title}</h4>
      </div>
      <p className="text-xs text-muted leading-relaxed">{detail}</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PAGE
// ─────────────────────────────────────────────────────────────

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-bg">
      <Header />

      <main className="mx-auto max-w-4xl px-6 py-12">
        {/* Page header */}
        <div className="mb-12">
          <h1 className="font-display text-4xl font-black tracking-tight mb-3">
            Vibe Coding
          </h1>
          <p className="text-lg text-muted leading-relaxed mb-4">
            코드가 아니라 <span className="text-text font-semibold">환경</span>을 만든다.
            AI가 자유롭게 달릴 수 있는 울타리를 치고, 단일 에이전트부터 4개 동시 관제까지 — 매 사이클이 다음 사이클의 자산이 되도록 시스템을 쌓는다.
          </p>
          <div className="rounded-[var(--radius-md)] border border-accent/20 bg-accent/5 p-4">
            <p className="text-sm text-text leading-relaxed">
              <span className="font-bold text-accent">Compound Engineering</span> · <span className="font-bold text-accent">Context Engineering</span> · <span className="font-bold text-accent">Harness Engineering</span> 세 가지 방법론 위에서 운영.
              네 프로젝트 모두 동일한 토대를 공유하고, MoneyFlow에서 검증된 패턴이 TaroSaju/Aidy로 그대로 이식된다 — 5-Layer 검증은 TypeScript에서 Kotlin으로 언어가 바뀌어도 패턴 자체가 그대로 이식되었고, Aidy의 Spec-Driven Multi-Agent Orchestration은 단일 에이전트 하네스를 4개 동시 관제로 확장한 결과다.
              AI Study Wiki가 허브로서 양방향 복리 구조를 운영하며, 사람이 코드 한 줄을 직접 치는 비중은 거의 0에 수렴하고, 대부분의 시간은 <span className="font-semibold">에이전트가 안전하게 달릴 환경을 조정하는 일</span>에 들어간다.
            </p>
          </div>
        </div>

        {/* ───────────────────────────────────────────────────── */}
        {/* FOUNDATION                                             */}
        {/* ───────────────────────────────────────────────────── */}
        <section className="mb-20">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <span className="h-4 w-4 rounded-full bg-accent" />
              <h2 className="font-display text-3xl font-black tracking-tight">
                Foundation
              </h2>
              <span className="text-sm text-muted font-code ml-auto">
                두 프로젝트 공유 토대
              </span>
            </div>
            <p className="text-base text-muted leading-relaxed">
              모든 프로젝트가 같은 인프라 위에서 시작한다.
              훅으로 강제되는 QA 게이트, 슬래시 커맨드로 자동화된 회고 루프, 매 세션 자동 로드되는 AI 협업 헌장.
              이 토대 자체가 가장 큰 compound 자산이다.
            </p>
          </div>

          {/* Compound Engineering 워크플로 */}
          <div className="mb-10">
            <h3 className="font-display text-xl font-bold mb-2">
              <span className="text-accent">Compound</span> Engineering — 회고가 다음 사이클의 입력이 되는 루프
            </h3>
            <p className="text-sm text-muted leading-relaxed mb-4">
              <code className="font-code text-xs bg-surface px-1.5 py-0.5 rounded">.claude/settings.json</code>의 훅이 commit/push 양쪽을 강제하고,
              <code className="font-code text-xs bg-surface px-1.5 py-0.5 rounded ml-1">/compound</code> 슬래시 커맨드가 회고·솔루션·메모리 업데이트를 한 번에 처리한다.
              매 회고 끝의 &ldquo;다음 후보&rdquo;가 다음 세션의 입력 큐가 된다.
            </p>
            <div className="space-y-3">
              {FOUNDATION_COMPOUND.map((c) => (
                <PrincipleCard
                  key={c.code}
                  code={c.code}
                  title={c.title}
                  detail={c.detail}
                  accentClass="bg-accent/10 text-accent"
                />
              ))}
            </div>
          </div>

          {/* Context Engineering */}
          <div className="mb-10">
            <h3 className="font-display text-xl font-bold mb-2">
              <span className="text-cat-prompt">Context</span> Engineering — AI에게 무엇을 보여줄 것인가
            </h3>
            <p className="text-sm text-muted leading-relaxed mb-4">
              <span className="italic">&ldquo;AI는 보여준 만큼만 안다. 잘 보여주면 시니어, 못 보여주면 인턴.&rdquo;</span>{" "}
              매 세션 시작 시 정해진 순서로 컨텍스트를 주입하고, 노이즈를 배제하고, 패턴을 따른다.
              이 6원칙이 두 프로젝트의 <code className="font-code text-xs bg-surface px-1.5 py-0.5 rounded">AI-AGENT-GUIDE.md</code>에 박혀 있어 모든 세션이 동일한 출발점을 갖는다.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {FOUNDATION_CONTEXT.map((c) => (
                <PrincipleCard
                  key={c.code}
                  code={c.code}
                  title={c.title}
                  detail={c.detail}
                  accentClass="bg-cat-prompt/10 text-cat-prompt"
                />
              ))}
            </div>
          </div>

          {/* Harness Engineering */}
          <div className="mb-4">
            <h3 className="font-display text-xl font-bold mb-2">
              <span className="text-cat-rag">Harness</span> Engineering — AI에게 어떤 울타리를 칠 것인가
            </h3>
            <p className="text-sm text-muted leading-relaxed mb-4">
              <span className="italic">&ldquo;말(Horse)에 하네스(Harness)를 씌워서 원하는 방향으로 안전하게 달리게 한다.&rdquo;</span>{" "}
              범위 제한 + 검증 + 폴백 + 라우팅 + 비용 제어. 7원칙이 모든 AI 호출과 모든 커밋에 적용된다.
              단계 건너뛰기 불가, 폴백 없는 호출 금지, 검증 없는 출력 금지.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {FOUNDATION_HARNESS.map((h) => (
                <PrincipleCard
                  key={h.code}
                  code={h.code}
                  title={h.title}
                  detail={h.detail}
                  accentClass="bg-cat-rag/10 text-cat-rag"
                />
              ))}
            </div>
          </div>
        </section>

        {/* ───────────────────────────────────────────────────── */}
        {/* PROJECTS                                               */}
        {/* ───────────────────────────────────────────────────── */}
        <div className="mb-6">
          <h2 className="font-display text-3xl font-black tracking-tight mb-2">
            Projects
          </h2>
          <p className="text-base text-muted leading-relaxed">
            같은 토대 위에서 각 프로젝트가 만든 AI 운영 환경.
            기능 목록이 아니라 <span className="text-text font-semibold">에이전트가 어떻게 안전하게 달리는가</span>의 기록.
          </p>
        </div>

        <ProjectsPageClient projects={PROJECTS} />
      </main>
    </div>
  );
}
