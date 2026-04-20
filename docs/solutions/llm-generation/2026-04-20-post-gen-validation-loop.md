# [llm-generation] LLM 출력 post-generation validation 루프 패턴

**날짜**: 2026-04-20
**발생 파일**: `scripts/generate-lesson.mjs`
**관련 PR/커밋**:
- 커밋 `d4f2c0f` — fix 본체 (mdx-validate.mjs 신설 + validation 루프)
- PR #13 (closed) — 트리거 사건 (MDX curly brace trap)
- PR #14 (merged `76e0abb`) — fix 후 정상 경로 검증
**재발 여부**: 단발 (메타 패턴 첫 인지). 이후 모든 LLM 파이프라인에 상속 대상.

## 문제

LLM (Gemini 2.5 Pro/Flash) 이 prompt constraint 를 명시적으로 지정받아도 **무시할 수 있음**. 기존 `generate-lesson.mjs` 구조는:

```
Gemini 호출 → 3회 API retry (503 대응) → quality 1회 체크 (h2/code block 존재) → 끝
```

여기서 누락된 것:
- MDX 실제 컴파일 시도
- JSX 파싱 트랩 감지
- **실패 시 구체적 피드백으로 재생성**

결과: prompt 에 "{중괄호} 금지" 명시했음에도 Gemini 가 무시 → broken MDX 가 PR 까지 진출 → Vercel deploy FAILED (PR #13).

## 원인

### 1. "Prompt == 계약" 환상

사람 간 의사소통에서는 명시적 지시가 거의 따라지지만, LLM 은 통계적 생성기 — 특히 복잡한 prompt 에서 일부 constraint 가 무시될 확률이 상존. **prompt 는 기대치 설정, 실제 보장은 output validation**.

### 2. Quality check 의 표면성

기존 체크 (h2 / code block / min length) 는 형식 검증. **실제 컴파일 가능 여부** 는 검증 안 함. 표면 통과 ≠ 실제 건강.

### 3. 재생성 전략 부재

기존 재시도 prompt = "반드시 ## 헤딩, 코드 블록, 자기 점검 섹션을 포함하세요" 단순 반복. 실패 원인 (JSX 트랩) 에 대한 피드백 0 → 같은 실수 재생산.

## 해결

### 라이브러리 추출 — scripts/lib/mdx-validate.mjs

재사용 가능한 validation 함수:

```js
// 본문 영역의 JSX 트랩 탐지 (frontmatter + 코드블록 제외)
export function detectJsxTraps(content) { ... }

// 완전 컴파일 시도 + 경고 통합
export async function validateMdxContent(rawOrBody) {
  const { content } = matter(rawOrBody);
  const jsxWarnings = detectJsxTraps(content);
  try {
    await compile(content, { remarkPlugins: [remarkGfm] });
    return { valid: true, compileError: null, jsxWarnings };
  } catch (err) {
    return { valid: false, compileError: err.message, jsxWarnings };
  }
}
```

### generate-lesson.mjs validation 루프

```js
const MAX_VALIDATION_ATTEMPTS = 3;
let currentPrompt = prompt;
for (let vAttempt = 0; vAttempt < MAX_VALIDATION_ATTEMPTS; vAttempt++) {
  // 내부: API 호출 + 3회 API retry (503 등)
  const validation = await validateMdxContent(content);
  const issues = [];

  if (!validation.valid) issues.push(`MDX 컴파일 에러: ${validation.compileError}`);
  for (const w of validation.jsxWarnings) issues.push(`Line ~${w.line}: ${w.message}`);
  if (!content.includes("## ")) issues.push("## 헤딩 누락");
  if (!content.includes("```")) issues.push("코드 블록 누락");
  if (content.length < 500) issues.push(`본문 길이 부족 (${content.length}자)`);

  if (issues.length === 0) break;

  if (vAttempt === MAX_VALIDATION_ATTEMPTS - 1) {
    console.error("❌ Validation 3회 실패 — fail-loud 종료");
    process.exit(1);
  }

  // 구체적 에러 주입 재생성
  currentPrompt = `${prompt}\n\n중요: 이전 생성물 다음 문제:\n${issues.join("\n")}\n\n특히 {중괄호} JSX 파싱 위험...`;
}
```

### validate-content.mjs 동기화

`detectJsxTraps` 로컬 정의 제거 → 같은 lib import. prebuild / runtime 양쪽 동일 로직.

## 일반화 — 모든 LLM 파이프라인에 적용할 패턴

```
LLM generate
  ↓
validate (compile + 형식 + 형식 외)
  ↓
OK? → 진행
Fail? → 구체적 에러 주입하여 재생성 (최대 N회)
  ↓
N회 실패? → fail-loud (workflow exit 1, Issue/PR 이 broken 상태로 닫히지 않음)
```

세 가지 핵심 원칙:
1. **실제 실행 가능성 검증**. "형식 체크" 만으로 부족.
2. **구체적 에러 재주입**. LLM 도 원인 모르면 같은 실수 반복.
3. **Fail-loud**. 무인 자동화에서 silent 실패는 최악 — 재시도 기회조차 없어짐.

## 사전 탐지 방법

```bash
# 새 LLM 파이프라인 추가 시 체크리스트:
# 1. 출력 스키마 정의 — zod 또는 타입 가드
# 2. 실제 실행 시도 (MDX = compile, JSON = parse, SQL = explain)
# 3. N회 재시도 + 에러 주입 루프
# 4. 최종 실패 시 fail-loud (exit 1 or throw)

# grep 으로 누락 감지
grep -rn "generateContent\|generate_content\|chat.completions" scripts/ \
  | grep -v "validate\|compile\|parse" \
  | head -20
# → validation 없는 LLM 호출 후보 확인
```

## 체크리스트

- [ ] 새 LLM 파이프라인에서 출력 타입 명시 (Zod / TS interface)
- [ ] 생성 후 실제 실행 가능성 검증 (compile / parse / execute)
- [ ] 검증 실패 시 구체적 에러를 prompt 에 주입하여 재생성
- [ ] 최대 재시도 횟수 명시 + 이후 fail-loud
- [ ] `scripts/lib/mdx-validate.mjs` 같은 공용 라이브러리 활용 (중복 방지)
- [ ] 테스트: 의도적으로 broken output 주입 → validation 이 잡고 재생성 트리거하는지

## 관련

- 메모리: `feedback_long_term_goal_lens.md` — short-term fix 보다 root cause 우선 원칙
- 메모리: `feedback_no_self_censorship.md` — 검증/재시도 자동화 자율 판단
- Wiki: `content/harness-engineering/guard-test-pattern.mdx` — 가드 테스트가 N 건 silent 동시 폭로 (같은 검증 철학)
- Wiki: `content/prompt-engineering/prompt-versioning-and-testing.mdx` — prompt versioning 메타 (LLM 출력 신뢰성 측정)
- 같은 카테고리 compiled truth: [`_compiled-truth.md`](./_compiled-truth.md)
- 관련 solution (MDX 파싱): [`docs/solutions/mdx/2026-04-20-llm-curly-brace-jsx-trap.md`](../mdx/2026-04-20-llm-curly-brace-jsx-trap.md)
- Plan: `~/.gstack/projects/kkyu92-playbook/plans/2026-04-20-ai-study-gap-roadmap.md` Phase 2
