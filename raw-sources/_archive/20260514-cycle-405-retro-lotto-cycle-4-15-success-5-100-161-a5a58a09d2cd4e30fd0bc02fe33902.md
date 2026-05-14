---
date: "2026-05-14"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "a5a58a09d2cd4e30fd0bc02fe33902f9cbce117b"
---


subtype: cycle-retro
cycle_n: 405
chain_selected: lotto (dual-cycle, cycle 4/15)
outcome: success
pr: #430 (0f1781d)

results:
  rules: 161 → 166
  valid_combos: 7,865,181 → 7,854,422
  removed_delta: 10,759
  elim_pct: 3.44% → 3.57% (+0.13%p)

신규 5규칙:
  - mod6 합 (Σ n%6, 6-주기 합성수 모듈러)
  - mod8 합 (Σ n%8, 8-주기 2^3)
  - mod13 합 (Σ n%13, 13-주기 소수 mod)
  - 상위3개 곱 (n[3]*n[4]*n[5], 큰 수 곱)
  - 합 자리수합 (sum 의 자리수 분해, sum 정보와 직교)

elim 가속 트렌드: cycle 1/15 +0.13%p → cycle 2/15 +0.35%p → cycle 3/15 +0.40%p → cycle 4/15 +0.13%p.
peak 후 감속 — cycle 3 분산 차원 (번호분산/간격분산) 의 elim power 가 1차원 mod 류 보다 강함 확인.
다음 cycle 후보: 곱셈 차원 (중앙3곱/하위3곱/위치비곱) 또는 통계 차원 (정렬위치/비대칭).

next_recommended_chain: lotto (dual-cycle, cycle 5/15)
next_n: 25 (잔여 lotto 11 + moneyball 13)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
