---
date: "2026-07-20"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "aba9c8ea8e1e01c94150dc59202c4b4f6e3c112b"
---


subtype: cycle-retro
cycle_n: 1904
chain_selected: fix-incident (heavy)
outcome: success
wave: 533

diagnosis:
  - post-break acc=27.8% (5/18) critical regression
  - 100% CE fallback (no LLM debate) all post-break games
  - 14/18 post-break: away_war=0 → factors.war=1.0 (max home bias)
  - root: Fancy Stats /leaders/ top-50 limit → 두산/KT/롯데/키움 totalWar=0

fix:
  - predictor.ts: WAR factor → 0.5 neutral when either totalWar=0
  - 5 new engine.test.ts WAR data gap guard tests
  - 1079 tests pass, PR #2812 merged

next_recommended_chain: operational-analysis
next_recommended_reason: validate fix impact on upcoming predictions
