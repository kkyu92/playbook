---
date: "2026-07-14"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "05ec029a58b9da7e2b04a60b2cf6f6acd7d7a722"
---


subtype: cycle-retro
cycle_n: 1628
chain_selected: review-code (heavy) wave-300
outcome: success

diagnosis:
  - fix-incident 20-cycle gap trigger: pipeline check → CI green, no operational incident
  - wave-299 DailyPredictionSummaryBar.tsx: 3 hardcoded values found (< 2, >= 60, >= 50)
  - unused WINNER_PROB_CONFIDENT import detected + removed

execution:
  - ACCURACY_BASELINE_PCT, ACCURACY_GOOD_PCT, SUMMARY_BAR_MIN_GAMES added to shared/index.ts
  - DailyPredictionSummaryBar.tsx updated to use constants
  - test: silent-drift-wave-300.test.ts 6/6 pass
  - PR #2663 squash-merged (lint fix: WINNER_PROB_CONFIDENT removed)

retro.summary: fix-incident 20-cycle gap satisfied (pipeline clean). wave-300 silent drift in fresh wave-299 component found and resolved. 3 constants + 1 unused import cleaned.
next_recommended_chain: review-code (heavy) or explore-idea (lite if saturation reaches 12/15)
