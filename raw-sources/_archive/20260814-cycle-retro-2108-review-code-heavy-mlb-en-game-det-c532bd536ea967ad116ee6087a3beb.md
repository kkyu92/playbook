---
date: "2026-08-14"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "c532bd536ea967ad116ee6087a3bebe6b5f839b6"
---


subtype: cycle-retro
cycle_n: 2108
chain_selected: review-code (heavy)
outcome: success

review-code(heavy) on MLB game-detail area found the EN mirror page
(/en/mlb/games/[date]/[slug]) silently 404'd for every single MLB game —
it queried predictions via a KBO-only games!inner FK join against
game_id, which is always NULL for MLB rows (migration 038,
mlb-pipeline.ts:451). KO page fixed this exact bug class in cycle 2099;
the EN mirror was never synced. Rewrote to the mlb_schedule +
external_game_id pattern, brought factor set to parity (4->7).

Secondary find: both KO/EN pages claimed a static "14-factor breakdown"
(full-model constant MLB_FACTOR_COUNTS.total) directly above only 7
rendered rows — cycle 2102 expanded 5->7 rows but never fixed the
header claim, so the drift recurred. Refactored both to a self-syncing
array-length count (GAME_DETAIL_FACTOR_ROWS.length) to structurally
close this drift class. Added regression guard for EN page, updated
silent-drift-wave-78 test for the new pattern.

pnpm lint / tsc --noEmit / pnpm test (427 files, 3765 tests) all pass.
PR #2939 CI green, auto-merged (1dc80295).

next_recommended_chain: explore-idea or fix-incident (20-gap ~cycle 2115)
