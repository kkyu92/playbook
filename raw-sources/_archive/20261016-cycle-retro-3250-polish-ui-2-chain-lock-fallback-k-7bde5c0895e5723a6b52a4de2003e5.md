---
date: "2026-10-16"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "7bde5c0895e5723a6b52a4de2003e5f72af2d7fb"
---


subtype: cycle-retro
cycle_n: 3250
chain_selected: polish-ui (2-chain-lock fallback)
outcome: success
retro.summary: 2-chain lock(review-code(heavy)+lotto(lite)) forced fallback into polish-ui. Color-token audit came up clean, so pivoted to live visual QA on production (moneyballscore.vercel.app) which surfaced an impossible KBO standings record (90승5패 = .947 win pct). Traced to KBO's koreabaseball.com changing TeamRankDaily.aspx column order (12 cols now, 연속 added, 패/무 and 최근10/홈 swapped) — our scraper's stale 10-col assumption had every team's loss/draw counts and recent-10 record wrong on the homepage and /standings. Fixed packages/kbo-data/src/scrapers/kbo-official.ts column indices + added 3 regression tests pinned to real captured data (KT 90승49패5무, winPct 0.647). pnpm test (4676) + lint green, committed f6d1aa61, pushed to main.
next_recommended_chain: fix-incident or info-architecture-review (gap-based) or re-evaluate 2-chain lock composition
