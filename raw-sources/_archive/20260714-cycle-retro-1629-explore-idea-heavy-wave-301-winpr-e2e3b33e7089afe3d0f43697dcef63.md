---
date: "2026-07-14"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "e2e3b33e7089afe3d0f43697dcef63c7c867d82e"
---


subtype: cycle-retro
cycle_n: 1629
chain_selected: explore-idea
chain_mode: heavy
outcome: SUCCESS
wave: wave-301
feature: WinProbBar — PredictionCard 승률 분할 바

retro.summary: |
  explore-idea heavy: WinProbBar 승률 시각화 바 PredictionCard 추가.
  home_win_prob DB fallback 으로 CREDIT_EXHAUSTED 구간 barless gap 해소.
  KBO 관례 (원정좌/홈우) 정렬. 3파일 34줄. 1945 tests PASS.

trigger: improvement_saturation (12/15 cycles review-code/fix-incident/polish-ui/info-arch ≥12)
key_discovery: home_win_prob DB 컬럼 존재했으나 메인 카드 쿼리 미사용 — CREDIT_EXHAUSTED barless gap 해소
version: 0.5.51.3
next_recommended_chain: review-code
