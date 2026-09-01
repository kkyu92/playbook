---
date: "2026-09-01"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "61241d26fe5d258238d0b9ad7ab0a01ccb4943df"
---


subtype: cycle-retro
cycle: 2704
chain_selected: review-code(heavy) -> fix-incident (discovered during audit)
outcome: success
retro.summary: review-code(heavy) rotation 계속 중 backtest-manual-weights-run.ts(2회 언급) 전체 정독 clean. 감사 중 vitest kbo-data 전체 실행에서 scrapers-kbo-live.test.ts 재현성 있는 timeout 실패(2회) 발견 — fetchWithRetry 502 backoff 실제 sleep 6000ms > vitest 기본 5000ms timeout. production 로직 정상, 테스트 timeout 만 조정(5000ms->10000ms, commit f10c33ae). vitest 92 files/1218 tests 전체 green, tsc clean.
next_recommended_chain: review-code(heavy)
next_recommended_reason: mention-count rotation 계속(kbo-official.ts 4회 등) 또는 gap trigger(op-analysis 13/25, info-arch 25/30, lotto 15/30) 자연 대기
