---
date: "2026-10-16"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "027297ab552b1582d78145a864e28bd0c01bfbba"
---


subtype: cycle-retro
cycle: 3247

chain_selected: review-code(heavy)
outcome: success
summary: mlb/{matchup,calendar,methodology,accuracy,reviews} 6-page cluster
twin-audit (explore-idea saturation 13/15 → negative 4-source recheck →
review-code(heavy) continuation). 5 real bugs found+fixed via KBO-twin
comparison: calendar/matchup/accuracy missing dbDegraded banner (6+ builders
fail-silent internally, degraded flag threaded through each), methodology
factually wrong home-advantage disclosure (+1.5pp claimed vs actual ~+5.6pp
at neutral matchup), reviews hub card silently using 45-day lookback instead
of season-to-date. insights page had 2 dormant latent issues, deferred
(currently unreachable — MLB predictions.factors 100% NULL since cycle 2924).
Meta-finding: a consolidated self-check agent misjudged the matchup pair as
"clean" but an independent deep-dive sub-agent caught the real bug — pair-
level independent deep-dive proved more reliable than single self-check.
commit: 4723e617 (fix, 22 files, direct main push, tsc/eslint/vitest all
green — 596 files / 4676 tests pass)
next_recommended_chain: review-code(heavy)
next_recommended_reason: mlb/predictions (398 lines) still unaudited;
app/api fully exhausted — consider packages/kbo-data remainder or
components/ re-sweep. insights 2 dormant issues need recheck once MLB
factors pipeline wiring lands.
