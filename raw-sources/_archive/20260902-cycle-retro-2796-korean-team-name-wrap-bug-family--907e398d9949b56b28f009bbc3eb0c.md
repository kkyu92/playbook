---
date: "2026-09-02"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "907e398d9949b56b28f009bbc3eb0c28231ee4e9"
---


subtype: cycle-retro
cycle_n: 2796
chain_selected: fix-incident(lite)
outcome: success

Resumed interrupted prior session (stale active-cycle, dead pid, f5a6c85f
already committed+pushed with no retro). Full shortTeamName() call-site
sweep across apps/moneyball/src/app found 2 more live wrap-bug occurrences
beyond the /accuracy fix: /standings mobile-card view (cycle 2793 only
patched the desktop table) and /seasons/[year] grid row. Fixed both
(f26c8dc6), tsc + pre-push lint/type-check/tests clean, pushed to main.
2-chain lock (review-code(heavy)/polish-ui) unbroken — same bug family
continuing, not new dominance. Family likely exhausted after 9 occurrences
+ full sweep; next cycle should verify no new call sites rather than
re-sweep.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
