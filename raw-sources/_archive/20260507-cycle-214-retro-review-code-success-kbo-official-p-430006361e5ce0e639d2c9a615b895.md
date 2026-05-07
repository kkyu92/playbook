---
date: "2026-05-07"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "430006361e5ce0e639d2c9a615b895ffd9601eb3"
---


subtype: cycle-retro
cycle_n: 214
chain_selected: review-code heavy
outcome: success
pr_number: 201
commit: a09d843

retro.summary: |
  review-code (heavy) — cycle 213 next_recommended=review-code. kbo-official.ts 직접
  코드 read → silent drift 2건 발견: (1) parseGameStatus() dead code — state_sc inline
  파싱 교체 후 미제거. (2) fetchStandings() cells.length < 9 guard off-by-one — 10컬럼
  테이블에서 cells.eq(9) 접근 시 경계 누락. pnpm build OK, 761 tests PASS.
  ship → PR #201 squash merge (R7).

next_recommended_chain: explore-idea
ship_pass_total: 85
