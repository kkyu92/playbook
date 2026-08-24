---
date: "2026-08-24"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "609ff8502a1681a79a80e592af66f1bf7df25203"
---


subtype: cycle-retro
cycle_n: 2500
chain_selected: review-code (heavy)
outcome: success

buildStandings.ts 내부 try/catch 가 fetchStandings() 실패를 삼켜 [] 반환하는
silent-drift 발견·정정 (형제 함수 buildAllTeamAccuracy/buildEloTrend 는 이미
에러 전파+captureFallback 컨벤션 준수, buildStandings 만 예외였음). home
page.tsx 의 기존 captureFallback wrapper 가 죽은 코드였던 것도 함께 활성화.
buildTeamAccuracy.ts 의 2차 occurrence 도 동일 패턴 발견해 정정.

milestone(cycle 2500, %50==0) — trigger 3 충족, skill-evolution-pending
marker 박제 (milestone deferred 2500→2501, 사례 15 mitigation 정상 작동).
