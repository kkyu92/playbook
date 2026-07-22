---
date: "2026-07-22"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "94140f721dac01fae4db1d5e2f43a0a221e484e2"
---


subtype: cycle-retro
cycle_n: 1985
chain_selected: review-code (heavy)
outcome: success

mlb_fancy_scrape/mlb_savant_scrape 가 스크래퍼 미구현 주석과 함께 항상
games_found=0 하드코딩 stub 이었으나 실제 스크래퍼(fangraphs-mlb.ts,
baseball-savant.ts)는 테스트까지 완비되어 존재 — 파이프라인 미연결.
신규 mlb_team_stats 테이블(마이그레이션 044) + runFancyScrape/runSavantScrape
wiring으로 해결. silent-drift-alert MLB_SCRAPE_MODES 게이트도 부수적으로
복구 (이전엔 gamesFound 항상 0이라 게이트 자체가 죽어있었음).
PR #2850 머지 (5ac1525c). 1080/1080 테스트 pass.

next_recommended_chain: explore-idea (heavy) or operational-analysis
next_recommended_reason: mlb_predict_final 은 여전히 100% 하드코딩 뉴트럴
팩터 값 사용 (실제 mlb_team_stats 데이터 미반영) — 별도 scope, 큰 리스크
리뷰 필요해 이번 cycle 범위 밖으로 분리.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
