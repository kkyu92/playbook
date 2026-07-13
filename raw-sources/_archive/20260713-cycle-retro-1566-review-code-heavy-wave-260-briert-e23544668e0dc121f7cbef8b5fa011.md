---
date: "2026-07-13"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "e23544668e0dc121f7cbef8b5fa011968869cb35"
---


subtype: cycle-retro
cycle_n: 1566
chain_selected: review-code (heavy)
outcome: success
pr: #2638 (merge commit bf59c4c6)

wave-259 (daily.ts write + buildAccuracyData filter + snapshot) 후속 sweep. BrierTrendChart SR_COLOR_MAP 안 'v1.8' 하드코딩 current-cohort key → CURRENT_SCORING_RULE computed key swap.

silent drift risk: CURRENT_SCORING_RULE bump 시 chart 색상 매핑 자동 반영 X → 사용자 가시 chart 신 버전 line 미표시 → silent 데이터 누락.

test: 3 packages type-check green + moneyball 1861 pass + PR #2638 R7 auto merged.

silent drift family wave 260 (cycle 458 → cycle 1566 = 1108 wave streak, review-code heavy 6-cycle SUCCESS streak).

next_recommended_chain: op-analysis (lite) 또는 review-code (heavy)
next_recommended_reason: 6-cycle streak 후속 자연 redirect (op-analysis gap 16, v1.8 실측 n=187 재갱신 여지) 또는 wave-261 candidate 자연 fire.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
