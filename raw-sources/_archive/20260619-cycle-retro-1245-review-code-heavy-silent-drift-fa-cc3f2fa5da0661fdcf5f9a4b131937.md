---
date: "2026-06-19"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "cc3f2fa5da0661fdcf5f9a4b131937e2f9c21d0c"
---


subtype: cycle-retro
cycle_n: 1245
chain_selected: review-code (heavy) — wave 53 silent drift family
outcome: success
pr: #2031
commit: 16f737f

retro:
wave 53 silent drift family ship. non-agent layer 6번째 fix. reviews/misses/page.tsx
FACTOR_LABELS 가 home_sp_fip='홈 선발 FIP' 류 6 hardcoded prefix entry 보유 →
MetricRegistry.ko_name 단일 source 에서 derive 로 자연 전파. PREFIXED_VARIANTS =
['sp_fip','bullpen_fip','lineup_woba'].flatMap 패턴 박제. legacy DB 데이터
(canonicalize 이전 prefixed factorErrors) 호환 유지 + 신규 데이터는 postview.ts
canonicalize 가 prefix 제거 → 양쪽 안전.

context layer 6 layer cleanup 완료 (predictor.ts / postview.ts / methodology /
factorLabels canonical / factorLabels TECHNICAL / reviews/misses prefix).

next_recommended_chain: review-code (heavy) wave 54 후보 (pipeline daily.ts payload
field naming home_/away_ column naming vs MetricRegistry convention 정합 / glossary
lib 단일 source 통합 / DESIGN.md token grep) OR explore-idea (heavy) plan #23
approved 신규 product direction OR fix-incident (lite) gap trigger 7 22-cycle 누적
