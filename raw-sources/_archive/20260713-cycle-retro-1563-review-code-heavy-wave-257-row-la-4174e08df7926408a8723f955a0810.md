---
date: "2026-07-13"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "4174e08df7926408a8723f955a081007bd2bf893"
---


subtype: cycle-retro
cycle_n: 1563
chain_selected: review-code (heavy)
outcome: success

## Summary

wave-257 silent drift family — CohortComparisonHeatmap + ScoringRuleDayHeatmap ROW_LABEL 하드코딩 era 리스트 → SCORING_RULE_HEATMAP_ROWS derive. wave-255 (BrierTrendChart) + wave-256 (SCORING_RULE_HEATMAP_ROWS registry) 후속 consumer layer 완결.

- CohortComparisonHeatmap: 6-entry 정적 map → Object.fromEntries derive. 'all' 만 "전체" 특수, 나머지 identity
- ScoringRuleDayHeatmap: 기존 5-entry (v1.8-credit-fail silent 누락 → identity fallback) → 6-entry 자동 반영
- buildAccuracyData.ts:388 BrierTrendPoint.scoringRule 주석 stale era 리스트 → 등록소 참조 정정

## Chain

Trigger: cycle 1562 next_rec + registry consumer stale ROW_LABEL 발견. dominance-positive streak 인정 룰 (cycle 135) — silent drift family detection channel 자연 연속 발화 OK.

## Retro

- 1861 tests pass, tsc clean, PR #2635 fast-forward merge (R7)
- silent drift family streak ~1093 cycle (cycle 458 → cycle 1563)
- registry chain PRODUCTION_ERA_HISTORY → SCORING_RULE_HEATMAP_ROWS → ROW_LABEL 자동 반영 완결. 신규 era 추가 시 한 곳 갱신 → 전체 heatmap 표기 자동 반영

next_recommended_chain: review-code (heavy) 또는 op-analysis (lite)
