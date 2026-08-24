---
date: "2026-08-24"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "85610cf63eab6d4943f9e5d5320fbde20f3d8090"
---


subtype: cycle-retro
cycle_n: 2484
chain_selected: fix-incident (lite)
outcome: retro-only

fix-incident gap 20/20 도달(trigger 6, 마지막 발화 cycle 2464) → lite 자동 발화. pipeline_runs 최근 7일 조회 → mlb_fancy_scrape 3일 연속 fangraphs HTTP 403(08-20~08-22). fangraphs-mlb.ts 는 이미 cycle 2278 UA 헤더 fix 적용 완료 — 동일 external anti-bot 계열 3rd recurrence(cycle 2278/2326/2484). 08-23/08-24 self-heal 확인(success, games_found=30). 다운스트림 mlb_predict_final 실측 확인 결과 동일 3일 모두 status=success, predictions 9~15건 정상 — mlb_team_stats fallback 이 gap 흡수, 프로덕션 영향 0. 코드 변경 불필요 — cycle 2383과 동일 패턴 재확인, RETRO-ONLY.

next_recommended_chain: review-code (heavy)
next_recommended_reason: info-arch gap 29/30 임박, op-analysis gap 5/25. 강한 신규 trigger 없으면 review-code(heavy) 계속 — debug/factor-correlation 계열 재탐색 권장.
