---
date: "2026-09-02"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "4cecd8e042e9b68f816763909259980299799bac"
---


subtype: cycle-retro
cycle_n: 2805
chain_selected: review-code (heavy)
outcome: retro-only

Audited 2 remaining candidates flagged by cycle 2803: apps/moneyball/src/app/api/hub-dispatch/route.ts
(180L) + lib/hub-dispatch.ts + api/health/pipelines/route.ts (107L). HMAC verify, env guard, PII scrub
(scrubPII + scrubUrlString layering) all correct. PIPELINE_STALE_HOURS_DEFAULT=28 / PIPELINE_PREDICT_STALE_HOURS=15
centralized constants match cron schedule across 4 surfaces, no drift. One theoretical edge case (raw exception
message text embedding a URL, bypassing scrubUrlString) already documented in existing comments as accepted
risk — not a new finding. review-code(heavy) untouched-candidate backlog now exhausted. pnpm test green
(580 files/4515 tests), no code change.

next_recommended_chain: gap-fill (lotto 24/30, op-analysis 8/25, info-arch 6/30) or diminishing-return
explore-idea only if MLB postseason ETA condition changes.
