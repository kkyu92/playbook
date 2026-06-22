---
date: "2026-06-22"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "3c50730dfefe3b1498e4102aff7e27885617df3e"
---


subtype: cycle-retro
cycle: 1335
chain_selected: review-code (heavy)
outcome: success
pr: #2108

wave 118 = STANDINGS_ISR_HOURS=1 + STANDINGS_ISR_SECONDS=3600 (packages/shared/src/index.ts). standings/page.tsx revalidate=3600 magic number 1 + user-visible '매시간 자동 업데이트' / '매시간 갱신' / '1시간마다 갱신' 3 surface → registry single source. wave 115 INSIGHTS_ISR 패턴 정합 (동일 ISR 갱신 주기 silent drift family standings 차원). 변경 시 revalidate + 3 user-visible '{N}시간마다' parameterized 자동 sync.

surface:
  - packages/shared/src/index.ts: STANDINGS_ISR_HOURS=1 + STANDINGS_ISR_SECONDS=STANDINGS_ISR_HOURS*60*60 신설
  - apps/moneyball/src/app/standings/page.tsx:
    * revalidate = 3600 → STANDINGS_ISR_SECONDS
    * description "매시간 자동 업데이트" → "{N}시간마다 자동 업데이트"
    * 헤더 부제 "매시간 갱신" → "{N}시간마다 갱신"
    * 풋노트 "1시간마다 갱신" → "{N}시간마다 갱신"
  - packages/shared/src/index.test.ts: STANDINGS_ISR_SECONDS guard (wave 118)

silent drift family streak: wave 109-118 = 10 consecutive wave SUCCESS (cycle 1325~1335). 직전 20 cycle review-code 17/20=85% dominance (silent drift family detection channel sweep). 2-chain alt-lock distinct=3 미발동 유지.

next_recommended_chain: review-code (heavy) — wave 119 grep 후보 자연 발견 시; 후보 0건 시 op-analysis lite (gap=23, trigger 25-cycle 2 cycle 접근) 또는 info-arch lite (gap=24, trigger 30-cycle 6 cycle 접근) 또는 fix-incident lite (gap=13, trigger 20-cycle 7 cycle 접근)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
