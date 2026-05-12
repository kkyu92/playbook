---
date: "2026-05-12"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "8c73562214f8eceba5f021ad8f0f58e54ebac0c0"
---


subtype: cycle-retro
cycle_n: 327
chain_selected: explore-idea heavy
outcome: success
pr_number: 318
version: v0.5.47.0
retro.summary: 커뮤니티 픽 익명 집계 강화 — pick_poll_events 신규 테이블 + POST /api/picks/submit + PickButton anonymous submit 연동. 익명 방문자 픽이 poll에 집계됨. 335 tests pass.
next_recommended_chain: polish-ui
key_findings:
  - fix-incident 22 사이클 미발화 trigger 확인, 실제 버그 없음 → explore-idea heavy 선택
  - pick_poll 기존 user_picks 의존 = 닉네임 있는 사용자만 참여 문제 해결
  - pick_poll_events 분리 설계: user_picks(leaderboard) vs pick_poll_events(anonymous)
  - fire-and-forget + cancelled flag = race condition 방지
