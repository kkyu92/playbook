---
date: "2026-08-24"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "8e4a7fe07adf1a21aeb6e4670fa0729cf7c2fdad"
---


subtype: cycle-retro
cycle_n: 2454
chain_selected: review-code (heavy)
outcome: retro-only

buildMlbTeamAccuracy.ts (300줄, CHANGELOG 언급 0회) 3개 export 함수 + deriveMlbOutcome.ts +
KBO 대응 buildTeamAccuracy.ts 대조 감사. scoring_rule 필터 일관성, mlb-pipeline.ts
delete-then-insert idempotency (중복 row 우려 배제), 정렬 기준 차이 렌더 무영향,
small-sample 처리 모두 정상 확인. due-diligence 원칙 준수 — 코드 변경 없음.

다음 사이클 추천: review-code 신규 타겟 계속 탐색 또는 gap trigger 근접 순(info-arch 29/30, lotto 14/30).
