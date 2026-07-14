---
date: "2026-07-14"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "b45aa0bd302d509dc03abf70ea976a91cfa89b6a"
---


subtype: cycle-retro
cycle_n: 1645
chain_selected: polish-ui
outcome: success
pr_number: 2669
commit_hash: efeb9ed8

diagnosis:
  - 2-chain alternation lock detected (review-code + explore-idea, distinct=2 last 8 cycles)
  - wave-311/313 new sections: 0 polish-ui follow-up cycles
  - matchup win prob bar semantic inversion (left-0 fills from away with homeWinProb)
  - text-[10px] below DESIGN.md minimum xs=12px
  - missing focus-visible on upcoming game Links

chain_reason: lock rule → polish-ui fallback. Gap triggers all below threshold.

fixes:
  - matchup bar left-0→right-0 (home prob from home/right side)
  - text-[10px]→text-xs DESIGN.md compliance
  - focus-visible on Link a11y parity
  - dynamic subtitle hasAnyModelPrediction

tests: 2030 PASS
next_recommended_chain: review-code (heavy)

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
