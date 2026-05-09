---
date: "2026-05-08"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "665268ace21d467f6fd508b27fd55d891178bbc0"
---


subtype: cycle-retro
cycle_n: 258
chain_selected: fix-incident
outcome: success
pr_number: 239
merge_commit: dda5cee

retro.summary: calibration_buckets 가 2026-04-14 seeding 이후 한 번도 갱신된 적 없었음. PostgreSQL INSERT ON CONFLICT DO UPDATE 에서 NOT NULL 검증은 conflict 해결 전 INSERT tuple 에 대해 먼저 실행 → min_confidence/max_confidence 누락으로 constraint 위반. assertWriteOk (cycle 174 silent drift guard) 가 에러 가시화. fix: buckets 객체에 minConf/maxConf 추가 + upsert payload 포함 + 회귀 가드 테스트 추가.

trigger:
  - 주기 보정: 마지막 fix-incident 발화(cycle 237) 이후 21 사이클 경과 (≥20 사이클 임계)
  - 실측 버그: verify pipeline error (retro.updateCalibration NOT NULL violation)

skill_evolution: 미발화 (trigger 1-5 모두 미충족)
next_recommended_chain: explore-idea
PASS_ship 누적: 125 (cycle 49 룰 기준)
