---
date: "2026-08-24"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "bcce2a38cb902c38cdb440444cbbab0a6ca0dafa"
---


subtype: cycle-retro
cycle_n: 2505
chain_selected: operational-analysis (lite)
outcome: retro-only

W34(8/17~8/23) KBO v1.8 최종 검증 n=26/46.2%, 소표본 노이즈 범위(단일 결론 금지,
가중치 재조정 X, v2.0 결정 완료 lock 유지). /reviews/weekly 라이브 페이지 필터
정합 확인(별도 정적 포스트 불필요). 진단 중 live.ts updateGameScore() 의
동점(tie) final 경기 winner_team_id 오설정 버그 발견 — cycle 140 fix
(computeWinnerTeamId)가 daily.ts 에만 적용되고 live.ts 에 전파 안 됨. standings
승/패 집계 영향권. lesson commit f1c7ea39 로 정확한 위치/재현/backfill SQL
dispatch 완료, next_recommended_chain=fix-incident.
