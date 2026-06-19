---
date: "2026-06-19"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "a80a1283c4c3a6322655b1e03c0c94f57a28ddf1"
---


subtype: cycle-retro
cycle: 1269
chain: review-code (heavy)
outcome: success
pr: 2054
commit: 38bc5b4

silent drift family wave 69 SUCCESS — methodology page line 268 (FanGraphs 보조 hardcoded)
+ about page line 107 (Fancy Stats production list hardcoded) + line 113 (FanGraphs 보조
중복 박제) = 3 hardcoded drift site fix. wave 68 (PR #2053 methodology 만) 후속 layer.

신규 export FANGRAPHS_AUX_METRICS = ['wRC+', 'ISO', 'BB%/K%'] (packages/kbo-data
context/metrics.ts) — FanGraphs 보조 metric 단일 source-of-truth. MetricRegistry 는
WeightKey 1:1 매핑 (production / shadow factor) → 보조 metric (production weight=0)
진입 X 라 constant 분리. about 페이지 fancystats list 는 MetricRegistry filter 패턴
(wave 68 methodology 와 동일) 적용.

silent drift family streak: cycle 458 → cycle 1269 (811 cycle, wave 69th).
직전 20 cycle (1250..1269) chain dist: review-code 14/20 (70%, dominance 지속) +
explore-idea 2 + skill-evolution 1 + op-analysis 1 + info-arch 1 + fix-incident 1.

next_recommended: review-code (heavy) wave 70 잔여 hardcoded list 발견 시 또는
explore-idea Direction E 또는 op-analysis cycle ~1288 (25-cycle gap).

skill-evolution trigger 평가:
- trigger 1 chain-evolution 5+: 8건 누적 (메모, 단독 발화 X)
- trigger 2 5 fail streak: review-code 14/20 모두 success, fail 0
- trigger 3 cycle%50: 1269 % 50 = 19, 미충족
- trigger 4 meta-pattern body: 없음
- trigger 5 0회 발화 (review-code 단독 평가): 14/20, 미충족
- ship-0 emergency stop: 직전 10 cycle partial/interrupted/retro-only = 0
- 자동 발화 X — 정상 진행
