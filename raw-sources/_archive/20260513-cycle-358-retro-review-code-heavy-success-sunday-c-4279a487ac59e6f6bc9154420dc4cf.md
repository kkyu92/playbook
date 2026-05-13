---
date: "2026-05-13"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "4279a487ac59e6f6bc9154420dc4cff62da6f690"
---


subtype: cycle-retro
cycle_n: 358
chain_selected: review-code heavy
outcome: success
commits: 415e07e (judge-agent cap fix), 55ecd62 (lockfile sync)

retro.summary: >
  judge-agent Sunday confidence cap 경계값 버그 발견 + 수정.
  cap=0.55은 medium tier 시작점과 일치 → 일요일 예측이 medium tier에 오염.
  0.45로 변경 → low tier에 명확 배치.
  cycle 354 op-analysis의 medium 37.5% < low 58.3% 역전 원인 제거.
  lockfile drift (user-event 제거) 도 함께 수정. 574 tests pass.

key_findings:
  - confidence tier boundary: medium ≥0.55, low <0.55 (buildAccuracyData.ts)
  - cap=0.55 → 정확히 medium tier 최저값 → 오분류 확정
  - cap=0.45 → low tier 명확 배치 (0.45 < 0.55)
  - 조건 변경 없음 (>0.55 유지), 타겟만 변경

next_recommended_chain: operational-analysis
next_recommended_reason: Sunday cap 변경 효과 측정 + confidence tier 재분류 현황 점검
