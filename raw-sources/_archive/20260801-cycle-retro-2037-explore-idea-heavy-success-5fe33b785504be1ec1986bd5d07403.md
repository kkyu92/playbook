---
date: "2026-08-01"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "5fe33b785504be1ec1986bd5d07403a472b4b671"
---


subtype: cycle-retro
cycle_n: 2037
chain_selected: explore-idea (heavy)
outcome: success
pr: #2897 (merged 32db1d78)

matchup 의 computeMatchupHomeAwayEdge (맞대결 벤뉴 편차) 대칭 gap 발견 —
팀 프로필엔 시즌 전체 홈/원정 성적 편차 지표 부재. computeTeamHomeAwayEdge
추가 (teamGames 배열 재사용, 신규 DB 조회 없음, matchup 과 동일 임계값).
team<->matchup parity gap family (avgMargin/blowout/closeGame/homeAwayEdge)
양방향 완전 closed.
next_recommended_chain: review-code (heavy, 잔여 asymmetry sweep) 또는 lotto
(오늘 21:00 KST 추첨 후 OOS) 또는 explore-idea (신규 방향, parity gap 소진)
