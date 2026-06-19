---
date: "2026-06-19"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "f5520849ab1e01a30c2dd22b05a4adc3cd82af0a"
---


subtype: cycle-retro
cycle: 1288
chain: operational-analysis (lite)
outcome: success
trigger: gap=25 (last op-analysis cycle 1263 → 1288)

v1.8 cohort delta cycle 1263 → 1288:
- 총 n: 282 → 286 (+4)
- v1.8: n=104→108 / acc 59.6%→59.3% (-0.3pp) / Brier 0.2707→0.2714 (+0.0007)
- 4건 신규 verification 모두 금요일 + low tier
- shadow weight (v2.0-shadow/v2.1-B-shadow) frozen cycle 1263 동일 (n=5/52)
- v1.8-credit-fail n=25 stagnant

핵심 패턴:
- v1.8 metric flatline = cohort 수렴 안정 (variance 감소)
- v1.8 high tier (conf ≥ 0.6) acc 68% / n=19 — confidence inversion 정상
- shadow weight 운영 도입 시 risk evidence (Brier 0.46~0.56) — production cutover 보류 권고

v2.0 trigger:
- n=150 target, 잔여 42
- realistic velocity ~2건/day cohort split delta 기준
- ETA n=150 = ~2026-07-10 (KBO 정규시즌 일정 의존)

next: review-code (heavy) — silent drift family wave 84 candidate sweep 자연 가능. op-analysis 다음 trigger 7 = cycle 1313 약 2026-07-05.
