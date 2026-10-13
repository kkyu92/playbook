---
date: "2026-10-13"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "a7c7779f663d7599084f9d4e4871c9cf88be1506"
---


subtype: cycle-retro
cycle_n: 3138
chain_selected: fix-incident
outcome: success
retro.summary: Diagnosed+fixed cookie-based Supabase client forcing 44 call sites out of Next.js ISR caching (production latency probe: homepage 14.7s vs sitemap.xml 0.2-0.7s). Rewrote lib/supabase/server.ts to cookie-free client matching existing sitemap.ts precedent. Caught and fixed a build-breaking side effect in feed/route.ts. Explicitly did NOT fix app/layout.tsx's headers() call, which independently forces the whole app dynamic — flagged as separate follow-up. PR #3150 merged via R7 (commit 59eed3a7).
next_recommended_chain: fix-incident or review-code(heavy)

2-chain lock (review-code(heavy)+explore-idea, distinct=2 over last 8) redirected selection away from the forced polish-ui fallback once a production latency probe surfaced a real incident.
