# [llm-generation] Compiled Truth

## 종합 (2건, 최종 갱신 2026-04-23)

- **재발 횟수**: 카테고리 내 2건. **3건 도달 시 compiled-truth 승격 검토 임계** (현재 임계 미도달).
- **현재 최선 해결책**:
  - Layer 1 — `generate-lesson.mjs` 3회 validation 루프 + 구체적 에러 주입 재생성
  - Layer 2 — `scripts/lib/mermaid-fix.mjs` auto-fix (노드 라벨 괄호 + **subgraph 공백 → quoted**)
  - Layer 3 — `validate-content.mjs` 프리빌드 fail-loud (workflow exit 1)
- **코드 게이트 승격**: 부분 — `mdx-validate.mjs` + `mermaid-fix.mjs` 추출. 더 일반화된 "LLM output validation" lib (모든 생성 파이프라인 공통) 은 아직 없음.
- **마지막 발생**: 2026-04-23

### 주요 교훈 요약

| # | 문제 | 핵심 해결 | 반복? |
|---|------|-----------|-------|
| 1 | LLM 출력이 prompt constraint 위반 (MDX {중괄호}) → broken 콘텐츠 PR 까지 진출 | post-gen validation 루프 + 구체적 에러 재주입 재생성 | 단발 (첫 인지) |
| 2 | Mermaid subgraph 공백 bare id (3회째) → prompt constraint + detect-only validation 모두 통과 실패 | mermaid-fix.mjs 에 auto-fix #2 추가 (detect → fix 승격) | 3회 재발 → auto-fix 승격 |

### 메타 패턴

- **LLM output 은 "에이전트" 가 아니라 "외부 입력"** — validation 은 필수, prompt 는 기대치 설정일 뿐.
- **재생성 시 구체적 에러 주입 필수** — "다시 해줘" 는 같은 실수 재생산. 실제 에러 메시지 + 라인 번호를 prompt 에 포함해야 수정 유도.
- **fail-loud > silent broken** — validation 실패 시 workflow 자체 실패시켜 Issue 가 broken 상태로 닫히지 않게 해야 사용자 재시도 가능.
- **detect-only → auto-fix 승격 임계: 3회 재발** — 같은 실수가 3회 LLM 재생성을 통과하면 prompt 로 막을 수 없음 입증. lib level auto-fix 로 내려야 함 (건 #2).
- **ai-study 대비 우리 앞선 부분** — ai-study 의 generate-lesson.mjs 는 아직 post-gen validation 없음 (prompt constraint + 수동 /validate-mdx command). 우리 자동 루프가 한 단계 상향.

## 개별 솔루션 목록

1. [2026-04-20 post-gen-validation-loop](2026-04-20-post-gen-validation-loop.md) — generate-lesson.mjs 에 validation 루프 + 재생성 패턴 정착
2. [2026-04-23 mermaid-subgraph-space-autofix](2026-04-23-mermaid-subgraph-space-autofix.md) — mermaid-fix.mjs 에 subgraph 공백 auto-quote 추가 (detect-only → auto-fix 승격)

## 향후 확장 예정

- `auto-cross-update-shadow.yml` (A2 Phase 0~2) 가 연결 제안 생성 시 같은 validation 패턴 적용 필요
- 새 LLM 파이프라인 (auto-PR, auto-summarize 등) 은 `mdx-validate.mjs` + 유사 retry 패턴 상속 — 누적 3건 시 공통 lib 로 승격 검토
