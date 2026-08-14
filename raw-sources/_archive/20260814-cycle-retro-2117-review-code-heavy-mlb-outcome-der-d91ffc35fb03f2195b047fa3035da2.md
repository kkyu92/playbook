---
date: "2026-08-14"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "d91ffc35fb03f2195b047fa3035da2648d9f14ba"
---


subtype: cycle-retro
cycle_n: 2117
chain_selected: review-code (heavy)
outcome: success
next_recommended_chain: explore-idea
commit: bc5af7bc (PR #2949)

buildMlbTeamProfile.ts/buildMlbMatchupProfile.ts 의 predicted/actual
home-win 판정 중복 로직을 deriveMlbOutcome 공용 함수로 통합. 진단 중
"MLB is_correct 컬럼 전량 NULL"을 fix-incident 급 버그로 오인할 뻔했으나
두 소비처가 이미 일관된 워크어라운드를 갖고 있었음을 확인 -- 근접
오진단 자체가 중복 로직 위험 신호였음.

Co-authored-by: Claude Sonnet 5 <noreply@anthropic.com>
