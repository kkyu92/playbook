---
date: "2026-05-08"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "8dd4b342fef441a67874f34c37b2f12b5373090d"
---


subtype: cycle-retro
cycle_n: 266
chain_selected: review-code heavy
outcome: success
commit_hash: 6430281
push_method: direct main
tests: 231 passed
pass_ship: 133

retro_summary:
cycle 265 추가 신규 코드 영역 (buildTeamFactorAverages + MatchupFactorCompare) read.
silent drift 1건 발견: MatchupFactorCompare Props 의 teamA/teamB.code + .color 가 dead prop.
컴포넌트 내부에서 shortName / sampleN 만 사용. 호출자 (matchup/[teamA]/[teamB]/page.tsx) 에서
매번 채워 넘기지만 무시되던 상태. cycle 265 의도 = "우세 brand 색상" 통일 → color 사용 X 가 정상.
Props 인터페이스 { shortName: string } 으로 단순화 + 호출자 정리. 4 lines changed.
231 tests pass + next build pass. 직접 push main.

carry_over:
- src/lib/players/__tests__/silent-drift.test.ts 의 vitest MockResult 타입 에러
  (main HEAD 에도 존재, 본 cycle 변경과 무관) — 별도 cycle 에서 fix-incident chain

next_recommended_chain: explore-idea or fix-incident
next_recommended_reason:
  직전 6 cycle 중 explore-idea 4회 / review-code 2회 (heavy). 다양성 측면 explore-idea 후속 자연.
  또는 fix-incident — cycle 258 마지막 발화 ≥9 사이클 + silent-drift.test.ts type 에러 carry-over.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
