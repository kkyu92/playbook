# [llm-generation] Compiled Truth

## 종합 (1건, 최종 갱신 2026-04-20)

- **재발 횟수**: 첫 기록. 하지만 이번 1건이 드러낸 메타 결함 (prompt constraint 믿고 검증 없음) 은 **모든 LLM 파이프라인에 공통 위험**.
- **현재 최선 해결책**: `generate-lesson.mjs` 의 3회 validation 루프 + fail-loud. 향후 모든 LLM 출력 파이프라인이 같은 패턴 채택.
- **코드 게이트 승격**: 부분 — `scripts/lib/mdx-validate.mjs` 만 추출됨. 더 일반화된 "LLM output validation" lib 은 아직 없음 (Phase 3~4 검토).
- **마지막 발생**: 2026-04-20

### 주요 교훈 요약

| # | 문제 | 핵심 해결 | 반복? |
|---|------|-----------|-------|
| 1 | LLM 출력이 prompt constraint 위반 (MDX {중괄호}) → broken 콘텐츠 PR 까지 진출 | post-gen validation 루프 + 구체적 에러 재주입 재생성 | 단발 (첫 인지) |

### 메타 패턴

- **LLM output 은 "에이전트" 가 아니라 "외부 입력"** — validation 은 필수, prompt 는 기대치 설정일 뿐.
- **재생성 시 구체적 에러 주입 필수** — "다시 해줘" 는 같은 실수 재생산. 실제 에러 메시지 + 라인 번호를 prompt 에 포함해야 수정 유도.
- **fail-loud > silent broken** — validation 실패 시 workflow 자체 실패시켜 Issue 가 broken 상태로 닫히지 않게 해야 사용자 재시도 가능.
- **ai-study 대비 우리 앞선 부분** — ai-study 의 generate-lesson.mjs 는 아직 post-gen validation 없음 (prompt constraint + 수동 /validate-mdx command). 우리 자동 루프가 한 단계 상향.

## 개별 솔루션 목록

1. [2026-04-20 post-gen-validation-loop](2026-04-20-post-gen-validation-loop.md) — generate-lesson.mjs 에 validation 루프 + 재생성 패턴 정착

## 향후 확장 예정

- `auto-cross-update-shadow.yml` (A2 Phase 0~2) 가 연결 제안 생성 시 같은 validation 패턴 적용 필요
- 새 LLM 파이프라인 (auto-PR, auto-summarize 등) 은 `mdx-validate.mjs` + 유사 retry 패턴 상속 — 누적 3건 시 공통 lib 로 승격 검토
