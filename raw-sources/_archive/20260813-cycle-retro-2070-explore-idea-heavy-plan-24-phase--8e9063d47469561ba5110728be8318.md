---
date: "2026-08-13"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "8e9063d47469561ba5110728be8318da902d25de"
---


subtype: cycle-retro
cycle_n: 2070
chain_selected: explore-idea (heavy)
outcome: success

plan #24 Phase 3c(수렴 픽 H2H MLB 버전) 잔여 3-step 착수 완료 — MLB_SCORING_RULE/
MLB_PRODUCTION_COHORT_RULES 신규, computeMlbCompositeDuel(KBO 병렬 복제, elo/
recent_form/head_to_head/sfr 4팩터는 MLB 미구현이라 파라미터 자체 제외),
getMlbConvergencePickHeadToHeadRecord + MlbMatchupConvergencePickRecord(locale
prop) 신규, KO+EN /mlb/matchup wiring. 구현 중 신규 발견: KBO FACTOR_PICK_STRONG(8)/
COMPLETE(10) 을 그대로 쓰면 MLB netScore 최대치(6, 유효 팩터 한계)를 못 넘어 항상
빈 배열만 반환하는 dead 게이트가 됨 — MLB 전용 임계(5/6/3) 신규 정의로 해소.
computeConvergenceTeamStats 를 generic 전환(순수 함수, 동작 변화 없음)해 중복
회피. plan #24 전체 phase 완결(Phase 2b MLB Elo 시스템 부재만 blocked 잔존).
PR #2925 squash 머지 완료(ab356d0d, gh pr view state=MERGED 실측 확인).
