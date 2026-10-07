---
date: "2026-10-07"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "a8ca9ebb511e2e3c381ab1578a7eff9285485ec0"
---


subtype: cycle-retro
cycle_n: 2967
chain_selected: review-code(heavy)
outcome: success

review-code(heavy) continued into analysis/calendar/teams unaudited
scope (6116 lines) via subagent deep-read + cross-check against
computeCompositeDuel/factorLabels/big-match/predictor/final-reasoning/
fancy-stats/packages-shared. Found and fixed wave-343 SFR duel badge
(analysis/page.tsx:1629-1640): SFR=0 data-gap sentinel was displayed
as a real "+0.0" value on one side while the same file's WAR badge
(cycle 2407) and SFR direct-duel badge (cycle 2419) already guard this
exact sentinel correctly. Applied matching guard. Verified via
type-check/lint/test (585/585 files, 4613/4613 tests), R4 direct push
(commit 2a4ee8f1).

next_recommended_chain: fix-incident or explore-idea(plan#29 final
decision, expiry 2026-10-15) or natural 2-chain lock release to
polish-ui/design-system
