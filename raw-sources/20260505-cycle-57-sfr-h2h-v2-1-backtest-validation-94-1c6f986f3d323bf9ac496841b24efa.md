---
date: "2026-05-05"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
fingerprint: "1c6f986f3d323bf9ac496841b24efaca17073f9e"
---


subtype: lesson

cycle 56 spec section 4 step 1+2 부분 진행 (manual-weights + bootstrap-ci 2/5 harness).
v2.1 후보 A/B/C 가중치 추가 + Wayback Test 2024 N=727 + B=1000 bootstrap CI 측정.

결과 (point Brier):
- v1.5: 0.24940 / v2.1-A: 0.24854 / v2.1-B: 0.24830 / v2.1-C: 0.24885 / log7: 0.24661
- v2.1-B 가 point 최저 BUT 95% CI [-0.00204, +0.00393] = 0 포함

bootstrap ΔBrier 95% CI:
- 모든 비교 (v15-v16/A/B/C/log7) 가 0 포함 = 통계 유의 X
- backtest CI mean (v15-v16) +0.00050 vs prod ΔBrier +0.04160 = 82.5× 격차

cycle 56 spec section 5 R8 결정 기준 1번 미충족 → 변경 보류 + 박제만.
DEFAULT_WEIGHTS v1.5 유지. cycle 52 lesson H1a (sample noise) 후보 강화.

verdict 라벨 logic 정정 (manual-weights — point Brier 작을수록 후보 우수).

carry-over (cycle 58+):
- prod 30일 N=62 sfr/h2h bias bootstrap CI (spec step 2)
- 잔여 3 backtest harness (grid / wayback / logistic)
- H1b (data quality) / H1c (debate ensemble) 검증

Co-authored-by: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
