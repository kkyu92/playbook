---
date: "2026-10-14"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "897498f20e2bb8617362de9c223772d93e5608db"
---


subtype: cycle-retro
cycle_n: 3208
chain_selected: review-code(heavy)
outcome: success
pr: 3152
commit: 3a2a4807

retro.summary: apps/moneyball/src/lib 9개 서브디렉토리(insights/picks/calendar/matchup/players/standings/leaderboard/accuracy/changelog) 전수 감사. players/ 디렉토리에서 #1338 family 코호트 drift 1건 발견 — buildPitcherLeaderboard.ts/buildPitcherProfile.ts 가 CURRENT_MODEL_FILTER exact-match 사용 중이라 legacy CE fallback cohort(v1.8-credit-fail) silent 배제, matchup/teams/standings 는 이미 정정했으나 players만 누락 + 회귀 테스트가 옛 동작 lock-in. PRODUCTION_COHORT_RULES .in() 전환 + 테스트 갱신, 전체 vitest 4657 tests 통과, PR #3152 CI green squash merge 완료. Supabase DNS NXDOMAIN + moneyballscore.com whois No match 양쪽 재확인 — 변화 없음, Tier4 사용자 조치 필요 지속.

retro.next_recommended_chain: review-code(heavy) or fix-incident
retro.next_recommended_reason: apps/moneyball/src/lib 잔여 scope(reviews/dashboard/mlb/debug/teams/predictions/seasons/lotto/supabase/api/seo/stats/v2-shadow-monitor/observability) 계속 가능, mlb 디렉토리(35파일/5568줄)는 별도 scope 권장. fix-incident gap=6/20 아직 미근접.
