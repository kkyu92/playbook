---
date: "2026-05-14"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "06a7c2f09ddf45e7f4b5ca7b00e40e32330134f3"
---


subtype: cycle-retro
cycle_n: 406
chain_selected: lotto (dual-cycle, cycle 5/15)
outcome: success

5 신규 100% 규칙: 하위3곱 / 중심3곱 / 인접곱합 / 합mod7 / 합mod11.
166 → 171 규칙. 유효 7,854,422 → 7,854,327 (+95 제거, +0.00%p plateau).
직전 cycle elim 추이: +0.13 → +0.35 → +0.40 → +0.13 → +0.00%p.
원인: domain 작은 sum mod (0~6, 0~10) + 위치곱 정보 중복.

다음 cycle: dual-cycle 잔여 lotto 10 + moneyball 13.
곱/mod 차원 plateau → 통계/비율/비대칭 차원 (skewness / sorted median /
top3:bot3 ratio) 탐색 권장.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
