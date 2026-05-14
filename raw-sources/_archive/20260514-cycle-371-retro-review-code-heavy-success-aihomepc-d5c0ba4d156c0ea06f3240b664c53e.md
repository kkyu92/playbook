---
date: "2026-05-14"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "d5c0ba4d156c0ea06f3240b664c53ea8eab15f0d"
---


subtype: cycle-retro
cycle_n: 371
chain_selected: review-code heavy
outcome: SUCCESS
commit: 0151810

retro.summary: picks 시스템 silent drift 발견 — getTodayDivergenceGame 에서
hwp (homeWinProb) 가 항상 홈팀 승률임에도 원정팀 예측 시 `1-hwp` 뒤집기로
DivergenceChip 이 AI 측 오판. 진짜 divergence 누락 + false positive 동시 발생.
Fix: 조건 제거, hwp 직접 사용.

next_recommended_chain: explore-idea or polish-ui

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
