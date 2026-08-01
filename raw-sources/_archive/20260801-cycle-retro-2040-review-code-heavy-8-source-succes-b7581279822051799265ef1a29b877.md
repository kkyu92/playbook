---
date: "2026-08-01"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "b7581279822051799265ef1a29b877d16c066b5b"
---


subtype: cycle-retro
cycle_n: 2040
chain_selected: review-code (heavy)
outcome: success
pr_number: 2899
commit_hash: 8e78eba1

wave-621(cycle 2039, PR #2898) 이후 buildTeamFactorAverages.ts/buildTeamProfile.ts
양쪽에 8팩터(FIP/xFIP/wOBA/불펜FIP/최근폼/Elo/SFR/WAR) 평균 계산 로직(sum/count
누적 + safeAvg)이 독립 중복 — cycle 2034/2036 review-code heavy 와 동일 패턴의
잔여 gap. packages/shared 에 computeFactorAveragesFromPerspectives 신규 export,
양쪽 caller 를 perspective-mapping 후 shared 함수 호출로 교체 + EMPTY_FACTOR_AVERAGES
리터럴 중복도 제거. PR #2899 squash-merge (8e78eba1). tsc clean + 3678/202 tests
passed + lint clean.

next_recommended_chain: explore-idea (Feature-Drift Cycle 교대 지속) 또는
lotto/operational-analysis (주기 trigger 근접 도달 — gap 28/30, 21/25)
