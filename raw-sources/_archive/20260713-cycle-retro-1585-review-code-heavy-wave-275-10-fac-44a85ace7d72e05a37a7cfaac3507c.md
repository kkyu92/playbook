---
date: "2026-07-13"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "44a85ace7d72e05a37a7cfaac3507c890dbfa153"
---


subtype: cycle-retro
cycle_n: 1585
chain_selected: review-code (heavy)
outcome: success
next_recommended_chain: review-code (heavy)

## summary
review-code (heavy) wave-275 SUCCESS — 주석/docstring 5건 "10 factor" 하드코딩 (buildPicksStats.ts x2 + MyPicksClient.tsx x1 + mlb/factors/page.tsx x1 + FactorWaterfallChart.tsx x1) → ACTIVE_FACTOR_KEYS constant 참조 sweep.

runtime 영향 X, docstring drift 차단 only. 4 file / 5 line 변경. type-check + 1875 tests PASS. PR #2651 fast merge.

silent drift family streak wave 246+ 지속 (cycle 458 → cycle 1585 ~1127 cycle streak).

carry-over: KBO_10_FACTORS local 변수명 rename (mlb/factors + en/mlb/factors 2 file × 3 usages) = wave-276 후보.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
