---
date: "2026-05-15"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "a44e5360d96d6c6731e2c7e7e9b82f1a86825f67"
---


subtype: cycle-retro
cycle_n: 445
chain_selected: review-code (heavy)
outcome: success
pr: #479

summary: cycle 443 review-code heavy 후속 — pre_game / live / post_game 3-path
모두 scoring_rule 'v1.8' 하드코드 → v2.0 가중치 upgrade 시 silent drift 잠재
(cycle 420 family). model-version.ts 에 CURRENT_SCORING_RULE const +
ModelVersionDecision.scoring_rule field 추가. daily / live / postview 모두 단일
source consume. 25 cycle ship streak 누적.

next_recommended_chain: 메인 자유 추론 — review-code (heavy) 3 연속 SUCCESS
streak 후 다양성 redirect 자연. lite chain gap 표 보고 lite 우선 또는
dimension-cycle fallback.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
