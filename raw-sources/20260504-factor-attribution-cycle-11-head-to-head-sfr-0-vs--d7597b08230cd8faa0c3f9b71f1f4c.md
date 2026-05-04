---
date: "2026-05-04"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
fingerprint: "d7597b08230cd8faa0c3f9b71f1f4c8d57e9649a"
---


cycle 11 operational-analysis chain 연속 사용. factor_error_summary view (migration 010)
+ 7d raw aggregation. 핵심 발견:

1. head_to_head (weight=0%) + sfr (weight=0%) 가 LLM postview reasoning 의 70% factorErrors
   차지. avg_bias -0.247~-0.289 (가장 강한 over-confidence)
2. 가중치 1·2위 lineup_woba (20%) + sp_fip (19%) 는 빈도 22건 / avg_bias ~0 = 잘 작동
3. post_game predictions 는 verified_at=NULL 이 default — 7d/30d 윈도우는 created_at 기준이라야 정확
   (cycle 10 baseline 의 미보고 부분)

다음 cycle 12+ actionable: scripts/backtest.ts 가중치 시뮬 / postview.ts factorErrors
도메인 제한 / judge vs postview 추론 출처 분리.

Co-authored-by: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
