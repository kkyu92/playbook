---
date: "2026-06-26"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
fingerprint: "2322b23ee1d532a4ec3332941ac984c8af9d3dfe"
---


subtype: lesson
cycle: 1400
chain: operational-analysis (lite)

P1 (ai_agent): neutral-factor sparse detection — countNeutralFactors + PREDICTION_SPARSE_THRESHOLD=5 + Sentry 별도 채널
P2 (anti_pattern): silent LLM fallback masking — judgeResult.data||fallback 22일 미감지, confidence=0.3 flat이 DB 집계로만 탐지 가능
P3 (quality_guard): registry sweep wave — 1 grep pattern → shared 상수 → guard test, wave 163개 누적
P4 (data_pipeline): alert cascade by pipeline mode — predict_final/verify/postview/sparse 4 layer

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
