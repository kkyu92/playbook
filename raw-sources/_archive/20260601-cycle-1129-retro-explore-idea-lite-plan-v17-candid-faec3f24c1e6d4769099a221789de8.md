---
date: "2026-06-01"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "faec3f24c1e6d4769099a221789de80c0b5f008b"
---


subtype: cycle-retro
cycle_n: 1129
chain_selected: explore-idea (lite, plan-v17 candidate O Tier 1 Header utility nav)
outcome: success
pr: 1524
commit: bdbf39a

retro.summary: |
  explore-idea lite SUCCESS — v17 candidate O Tier 1 Header utility nav.
  KBO_NAV 예측·기록 group + /accuracy/shadow entry (5번째 item, group count 변동 X).
  Footer (cycle 1122 PR #1519) + Header (본 cycle PR #1524) dual entry pattern 정합.
  MobileNav LEAGUE_NAVS share = mobile coverage 자동 propagate.
  v17 inventory progress: N (cycle 1127) + O (본 cycle) SHIPPED, P/Q/R/S 잔여.

verification:
  - pnpm exec tsc --noEmit pass (apps/moneyball)
  - pnpm exec vitest run pass (93 files / 880 tests, ZERO regression)

v17_inventory_progress:
  - N feature flag Tier 2 callsite swap → cycle 1127 PR #1523 SHIPPED
  - O Header utility nav → cycle 1129 PR #1524 SHIPPED (본 cycle)
  - P TabPFN CSV pipeline → 다음 fire candidate (open issue #1206 매핑)
  - Q CalibrationPlot 자동 활성 → n=100+ v2.1-B ETA 2026-06-17
  - R silent drift family 19 → lazy
  - S MLB cohort scraping → 사용자 영역 wait
  - T debate/postview swap → N 과 통합 fire (cycle 1127)

next_recommended_chain: |
  explore-idea (heavy, v17 candidate P TabPFN CSV pipeline medium Tier 2 open issue #1206 매핑)
  또는 explore-idea (lite/heavy, v17 candidate Q CalibrationPlot 자동 활성 condition medium n=100+ v2.1-B ETA 2026-06-17)
  또는 review-code (lite/heavy, family 19 자연 발견 시)
  또는 fix-incident gap=1 미충족
  또는 op-analysis gap=6 미충족
  또는 info-arch gap=8 미충족
  또는 lotto gap=24 미충족
