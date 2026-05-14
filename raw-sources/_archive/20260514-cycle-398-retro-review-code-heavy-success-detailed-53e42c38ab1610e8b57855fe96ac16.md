---
date: "2026-05-14"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "53e42c38ab1610e8b57855fe96ac1679bedfa8be"
---


subtype: cycle-retro
cycle_n: 398
chain_selected: review-code heavy
outcome: success
pr: #424
commit: 967bd69

summary:
review-code heavy SUCCESS — DetailedFactorAnalysis.tsx:64 사용자 가시
'정량 모델 v1.6' → 'v1.8' 정정. DEFAULT_WEIGHTS는 cycle 335부터 v1.8
(head_to_head 3% + elo 10%), 컴포넌트는 DEFAULT_WEIGHTS 그대로 사용
— 텍스트 라벨만 stale drift.

family carry-over:
cycle 388 (Sunday cap doc) / 394 (engine.test) / 395 (postview.test)
후속 4번째 fire. dominance-positive streak (review-code 3/8 직전).
잔존 v1.6 mentions = backtest historical / debug/model-comparison /
live.ts model_version / model-version.ts type / compareModels-shadow.test
fixture — 모두 intentional historical reference, 정정 X.

stale label family 완전 종료 가능성.

next_recommended_chain: polish-ui / explore-idea / fix-incident /
info-architecture-review (info-arch 23-ago = 30 trigger 7 cycle 후 자연 fire 예정)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
