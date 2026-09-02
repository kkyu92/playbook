---
date: "2026-09-02"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "51ec3d20f44a4f8e89246aeceae25c3c8fd6596f"
---


subtype: cycle-retro
cycle_n: 2797
chain_selected: fix-incident
outcome: success

apps/moneyball/src/app <td> sweep (cycle 2796) covered table cells only. This
cycle grepped components/ for the same flex-1+shortTeamName pattern and found
2 more real vulnerable sites in higher-traffic reusable cards (PredictionCard,
PlaceholderCard). Fixed with whitespace-nowrap, full test/lint/typecheck green,
direct main push (da78c732).

2-chain lock check: last-8 normalized distinct=3 (review-code/polish-ui/fix-incident)
-- lock not active. Gap triggers checked: op-analysis 24/25 (near), info-arch 28/30,
lotto 15/30 -- none hit threshold. No open issues, no approved plans, CI all green.

2nd defense line: cycle 2796 retro commit verified present before this cycle began.

Next recommended: review-code(heavy) (gap 8, not locked) or wait for op-analysis
gap=25 next cycle. Wrap bug family likely exhausted across both app/ and components/
after this sweep -- remaining call sites inspected and judged low-risk (truncate/
shrink-0/inline-flex already protecting them).
