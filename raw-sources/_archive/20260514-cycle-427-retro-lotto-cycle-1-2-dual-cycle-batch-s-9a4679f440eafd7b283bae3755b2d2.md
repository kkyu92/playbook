---
date: "2026-05-14"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "9a4679f440eafd7b283bae3755b2d211105e0f38"
---


subtype: cycle-retro
cycle_n: 427
chain_selected: lotto (dual-cycle batch 1/2, N=4 신규)
outcome: success
pr_merged: 449 (4d9d910)
rules_added: mod33 합, mod37 합, 4거듭제곱가중합, 자리수다섯제곱합, 칠각수가중합
rules_total: 241→246
pass_rate: 94.55% (52,883 시도, +0.36% vs cycle 426의 94.19%)
self_verify: 5 룰 1223회차 100% PASS (trivial — min/max data 포함)
next_recommended_chain: lotto (dual-cycle batch 2/2)
next_recommended_reason: dual-cycle policy N=4 = lotto 2 + moneyball 2. cycle 427 lotto 1/2 끝 → cycle 428 lotto 2/2

family 확장 패턴 (이번 batch):
- modular: mod25/27/29/31 → mod33 (3·11 composite) + mod37 (다음 소수)
- geometric: pow2W/pow3W → pow4W (base 4)
- digit: x²/x³/x⁴ → x⁵
- figurate: tri/sq/pent/hex → hept (Hep_k = k(5k-3)/2)
