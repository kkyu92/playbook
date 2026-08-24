---
date: "2026-08-24"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "0a7f4c89f2d3e96d8b4713805ef726e9df3de6db"
---


subtype: cycle-retro
cycle_n: 2493
chain_selected: review-code (heavy)
outcome: success

진단: open issue 0, approved plan 0/29(전부 completed/archived/tier4). gap trigger 4종 미도달(fix-incident 9/20, op-analysis 14/25, info-arch 7/30, lotto 15/30). 직전 8 사이클 distinct=3 — 2-chain lock 미충족. 2492 추천대로 review-code(heavy) 계속.

실행: factor-explanations.ts(416줄) 최초 전체 감사 → 파일 자체는 견고(WAR/SFR=0 가드/dead-zone/상수 단일화 기존 wave fix 확인) → 소비부 GameAnalysisProse.tsx/MlbGameOverview.tsx 에서 marginPp 하드코딩(* 200 / - 0.5, cycle 2253 fix 가 threshold만 단일화하고 산식은 중복 남김) 발견 → FACTOR_CONTRIBUTION_SCALE/NEUTRAL_FACTOR 단일 source 참조로 정정 + 회귀 테스트 1건. tsc/test(509f/4250t)/lint 전부 clean. commit 96d04f9b + root package.json 3-way sync 정정 커밋 7708bf19(pre-push guard 즉시 감지, amend 미사용) + docs 7e2db8cc.

다음 사이클 추천: review-code(heavy) 계속 (buildPicksStats.ts/mlb-shared.ts/buildMlbTeamProfile.ts 후보) 또는 op-analysis(gap 14/25 임박).
