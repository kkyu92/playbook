---
date: "2026-09-01"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "73977d1087c2498657fb9f74a1ad51e1026b3a73"
---


subtype: cycle-retro
cycle: 2705
chain_selected: review-code(heavy)
outcome: success

kbo-official.ts DEFAULT_PARK_FACTORS(하드코딩 decimal ratio)가 shared/index.ts KBO_TEAMS.parkPf(팀 persona yaml 기반)와 9구장 중 4구장에서 타자/투수 친화 방향 자체가 반대(잠실 최악 — KBO_TEAMS 극단적 투수친화 95 vs DEFAULT_PARK_FACTORS 1.02 중립~타자친화). 프로덕션 predictor.ts factors.park_factor(가중치 4%) 실제 입력 오염 상태였음. KBO_TEAMS.parkPf/100 파생값으로 교체해 단일 source 통일. tsc/lint/vitest(92 files/1218 tests) 전체 green, main 직접 push(R4/R7). 다음 추천 = review-code(heavy) rotation 계속.
