---
date: "2026-08-14"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "210ad8a33f4164471d47817c678258de11a1194c"
---


subtype: cycle-retro
cycle_n: 2103
chain_selected: review-code (lite)
outcome: success
next_recommended_chain: null (main free inference next cycle)

Investigated whether MLB /mlb/team/[code] showing 7-of-14 factor averages repeats
cycle 2102's silent-drop bug (sp_xfip/war_total dropped from game-detail page despite
real DB data). Confirmed it does not: buildMlbTeamFactorAverages.ts + mlb-pipeline.ts
runPredictFinal() both explicitly document elo/recent_form/head_to_head/defense_sfr as
unimplemented neutral placeholders never persisted, gated behind plan #25 Phase 3
(op-analysis heavy backtest + user decision). No fix applied — avoided false-positive
scope creep. tsc --noEmit + eslint both clean. lotto chain's 30-cycle gap trigger fired
mechanically but had no natural actionable mapping (picks for round 1237/08-15 already
shipped cycle 2073, last completed round already OOS-verified) — correctly not forced
per the chain's own need-conditions. Retro-only cycle, no code changed.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
