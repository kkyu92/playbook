---
date: "2026-06-01"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "d07db1c6088293e126050b327c310429f4541b35"
---


subtype: cycle-retro
cycle: 1125
chain_selected: explore-idea (heavy, plan-v16 candidate J Brier calibration plot UI scaffold Tier 2)
outcome: success
pr: 1521
loc: +360

summary:
- buildShadowCalibration helper (CohortPair → 10-bucket v1.8+SHADOW 분리 집계) — 8 unit test PASS
- CalibrationPlot component (recharts ComposedChart + Scatter line + 대각선 ReferenceLine + Legend + ChartTooltip) — 3-way ready (CALIBRATION_COLORS.v18/shadow/v20 export)
- /accuracy/shadow page 통합 (SHADOW_WEIGHTS 다음 / 일별 cohort table 직전 section)
- type-check + lint clean

v16 inventory 후보 처리 종합 (cycle 1119 spec):
- H (Tier 1 feature flag) shipped cycle 1120 PR #1518
- I (lazy, review-code 자연 발견 시) wait
- J (Tier 2 calibration plot UI scaffold) shipped cycle 1125 PR #1521 ← 본 cycle
- K (Tier 1 /accuracy/shadow nav) shipped cycle 1122 PR #1519
- L (사례 9 vercel webhook) 사용자 영역 wait
- M (MLB cohort 박제 시작) 사용자 영역 wait

자율 영역 풀-수렴 (H + J + K), 잔여 = I (lazy) + L/M (사용자) + J 데이터 자연 활성 (n=100+ v2.1-B ETA 2026-06-17).

next_recommended:
- explore-idea (lite, v17 신규 redirect source inventory 박제 — v16 saturation 후)
- review-code (lite, family 18 wave 12 신규 source 자연 발견 시 saturation 가능 partial)
- operational-analysis (gap=2, trigger 7 25-cycle 충족 cycle 1148 ETA)
