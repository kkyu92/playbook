---
date: "2026-08-24"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "68bacb6e9167dedac04ae17c5201f1bd740dd5d6"
---


subtype: cycle-retro
cycle_n: 2490
chain_selected: review-code (heavy)
outcome: success
next_recommended_chain: review-code (heavy)

buildAccuracyData.ts(776줄, review-code 이력 0건) 최초 전체 감사 — accuracy/page.tsx
buildVersionHistory(rows)가 CURRENT_MODEL_FILTER(scoring_rule=v1.8)로 좁혀진 rows를
받아 v1.5/v1.6/v1.7-revert/v1.8-credit-fail 실측 데이터(DB 확인 총 121건)를 영구히
"수집 중"으로 오표시하던 silent drift 발견·정정. 사이클 상세는 TODOS.md cycle 2490 항목 참조.
