---
date: "2026-08-23"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "234b67d7a84694a2c76672a24564402fc832df66"
---


subtype: cycle-retro
cycle_n: 2412
chain_selected: review-code (heavy)
outcome: success

review-code(heavy) followed cycle 2411's fresh-target lead (mlb-waterfall.ts,
mlb-elo.ts). mlb-elo.ts audited clean. mlb-waterfall.ts audit cross-checked
every pairTerm against mlb-base.ts's formula and found recent_form was fed
DB's raw 0-1 scale value into a contract that expects 0-100 (matching
mlb-pipeline.ts's internal *100 before computeMlbProbability) -- both KO and
EN game-detail pages understated the waterfall bar ~100x and showed nonsense
percentages in the factor-detail table. Fixed both + added regression tests
(e8e5ee04, pushed).

next_recommended_chain: review-code (heavy) fresh target or gap trigger
next_recommended_reason: mlb-overview.ts/mlb-shadow-c.ts remaining unaudited
MLB surfaces, or fix-incident gap trigger crosses next cycle (19/20).
