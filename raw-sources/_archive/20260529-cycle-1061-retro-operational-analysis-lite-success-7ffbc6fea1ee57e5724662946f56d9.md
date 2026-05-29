---
date: "2026-05-29"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "7ffbc6fea1ee57e5724662946f56d988df5112de"
---


subtype: cycle-retro
cycle: 1061
chain: operational-analysis (lite)
outcome: success
duration: ~20분
from-hub: none

## chain 선택 이유
cycle 1060 next_rec top recommendation = op-analysis (lite, 4일 신선 baseline 가치). fresh 2026-05-29 cohort snapshot 박제됨 (n=205, +72 vs 2026-05-25) → cycle 1057 PARTIAL 'gap freshness 부재' 결손 자연 해소 — baseline 측정 standalone 가치 명확. v1.8 cohort split classification 신규 등장 = cohort 분류 layer 진화 evidence.

## 핵심 발견 3건

### 1. v1.8 cohort split 처음 등장
- v1.8 main: n=27 / acc 44.4% / Brier 0.2487
- v1.8-credit-fail: n=25 / acc 60.0% / Brier 0.2304 (best of v1.8 family)
- credit-fail subset 가 main 보다 +15.6pp 우수 — credit-fail mechanism 이 prediction quality 보존 evidence

### 2. v1.8 real (main + credit-fail) n=52 → kill-switch threshold n=60 까지 8건 잔여
- v1.8 main 44.4% vs baseline (v1.7-revert 55.9%) = -11.5pp 하회 (1회 누적)
- kill-switch 조건: cohort_n ≥ 60 + accuracy 2pp+ 하회 + 3회 연속 (docs/research/v2.0-killswitch.md)
- 임계 도달 ETA = velocity 1.8/day × 5일 = 2026-06-03 추정

### 3. decoupling meta-pattern (cycle 1057) 자연 해소
- cycle 1057 PARTIAL retro 박제 = "gap freshness vs auto-fire speed decoupling"
- 본 cycle = 4 cycle 후 fresh snapshot 자연 박제 (cohort generator daily fire decoupling 정상 동작)
- decoupling = 문제 X. cycle generator 와 cohort generator 의 독립 주기 = 자연 설계 evidence

## baseline delta (2026-05-25 → 2026-05-29)

| metric | 5/25 | 5/29 | Δ |
|---|---|---|---|
| total_n | 133 | 205 | +72 |
| total_acc | 48.9% | 51.2% | +2.3pp |
| v1.7-revert n | 32 | 34 | +2 |
| v1.7-revert acc | 53.1% | 55.9% | +2.8pp |
| v1.8 (split 전) n | 39 | 52 (combined) | +13 |
| v1.8 main acc | 48.7% | 44.4% | -4.3pp |
| v1.8-credit-fail (신규) | — | n=25 60% | NEW |
| v2.0-shadow (신규) | — | n=5 60% | NEW (small) |
| v2.1-B-shadow (신규) | — | n=52 51.9% | NEW |

## 신규 cohort 등장 — 분류 진화

cohort generator 가 단순 scoring_rule version 분류 → debate/credit-fail/shadow 차원 분리 자동 박제. 본 진화 = cycle 949~ v2.0-killswitch 박제 후 자연 누적 결과 — 분류 정합 evidence.

## 다음 cycle 권장
- review-code (lite) — saturation 11/15 → 12 도달 자연 트리거 가능. silent drift family detection 재진입
- fix-incident (lite) — 자연 발견 시
- explore-idea (lite) — plan #11/#12/#13/#14/#16/#17/#18 carry-over status 박제 또는 #1370/#1206 status 갱신 시
- info-arch — gap=2 30-cycle 자체 trigger 미충족 (ETA cycle ~1076)
- lotto — gap=27 30-cycle 미충족 + 추첨 5/30 직후 OOS 박제 ETA 5/31
- op-analysis — v1.8 real n=60 도달 시 kill-switch evidence check trigger 자연 재진입 (ETA ~2026-06-03)

## 누적 metric (cycle 1050 milestone 박제 정합)
- 자가 진화 43회 / PASS_ship ~675 추정 / silent drift family streak ~528 cycle (cycle 458→1061)
- 본 cycle = cycle 1051 이후 10번째 op-analysis (gap=4 from 1057)
