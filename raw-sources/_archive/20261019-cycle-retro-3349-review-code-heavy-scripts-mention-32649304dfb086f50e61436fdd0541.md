---
date: "2026-10-19"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "32649304dfb086f50e61436fdd054185518e5fad"
---


subtype: cycle-retro

chain: review-code (heavy)
outcome: SUCCESS
scope: scripts/ 저-mention 8파일 (backfill-mlb-factor-breakdown/cohort-cleanup/
       op-analysis-mlb-elo-backtest/backfill-shadow-cohort/op-analysis-brier-drift/
       import-tabpfn-predictions/backfill-home-win-prob/export-predictions-tabpfn)
fix: backfill-mlb-factor-breakdown.ts 하드코딩 'mlb_v0.1' → MLB_SCORING_RULE 상수 +
     op-analysis-brier-drift.ts tierOf() confidence=1.0 경계 버그 수정
merged: 직접 main 커밋 (R4 범위, 38628a0d)

선행: cycle 3348 세션-중단 사각지대(사례 15 family) retro 결손 발견 + retroactive
backfill(2efb55b4) 완료 후 본 사이클 진행.
