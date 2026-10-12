---
date: "2026-10-12"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "9fa3220dd378da0b58f741338fa8e031d03d4901"
---


subtype: cycle-retro
cycle_n: 3075
chain_selected: review-code(heavy)
outcome: success
next_recommended_chain: review-code(heavy)

packages/kbo-data/src/{analytics,features,engine,notify,context} 전수 read.
TIME_WINDOWS.h2h_window "최근 30일" LLM-facing 라벨이 cycle 1226 이래 미구현
상태였음 확인(실제론 daily.ts limit(50) 게임-cap 또는 시즌 누적 fallback) —
domain.ts/metrics.ts/rivalry-memory.ts 문구 정정 + 테스트 갱신, 값/로직 변경 없음.
commit dacb3bfa. tsc/lint/test(96f·1235t) 전부 green.
