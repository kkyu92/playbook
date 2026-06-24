---
date: "2026-06-24"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "127aae627e79f3d95f8414034d588f342b41c4fb"
---


subtype: cycle-retro
cycle: 1376
chain_selected: review-code (heavy)
outcome: success
pr: 2163

진단: cycle 1375 next_recommended_chain 직접 매칭 (review-code heavy wave 147 자연 발견).
6 scraper outbound rate-limit polite delay 3 const drift (DELAY_MS / RATE_LIMIT_DELAY_MS /
RATE_LIMIT_MS) + 1 다른 값 (FanGraphs KBO 3000ms) silent drift 발견.

실행: @moneyball/shared SCRAPER_RATE_LIMIT_DEFAULT_MS (2000) + SCRAPER_RATE_LIMIT_FANGRAPHS_KBO_MS
(3000) 등록. 6 scraper 통합. wave 147 guard test 2건 추가.

회고: silent drift family streak ~918 cycle 유지. dominance-positive 3 consecutive cycle
(1374/1376 review-code heavy + 1375 op-analysis). 2-chain lock 미발동 (distinct=5).
saturation 11/15 (< 12 explore-idea forced threshold).

next_recommended: op-analysis lite v1.8 cohort 측정 OR review-code heavy wave 148 자연 발견
시 OR fix-incident hub-dispatch.
