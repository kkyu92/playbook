---
date: "2026-08-13"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "f3d0ae96ce7737a58baf100faf58ebb71b64b104"
---


subtype: cycle-retro
cycle_n: 2080
chain_selected: explore-idea (heavy)
outcome: success
pr_number: 2930

retro.summary: plan #25 Phase 1(MLB Elo K-factor 엔진) 완료 — K=4 는 FiveThirtyEight/
Nate Silver 공개 문헌 인용(임의 선택 금지 룰 준수), migration 046 + backfill 모두
prod 적용/실행까지 완료. 부수 발견 — mlb_schedule vs MLB_TEAMS 팀 코드 7건 불일치
(park factor silent neutral fallback) 는 스코프 밖이라 TODOS.md fix-incident 후보로만
flag, 확장 안 함.

next_recommended_chain: fix-incident (heavy, mlb_schedule/MLB_TEAMS 팀 코드 불일치
7팀 park factor silent fallback — 이번 cycle 신규 발견 즉시 후속 권장)
