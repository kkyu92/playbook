---
date: "2026-05-14"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "6e48aba56f191a665f64f7092dfa7d7c0287c7c7"
---


subtype: cycle-retro
cycle_n: 397
chain_selected: operational-analysis lite
outcome: partial
next_recommended_chain: polish-ui / explore-idea / fix-incident (자율 trigger)

진단 (cycle 396 next_rec 후보 3종 검토):
- info-arch 마지막 cycle 376 = 21 cycle 미발화 (30-cycle 임계 9 cycle 잔여, 미충족)
- explore-idea improvement saturation 12/15 충족 (≥12) — 그러나 자동 fire heavy AskUserQuestion hang 위험 + lite carry-over 부재
- op-analysis 마지막 cycle 393 = 3 cycle 전 (25-cycle 임계 미충족, v1.8 n=5 신선 cluster 가치)

선택: op-analysis lite — retro-only 안전, ship 부담 0, AskUserQuestion 0.

scoring_rule cluster 측정 (REST direct):
- total n=99 / 49.5% (cycle 387 측정과 동일 = 표본 무변동)
- v1.5 n=16 / 75.0%
- v1.6 n=46 / 37.0% (anomaly persistent — n=150+ 도달 후 era별 backtest 권장)
- v1.7-revert n=32 / 53.1%
- v1.8 n=5 / 60.0% (quant-only fallback — ANTHROPIC credit silent)

분석:
- v2.0 임계 n=150 까지 51건 잔여
- ANTHROPIC credit 미복구 = v1.8 effect 측정 영구 불가 (외부 SaaS, code fix 불가)
- 5/14 KST 20:50 시점 오늘 경기 미완료 → 새 fire 0
- 신선도 부족 → lite partial 박제

가드 미충족:
- 2-chain lock distinct=3 (미발동, ≤2 발동)
- lite-cap 4 chain 모두 0/5 (미발동)
- ship-0 emergency stop 직전 10 중 success 8건 (미충족)

next_recommended_chain 자율 redirect: review-code 6 + op-analysis 4 = 50% dominance window → 다양성 우선.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
