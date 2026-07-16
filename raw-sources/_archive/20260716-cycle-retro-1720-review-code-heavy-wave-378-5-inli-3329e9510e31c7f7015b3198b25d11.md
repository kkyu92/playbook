---
date: "2026-07-16"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "3329e9510e31c7f7015b3198b25d1181c99ca21c"
---


subtype: cycle-retro
cycle: 1720
chain: review-code (heavy)
outcome: success

diagnosis:
  - cycle 1719 explore-idea (heavy) wave-377 탑픽 배지 SUCCESS 직후
  - Feature-Drift Cycle: explore-idea → review-code 자연 교대
  - 5개 파일 inline 상수 탐지 (accuracy/page.tsx, buildAccuracyData.ts, topFactors.ts, tabpfn-import.ts)

key_findings:
  - BRIER_CALIBRATION_OK_GAP = 0.03 신규 박제 (accuracy/page.tsx calibration label)
  - ACCURACY_BASELINE 4 occurrence swap (0.5 → 단일 source)
  - ACCURACY_WEAK_RATE 1 occurrence swap (0.4)
  - ACCURACY_GOOD_RATE/PCT, ACCURACY_BASELINE_PCT swap (buildAccuracyData.ts)
  - NEUTRAL_FACTOR 2 파일 신규 import + swap (topFactors.ts, tabpfn-import.ts)
  - 267 test files, 2329 tests PASS / type-check PASS

next_recommended_chain: explore-idea (heavy)
next_reason: Feature-Drift Cycle 자연 교대 — wave-379 배지 시리즈 계속

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
