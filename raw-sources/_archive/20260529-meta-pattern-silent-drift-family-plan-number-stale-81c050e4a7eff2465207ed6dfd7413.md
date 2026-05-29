---
date: "2026-05-29"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "81c050e4a7eff2465207ed6dfd7413555eb3e49c"
---


subtype: meta-pattern
cycle_n: 1048
pattern_id: silent-drift-family-plan-number-stale-ref

## Pattern description

plan body 박제 시점 미래 plan number 가정 (`plan #N+1`, `carry-over plan #M+`, `후속 plan #K`) 이 실제 plan N+1 / M+ / K 박제 시점 다른 topic 으로 filled 되어 silent drift. 사용자 가시 페이지 (login/community) + 내부 docs 양쪽 누적.

## 증거 (cycle_n list)

| Cycle | Chain | File | Occurrence | Category | PR |
|---|---|---|---|---|---|
| 1047 | review-code (heavy) | megamenu-state-matrix.md + plan-18 doc + 2026-05-29 MLB spec | 8 | 내부 doc | #1425 |
| 1048 | fix-incident (lite) | login/page.tsx + community/page.tsx + v2.0-killswitch.md + feature-flag-poc-scope.md + mlb-plan-b-ui.md | 6 (2 file 2건 user-visible + 3 file 4건 doc) | 사용자 가시 2 + 내부 doc 4 | #1426 |
| **누적** | **2 sweep** | **8 file** | **14 occurrence** | **meta-pattern dispatch 임계 도달 (5+)** |

## 사례 정합

silent drift family 16번째 사례 (CLAUDE.md `memory/drift-cases.md` 박제 path):
- 사례 9 family 진화 — predict_final / shadow / cohort silent silent drop family 와 동일 구조
- 사례 14/15 family 발견 후 사례 16 신규 카테고리: "plan body 박제 시점 미래 plan number 가정"

## Mitigation 박제 (다음 plan body 박제 시 적용)

1. **금지**: `plan #N+1` / `carry-over plan #M+` / `후속 plan #K` 박제
2. **권장**: `carry-over 별도 plan TBD` 또는 `후속 plan (number 결정 시점 fill)` 사용
3. **자가 인지**: plan body 안 미래 plan number 가정 = silent drift 가능성 명시 (예: "본 plan body 박제 시점 plan #N+1 가정 X — 실제 박제 시점 next-available number 결정")

## 추천 행동

1. feedback memory 박제: `feedback_plan_body_no_future_plan_number_assumption.md` (auto-memory 영역, 본 메인 자율 박제)
2. CLAUDE.md `memory/drift-cases.md` 사례 16 정식 박제 (사용자 가시 영역, 다음 cycle 검토)
3. 신규 plan body 박제 시 본 meta-pattern 자가 인지 강제 (skill-evolution 후속 layer 검토 — 5+ 누적 시)

## 자가 의심 차단

본 meta-pattern = 객관 evidence (14 occurrence 측정 + 사용자 가시 P0 fix) 기반. "100 사이클 의미 있나?" 류 ROI 자체 의심 X (cycle 124/618 룰 정합).

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
