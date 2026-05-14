---
date: "2026-05-14"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "cc90d0e3baa2ba66872639ef970696fed95f84b2"
---


subtype: cycle-retro
cycle_n: 379
chain_selected: review-code heavy
outcome: SUCCESS
commit: 2b92b6b
pr: 409

summary: postview-daily.ts:163 estimateHomeWinProb 가 debate-success row 의
confidence (judge meta) 를 quant 산술 관계인 양 역추정. Sunday cap 시 hwp=0.62 +
confidence=0.45 → estimate 0.725 (10pp 오차). postview prompt baseline 오염 →
factor attribution 노이즈 → agent_memories 학습 오염. resolveOriginalHomeWinProb
헬퍼로 reasoning.homeWinProb 우선 사용. 부수 String({}) "[object Object]"
동시 fix.

silent drift family 6번째 case (#371 aiHomePct flip / #374 leaderboard 'completed' /
#375 Brier score / #379 postview-daily homeWinProb).

next_recommended_chain: operational-analysis lite or explore-idea

meta: review-code heavy 4 연속 SUCCESS. dominance-positive streak 자연.
silent drift 발견 직후 op-analysis lite 로 fix 효과 측정 (postview 학습 신호
청결화 후 agent_memories 재집계) 자연 신호.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
