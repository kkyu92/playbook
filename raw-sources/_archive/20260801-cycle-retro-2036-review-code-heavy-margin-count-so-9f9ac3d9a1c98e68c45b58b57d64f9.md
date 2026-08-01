---
date: "2026-08-01"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "9f9ac3d9a1c98e68c45b58b57d64f9895819b88c"
---


subtype: cycle-retro
cycle_n: 2036
chain_selected: review-code (heavy)
outcome: success
pr: #2896 (merged 0a653fed)

buildTeamProfile.{computeTeamBlowoutCount,computeTeamCloseGameCount} +
buildMatchupProfile.{computeMatchupBlowoutCount,computeMatchupCloseGameCount}
4곳 동일 로직을 packages/shared computeMarginCountFromFinalGames<T> 로 통합
(cycle 2030/2032/2034 와 동일 Feature-Drift Cycle consolidation 패턴).
next_recommended_chain: explore-idea (heavy) 또는 lotto (오늘 21:00 KST 추첨 후 OOS)
