---
date: "2026-08-26"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "598f3d7e0d0b935a751d50bc61a1496fcb3da0a9"
---


subtype: cycle-retro
cycle_n: 2626
chain_selected: operational-analysis (lite)
outcome: retro-only

retro.summary: v1.8 유지 재확인 (n=494, v1.8 n=316 acc 54.4% Brier 0.3489,
cycle 2238 대비 안정). op-analysis-weekly cron 정상(PR #3067 auto-merge
success 08-24), 파일 경로가 op-analysis-cohort/ → op-analysis/ 로 조용히
이동된 사실 확인. winner-centric Brier(0.35대) vs home_win_prob Brier(0.24대)
두 산식 차이 = 기존 Fable plan S2c 결론과 정합, 신규 drift 아님.

next_recommended_chain: review-code (heavy, 신규 축 재탐색) 또는 다양성
유지 목적 polish-ui. 직전9(2617-2625) review-code 계열 7/9 dominance는
본 cycle 로 완화(op-analysis 1건 추가).

메타: 강제 trigger 전무한 사이클 — 진단 소스 10종 균형 점검 후 op-analysis
lite 선택 (heavy는 cycle 2608 최근 실행이라 재측정 실익 낮음). 2-chain
lock 미충족(직전8 distinct=4). skill-evolution trigger 5개 전부 미충족
(milestone 2626%50≠0 / chain-evolution 신규분 없음 / review-code 직전20
non-zero). ship-0 emergency stop 미충족(직전10 success 다수).
