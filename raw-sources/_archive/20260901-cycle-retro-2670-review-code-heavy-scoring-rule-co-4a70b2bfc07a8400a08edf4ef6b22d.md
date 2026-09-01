---
date: "2026-09-01"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "4a70b2bfc07a8400a08edf4ef6b22d2ea6b3f7c7"
---


subtype: cycle-retro
cycle_n: 2670
chain_selected: review-code (heavy)
outcome: success
retro.summary: buildAccuracyData.ts(776줄) 감사 — buildScoringRuleDayHeatmap/buildScoringRuleWeekHeatmap/buildBrierTrend 3개 함수가 CURRENT_MODEL_FILTER(v1.8)로 걸러진 rows 받아 scoring_rule cohort 비교(v1.5~v1.8-credit-fail era 비교) 기능이 구조적으로 죽어있었음. buildVersionHistory 가 이미 겪은 동일 패턴의 잔여 케이스. versionHistoryRows(unfiltered)로 3개 호출부 교체 + 회귀 테스트 신규.
next_recommended_chain: review-code (heavy)
