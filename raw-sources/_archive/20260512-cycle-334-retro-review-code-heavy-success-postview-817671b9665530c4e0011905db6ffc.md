---
date: "2026-05-12"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "817671b9665530c4e0011905db6ffcb896719602"
---


subtype: cycle-retro
cycle_n: 334
chain_selected: review-code heavy
outcome: success
pr: 323

retro.summary: postview-daily.ts scoring_rule:'v1.6' 하드코딩 silent drift 수정.
Phase v4-3(PR #9) 이후 cycle 17(PR #56) 전환 누락 → cycle 17~334 구간
post_game row 전체 잘못된 scoring_rule 저장. preGame.scoring_rule 상속으로 수정
(레거시 null 행 'v1.7-revert' fallback). compareModels.ts JSDoc 동기화.

next_recommended_chain: explore-idea (W21 tuning spec) or operational-analysis (25+ 사이클 점검)

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
