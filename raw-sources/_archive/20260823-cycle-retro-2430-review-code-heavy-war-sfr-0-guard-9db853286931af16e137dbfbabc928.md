---
date: "2026-08-23"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "9db853286931af16e137dbfbabc928ffcc2ef26f"
---


subtype: cycle-retro
cycle_n: 2430
chain_selected: review-code (heavy)
outcome: success
pr_number: 3051

cycle 2429 retro carry-over(predictions/[date]/page.tsx, teams/[code]/page.tsx, matchup/[teamA]/[teamB]/page.tsx) 직접 감사.
FactorBreakdown.tsx getStatLabel() war/sfr case 에 predictor.ts 동일 gap guard 누락 발견 — WAR/SFR=0 데이터 갭 sentinel family 5th occurrence.
막대(bar)는 이미 중립 처리되나 보조 stat label 텍스트는 raw 값 노출 상태였음.
guard 추가 + 회귀 테스트 4건. PR #3051 squash 머지 완료 확인(state=MERGED).
teams/[code]/page.tsx 는 cycle 2429 fix 소비 정합, matchup 페이지는 FactorBreakdown 미사용(영향 없음).

다음 추천 = fix-incident/operational-analysis (gap trigger 순번 아직) 또는 home_war_total/home_sfr 전체 소비처 grep 으로 family 완전 소진 확인.
