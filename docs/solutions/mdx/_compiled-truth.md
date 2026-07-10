# [mdx] Compiled Truth

## 종합 (2건, 최종 갱신 2026-06-29)

- **재발 횟수**: 2건 (cycle 1238 신규 추가)
- **현재 최선 해결책**: `scripts/lib/mdx-validate.mjs` — post-gen validation (detectJsxTraps + MDX compile) + `scripts/generate-lesson.mjs` 의 3회 재생성 루프.
- **코드 게이트 승격**: 완료 — validation 은 `validate-content.mjs` prebuild 에서 돌고, 생성 시점에도 `generate-lesson.mjs` 안에서 같은 라이브러리 돈다.
- **마지막 발생**: 2026-06-29 (cycle 1238 — ai-review.yml fix branch Test Gate, 2 MDX files blocked)

### 주요 교훈 요약

| # | 문제 | 핵심 해결 | 반복? |
|---|------|-----------|-------|
| 1 | LLM 생성 MDX 에 `{한글 중괄호}` → JSX expression 파싱 실패 | `mdx-validate.mjs` 로 생성 직후 감지 + Gemini 재호출 | 단발 (이번) |
| 2 | 테이블 셀 버전 범위 `<8.21.0` / `<=8.0.15` → JSX 여는 태그 파싱 오류 | backtick으로 감싸기 `` `<8.21.0` `` | 2개 파일 동시 (cycle 1238) |

### 메타 패턴

1. **LLM prompt constraint 는 충분조건 아님** — 프롬프트에 "중괄호 금지" 명시해도 Gemini 가 무시. **post-generation validation 없이는 broken 콘텐츠가 PR 까지 감**.
2. **ai-study 선례**: 같은 버그를 우리보다 12일 먼저 맞고 docs/solutions/ 에 개별 기록 + `/validate-mdx` 수동 command 승격. 우리는 같은 자리에서 **자동 재생성 루프** 로 접근 = 원본보다 한 단계 상향.
3. **수동 작성 MDX 도 위험**: solution #2 는 사람이 직접 작성한 테이블 셀에서 발생. LLM 생성 콘텐츠 뿐 아니라 사람이 작성한 MDX 도 `<N` 패턴에 취약.

## 개별 솔루션 목록

1. [2026-04-20 llm-curly-brace-jsx-trap](2026-04-20-llm-curly-brace-jsx-trap.md) — PR #13 실패 + root cause fix (d4f2c0f)
2. [2026-06-29 comparison-operator-jsx-tag-trap](2026-06-29-comparison-operator-jsx-tag-trap.md) — 버전 범위 `<N` / `<=N` JSX 파싱 함정 (cycle 1238, 2 files blocked)

## 향후 누적 예상 (→ solution #3 threshold)

`<N`, `<=N`, `>=N` 패턴은 보안 취약점 테이블, npm 버전 비교 등에서 반복 가능. validate-content.mjs 가 경고 감지하므로 CI gate 차단되지만, 작성 시점에 사전 방지 가이드 필요 (solution #3 threshold → pre-commit hook 또는 linter rule 승격 검토).
