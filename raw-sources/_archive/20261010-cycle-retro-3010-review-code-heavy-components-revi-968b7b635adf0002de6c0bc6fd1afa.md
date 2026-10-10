---
date: "2026-10-10"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "968b7b635adf0002de6c0bc6fd1afa3dc4fe2037"
---


subtype: cycle-retro
cycle_n: 3010
chain_selected: review-code(heavy)
outcome: success

components/reviews/ 10파일(48일 미커밋 최장기) 전수 read. MonthlyTeamStatsSortControl.tsx
의 표본순 정렬 고정 20-rank CSS cap 이 KBO(10팀) 설계라 MLB(30팀) monthly review 에서
21번째+ 팀 order 누락 → 실제 정렬 버그. WeeklyGamesSortControl/MissesSortControl 과 동일
CSS var 패턴으로 교체, 소비처 3곳 전환. 같은 class SortControl 4개(standings/leaderboard/
seasons/monthly-team-stats) 전수 대조 — leaderboard(USER_LEADERBOARD_DISPLAY_LIMIT 상수
바인딩)/standings/seasons(KBO 10팀) 안전, monthly-team-stats 만 유일 drift.

tsc/lint/test(585/585·4619/4619) PASS. 직접 main 커밋(PR 미경유, R4 범위).

next_recommended_chain: review-code(heavy) 계속 또는 fix-incident(gap 3/20) 또는 lotto(gap 2/30)
