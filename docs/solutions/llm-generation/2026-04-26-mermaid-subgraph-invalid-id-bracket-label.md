# [llm-generation] Mermaid subgraph invalid id + bracket label — auto-fix 강화

**날짜**: 2026-04-26
**발생 파일**: `scripts/scout-geeknews.mjs` 가 생성한 daily-ingest 엔트리 + `scripts/lib/mermaid-fix.mjs`
**관련 PR/커밋**:
- PR #39 — daily ingest 20260426 의 `content/project-ops/generative-ai-mlops-pipeline-design-patterns.mdx` 에서 Vercel 빌드 실패
- 본 fix — `mermaid-fix.mjs` AUTO-FIX #2b 추가
**재발 여부**: **5회째** (2026-04-23 의 4번째 박제 후 또 재발).

## 문제

LLM 이 mermaid `subgraph` 의 **id 부분**을 invalid 형식 (공백 + `&` 등 특수문자) 으로 출력하면서, 동시에 `["label"]` form 을 시도:

```
subgraph Orchestration & Automation ["MLOps Platform"]
                                     ^^^^^^^^^^^^^^^^^^ bracket label form
        ^^^^^^^^^^^^^^^^^^^^^^^^^^^^ id 자리에 공백 + & (invalid)
```

Mermaid 파서는 id 를 `\w+` (alphanumeric + underscore) 만 허용. 위 형식은 파싱 실패.

## 원인

### 기존 AUTO-FIX #2 의 한계 (4번째 박제 시점 코드)

```js
if (/^\w+\s*\[".+"\]$/.test(rest)) return line; // id ["label"] form
```

이 분기가 `\w+` (valid id) 만 통과시킴. id 가 invalid 한 형태 (공백/특수문자 포함) 일 때는:
- `^".+"$` (quoted) — no
- `^[\w-]+$` (id only) — no (공백)
- `^\w+\s*\[".+"\]$` (valid id + bracket) — no (공백+&)
- `\s/ && !/[\[\]{}]/` (공백 + brackets 없음) — no (`["..."]` 의 brackets 때문)

→ **모든 분기 빠져나가서 fix 안 됨** → validation 단계가 에러로 보고하고 빌드 실패.

### 4번째 박제 의 한계점

[2026-04-23-mermaid-subgraph-space-autofix.md](./2026-04-23-mermaid-subgraph-space-autofix.md) 의 fix 는 `subgraph Data Flow` (bare id, bracket label 없음) 케이스만 처리. **`["label"]` 가 붙은 invalid id** 는 커버 못 함.

## 해결

### AUTO-FIX #2b 추가

```js
// AUTO-FIX #2b: invalid id (공백/특수문자) + bracket label
const bracketMatch = rest.match(/^(.+?)\s*\["([^"]+)"\]\s*$/);
if (bracketMatch) {
  const idPart = bracketMatch[1].trim();
  const labelPart = bracketMatch[2];
  if (idPart && !/^[\w-]+$/.test(idPart)) {
    const normalizedId =
      idPart
        .toLowerCase()
        .replace(/[^\w]+/g, "_")
        .replace(/^_|_$/g, "") || "group";
    return `${indent}subgraph ${normalizedId} ["${idPart} — ${labelPart}"]`;
  }
}
```

변환 결과:
- 입력: `subgraph Orchestration & Automation ["MLOps Platform"]`
- 출력: `subgraph orchestration_automation ["Orchestration & Automation — MLOps Platform"]`

id 는 alphanum+underscore 로 normalize, label 에는 양쪽 정보 (`<original-id> — <label>`) 결합.

### 회귀 테스트 4건 추가

- 공백+특수문자 id + bracket label → normalize
- 공백만 있는 id + bracket label → normalize
- idempotent (5회 반복 누적 없음)
- valid id + bracket label 불변 (회귀 방지)

## 사전 탐지 방법

```bash
# 새 MDX 생성 후 로컬 검증 (배포 전)
node scripts/validate-content.mjs

# mermaid-fix lib 회귀 테스트
pnpm exec vitest run scripts/__tests__/validate-content.test.mjs
```

## 체크리스트

- [ ] 새 mermaid 문법 재발 시 다음 단계: prompt constraint 강화 → detect-only → auto-fix 승격
- [ ] **6회+ 재발 시 prompt 자체 재설계** — 매번 후행 fix 추가는 무한 패치 게임. LLM 에게 mermaid 출력을 요구하지 않거나, 제한적인 chart 만 허용하는 방향 검토
- [ ] CI 에 `pnpm exec vitest run scripts/__tests__/` 자동 실행 (현재 수동)

## 메타 패턴 (4번째 박제와 비교)

| 회차 | 패턴 | fix 방식 |
|-----|------|---------|
| 1~3회 | bare id 공백 | (수동) prompt 강화 |
| 4회 | bare id 공백 (3회 prompt 무시) | AUTO-FIX #2 (auto-quote) |
| 5회 | invalid id + bracket label | AUTO-FIX #2b (id normalize + label 결합) |

**경향**: LLM 출력이 매번 미세하게 다른 invalid 형태를 생성. 단순 prompt constraint 로는 차단 불가. `mermaid-fix.mjs` 가 점점 두꺼워지는 중. 6회+ 재발 시 prompt 재설계 vs 후행 fix 의 비용 재평가 필요.

## 관련

- 4번째 박제: [2026-04-23-mermaid-subgraph-space-autofix.md](./2026-04-23-mermaid-subgraph-space-autofix.md)
- 메모리: `feedback_long_term_goal_lens.md` — 수동 반복 fix → auto-fix 승격
- Compiled truth: [`_compiled-truth.md`](./_compiled-truth.md)
- 원본 lib: `scripts/lib/mermaid-fix.mjs`
- 회귀 테스트: `scripts/__tests__/validate-content.test.mjs` "subgraph invalid id + bracket label (5번째 재발 후 추가)"
