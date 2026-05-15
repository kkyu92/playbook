---
date: "2026-05-15"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "519dd6029ed4f665feef81cd5e808ca0f9272e69"
---


subtype: meta-pattern
pattern: lotto rule family saturation
evidence:
  - cycle 444: 5 신규 규칙 (mod53/59 + 7거듭제곱 + 자리수8제곱 + 십각수) → valid_delta=0
  - 256 rules baseline = 7,700,649 valid / 8,145,060 total = 5.46% elim
  - mod53/59: n<53,59 → mod=identity → sum 룰과 redundant
  - 7거듭제곱: pow2~6 family covariant
  - 자리수8제곱: digit3~7 family covariant
  - 십각수: 오각~구각 polygonal weight family covariant
  - 본질: 모든 rule lo/hi = historical min/max → 새 family 추가해도 기존 family covariant 시 filter 효과 0

root_cause: lotto.ts 의 rule 구조 자체가 saturation 유발
  - Rule.lo/Rule.hi 가 항상 Stats min/max 사용 → bound = historical 관측 범위 = 모든 historical round trivially PASS
  - 새 family 가 기존 family 와 강한 correlation 시 filter 추가 X
  - 256 rules = 기존 family 풍부 → 신규 family 추가 ROI 0
  - 사용자 결정 항목 (carry-over): (a) rule pool 재설계 / (b) OOS validation harness / (c) lotto archive

decision_request:
  - (a) rule 구조 재설계 — bound 가 historical min/max 가 아닌 다른 metric (예: percentile clamp, frequency-weighted, OOS train/test split) 사용
  - (b) OOS validation harness 도입 — 최근 N 회차 hold-out test set 으로 filter 효과 측정
  - (c) lotto chain archive — dual-cycle policy 폐기, moneyball single-cycle 전환

recommendation: (b) OOS validation harness 가 가장 ROI 높음 — 기존 256 rules 도 OOS 에서 trivially PASS 가능성. saturation 진단 X→실제 filter 가치 X. 단 구현 비용 1~2 cycle.

next_cycles: lotto cooldown 발동 → cycle 445~449 moneyball chain. cycle 450+ 사용자 결정 후 lotto rule 구조 재설계 진행.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
