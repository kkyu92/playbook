---
date: "2026-06-19"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "e57689fd00c1882c19b520e1b318fec819215821"
---


subtype: cycle-retro
cycle_n: 1254
chain_selected: review-code (heavy)
outcome: success

silent drift family wave 58 — apps/moneyball/src/app/mlb/games/[date]/[slug]/page.tsx FactorRow hardcoded 선발FIP/타선wOBA → MetricRegistry.ko_name lookup. wave 57 MatchupFactorCompare 동일 family pattern grep 자연 detection.

mitigation: FactorRow signature 확장 (slug?: MetricSlug + label?: string). 2 production factor slug 전환 + 2 Statcast factor literal 유지 mixed signature. xwoba/barrel_pct = MetricRegistry 미등록.

scope: 1 파일 / 16 insertions / 4 deletions
test: 986 PASS / tsc clean
pr: #2039 (auto-merge enabled, --squash --delete-branch)

next_recommended_chain: review-code (heavy) — MLB factor surface 추가 search candidate 잔존 (methodology prose / homepage FACTORS list / team-agent prefix).
