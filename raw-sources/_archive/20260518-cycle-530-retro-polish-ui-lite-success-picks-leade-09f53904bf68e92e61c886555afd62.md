---
date: "2026-05-18"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "09f53904bf68e92e61c886555afd6252b7e26da4"
---


subtype: cycle-retro
cycle_n: 530
chain_selected: polish-ui (lite)
outcome: success
pr: 747

retro.summary: picks/leaderboard 컴포넌트 text-red-*/bg-red-* 하드코딩 8곳 → semantic token (text-error, bg-error/10, text-warning). globals.css @theme inline --color-error/#ef4444 기준 정렬. MyPicksClient 5곳 + WeeklyHistorySection 1곳 + LeaderboardTable 1곳 + LeaderboardJoinModal 1곳. type-check PASS + 616 tests PASS.
next_recommended_chain: review-code (heavy) — 추가 silent drift 점검 또는 fix-incident (20 사이클 미발화 체크)
