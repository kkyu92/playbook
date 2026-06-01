---
date: "2026-06-01"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "ee6bde10f261aaaa435aeb5cff413a8fae47a730"
---


subtype: cycle-retro
cycle: 1085
chain: review-code (lite)
outcome: success
pr: null (audit only, no code changes)
next_recommended_chain: review-code (heavy, wave 13 — kbo-scores bare catch + picks/submit + picks/results + leaderboard/sync Sentry capture fix) OR fix-incident (gap=19 → cycle 1086 임박) OR explore-idea (scout #1370/#1206 refresh) OR info-arch (gap=26 → cycle 1089 fire)

summary: cycle 1084 retro carry-over (8 routes Sentry capture audit) 명확 → review-code (lite) chain 자율 매핑. 9 routes 직접 grep + read 로 actionable 후보 4건 식별:
- kbo-scores/route HIGH: bare catch line 126 swallows error, no Sentry. User-facing live score endpoint, Naver API 호출 silent failure.
- picks/submit/route MEDIUM: Supabase upsert error 500 returned w/o Sentry capture. User write path.
- picks/results/route MEDIUM: assertSelectOk throws unhandled (uncaught Promise rejection 가능). User read path.
- leaderboard/sync/route MEDIUM: Supabase upsert error 500 silent w/o Sentry. User write path.

skipped LOW/NO priority 5 routes (health/version/revalidate/picks/poll/seo/indexnow):
- health: 3x catch returns error status via 503 + status field (errors surfaced by design)
- version: pure env reflection, no error path
- revalidate: auth-gated cron, paths validated
- picks/poll: read-only, error message returned via 500
- indexnow/ping: daily cron, response status returned via body

meta-pattern: silent drift family streak 562+ cycle 지속 (cycle 458 → cycle 1085). lite scout (1085) → heavy fix (1086) cadence 자연. wave 12 (1084) 4 cron routes fix → wave 13 (1086) 4 user-facing routes fix 자연 흐름. silent drift family detection channel 7회 연속 SUCCESS (cycle 1079~1085 explore-idea 1회 제외, review-code 6회 sweep).

evidence:
- 9 routes audit complete (apps/moneyball/src/app/api/)
- Sentry capture missing 9/9 (모든 audited routes)
- Sentry usage existing: hub-dispatch + mlb/waitlist (cycle 1084 박제 confirmed)
