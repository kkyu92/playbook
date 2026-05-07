---
date: "2026-05-07"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "3d2c7840486feb7ce4f359ac51e3c617b4f7d584"
---


subtype: cycle-retro
cycle_n: 218
chain_selected: review-code heavy
outcome: success
pr_number: 205
fixes:
  - CLAUDE.md 홈어드밴티지 +3% → +1.5% (HOME_ADVANTAGE=0.015 동기)
  - selectBigMatchFromGames { bigMatch, result:null } → HomeGame|null (dead code)
  - YesterdayResultsSection 6 tests (inline helper 패턴, cycle 217 신규 섹션)
retro.summary: page.tsx 코드 직접 read → 3종 silent drift 동시 발견. 3건 fix + 6 tests ship.
next_recommended_chain: explore-idea 또는 polish-ui (직전 2 cycle review-code 연속)
pass_ship_count: 89
