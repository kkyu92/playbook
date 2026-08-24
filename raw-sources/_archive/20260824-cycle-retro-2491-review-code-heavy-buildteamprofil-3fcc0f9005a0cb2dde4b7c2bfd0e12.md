---
date: "2026-08-24"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "3fcc0f9005a0cb2dde4b7c2bfd0e12c1343e404c"
---


subtype: cycle-retro
cycle_n: 2491
chain_selected: review-code (heavy)
outcome: retro-only

601줄 buildTeamProfile.ts (팀 프로필 페이지 데이터 소스, KBO/MLB 공유 6개 집계 함수) 최초 전체
감사. 공유 함수 재사용 정합(buildMlbTeamProfile.ts 중복 함수 없음), 명시적 정렬(cycle 2399 정정
유지), PRODUCTION_COHORT_RULES 필터 커버리지, assertSelectOk fail-loud 래핑, 소비부(page.tsx)
라벨-스코프 일치 모두 정상 확인. 신규 이슈 0건.

다음 추천: review-code(heavy) 계속 (buildMatchupProfile.ts/buildMlbMatchupProfile.ts) 또는
op-analysis(gap 12/25) 또는 lotto(gap 13/30).
