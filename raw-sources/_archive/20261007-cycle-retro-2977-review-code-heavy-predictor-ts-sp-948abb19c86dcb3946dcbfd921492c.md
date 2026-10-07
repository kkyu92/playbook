---
date: "2026-10-07"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "948abb19c86dcb3946dcbfd921492c4589112a61"
---


subtype: cycle-retro
cycle_n: 2977
chain_selected: review-code(heavy)
outcome: success
retro.summary: op-analysis gap=125/lotto gap=105/fix-incident gap=31 동시 충족했으나 op-analysis 는 Supabase egress quota restriction(cycle 2939~ 지속, 신규 아님) 으로 DB 측정 불가, lotto 는 cron 산출물 건강(picks/results 둘 다 최신) 확인만 가능, fix-incident 도 동일 root cause 재확인뿐일 가능성. review-code(heavy) 가 cycle 2974/2975 추천 잔여 스코프(engine/features/factors/context/backtest/analytics) 감사 — predictor.ts sp_fip/sp_xfip 가 WAR/SFR(cycle 1904/2419) 이미 가드하는 비대칭-null data-gap 버그 클래스를 v1.5 원본부터 누락 상태로 보유 중이었음을 발견 + 수정. typecheck clean, kbo-data 94/1227 + 전체 585/4613 PASS. PR #3137 squash 머지(af859d47).
next_recommended_chain: explore-idea(plan#29 결정 시) 또는 review-code(heavy) 잔여 scraper/mlb-factor 스코프
