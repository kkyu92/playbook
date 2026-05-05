---
date: "2026-05-05"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
fingerprint: "fc68db60b6c75f1b686e22b0e04d5af01f563922"
---


subtype: lesson

cycle 56 spec section 8 step 2 carry-over (cycle 57 backtest CI 후속).
prod 30일 post_game N=67 의 sfr/h2h factor bias 에 bootstrap B=1000 95% CI 적용.

## 측정 (2026-05-05)

표본: 30일 (cutoff 2026-04-05), prediction_type=post_game N=67, factorErrors entries 201

| factor       | n  | mean    | 95% CI            | verdict |
|--------------|----|---------|-------------------|---------|
| sfr          | 45 | -0.233  | [-0.374, -0.106]  | CI 0 배제 → H1 systematic |
| head_to_head | 40 | -0.161  | [-0.269, -0.049]  | CI 0 배제 → H1 systematic |

## R8 결정 기준 (cycle 56 spec section 5)

| # | 기준 | 결과 |
|---|------|------|
| 1 | backtest 후보 X 가 v1.5 우월 (통계 유의) | ❌ cycle 57: 모든 ΔBrier CI 0 포함 |
| 2 | prod 30일 sfr/h2h bias CI 0 배제 | ✅ 본 cycle: sfr [-0.374, -0.106] / h2h [-0.269, -0.049] |
| 3 | backtest ΔBrier CI 가 47%→50% 환산 범위 포함 | ❌ cycle 57 미달 |

3개 중 1개 충족 = 변경 보류 + 박제만.

## H1a (sample noise) → 약화, H1b/H1c 다음 후보

cycle 21 박제: backtest vs prod 78× 격차. 본 측정으로 sample noise 후보 (H1a) 약화.
backtest 가 가중치 변경 방향 답 X = 변경 결정 불가.

다음 carry-over:
- H1b (factor data quality) — Fancy Stats SFR scrape 재검증 / KBO h2h 5경기 표본 변경
- H1c (debate ensemble interaction) — judge prompt sfr/h2h underweight 점검
- shadow A/B 인프라 (cycle 56 spec section 4)

## 신선 데이터 변동

- post_game 30일 67건 (cycle 52: 62건, +5 신선)
- sfr error_count 45 (cycle 52: 45 — 동일 sample 안정)
- h2h error_count 40 (cycle 52: 40 — 동일 sample 안정)

## R8 적용

본 lesson 의 모든 주장은 prod DB REST API 직접 query + bootstrap 측정 숫자.

script: packages/kbo-data/src/pipeline/factor-bias-bootstrap-ci.ts (B=1000, percentile)
spec: docs/superpowers/specs/2026-05-05-cycle-56-sfr-h2h-weight-rebalance.md

Co-authored-by: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
