---
date: "2026-10-20"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "70e70e390f41f6979827fe85ee3471d708c6bb9b"
---


subtype: cycle-retro
cycle_n: 3405
chain_selected: review-code (heavy)
outcome: success
retro.summary: packages/kbo-data/src/factors/ (9파일) 전수 감사 — 호출부 mlb-pipeline.ts 의 runEloUpdate()/runPredictFinal() 이 mlb_schedule select 시 .range() 없이 단일 호출해 max_rows=1000 캡에 시즌 중반부터 silent truncate, Elo rating + recent form/head_to_head 가 조용히 틀어지던 버그 발견+수정. 이 프로젝트 반복 unbounded-query drift family 가 core 예측 엔진(Elo/폼 계산 자체)에서 재발한 최초 사례. backfill-records.ts 기존 .range() 페이지네이션 패턴 적용 + 회귀 테스트 2건 추가. 전체 테스트(603 files/4731 tests) PASS, main 직접 push (739b82c8).
next_recommended_chain: review-code (heavy)
next_recommended_reason: packages/kbo-data 잔여 vein(agents/15파일, backtest/12파일, scrapers/15파일, pipeline/ 나머지 ~19파일) 미감사 — factors/ core engine 버그 발견 직후라 인접 영역 우선순위 상향.
