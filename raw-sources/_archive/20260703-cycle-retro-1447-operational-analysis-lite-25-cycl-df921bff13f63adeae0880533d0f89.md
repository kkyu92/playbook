---
date: "2026-07-03"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "df921bff13f63adeae0880533d0f89da7b421a09"
---


subtype: cycle-retro
cycle_n: 1447
chain_selected: operational-analysis (lite)
outcome: success
next_recommended_chain: review-code (heavy) or diversity

retro:
- 25-cycle gap trigger 7 fire (last op-analysis cycle 1422)
- v1.8 cohort n=161 → v2.0 upgrade threshold (150) 첫 실측 초과
- Brier drift 0.2714 → 0.2995 (worse) 정확도 60.9% 유지에도 calibration 악화
- v2.1-B-shadow n=52 / 51.9% / Brier 0.4635 = reject 신호 (delta +0.164 vs v1.8)
- v2.0-shadow n=5 표본 부족
- R8 자율 upgrade X, 사용자 결정 carry-over 3 후보 (lesson ff482b28)

관련:
- docs/op-analysis/cohorts/2026-07-03-cycle1447.md
- docs/lessons/2026-07-03-cycle-1447-v18-n150-threshold-brier-drift.md
