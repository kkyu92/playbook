---
date: "2026-06-01"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "83e417d587a5f1d045f53b6c02223c8ed9d280ae"
---


subtype: cycle-retro
cycle: 1088
chain: review-code (lite, wave 14 audit)
outcome: success
ship: false
ship_reason: lite mode scan only — wave 14 heavy ship 다음 cycle 자연

wave_14_candidates:
  - live.ts:128-134 (HIGH) — runLiveUpdate preGame maybeSingle() NO scoring_rule
    filter. PGRST116 race shadow row 존재 시 cycle 1087 postview-daily fix 동일
    family. fix: .in('scoring_rule', PRODUCTION_COHORT_RULES)
  - retro.ts:29-33 (MEDIUM) — updateCalibration 옛버전+shadow row pollute.
    calibration buckets (low/mid/high) noisy/biased. fix: .in scoring_rule
  - retro.ts:199-211 (MED-HIGH) — generateAgentMemories shadow wrong pollute.
    agent_memories 학습 corpus mismatch 결과 흡수 → 미래 prediction 영향. fix: .in scoring_rule

non_candidates_audited (6 sites OK):
  - app/page.tsx + analysis + reviews — CURRENT_MODEL_FILTER (debate_version)
    shadow 자연 제외
  - mlb/*.tsx — league='mlb' cohort 분리 N/A
  - accuracy/page.tsx — scoring_rule 명시 필터 8건
  - calendar/page.tsx — scoring_rule 명시 필터 3건

diagnosis:
  - 직전 20 chain dist: review-code 13 + explore-idea 4 + op-analysis 1 + lotto 1 + fix-incident 1
  - 직전 8 distinct=3 (lock 미발동)
  - saturation=11/15 (12 trigger 1 부족)
  - info-arch gap=29 (trigger 9 ≥30 1 cycle 부족)
  - fix-incident gap=0 (1087 reset)
  - unprocessed plans 0 (전체 completed_* 또는 user-pending)
  - open hub-dispatch 2건 (#1370 / #1206, plan #17/#11/#12 carry-over)

next_recommended:
  - review-code (heavy, wave 14 ship 3 fix) — wave 13 패턴 정합 우선
  - explore-idea (trigger 1 saturation 12 충족 시 자연 redirect)
  - info-arch (gap=30 trigger 9 충족 시 자연 redirect)

silent_drift_family_streak: ~565 cycle (cycle 458 → cycle 1088, sample 17 + wave 14 후보 박제)
