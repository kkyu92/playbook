---
date: "2026-08-23"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "96f2d22f95c3decaa91fd486a2039c56d55e398d"
---


subtype: cycle-retro
cycle_n: 2352
chain_selected: review-code (heavy)
outcome: success

cycle 2349가 predict_final에 mlb_team_elo 실측 wiring을 했지만 computeMlbWaterfall
(packages/kbo-data/src/factors/mlb-waterfall.ts)이 여전히 elo를 "항상 중립값"으로
가정해 팀별 elo 델타를 waterfall bar/factor-detail/overview 계산에서 통째로 제외하고
있던 기능적 회귀를 발견·수정 (PR #3040, MERGED a8e691b5). 발견 경로 = cycle 2348이
남긴 stale "Elo 미구현" 캡션 문구를 grep하다 실제 코드 확인으로 이어짐 — 문서 drift로
시작해서 진짜 계산 버그로 귀결된 사례.

next_recommended_chain: explore-idea 또는 review-code (2-chain alternation 자연 유지)
