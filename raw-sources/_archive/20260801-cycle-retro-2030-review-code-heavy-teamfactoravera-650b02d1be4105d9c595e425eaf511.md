---
date: "2026-08-01"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "650b02d1be4105d9c595e425eaf5110b9b39fa3c"
---


subtype: cycle-retro
cycle_n: 2030
chain_selected: review-code (heavy)
outcome: success

matchup 페이지 explore-idea 7연속 wave(608, 610~616) 이후 diminishing returns 판단,
/teams 영역으로 redirect. buildTeamFactorAverages.ts 주석이 "buildTeamProfile 에서
추출" 주장했지만 실제 buildTeamProfile.ts 는 동일 5팩터 평균을 독립 재구현 —
같은 이름 다른 shape(sampleN 유무) 인터페이스가 두 파일에 따로 존재해 향후
한쪽만 수정 시 /teams/[code] vs /matchup 페이지 팩터 평균 silent divergence 위험.
타입 통합(신규 쿼리 없음) + 주석 정정으로 fix. 3653 tests + type-check green.
main 직접 commit+push (단일 파일 스코프, PR 불필요 판단 — cycle 2029 정합).

다음 추천: lotto (오늘 21:00 KST 추첨 이후 OOS 검증 자연 발화) 또는
review-code/explore-idea 교대 지속 (matchup 페이지 재방문은 회피).
