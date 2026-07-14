---
date: "2026-07-14"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "54219a64a001b4213e2229abe7f21d3053330d15"
---


subtype: cycle-retro
cycle_n: 1665
chain_selected: explore-idea (heavy) wave-331
outcome: success
commit_hash: bd440918
pr_number: null

retro.summary: |
  wave-331: KBO recent10 필드 → 경기 카드 최근 10경기 배지.
  RECENT10_HOT_WINS=7 / RECENT10_COLD_WINS=3 상수 단일 source.
  parseRecent10 헬퍼 + recent10Map + gamesWithRank 주입.
  Feature-Drift Cycle 패턴 유지 (wave-329 explore → wave-330 review → wave-331 explore).
  2078 tests PASS / TypeScript PASS / lint PASS.

next_recommended_chain: review-code (heavy) wave-332
