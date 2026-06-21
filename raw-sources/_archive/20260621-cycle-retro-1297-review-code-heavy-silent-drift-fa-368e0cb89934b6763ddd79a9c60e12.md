---
date: "2026-06-21"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "368e0cb89934b6763ddd79a9c60e1210125fe1ff"
---


subtype: cycle-retro
cycle_n: 1297
chain_selected: review-code (heavy)
outcome: success
pr: #2075
commit: b668f8d (merge ae84b3b)

retro:
  summary: silent drift family wave 89 SUCCESS — n=150 v2.0 promotion 임계 사용자 가시 11 occurrence → V2_PROMOTION_COHORT_N 단일 source swap. wave 85~88 streak 5번째 연속 사용자 가시 layer single-source. silent drift family streak ~840 cycle (cycle 458 → 1297).
  files: 6 user-visible (v2-shadow-monitor 3 / methodology 2 / about 1 / accuracy/shadow 3 / mlb/factors KO 1 / mlb/factors EN 1) + packages/shared 2 (model-version-labels.ts registry + index.ts barrel)
  smoke: pnpm --filter @moneyball/shared test 6/100 PASS + pnpm --filter moneyball test 105/1070 PASS
  next_recommended_chain: review-code (heavy)
  next_recommended_reason: silent drift family streak 6 wave 가능 — 잔존 hardcoded 후보 (Sunday cap threshold / v2.0 후보 percentage / Brier baseline / 14일 30일 윈도우). trigger 다양성 (fix-incident gap=17 / info-arch gap=16 / op-analysis gap=10) 모두 임계 미달 — review-code dominance 자연 지속.
