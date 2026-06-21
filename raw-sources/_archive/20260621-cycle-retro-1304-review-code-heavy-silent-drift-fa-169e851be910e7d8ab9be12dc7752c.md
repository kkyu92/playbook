---
date: "2026-06-21"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "169e851be910e7d8ab9be12dc7752cc1e49e957f"
---


subtype: cycle-retro
cycle_n: 1304
chain_selected: review-code (heavy)
outcome: success
pr: #2081
commit: b9d359b
files_changed: 13
occurrences_swapped: 17+ (사용자 가시 2 / UI 3 / production engine 5 / backtest 4 / agent prompt 2)
tests: shared 103 / kbo-data 1051 / moneyball 1109 = 2263 passed
typecheck: pass

retro.summary: silent drift family wave 93 박제 성공. wave 85-93 = 9 consecutive review-code (heavy) dominance-positive streak. WINNER_PROB_CLAMP_MIN/MAX + clampWinnerProb 헬퍼 + invariant guard 4 test.

next_recommended_chain: review-code
next_recommended_reason: wave 94 후보 (WAR threshold / Brier baseline / FACTOR_TOTAL 0.85 / 경기 분 임계 등) 후속 sweep 가능
