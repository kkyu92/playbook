---
date: "2026-05-19"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "e0a2597437e39ce7beb656b07164ac08c67de3fe"
---


subtype: cycle-retro
cycle_n: 702
chain_selected: fix-incident (lite, 사용자 자연 발화 incident)
outcome: success
pr_number: 981
commit_hash: a255574
retro:
  summary: 텔레그램 5경기 fallback evidence (agentError='SERVER_ERROR 529: Overloaded' + agentsFailed=true + dummy argument) 즉시 진단 → 4 source + 2 test 변경 ship. 529 backoff 5x (3.5s→17.5s) + predict mode agentsFailed skip + reason='debate_fallback'.
  todos_added:
    - cycle 703 explore-idea (lite) carry-over — 후보 B /reviews/weekly sort ROI 3순위
    - verify (KST 23) 후 오늘 5경기 fallback row is_correct 박제 확인
    - operational-analysis gap=7 / 임계 ≥25
    - info-architecture-review gap=6 / 임계 ≥30
  next_recommended_chain: explore-idea (lite, saturation v4 후보 B)
  next_recommended_reason: fix-incident SUCCESS 후 자연 redirect. lite/lite alternation 자연.
trigger_evidence:
  - 사용자 자연 발화 incident — 텔레그램 AI 토론 분석 fallback 신호
  - predictions.reasoning evidence 5건 동일 패턴
  - fix-incident gap=20 (cycle 682→702) trigger 7 주기 보정 자연 충족
guards:
  - 2-chain lock 미발동 (distinct=5)
  - lite cap 미발동
  - trigger 5 미충족 (영구 opt-out 7 제외, review-code 7 + polish-ui 2 평가 통과)
  - ship-0 emergency stop 미발동 (직전 10 cycle success 8건)
lesson:
  - Anthropic 529 = transient capacity 한계 (credit ≠ capacity)
  - 기본 3x backoff (3.5s) 부족 — 5x multiplier 필요 (17.5s 까지)
  - debate fallback row 가 first-write-wins 로 박제되어 다음 cron 재시도 잠금 = predict mode 시 INSERT skip 필수
  - predict_final 은 마지막 기회라 fallback 박제 유지 (이중 안전)
  - predictions.reasoning JSONB 의 agentError 박제 (fail-loud) 가 즉시 진단 가능 evidence — silent fallback 차단 family

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
