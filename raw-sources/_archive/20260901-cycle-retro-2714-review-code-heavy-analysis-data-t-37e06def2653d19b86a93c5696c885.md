---
date: "2026-09-01"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "37e06def2653d19b86a93c5696c8853fd58f0146"
---


subtype: cycle-retro
cycle_n: 2714
chain_selected: review-code(heavy)
outcome: success

review-code(heavy) rotation 8연속 성공(cycle 2707 RETRO-ONLY 제외). cycle
2712 carry-over 항목 prediction_type select-only-unused 컬럼 제거
(getTodayAnalysisData/getYesterdayGames/getThisWeekPreviousGames 3곳).
서버측 embedded .eq() 필터는 select 없이도 동작하는 precedent(cycle
2678/2680)로 확인 후 안전 제거. tsc/eslint/571파일 4483건 테스트 green.

gap trigger 4종 전부 미도달(fix-incident 18/20, op-analysis 23/25,
info-arch 5/30, lotto 25/30). 2-chain lock 미충족(직전8 distinct=3).
next_recommended_chain: review-code(heavy)
