---
date: "2026-08-24"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "1a0235f61c402facabdbfa867b720f57a7d1abf9"
---


subtype: cycle-retro
cycle_n: 2552
chain_selected: review-code (heavy)
outcome: success

leaderboard 유저 픽 항목은 DB view HAVING COUNT(*)>=5 구조적 게이트 이미 확인.
AI 적중률 베이스라인(predictions 직접 조회, HAVING 없음)에서 weekly/monthly 초반
n=1~4 소표본 게이트 부재 신규 발견 — family 9번째 연속 재발. LeaderboardTable.tsx
조건부 "· 소표본(n<5)" 인라인 표시 추가, silent-drift-wave-671 회귀 테스트.
tsc/lint/test(529/4356) clean, 직접 main commit(8acc024c)+push.

skill-evolution trigger 평가: trigger1(누적 9>=5, 장기간 이미 true — 재발화 신호 X,
기존 관행 정합) / trigger2(5연속 fail 없음) / trigger3(2552%50=2, 미도달) /
trigger4(해당 없음) / trigger5(표본 20, review-code 창 안 발화 존재 — 미충족) 모두
미충족. ship-0 stop 미충족(최근 10 중 9 success). 마커 미생성.

next_recommended_chain: review-code (heavy)
next_recommended_reason: seasons/accuracy-shadow/mlb-accuracy 하위 컴포넌트 재확인
지속 또는 family 완전 소진 확인 시 explore-idea 다양성 redirect
