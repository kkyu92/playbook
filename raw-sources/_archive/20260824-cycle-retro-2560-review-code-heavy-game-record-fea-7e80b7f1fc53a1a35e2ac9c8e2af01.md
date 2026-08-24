---
date: "2026-08-24"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "7e80b7f1fc53a1a35e2ac9c8e2af01b58a7ce628"
---


subtype: cycle-retro
cycle_n: 2560
chain_selected: review-code (heavy)
outcome: success

진단: open issue 0, approved plan 0/23. 2-chain lock 없음(직전8=2552-2559 distinct=3).
fix-incident negative. op-analysis gap 4/25 미도달 — lite 경로(op-analysis-cohort.ts)
수동 실행 결과 자동 cron 산출물과 100% 동일 확인(신규 정보 없음, 중복 저가치 확인).
explore-idea 5연속 소진 유지. cycle 2557~2559 3연속 diversity redirect 권고했으나
대체 chain 재확인 결과 즉시 저가치 → review-code 잔존 재탐색.

실행: game-record-features.ts의 bullpenAppearancesLastNDays/teamRunDiffLastN —
backtest/loader.ts 미참조(형제 함수 4개는 실사용) 확정 후 삭제. 테스트 2건 동반 삭제.
pnpm --filter @moneyball/kbo-data test(91 files/1188 tests) + type-check + lint clean.
commit 1fff4a84, 직접 main push(R4).

next_recommended_chain: explore-idea 또는 operational-analysis (heavy 새 각도)
next_recommended_reason: review-code가 SMALL_SAMPLE_N + dead-code 양쪽 family 소진 근접.
op-analysis lite(cohort-split 스크립트 수동 실행)는 cron과 중복이므로 회피 권고.
