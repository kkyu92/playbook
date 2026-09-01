---
date: "2026-09-01"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "3a5b2bb6b4e8cf09044e3e9415b6ca07a1f7c3de"
---


subtype: cycle-retro
cycle_n: 2716
chain_selected: review-code(heavy)
outcome: success
next_recommended_chain: review-code(heavy) 또는 fix-incident(gap 도달 시)

진단: open issue 0, unprocessed plan 0/23. gap trigger 4종 미도달(fix-incident 19/20 근접, op-analysis 0/25 리셋, info-arch 6/30, lotto 26/30). 직전8 distinct=3 — 2-chain lock 미충족.
cycle 2712/2713/2714 carry 잔여 중 TodayGameCard badge 8필드(homeRank/awayRank/homeRecent10/awayRecent10/h2hHomeWins/h2hAwayWins/homeTeamVenue/awayTeamVenue) 오도 이슈 채택 — getTodayAnalysisData가 계산 안 하고 항상 undefined, 유일 caller(analysis/page.tsx gamesWithRank)가 즉시 재계산·override.
fix: 8필드 인터페이스에서 제거(commit e6c4ac72). tsc/eslint clean, 571파일 4483건 테스트 green.
다음 사이클 추천 = matchup/team-profile 카드 컴포넌트 공유화(cycle 2713 carry) 또는 fix-incident gap 자연 도달 대기.
