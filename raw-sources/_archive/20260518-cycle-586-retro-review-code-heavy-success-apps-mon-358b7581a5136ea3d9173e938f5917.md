---
date: "2026-05-18"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "358b7581a5136ea3d9173e938f5917e830daf5ca"
---


subtype: cycle-retro
cycle_n: 586
chain_selected: review-code (heavy)
outcome: success
pr: #794
merge_commit: 7ece7ea

stale removed (6 곳): cycle 384 fix-incident heavy / cycle 384 PR (postview 라벨링) / cycle 448 review-code heavy / cycle 477 review-code heavy / cycle 460 polish-ui heavy / cycle 475 / cycle 485

canonical invariant kept (5 종):
- LLM 토론 라벨링: mv 4 종 (LLM_DEBATE/QUANT_PREGAME/LLM_POSTVIEW/QUANT_POSTVIEW) classification + QUANT_*_VERSION 단일 source + CURRENT_SCORING_RULE bump 동시 박제
- FALLBACK_VERSIONS: shared LLM_ACTIVE_VERSIONS + 본 set 두 상수만 + 변경 시 silent drift 차단
- buildFallbackDailyTrend: /accuracy "AI 토론 사용률" stacked bar 데이터 + silent quality drift 차단
- VERSION_ORDER: shared ALL_SCORING_RULES 동시 박제 + invariant test 짝 커플링
- VERSION_NOTES: 한 줄 박제 + labelOf() '-revert' strip special-case

silent drift family streak: 104 → 105 cycle
phase 7축 layer 누적: agent 24 / pipeline 5 / scrapers 2 / root 1 / UI badge 3 / shared 1 / **lib 1 (신규)**

next_recommended_chain: review-code (heavy)
next_reason: apps/moneyball/src/lib/* 잔여 후보 — dashboard/ 7 file / picks/ 2 / players/ 4 / standings/ 3 / leaderboard/ 3 JSDoc stale grep. 또는 packages/kbo-data/src/pipeline/ 6번째 fix. lock risk 누적 (review-code 15/20 = 75%) — polish-ui fallback 2 cycle 안 재발화 가능

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
