# [mdx] LLM 생성 MDX 의 `{중괄호}` JSX 파싱 트랩

**날짜**: 2026-04-20
**발생 파일**: `content/harness-engineering/ai.mdx` (PR #13, auto-merge 전 block)
**관련 PR/커밋**:
- PR #13 (closed, 삭제됨) — 실패 원본
- 커밋 `d4f2c0f` — root cause fix (validation 루프)
- 커밋 `76e0abb` — PR #14 로 정상 경로 검증됨
**재발 여부**: 단발 (우리 playbook 첫 발생). ai-study 는 2026-04-12 에 같은 패턴 첫 발생.

## 문제

Issue #11 (daily-lesson) 에 사용자가 자유 텍스트 댓글 → `generate-on-pick.yml` 이 custom topic 경로 진입 → Gemini 가 MDX 본문에 `price_targets{bull_case, base_case, bear_case}` 같은 리터럴 `{...}` 포함 → Vercel prebuild 의 `validate-content.mjs` 가 **컴파일 차단**:

```
🔍 Validating 16 MDX files...
⚠️  content/harness-engineering/ai.mdx Line ~120: {중괄호} JSX 파싱 위험: "{원하는 조건}"
❌ content/harness-engineering/ai.mdx (MDX 컴파일 에러)
Could not parse expression with acorn
```

`npm run build` exit 1 → Vercel deploy FAILED → PR #13 auto-merge 도 차단.

## 원인

1. **LLM prompt 가 constraint 를 100% 보장 못 함**
   `scripts/generate-lesson.mjs` 의 prompt 가 이미 명시적으로 "{중괄호} JSX 파싱됨 — 반드시 인라인 코드(\`) 로 감싸거나 괄호()로 교체" 라고 써있었음 (line 231). Gemini 는 무시.

2. **post-generation validation 부재**
   원본 `generate-lesson.mjs` 는 Gemini 호출 후 "quality check" (h2 / code block / min length) 만 검증. MDX 컴파일 자체나 JSX 트랩 감지는 안 함. broken content 가 그대로 PR 까지 감.

3. **재생성 루프 부재**
   quality check 실패 시 단 1회 재호출 있었지만, prompt 에 구체적 에러 주입 없이 "추가로 ## / 코드블록 / 자기점검 포함하세요" 만 반복 → 핵심 결함 (JSX 트랩) 에 대한 피드백 0.

## 해결

### scripts/lib/mdx-validate.mjs (신설)

`validate-content.mjs` 의 `detectJsxTraps` + MDX `compile` 를 재사용 가능한 라이브러리로 추출:

```js
export function detectJsxTraps(content) { /* {중괄호}, <숫자, <br> 탐지 */ }
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

### scripts/validate-content.mjs (리팩토링)

기존 `detectJsxTraps` 로컬 정의 제거 → 라이브러리 import.

### scripts/generate-lesson.mjs (validation 루프 추가)

Gemini 호출 후 3회 재생성 루프 — 실패 시 구체적 에러 (컴파일 메시지 + 트랩 라인) 를 prompt 에 주입:

```js
const MAX_VALIDATION_ATTEMPTS = 3;
for (let vAttempt = 0; vAttempt < MAX_VALIDATION_ATTEMPTS; vAttempt++) {
  // API call (with own 3-retry for 503)
  // ...
  const validation = await validateMdxContent(content);
  const issues = [];
  if (!validation.valid) issues.push(`MDX 컴파일 에러: ${validation.compileError}`);
  for (const w of validation.jsxWarnings) issues.push(`Line ~${w.line}: ${w.message}`);
  if (!content.includes("## ")) issues.push("## 헤딩 누락");
  // ...
  if (issues.length === 0) break;
  if (vAttempt === MAX_VALIDATION_ATTEMPTS - 1) process.exit(1);  // fail-loud
  currentPrompt = `${prompt}\n\n중요: 이전 생성물 문제:\n${issues.join("\n")}`;
}
```

**fail-loud 설계**: 3회 모두 실패 시 workflow exit 1 → Issue 자동 close 안 됨 → 사용자가 재시도 가능.

## 사전 탐지 방법

```bash
# 커밋 전 수동 체크 (ai-study 원본 grep 패턴)
grep -n '{[a-z0-9_가-힣]' content/path/to/file.mdx   # {중괄호} 본문 포함 여부
grep -n '<[0-9]' content/path/to/file.mdx             # <숫자 패턴
grep -nE '<(br|hr|img)(?![/])' content/path/to/file.mdx  # self-closing 누락

# 로컬 full 검증
node scripts/validate-content.mjs

# 단일 파일 검증 (노출 library 사용)
node -e "import('./scripts/lib/mdx-validate.mjs').then(async m => {
  const fs = await import('fs');
  const r = await m.validateMdxContent(fs.readFileSync(process.argv[1], 'utf-8'));
  console.log(r);
})" content/path/to/file.mdx
```

## 체크리스트

- [ ] LLM 이 생성한 MDX 를 **커밋 전에** `validate-content.mjs` 로 검증했는가
- [ ] `generate-lesson.mjs` 같은 LLM 파이프라인이 **생성 직후** validation 루프 돌리는가
- [ ] 재생성 시 **구체적 에러** 를 prompt 에 주입하는가 (단순 "다시 해줘" 아님)
- [ ] validation 실패 시 **fail-loud** 하여 Issue/PR 이 broken 상태로 닫히지 않는가
- [ ] 새 LLM 파이프라인 신설 시 이 validation 재사용 (`scripts/lib/mdx-validate.mjs` import)

## 관련

- Wiki: `content/harness-engineering/guard-test-pattern.mdx` — "가드 테스트가 N 건 silent 버그 동시 폭로" 메타 패턴의 자기 적용
- 메모리: `feedback_long_term_goal_lens.md` — short-term fix 아닌 root cause 우선 원칙 적용 사례
- ai-study 원본: [`docs/solutions/mdx/2026-04-12-jsx-parsing-traps-curly-angle.md`](https://github.com/Mino777/ai-study/blob/main/docs/solutions/mdx/2026-04-12-jsx-parsing-traps-curly-angle.md) — 같은 패턴 12일 먼저 발견
- Plan: `~/.gstack/projects/kkyu92-playbook/plans/2026-04-20-ai-study-gap-roadmap.md` Phase 2
- PR: #13 (closed), #14 (merged as 76e0abb)
- 같은 카테고리 compiled truth: [`_compiled-truth.md`](./_compiled-truth.md)
