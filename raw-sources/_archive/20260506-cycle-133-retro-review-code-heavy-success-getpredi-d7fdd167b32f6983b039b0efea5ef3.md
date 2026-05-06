---
date: "2026-05-06"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "d7fdd167b32f6983b039b0efea5ef3d1fec554ba"
---


subtype: cycle-retro
cycle_n: 133
chain_selected: review-code (heavy)
outcome: success
chain_reason: 0회 chain trigger 약함 (DESIGN.md 0일 / TODOS scope-expand 0 / op-analysis lite skill 미설치). silent drift family 9th 확장 = daily.ts 1008줄 monolith 명백 후보. ship-0 emergency 미충족 + 9 SUCCESS streak ROI 명확.

execution:
  silent_drift_found: daily.ts:854 getPredictionHistory homeTeamAccuracy 시맨틱 mismatch
    — correct/total (전체 적중률) 을 calibration-agent.ts:39 "홈팀 승리 예측 적중률" 필드에 박제
    → LLM 이 전체 적중률을 홈팀 조건부 적중률로 오해 후 ±5% 보정 결정
  fix_approach: 순수 헬퍼 computePredictionHistory 추출 (cycle 127/128 패턴)
    + SELECT 에 game:games!fkey 조인 추가
    + predicted_winner === home/away_team_id 분기로 진짜 조건부 적중률 산출
  tests_added: 9 unit tests + 회귀 가드 (homeTeamAccuracy ≠ 전체 적중률)
  pr_number: 124
  ci_status: PR MERGED (squash)

retro.summary: cycle 49 룰 PASS_ship 누적 9 (cycle 50/125/126/127/128/129/130/131/132/133). silent drift family 9th SUCCESS streak (cycle 125~133). 본 cycle 의 silent drift 종류 = 시맨틱 mismatch (cycle 127/128 의 decoupling 패턴 family 6th).

next_recommended_chain: review-code (heavy) on daily.ts 다른 영역 (line 467 yesterday filter / line 884 N+1 query) 또는 다양성 redirect (fix-incident / op-analysis lite)
next_recommended_reason: daily.ts 1008줄 monolith 안 추가 silent drift 후보 발견 — 같은 파일 review-code (heavy) 연속 가능. 또는 9 cycle review-code 누적 후 다양성 redirect.
