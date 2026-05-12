---
date: "2026-05-12"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "b8d5881840bb61c87887962d68f2b537f4deb9ea"
---


subtype: cycle-retro
cycle_n: 307
chain_selected: review-code (heavy)
outcome: success
commit_hash: 3d98c57

retro.summary: page.tsx 869줄 monolith에서 silent drift 3종 발견 + 정리.
(1) dead interface fields (home_elo/away_elo 등 4개, DB select 불일치)
(2) YesterdayResultsSection page.tsx named export → /components/predictions/ 추출
(3) accuracy/page.tsx 미사용 5개 symbol 제거.
page.tsx 869→775줄.

next_recommended_chain: explore-idea or operational-analysis
