---
date: "2026-08-23"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "eea729de830fb35e673d481d345550ddcf67b6fb"
---


subtype: cycle-retro
cycle_n: 2413
chain_selected: review-code (heavy)
outcome: success

review-code(heavy) followed cycle 2412's named fresh targets. mlb-overview.ts
and mlb-shadow-c.ts audited clean. Found real silent-drift bug in
mlb-pipeline.ts runShadowTrain: milestone_hit compared per-day sample count
(MLB max ~15 games/day) against MILESTONE_TRIGGERS thresholds meant for
cumulative totals — permanently false since migration 049. Fixed via
cumulative sample_count query + crossing check. 90 files/1171 tests green
(+2 regression guards). Direct main commit 1b86b31c, pushed.

next_recommended_chain: gap-trigger (fix-incident 20/20 reached next cycle)
