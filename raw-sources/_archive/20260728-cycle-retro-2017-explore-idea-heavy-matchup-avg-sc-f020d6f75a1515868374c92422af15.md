---
date: "2026-07-28"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "f020d6f75a1515868374c92422af151bcbc09cc5"
---


subtype: cycle-retro
cycle_n: 2017
chain_selected: explore-idea (heavy)
outcome: success
pr: #2884 (3c67c912)

summary: review-code's matchup pct-dedup target confirmed exhausted this cycle
(grep swept all 4 matchup components — FactorCompare/RecentForm/SeasonHeadToHead/
ConvergencePickRecord — all already wired to shared helpers, zero remaining inline
pct math). Feature-Drift alternation continued with explore-idea instead: found
genuine untapped gap (avg score margin, win/loss direction agnostic) on the
already-saturated matchup page, computable from existing games array with zero
new DB queries. wave-611. Full suite 3628 tests pass, tsc/eslint clean, PR
verified state=MERGED before retro per cycle 2001 lesson.

next_recommended_chain: review-code (light, outside /matchup) or diversity check
(op-analysis due ~cycle 2019, info-arch due ~cycle 2021)
next_recommended_reason: matchup-specific review-code dedup target exhausted —
next review-code fire should sweep outside /matchup for silent drift, or
diagnosis should surface periodic-gap chains for diversity

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
