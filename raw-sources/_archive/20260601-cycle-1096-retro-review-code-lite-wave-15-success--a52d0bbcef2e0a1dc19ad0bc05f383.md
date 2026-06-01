---
date: "2026-06-01"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "a52d0bbcef2e0a1dc19ad0bc05f38382445aa1e5"
---


subtype: cycle-retro
cycle: 1096
chain: review-code (lite, wave 15 audit + 사례 17 family ship)
outcome: success
pr: 1496
commit: ea03b2d

cycle 1096 review-code lite wave 15 — silent drift family 사례 17 family 사용자
가시 layer 잔존 후보 grep audit 후 calendar/page.tsx L133 single line fix ship.

audit:
- predictions select 14 site grep
- /calendar L133 .eq('scoring_rule', CURRENT_SCORING_RULE) → 사례 17 family 확정
- /, /analysis 3, /accuracy 2 = .match(CURRENT_MODEL_FILTER) debate_version filter 의도 명확 family X
- daily.ts L1169 getPredictionHistory .eq = baseline calibration source 주석 명시 family X
- shadow-cohort.ts debate_version=null 시 .match 자연 제외 정합

fix:
- import CURRENT_SCORING_RULE → PRODUCTION_COHORT_RULES
- L133 .eq → .in (v1.8 + v1.8-credit-fail 양쪽 포함)
- 주석 2곳 (L11 / L125) cohort 의도 명시 갱신

silent drift family streak 약 573 cycle (cycle 458 → cycle 1096). dominance-positive
인정 룰 (cycle 135 박제) 정합 — review-code (heavy/lite) silent drift family detection
channel 자연 fire 지속.

next_recommended_chain: review-code (lite, wave 16 audit factor-bias-bootstrap-ci.ts)
/ explore-idea (plan #21 closure + 신규 plan) / lotto (gap=23, trigger 6 미달)
/ info-architecture-review (gap=7, trigger 9 미달) / operational-analysis (gap=18,
trigger 7 25-cycle 미달, but n=205 v2.0 임계 도달)

cycle 1100 = trigger 3 milestone (skill-evolution 자동 fire 4 cycle 남음).
