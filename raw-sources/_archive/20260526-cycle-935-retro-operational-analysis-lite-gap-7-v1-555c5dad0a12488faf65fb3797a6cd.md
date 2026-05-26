---
date: "2026-05-26"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "555c5dad0a12488faf65fb3797a6cd73bbe8a9bb"
---


subtype: cycle-retro
cycle_n: 935
chain_selected: operational-analysis (lite, gap=7)
outcome: success

baseline 측정:
- v1.8 cohort n=39 stale (cycle 886 동일, +0 verified in 49 cycle)
- predictions total 383 / verified 133 (v1.5=16/12 75% / v1.6=46/17 37% / v1.7-revert=32/17 53.1% / v1.8=39/19 48.7% Brier 0.2325 unchanged)
- predict 7d error 25.5% 회귀 (cycle 928 10% → 25.5%, ↑15.5%p)
- predict_final 7d error 30% (cycle 928 50% → ↓20%p 향상)
- predict_final silent_drop 9/10 (90%) — 사례 11 family 활발 fire (cycle 819 silent-drift-alert.ts + cycle 864 PR #1220 fix 후도 9건 = 진짜 silent drop 잔존)
- deploy drift gap=0 (사례 9 family 정상, 83c7065 = production)
- 5/23 집중 silent drop (predict 5건 + predict_final 3건)
- predictions 7d created 14건 (v1.8 only, verified 0 carry-over)
- n=150 ETA stale (49 cycle 동안 +0 — 자연 velocity 단절)

retro:
- predict 7d 25.5% 회귀 = silent layer 재발 의심 (사례 8 봇차단 / validator hallucinated / 다른 source)
- 사례 11 family 9건 fire = cycle 864 PR #1220 fix 후도 진짜 silent_drop 잔존 (false positive X)
- 사례 9 family gap=0 정상

next_recommended_chain:
1. fix-incident (heavy, gap=3) — predict 7d 25.5% 회귀 직접 진단 (사례 8 봇차단 재발 / validator hallucinated)
2. review-code (lite, gap=4 sweep 59 silent drift detection 외 영역)
3. info-architecture-review (lite, gap=5)
4. lotto (lite, 1228회 토 6/6 D-11 cooldown weak)

cycle 934 next_rec 4순위 (op-analysis) fire 결과 = 회귀 evidence 발견. 다음 cycle fix-incident heavy 권장.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
