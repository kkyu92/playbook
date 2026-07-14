---
date: "2026-07-14"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "bd9f54f15ce83e07672abe1c4a4e18c8c810e5ed"
---


subtype: cycle-retro
cycle_n: 1623
chain_selected: explore-idea (heavy)
outcome: success
pr: 2660 (81a8b729)

diagnosis:
  improvement saturation 12/15 → explore-idea trigger 충족
  2-chain lock: distinct=3 → no lock
  teams/[code] upcoming 예정 경기 섹션 부재 → 신규 기회

execution:
  buildTeamUpcoming.ts NEW — scheduled games + pre_game predictions inner join
  TEAM_UPCOMING_LIMIT=7 constant (wave-295 silent drift guard)
  teams/[code]/page.tsx — 예정 경기 · 예측 섹션 추가
  wave-295 guard test 5 assertions PASS (1929 total)
  lint + type-check pre-push hooks green

retro:
  saturation 12/15 redirect 성공 — explore-idea heavy ship
  CREDIT_EXHAUSTED 모드 정상 동작 (conf=0.3 표시)
  homeWinProb → 우리 팀 승리% 자동 변환 (홈/원정 자동 보정)
  날짜 셀→/predictions/[date] 링크 / 상대 셀→/analysis/game/[id] 링크

next_recommended_chain: review-code (lite) baseline post wave-295 empty stepdown

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
