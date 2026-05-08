---
date: "2026-05-07"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "5b04ac388000e412b8c9f9d313b98b79cb86b387"
---


subtype: cycle-retro
cycle_n: 245
chain_selected: review-code heavy
outcome: success
pr_number: 227
pass_ship_cumulative: 115

retro.summary: analysis/page.tsx cycle 244 신규 getMonthlyStats 함수에서 CURRENT_MODEL_FILTER 누락 (silent drift). 동종 쿼리 buildMonthlyReview·buildWeeklyReview·dashboard 모두 model filter 적용하는데 이 함수만 빠짐 → /analysis 월간 CTA 수치 ≠ /reviews/monthly/ 실제 수치 불일치. .match(CURRENT_MODEL_FILTER) 추가로 일관성 회복.

next_recommended_chain: explore-idea
