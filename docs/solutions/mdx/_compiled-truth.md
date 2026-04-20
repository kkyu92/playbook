# [mdx] Compiled Truth

## 종합 (1건, 최종 갱신 2026-04-20)

- **재발 횟수**: 첫 기록 — ai-study 원본은 2026-04-12 에 같은 `{중괄호}` 버그 맞고 docs/solutions/mdx/ 6건 누적. 우리는 12일 지각 후 첫 인지.
- **현재 최선 해결책**: `scripts/lib/mdx-validate.mjs` — post-gen validation (detectJsxTraps + MDX compile) + `scripts/generate-lesson.mjs` 의 3회 재생성 루프.
- **코드 게이트 승격**: 완료 — validation 은 `validate-content.mjs` prebuild 에서 돌고, 생성 시점에도 `generate-lesson.mjs` 안에서 같은 라이브러리 돈다.
- **마지막 발생**: 2026-04-20 (PR #13 — merge 전 validation 이 차단함)

### 주요 교훈 요약

| # | 문제 | 핵심 해결 | 반복? |
|---|------|-----------|-------|
| 1 | LLM 생성 MDX 에 `{한글 중괄호}` → JSX expression 파싱 실패 | `mdx-validate.mjs` 로 생성 직후 감지 + Gemini 재호출 | 단발 (이번) |

### 메타 패턴

- **LLM prompt constraint 는 충분조건 아님** — 프롬프트에 "중괄호 금지" 명시해도 Gemini 가 무시. **post-generation validation 없이는 broken 콘텐츠가 PR 까지 감**.
- **ai-study 선례**: 같은 버그를 우리보다 12일 먼저 맞고 docs/solutions/ 에 개별 기록 + `/validate-mdx` 수동 command 승격. 우리는 같은 자리에서 **자동 재생성 루프** 로 접근 = 원본보다 한 단계 상향.

## 개별 솔루션 목록

1. [2026-04-20 llm-curly-brace-jsx-trap](2026-04-20-llm-curly-brace-jsx-trap.md) — PR #13 실패 + root cause fix (d4f2c0f)

## 향후 누적 예상

LLM 생성물 기반 파이프라인 (daily-lesson, auto-cross-update-shadow, future auto-PR) 이 늘수록 MDX 파싱 trap 재발 가능성 높음. ai-study 의 mermaid 관련 4건 재발도 우리도 맞을 가능성. 시기 오면 이 카테고리에 추가.
