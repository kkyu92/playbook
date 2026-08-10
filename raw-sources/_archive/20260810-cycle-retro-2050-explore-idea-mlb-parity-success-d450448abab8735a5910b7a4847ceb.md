---
date: "2026-08-10"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "d450448abab8735a5910b7a4847ceb2641edc0c1"
---


subtype: cycle-retro
cycle_n: 2050
chain_selected: explore-idea
outcome: success
pr_number: 2908
commit_hash: 26d1b77e

MLB buildMlbTeamProfile 이 KBO buildTeamProfile 대비 streak/avgMargin/
blowout/closeGame/homeAwayEdge/recentRecord 6팩터 parity gap. 스트릭 1개
처리. computeTeamStreak 파라미터를 구조적 StreakGame 타입으로 좁혀 KBO/MLB
양쪽 재사용 — 반복된 접두어-중복 silent drift family 를 사전 차단.
next_recommended: explore-idea (잔여 5팩터 parity) 또는 review-code.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
