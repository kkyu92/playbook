---
date: "2026-10-12"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "b2b3faf1e557d0b928805ae4367fe1aa30e14c95"
---


subtype: cycle-retro
cycle_n: 3076
chain_selected: review-code(heavy)
outcome: success
next_recommended_chain: review-code(heavy)

packages/kbo-data/src/backtest/ 13파일 전수 read sweep. runner.ts 의 runBacktest
가 경기 처리 직후 즉시 prior 버퍼에 반영해 더블헤더(같은 game_date 2경기) 상황에서
두번째 경기 h2h/최근폼 feature 가 첫 경기 결과를 누출(look-ahead bias) — loader.ts
buildFeatures 계약("game_date 미만만") 위반 확정. 같은 날짜 배치 단위로 prior 반영을
지연시키는 수정 + runner.ts 자체 테스트 커버리지 0 이었던 점 확인 후 회귀 테스트
신규 작성(backtest-runner.test.ts). harness.ts dead-skeleton / walkForwardSplit
dead-code 2건은 risk 낮은 cleanup 후보로 스코프 분리해 다음 사이클로 보류.

검증: kbo-data 97 test files/1237 tests PASS, tsc --noEmit clean, lint clean,
pre-push hook(lint+type-check+version-sync-guard) PASS. 직접 main 커밋(R4 범위) + push.
