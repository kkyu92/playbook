---
date: "2026-08-10"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "4a2612467b860c1e53ecaab8a3e365232397ad29"
---


subtype: cycle-retro
cycle_n: 2049
chain_selected: explore-idea (lite scope)
outcome: success
pr: #2907 (074dacfc, MERGED 실측 확인)

buildPitcherProfile 이 이미 조회하던 ourScore/opponentScore/status 를
W/L 집계 없이 방치하던 gap 발견. computePitcherTeamRecord 신규 함수
(신규 DB 조회 없음) 로 "이 투수 선발 등판 시 팀 실제 승/패" 지표 추가
(AI 예측 적중률과 별개 지표). team/matchup 프로필 parity gap 은 이번
진단에서 완전 소진 확인 — 다음 review-code(heavy) 는 다른 영역 필요.

next_recommended_chain: review-code (heavy, 신규 영역) 또는 explore-idea
(타자 프로필도 동일 gap 있는지 buildBatterLeaderboard 확인 필요)
