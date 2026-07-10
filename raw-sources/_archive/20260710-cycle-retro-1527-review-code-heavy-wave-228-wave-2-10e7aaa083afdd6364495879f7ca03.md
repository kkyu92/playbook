---
date: "2026-07-10"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "10e7aaa083afdd6364495879f7ca03d24ff55339"
---


subtype: cycle-retro
cycle_n: 1527
chain_selected: review-code (heavy)
wave: wave-228
outcome: success

diagnosis:
  - wave-226 (cycle 1526) removed dev jargon from accuracy/dashboard but broke wave-208+196 stale assertions
  - wave-226 had no regression guard test (coverage gap)
  - guide/page.tsx had "실측치" + "내부 메트릭" dev jargon (MEMORY policy violation)
  - info-arch 29-cycle gap (trigger fires at cycle 1528, 1 cycle early)

execution:
  - silent-drift-wave-228.test.ts: 5 regression guard tests (accuracy/dashboard/buildAccuracyData/sentry-scrub)
  - guide/__tests__/silent-drift-wave-228.test.ts: 4 dev jargon removal guard tests
  - guide/page.tsx: "실측치" → "실제 수치", "내부 메트릭" → "예측 정확도 지표"
  - wave-208 stale assertion fixed: accuracy bias section jargon now absent (not present)
  - wave-196 stale assertion fixed: dashboard "v1.8 유지 확정 (n=178, Brier)" now absent
  - 188 test files passing (1637 tests)

retro:
  summary: Wave-226 left 2 broken tests + 0 regression guards. Wave-228 resolved all 3 gaps in 1 commit.
  next_recommended_chain: info-architecture-review
  next_recommended_reason: Cycle 1528 = 30 cycles since last info-arch fire (1498), trigger met next cycle.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
