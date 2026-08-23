---
date: "2026-08-23"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "34608722a13ac2c0f73522135790fef08bd7fe82"
---


subtype: cycle-retro
cycle_n: 2349
chain_selected: fix-incident
outcome: success
next_recommended_chain: explore-idea 또는 op-analysis

cycle 2348 review-code(heavy)가 문서 정정에 그치고 범위 밖으로 남긴 MLB Elo
가중치 silent no-op(mlb_team_elo 테이블은 매일 갱신되지만 predict_final이
전혀 읽지 않아 10% 가중치 항상 no-op)을 직접 코드 확인 후 발견해 wiring.
buildMlbTeamFactorAverages/buildMlbTeamProfile도 부수 효과로 자연 복구.
commit 5b2ac6a4. 나머지 3팩터(최근폼/상대전적/수비SFR)는 계산 로직 자체가
없어 Tier 3 규모 — 별도 plan 분리 검토 대상으로 다음 cycle carry-over.
