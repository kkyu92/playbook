---
date: "2026-05-17"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "0fb95dadd6116e14f42c358b9dd52cea697596ce"
---


subtype: cycle-retro
cycle_n: 511
chain_selected: review-code (heavy)
outcome: success
pr: #649

summary:
- engine/predictor + weights silent drift 2건 cleanup
  1. predictor.ts park_factor ternary dead branch (∀pf 동치, python verify 5 sample)
  2. weights.ts FACTOR_TOTAL 주석 항등식 곱 오해 → backtest-manual-weights-run.ts:161 동일 수식 박제
- 작동 변경 0, 가독/유지보수 개선
- kbo-data tests 616 pass

review-code dominance-positive streak (cycle 135 박제) 작동 evidence:
- cycle 503 (heavy) success / 505 (heavy) success retro-only / 507 (heavy) success / 511 (heavy) success = 4건 streak
- 영역 다양화: frontend components (cycle 507) → backend engine layer (cycle 511)
- silent drift family detection 채널 확장

next_recommended_chain: skill-evolution (forced, trigger 5)
- 직전 20 cycle inclusive 윈도우 (492~511) explore-idea 0회 발화
- 표본 17 ≥ 10 임계 충족
- 영구 opt-out 6개 제외 평가 대상 3개 중 explore-idea 만 0회
- marker ~/.develop-cycle/skill-evolution-pending 박제 → cycle 512 skill-evolution 강제 발화

dual-cycle policy 정정:
- cycle 510 retro 메모: lotto cooldown 5 cycle (511~515) moneyball redirect
- 사용자 N=38 호출, dual-cycle 19/19 이지만 lotto saturation persistent + 사용자
  redesign 결정 carry-over 우선 → moneyball redirect 그대로 진행
