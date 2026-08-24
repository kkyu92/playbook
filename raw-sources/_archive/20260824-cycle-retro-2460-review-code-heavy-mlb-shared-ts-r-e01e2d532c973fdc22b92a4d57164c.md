---
date: "2026-08-24"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "e01e2d532c973fdc22b92a4d57164c6f11ac298e"
---


subtype: cycle-retro
cycle_n: 2460
chain_selected: review-code (heavy)
outcome: retro-only

mlb-shared.ts(409줄) 전체 감사 — MLB_PRODUCTION_COHORT_RULES scoring_rule 필터(#1338
family fix) 양쪽 쿼리 이미 적용, LOWER_IS_BETTER 부호반전 정상, badge 필드 분리 설계
정상. KBO 대응 파일과 구조 일치. 신규 버그 0건. pnpm --filter moneyball test 500/4221
green. 코드 변경 없음.

next_recommended_chain: review-code(heavy, compareModels.ts/buildTeamAccuracy.ts) 또는 explore-idea
