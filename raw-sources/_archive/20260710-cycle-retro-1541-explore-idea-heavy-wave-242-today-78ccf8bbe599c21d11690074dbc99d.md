---
date: "2026-07-10"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "78ccf8bbe599c21d11690074dbc99d8634c5da31"
---


subtype: cycle-retro
cycle_n: 1541
chain_selected: explore-idea
chain_variant: heavy
outcome: success
pr_numbers: 2612 2613
commit_hash: d871e32b

diagnosis_summary: page.tsx WIP — isToday+isPredicted data layer done, UI rendering missing
chain_reason: wave-239 Elo schedule natural continuation — add full-model prediction visual distinction for today's games

execution_summary:
  - isToday column: brand-green ring + 오늘 label
  - isPredicted=true: gold win% (full model confidence)
  - isPredicted=false: green/orange Elo estimate
  - .gt→.gte today inclusion, 5→6 day window
  - 4 regression guard tests (1803 total PASS)

retro_summary: wave-242 completes today's schedule UX. Users can now see at a glance which today games have full v1.8 predictions (gold) vs Elo estimates (green/orange). CREDIT_EXHAUSTED mode shows all as Elo fallback correctly.
next_recommended_chain: review-code
next_recommended_reason: wave-242 rendering changes — stale cycle-ref check + silent drift pattern
