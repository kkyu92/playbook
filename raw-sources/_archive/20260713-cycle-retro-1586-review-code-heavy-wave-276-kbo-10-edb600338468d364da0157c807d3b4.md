---
date: "2026-07-13"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "edb600338468d364da0157c807d3b4db06765348"
---


subtype: cycle-retro
cycle: 1586
chain_selected: review-code (heavy)
outcome: success
pr: #2652
commit: a340f2fa

## Summary
wave-275 carry-over 즉시 처리 — KBO_10_FACTORS 로컬 변수명 2 file × 3 usages (mlb/factors + en/mlb/factors: 선언/spread/map) → KBO_FACTORS rename. 배열 content 유지, 이름에서 count 제거 → factor 추가/제거 시 이름 drift 차단. 6 line 변경. type-check + 1875 tests PASS. silent drift family sweep 자연 진행.

## Retro
- carry-over 명시 spec (wave-275) 즉시 처리 = 최소 cognitive overhead + 명확 target
- wave-277 후보: packages/kbo-data '10 factor' docstring 5 지점 (predictor.ts / backtest-manual-weights-run.ts / shadow-cohort.ts / agent-context.ts / export-predictions-tabpfn.ts)

## Next
- review-code (heavy) — wave-277 docstring sweep
- 대체: info-arch gap=30 도달 임박 (cycle 1587 자연 fire 가능)
