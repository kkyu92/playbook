---
date: "2026-08-24"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "7a65a55df9d3f008eee77c3708cf04200e29d554"
---


subtype: cycle-retro
cycle_n: 2516
chain_selected: review-code (heavy)
outcome: success

retro.summary: about/page.tsx "업데이트 주기" 섹션의 "경기 중 30초 간격" 실시간 스코어 갱신 주장이 실제 메커니즘(Cloudflare Worker cron */10 9-15 * * *, 최초 GH Actions 버전부터 동일하게 10분 간격)과 불일치. git blame 추적 결과 2026-04-16 최초 작성 시점부터 실측 대조 없이 임의 기재된 값 — 기존 silent drift family(등록 상수 참조 누락, 메커니즘 변경 후 미반영)와 구분되는 "애초에 부정확했던 claim" 신규 하위 패턴. "현재 제외된 팩터" 조건부 섹션은 shadow-only 팩터(park_weather/umpire_sz) 의도적 미노출로 정상 guard 확인(dead code 아님). "10분 간격"으로 정정 + 회귀 가드 테스트 추가.

next_recommended_chain: review-code (heavy) 계속 (debug/pipeline, debug/factor-correlation, teams/[code], search/page 잔존) 또는 info-architecture-review (gap 30/30, cycle 2517부터 trigger 충족 예상)
