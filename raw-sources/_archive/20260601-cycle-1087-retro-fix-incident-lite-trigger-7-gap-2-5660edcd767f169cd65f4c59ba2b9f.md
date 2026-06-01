---
date: "2026-06-01"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "5660edcd767f169cd65f4c59ba2b9fd63fbbfdd1"
---


subtype: cycle-retro
cycle_n: 1087
chain_selected: fix-incident
outcome: success
pr: #1487 (squash merge 63605fb)

summary:
fix-incident (lite, trigger 7 gap=21 자연 source redirect) SUCCESS — pipeline_runs 7일 audit n=105 errors 3건 발견 (predict/error 'morning postview cleanup: postview-daily.runPostviewDaily preGame select failed: JSON object requested, multiple (or no) rows returned') → DB scan 69 dup 분석 (production+shadow 조합, production-only dup 0건) → root cause 확정: mig 030 (cycle 1013) UNIQUE (game_id, prediction_type, scoring_rule) production+shadow 양립 후 postview-daily scoring_rule 필터 누락 → fix .in('scoring_rule', PRODUCTION_COHORT_RULES) 양쪽 query 추가 → PR #1487 자동 머지.

key findings:
- pipeline_runs 7일 n=105: success 95 / partial 7 (validator hallucinated_number) / error 3 (postview-daily PGRST116)
- DB dup 패턴: ('v1.8','v2.1-B-shadow') 26 / ('v1.8-credit-fail','v2.1-B-shadow') 23 / ('v1.8','v2.0-shadow','v2.1-B-shadow') 17 / ('v1.8-credit-fail','v2.0-shadow','v2.1-B-shadow') 3
- 사례 17 신규 family — cohort/shadow 양립 후 scoring_rule 필터 누락 family (postview-daily 단일 site). 사례 9 family (10 wave Sentry capture sweep) 와 별개 카테고리

silent drift family detection channel 9th consecutive SUCCESS:
- cycle 1079 op-analysis (lite, kill-switch n=60 PASS)
- cycle 1080 explore-idea (lite, scout #1446 refresh)
- cycle 1081~1086 review-code (heavy 5 + lite 1, Sentry capture 4 wave saturation break)
- cycle 1087 fix-incident (lite, 사례 17 family 박제)

next recommended:
- review-code (lite, 14th wave audit — 사례 17 family 유사 shadow row 누락 site grep)
- info-arch (gap=29 → cycle 1088 trigger 9 fire ETA)
- explore-idea (scout #1370/#1206 refresh)
- fix-incident (gap=0 reset, 다음 자연 source)

verify carry-over:
- 다음 morning postview cleanup run (KST 10:17~) predict/error 0건 검증
- predict_final silent drift 6건 (games=5 pred=0 reason=not_scheduled) 별건 후속 진단
