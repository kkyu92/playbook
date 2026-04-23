# [llm-generation] Mermaid subgraph 공백 bare id — auto-fix 승격

**날짜**: 2026-04-23
**발생 파일**: `scripts/generate-lesson.mjs` (gap-pull 생성기) + `scripts/lib/mermaid-fix.mjs` (검증 lib)
**관련 PR/커밋**:
- PR #34 — gap-pull 1 entry 의 `subgraph Data Flow` 가 Vercel 빌드 실패 유발
- 본 fix — `fix/mermaid-subgraph-autofix` 브랜치
**재발 여부**: 3회째. 동 카테고리 2건 (이번 건 포함). `generate-lesson.mjs:360` 주석에 "어제 mermaid subgraph 공백 2건" 이미 언급됨.

## 문제

Gemini 가 `generate-lesson.mjs` 에서 위키 엔트리 생성 시 Mermaid subgraph 를 **공백 포함 bare id** 로 출력:

```
subgraph Data Flow    ← 공백 포함, quote X, bracket form X
  A
  B
end
```

Mermaid 파서 유효 형식:
- `subgraph id` (공백 없는 단일 단어)
- `subgraph "Data Flow"` (quoted)
- `subgraph DF ["Data Flow"]` (id + bracket label)

결과: `validate-content.mjs` 프리빌드 단계에서 차단 → Vercel 빌드 FAILED → PR 머지 blocked.

## 원인

### 1. Prompt constraint 준수 실패 (3회째)

`generate-lesson.mjs:318` prompt 에 명시:
> "Mermaid subgraph 이름 공백은 id ["Label"] 형식"

하지만 Gemini 는 이 constraint 를 3회 무시. LLM 출력은 "외부 입력" — prompt 는 기대치 설정일 뿐. ([compiled-truth.md](./\_compiled-truth.md) 메타 패턴 재확인)

### 2. `mermaid-fix.mjs` 가 subgraph 는 detect-only

기존 auto-fix 는 **노드 라벨 괄호** (`A[label (with parens)]` → `A["label (with parens)"]`) 만 자동 수정. subgraph 공백은 **에러 보고만** 하고 수정 안 함.

```js
// 기존: subgraph validation (detect only)
const subgraphMatch = trimmed.match(/^subgraph\s+(.+)$/);
if (subgraphMatch && !valid_form) {
  errors.push({ message: `subgraph 형식 오류...` });  // 리포트만
}
```

→ `generate-lesson.mjs:361` 의 3회 retry 가 Gemini 에게 에러 재주입해도, 같은 문법 반복 생성 → 최대 retry 초과 → PR 까지 진출.

## 해결

### `mermaid-fix.mjs` 에 AUTO-FIX #2 추가

```js
// AUTO-FIX #2: subgraph 공백 bare id → quoted
// 패턴: `subgraph Data Flow` → `subgraph "Data Flow"`
// Skip: 이미 quoted, id + bracket label, 공백 없는 id, bracket/brace 포함
fixed = fixed
  .split("\n")
  .map((line) => {
    const m = line.match(/^(\s*)subgraph\s+(.+?)\s*$/);
    if (!m) return line;
    const indent = m[1];
    const rest = m[2];
    if (/^".+"$/.test(rest)) return line; // 이미 quoted
    if (/^[\w-]+$/.test(rest)) return line; // id only
    if (/^\w+\s*\[".+"\]$/.test(rest)) return line; // id ["label"]
    if (/\s/.test(rest) && !/[\[\]{}]/.test(rest)) {
      return `${indent}subgraph "${rest}"`;
    }
    return line;
  })
  .join("\n");
```

### 회귀 테스트 6건 추가 (`scripts/__tests__/validate-content.test.mjs`)

- `subgraph Data Flow` → auto-quote
- 5회 반복 idempotent (따옴표 누적 방어)
- 공백 없는 id 불변
- 이미 quoted 불변
- id + bracket label 불변
- 다중 단어 (`User Service Layer`)

## 사전 탐지 방법

```bash
# 새 MDX 생성 후 로컬 검증 (배포 전)
node scripts/validate-content.mjs

# mermaid-fix lib 회귀 테스트
npx vitest run scripts/__tests__/validate-content.test.mjs
```

## 체크리스트

- [ ] 새 LLM 파이프라인 (scout / cross-update / summarize) 출력에도 `fixAndValidateMermaid` 호출
- [ ] 새 Mermaid 문법 재발 시 detect-only 가 아닌 auto-fix 우선 검토
- [ ] 5회+ 재발 문법은 mermaid-fix 승격 대상 (Gemini prompt 만으로 차단 불가)
- [ ] PR CI 에 `npx vitest run scripts/__tests__/` 추가 검토 (현재는 수동 실행)

## 관련

- 메모리: `feedback_long_term_goal_lens.md` — 수동 반복 fix → auto-fix 승격 (자동화 강화)
- 같은 카테고리: [post-gen-validation-loop](2026-04-20-post-gen-validation-loop.md) — validation 루프 기초
- Compiled truth: [`_compiled-truth.md`](./\_compiled-truth.md)
- 원본 lib: `scripts/lib/mermaid-fix.mjs`
- Prompt 출처: `scripts/generate-lesson.mjs:318` (Mermaid constraint)
