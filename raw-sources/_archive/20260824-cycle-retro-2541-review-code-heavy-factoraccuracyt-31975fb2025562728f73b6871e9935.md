---
date: "2026-08-24"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "31975fb2025562728f73b6871e9935d19791cd34"
---


subtype: cycle-retro
cycle_n: 2541
chain_selected: review-code (heavy)
outcome: success
retro.summary: accuracy/page.tsx 1220-line monolith audited clean on prior-fixed dims (KST/CE-banner/cohort-filter). Found FactorAccuracyTable.tsx missing SMALL_SAMPLE_N gate, sole exception to page-wide small-sample convention. Fixed with opacity-50 dimming + per-locale note (ko/mlb-ko/mlb-en). type-check/lint/test(519f/4296t) clean, direct main commit+push R4, version 115->116.
next_recommended_chain: review-code (heavy) or explore-idea (heavy)

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
