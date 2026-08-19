---
date: "2026-08-19"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "12eb613f0fadbe1cadfdf477a02bcc0891806ef7"
---


subtype: cycle-retro
cycle_n: 2223
chain_selected: explore-idea (heavy)
outcome: success
pr_number: 2973
commit_hash: 42466d02

retro.summary: KBO /predictions 홈페이지에만 있던 커뮤니티 PickButton/poll 이
MLB /mlb/games/[date] 엔 없던 구조적 gap 발견(pick_poll_events.game_id INT FK
→games(id) 가 KBO 전용, MLB external_game_id VARCHAR(20) 과 타입 불일치가 근본
원인). migration 048 mlb_pick_poll_events + mlb-submit/mlb-poll route 신규 +
PickButton league prop(localStorage 키 네임스페이스 분리) + games/[date] 페이지
wiring(status=scheduled 게이팅). 454 files/3954 tests green(+14). supabase db
push --linked 적용 확인. PR #2973 MERGED 실측 확인(gh pr view --json
state,mergedAt).

next_recommended_chain: review-code or fix-incident
next_recommended_reason: 신규 schema+route+prop surface — review-code(heavy)
감사 대상으로 적합. explore-idea<->review-code 교대 지속.
