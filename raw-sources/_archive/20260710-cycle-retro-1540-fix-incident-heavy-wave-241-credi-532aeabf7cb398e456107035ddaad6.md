---
date: "2026-07-10"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "532aeabf7cb398e456107035ddaad61df0e3a766"
---


subtype: cycle-retro
cycle: 1540
chain_selected: fix-incident
chain_mode: heavy
outcome: success
pr_number: 2611
merge_commit: b55c0649

root_cause: buildEloTrend.ts filtered predictions by debate_version=CURRENT_DEBATE_VERSION.
CREDIT_EXHAUSTED predictions (since 2026-06-06) have debate_version=null → silently excluded
from team Elo trend charts. ~35 days of missing data on /teams/[code].

fix: scoring_rule IN PRODUCTION_COHORT_RULES — same pattern as homepage week-ahead Elo.
regression_guard: buildEloTrend.test.ts (2 assertions: .in() called / .eq(debate_version) absent).
tests: 198/198 files, 1799/1799 pass.

lesson: CREDIT_EXHAUSTED era (2026-06-06+) changes debate_version→null for all predictions.
Any query filtering by debate_version silently drops CREDIT_EXHAUSTED-era data.
Pattern: new features querying predictions → use scoring_rule IN PRODUCTION_COHORT_RULES.

next_recommended_chain: review-code (op-analysis 25-gap trigger at cycle 1545, 5 cycles away)

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
