---
date: "2026-08-19"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "91cccc59789fe82c1a9fe4d1868f26814ab76aa5"
---


subtype: cycle-retro

cycle_n: 2255
chain_selected: explore-idea (heavy)
outcome: success
pr_number: 2989
merge_commit: e100c6ce

summary: cycle 2254 가 추천한 plan #27 Phase 1 carry-over 를 그대로 pickup. 구현
전 KBO /picks·/leaderboard 실제 아키텍처(localStorage 우선, DB 는 join 시에만
sync) 재확인 과정에서 기존 silent gap 발견 — PickButton.tsx 가 이미 mlb-<id>
네임스페이스로 저장 중인 MLB 픽을 use-leaderboard.ts 의 숫자 파싱이 조용히
걸러내 MLB 참여자는 리더보드 join 자체가 불가능했음. mlb_user_picks(050) 테이블
+ mlb-sync route + 훅 dual-sync 로 Phase 1 완결, Phase 2/3 는 후속 cycle.

next_recommended_chain: explore-idea (heavy, plan #27 Phase 2) or review-code (heavy)
