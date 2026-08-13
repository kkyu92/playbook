---
date: "2026-08-13"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "0fcf0b2a9f10e4f7932f3702b6bcf77dfd55fac9"
---


subtype: cycle-retro
cycle_n: 2064
chain_selected: review-code (heavy)
outcome: success
pr: 2920 (merged 482d1306)

Deduped buildSeasonHeadToHead/buildMlbSeasonHeadToHead season-bucket logic
and buildMlbTeamFactorAverages' sum/count pattern (both flagged by cycle
2063 retro with file-level specificity) into packages/shared generics
(computeSeasonHeadToHeadFromGames, computeNumericAveragesFromPerspectives).
type-check/lint/test all green.

next_recommended_chain: explore-idea (heavy, plan #24 Phase 3c) or
fix-incident (lite, 20-gap check)
