---
date: "2026-08-23"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "e4e82720cbe9d6494f325e49a731ce4a99a18518"
---


subtype: cycle-retro
cycle_n: 2409
chain_selected: review-code (heavy)
outcome: success

cycle 2408 이 명시적으로 flag 한 buildMatchupProfile.ts:450 CURRENT_SCORING_RULE
단일필터 오탐 정정 + 동일 계열 buildTeamProfile.ts 도 함께 발견/정정.
PRODUCTION_COHORT_RULES(v1.8 + v1.8-credit-fail) 로 통일 — legacy credit-fail
production row 가 매치업/팀 프로필 H2H 기록에서 silent 배제되던 버그 fix.
type-check/lint/전체 테스트(500 files/4203 tests) green, pre-push green,
직접 main commit(7254ad6f) + push 완료.

next_recommended_chain: review-code (heavy) 짧은 grep pass — 남은
CURRENT_SCORING_RULE 단일필터 user-facing 경로 재확인 후 family closure 선언,
또는 gap trigger (fix-incident 16/20, op-analysis 17/25, lotto 18/30, info-arch 15/30)
