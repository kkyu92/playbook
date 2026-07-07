---
date: "2026-07-07"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "607668bc09d81a698ae6cf7e33ac7a79d69cb613"
---


subtype: cycle-retro
cycle: 1499
chain_selected: operational-analysis (lite)
outcome: success

## trigger

op-analysis 25-cycle gap 자연 도달: cycle 1472 → 1499 = 27 cycle gap. cycle 231/255/257 룰 정합. cycle 1498 next_recommended_chain=operational-analysis(lite) 정합.

## measurement (scripts/op-analysis-cohort.ts)

총 n=352 / acc 56.3%

| rule | n | acc | Brier |
|---|---|---|---|
| v1.8 | 174 | 60.3% | 0.3000 |
| v1.8-credit-fail | 25 | 60.0% | **0.2304** |
| v2.0-shadow | 5 | 60.0% | 0.5616 |
| v2.1-B-shadow | 52 | 51.9% | 0.4635 |

## 핵심 발견

1. **v1.8 cohort velocity 사상 최저**: cycle 1447 n=161 → 1499 n=174 (+13 in 52 cycles ≈ 0.25/cycle). cycle 1400~1450 velocity 0.87 대비 71% 감소. KBO 시즌 게임 감소 또는 CREDIT_EXHAUSTED 영향 가설.

2. **v1.8 Brier drift worse**: 0.2714 (cycle 1447) → 0.3000 (cycle 1499). +0.0286 악화. v1.8 유지 확정 (cycle 1447) 이후 첫 재측정.

3. **credit-fail split 신규 evidence** (cycle 1496 observability shipping 후 첫 measurement):
   - v1.8 main: Brier 0.3000 (n=174)
   - v1.8-credit-fail: Brier **0.2304** (n=25)
   - fallback cohort 가 main 보다 오히려 더 낮음
   - CREDIT_EXHAUSTED 섞임이 v1.8 main Brier drift 원인 가설 뒷받침 (fable plan S2c 확인 정합)

## next_recommended_chain

fix-incident (llm_backend NULL backfill — cycle 1496 이전 predictions) 또는 review-code (heavy) silent drift family wave 219+ 자연 발화.

## carry-over

사용자 결정: v1.8 유지 확정 재검증 or credit-fail 분리 재훈련. 본 lite 사이클 = 측정만, 코드 변경 X.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
