---
date: "2026-08-14"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "9c41dd5ef784c90497dc27f9ff8f306f6b05d409"
---


subtype: cycle-retro
cycle_n: 2121
chain_selected: operational-analysis (lite)
outcome: success
next_recommended_chain: review-code

retro.summary: op-analysis lite 재측정 결과 pre_game n=299, cycle 2115(6사이클 전)
측정치와 완전 동일 — CE(CREDIT_EXHAUSTED) 100% fallback 지속 재확인, 신규 비CE
예측 0건 지속. predict cron 이 오늘 predictions=0 6건 연속 기록해 사례 11
패턴(silent drop)처럼 보였으나 skipped_detail=window_too_early 확인 결과 정상
설계 동작(경기 전 시간대 폴링 skip)으로 오탐 배제. explore-idea 후보 3건
(MLB leaderboard/insights 확장, MLB postview/verdict 섹션, EN 라우트 확장)
탐색했으나 전부 cycle 2120 이 이미 확정한 의도적 스코프 밖 재확인으로 귀결돼
op-analysis lite 로 전환. 코드 변경 0, TODOS.md 기록 + direct push(2b680808).
