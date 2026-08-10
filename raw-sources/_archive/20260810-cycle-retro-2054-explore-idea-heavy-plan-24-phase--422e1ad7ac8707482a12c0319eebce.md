---
date: "2026-08-10"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "422e1ad7ac8707482a12c0319eebce85657a35e2"
---


subtype: cycle-retro
cycle_n: 2054
chain_selected: explore-idea (heavy)
outcome: success

cycle 2053 이 남긴 plan #24 Phase 1 MVP carry-over 를 fire. KBO
/matchup/[teamA]/[teamB] 대응 MLB /mlb/matchup/[teamA]/[teamB] 신규
라우트 완결 — mlbCanonicalPair.ts + buildMlbMatchupProfile.ts (KBO
코드 무변경, risk 최소화 위한 병렬 구현) + KO/EN page.tsx(header+
summary+sideStats+게임테이블) + /mlb/team/[code] 진입 링크. avgMargin/
blowout/closeGame 3개는 packages/shared generic 함수 그대로 재사용
(신규 복제 0건), streak/recentRecord/homeAwayEdge 3개만 MlbTeamCode
전용 클론 — 다음 review-code(heavy) dedup 대상. 신규 테스트 17건,
type-check/lint/full suite(419 files/3715 tests) 통과. PR #2911
squash 머지 완료 (1b3611a4, state=MERGED 실측 확인).

세션 중 커밋을 main 에 직접 만든 실수를 develop-cycle branch+PR
컨벤션대로 정정 — git branch 로 커밋 보존 후 checkout 기반
non-destructive 우회로 main ref 복구 (reset --hard 권한 거부 상황
대응). next_recommended: review-code(heavy) 3중복 통합 또는
explore-idea(heavy) plan #24 Phase 2.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
