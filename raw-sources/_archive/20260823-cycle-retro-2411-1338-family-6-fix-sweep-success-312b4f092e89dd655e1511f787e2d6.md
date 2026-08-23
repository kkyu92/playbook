---
date: "2026-08-23"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "312b4f092e89dd655e1511f787e2d6ce5a211d9e"
---


subtype: cycle-retro
cycle_n: 2411
chain_selected: review-code (heavy)
outcome: success
commit: f5e76fc6

summary: cycle 2409 retro가 남긴 "잔여 CURRENT_SCORING_RULE 단일필터 grep 권장" 을
sub-agent 전수감사(44 파일)로 수행. 6개 신규 버그(opengraph-image/팀 최근전적/예측목록
/예측날짜/과거매치업/인사이트) 발견+fix. baseline-only 페이지(accuracy 등)는 문서화된
의도된 예외로 확인, 오탐 제외. 3개 lock 테스트 갱신, 4203 tests green.

next_recommended_chain: review-code (heavy) fresh target (#1338 family sweep 완료,
mlb-waterfall.ts/mlb-elo.ts 등 신규 후보) 또는 gap trigger (fix-incident 18/20,
op-analysis 19/25, lotto 20/30, info-arch 17/30)

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
