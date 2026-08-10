---
date: "2026-08-10"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "3dff36b51243ec40219f2324aba24485fa15e4e6"
---


subtype: cycle-retro
cycle_n: 2056
chain_selected: explore-idea (heavy, plan #24 Phase 2a)
outcome: success
pr_number: 2913
commit_hash: 2761abab

explore-idea(heavy) 성공 — cycle 2055 가 남긴 plan #24 Phase 2 carry-over를
factor compare(2a)만 fire하고 elo trend(2b)는 스코프 절제. buildMlbTeamFactorAverages.ts
+ MlbMatchupFactorCompare.tsx(locale prop KO/EN parity) 신규, KBO
FactorPerspective(8필드) 재사용 대신 MLB 7필드 shape 전용 병렬 구현(risk 최소화,
후속 review-code dedup 후보). Elo trend는 buildEloTrend.ts 가 KBO scoring_rule
cohort(PRODUCTION_COHORT_RULES) 의존이라 MLB cohort 값 미확인 리스크로 plan #24.md
carry-over 박제. 이번 cycle 도 branch+PR(#2913)+R7 우선 적용(cycle 2054 사고 교훈
정합, main 직접 커밋 실수 즉시 감지+수정). vitest 420/3720 전량 통과. skill-evolution
trigger 1/3/4/5 모두 미충족(trigger5 평가대상 review-code 5회 발화 evidence) —
정상 진행. next_recommended_chain: explore-idea (heavy, plan #24 Phase 2b) 또는
review-code (heavy).
