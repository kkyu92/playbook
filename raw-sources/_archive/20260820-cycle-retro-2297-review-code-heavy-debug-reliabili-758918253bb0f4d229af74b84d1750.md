---
date: "2026-08-20"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "758918253bb0f4d229af74b84d17502d7192770d"
---


subtype: cycle-retro
cycle_n: 2297
chain_selected: review-code (heavy)
outcome: success
retro.summary: /debug/reliability calibration diagram이 scoring_rule/prediction_type 필터 없이 predictions 테이블 전체(과거 버전+shadow row+post_game+MLB 예측)를 집계 — #1338 family 9번째 재발. /accuracy 페이지 패턴(CURRENT_MODEL_FILTER + prediction_type='pre_game') 그대로 이식해 정정. 정적 grep 회귀 테스트 신규 추가, 486 files/4101 tests pass. main 직접 커밋(f7f94f30) + 즉시 push.
next_recommended_chain: v2-preview 후속 정리(review-code lite) 또는 2-chain lock 재평가(직전 8사이클 review-code 7/8) 후 explore-idea/lotto 다양성 확보
