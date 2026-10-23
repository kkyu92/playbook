---
date: "2026-10-23"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "acd1c7e415ca2a9fc7e2db56e62998a40cbb73f9"
---


subtype: meta-pattern
cycle_n: 3571
pattern: review-code(heavy) 직전10(3562-3571) 중 8회 발화, 전부 drift-0 전수감사(hooks/scripts/app-api/packages-shared 등 신규 scope 체계적 소진) — ship-0 PARTIAL_STREAK=10 literal 충족이나 EXHAUSTIVE_SWEEP 서브체크(cycle 3381 룰, RC_HEAVY_COUNT=8≥8) 양성 판정.
action: hard-stop(emergency dispatch + next_n=0) 대신 review-code(모든 variant) cooldown N=10 적용(3572~3581) — 2-chain-lock 메커니즘 재사용. 사용자 결정 요청 아님, 자동 redirect만.
