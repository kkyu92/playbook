---
date: "2026-05-18"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "b0d3e30f30d7e56c654efacc8e0a3cc24b89bef6"
---


subtype: cycle-retro
cycle_n: 532
chain_selected: polish-ui (lite)
outcome: success
pr: #749
merged: 2026-05-18T01:24:32Z

summary:
  analysis/page.tsx 4곳 (yesterday/yesterdayByDate 실패 chip, upset 실패 chip, upset 확신도 숫자)
  + accuracy/page.tsx 3곳 (recentForm 적중률, trend 하락, dot 표시)
  + YesterdayResultsSection.tsx 1곳 (빗나감 chip)
  = 8건 silent drift fix. text-red-*/bg-red-* → text-error/bg-error/10.
  type-check + 413 tests PASS.

silent_drift_streak: 60 cycle phase 7축 (cycle 471 → 532)
  - phase 1축 (digit grouping numeric)
  - phase 2축 (debug UI yellow)
  - phase 3축 (analysis yellow lean tier)
  - phase 4축 (accuracy amber 상한/역전)
  - phase 5축 (debug/hallucination yellow)
  - phase 6축 (testing layer validator regression)
  - phase 7축 (UI prediction-result error/warning) ← 본 fix

next_recommended_chain: fix-incident (cycle 533 활성 20-cycle trigger) 또는 review-code (heavy)
next_recommended_reason: fix-incident 20-cycle trigger 도달 (마지막 발화 cycle 513). pipeline_runs error rate + debug commit 점검 필요.
