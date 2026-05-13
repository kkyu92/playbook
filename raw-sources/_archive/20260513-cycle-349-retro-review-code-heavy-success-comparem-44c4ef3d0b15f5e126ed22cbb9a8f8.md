---
date: "2026-05-13"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "44c4ef3d0b15f5e126ed22cbb9a8f8e6cc5a1aef"
---


subtype: cycle-retro
cycle_n: 349
chain_selected: review-code (heavy)
outcome: success
health: 10/10

retro.summary: |
  compareModels.ts silent drift 3건 수정:
  (1) module docstring stale — v1.5→v1.6 언급 제거, 실제 구조 반영
  (2) buildShadowRows model_version 'v1.6-pure-shadow'→'quant-only-shadow' (테스트와 불일치)
  (3) scoring_rule null pass-through — hardcoded 'v1.6' fallback 제거
  TODOS.md predictions count 89→94 + 메트릭 갱신 (적중률/Brier)
  테스트 회귀 1건 (compareModels-shadow.test.ts 2 assertions) 즉시 수정
  커밋: 91f828d + 99d2556 → main 직접 push

next_recommended_chain: fix-incident (20-cycle 장기 미발화 주기 보정 재확인)
