---
date: "2026-07-14"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "f21cb58285b40654c3d92316c1e25489ff0e8bd2"
---


subtype: cycle-retro
cycle_n: 1621
chain_selected: review-code (heavy)
outcome: success
commit: 6a263193

retro.summary: wave-293 silent drift fix — 7 hardcoded .limit() calls across page.tsx/search/predictions → constants. HOME_WEEK_SCHEDULE_LIMIT(60)/HOME_TODAY_PRED_LIMIT(10)/HOME_NEXT_GAMES_LIMIT(30)/SEARCH_DATE_QUERY_LIMIT(60)/SEARCH_INDEX_PLAYER_FETCH_LIMIT(200)/SEARCH_INDEX_DATE_FETCH_LIMIT(200)/PREDICTIONS_HISTORY_LIMIT(200). 16 tests pass.
next_recommended_chain: review-code (lite) baseline post wave-293 empty stepdown OR explore-idea (lite) saturation check (11/15)

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
