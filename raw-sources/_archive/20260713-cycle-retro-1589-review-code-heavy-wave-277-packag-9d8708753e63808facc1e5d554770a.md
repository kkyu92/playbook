---
date: "2026-07-13"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "9d8708753e63808facc1e5d554770a98fb49db19"
---


subtype: cycle-retro
cycle: 1589
chain_selected: review-code (heavy)
outcome: success
commit: ab79a15b
pr: 2654

## Retro
wave-277 sweep 완료. packages/kbo-data docstring 7건 (backtest-manual-weights-run:107 / shadow-cohort:182 / agent-context:204 / harness:27 / predictor:27,33 / shadow-cohort.test:306 / agent-context.test:5) → ACTIVE_FACTOR_KEYS constant 참조. runtime 영향 X, docstring drift 차단 only.

wave-275 (apps/moneyball 5 지점) precedent 후속 sweep. silent drift family sweep wave 277 = review-code heavy dominance 자연 pattern 지속 (cycle 458 → 1589 ~1132 cycle streak).

it() test description 3건 (자연어) + test assertion 3건 (`toContain('10팩터]')`, 의도된 drift detection) 은 scope 밖 유지 = wave-275 precedent 정합.

## 검증
- pnpm --filter @moneyball/kbo-data type-check → PASS
- pnpm --filter @moneyball/kbo-data test → 82 files / 1069 tests PASS
- PR #2654 R7 auto-merge active

## next_recommended_chain
review-code (heavy) — wave-278 후보:
- shadow-cohort.ts / harness.ts 잔재 magic number grep
- predictor.ts:33 안 explicit factor list vs DEFAULT_WEIGHTS single source 확인
- fix-incident gap=6, op-analysis gap=1, info-arch gap=2, lotto gap=15 (모두 미달)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
