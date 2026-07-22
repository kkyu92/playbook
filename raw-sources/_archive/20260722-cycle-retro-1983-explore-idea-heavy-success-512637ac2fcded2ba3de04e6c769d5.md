---
date: "2026-07-22"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "512637ac2fcded2ba3de04e6c769d51584305c53"
---


subtype: cycle-retro
cycle: 1983
chain_selected: explore-idea (heavy)
outcome: success

no open hub-dispatch issue / no approved plan / no forced periodic trigger
(fix-incident gap=15, info-arch gap=24, lotto/op-analysis in cooldown) —
free reasoning. Found precise gap: /reviews 허브(wave-597)에만 있던 강수렴/
완전수렴 픽 홈/어웨이 분리 성적이 /reviews/monthly/[month] 에는 없었음
(월간 W-L wave-586, 스트리크 wave-594 는 이미 range-scoped 되어 있었는데
홈/어웨이만 누락). fetchConvergencePickDetailedResults 에 endDate,
getConvergencePickHomeAwaySplit 에 startDate/endDate optional param 추가
(기존 wave-546/584 패턴 재사용, 순수 함수 무변경) 후 monthly 페이지에 배선.
weekly 상세는 표본 부족(주당 강수렴 픽 3~5건, MIN_PICKS=5 문턱)으로 이번엔
제외 — 대신 항상 숨겨질 배지를 안 만드는 판단.

PR #2848 squash-merge (cfaffbe6). 테스트 395 files/3541 tests green, tsc clean.

next_recommended_chain: review-code (heavy) or lotto (lite, ~30cyc gap) or
fix-incident (20cyc gap approaching cycle ~1988)
