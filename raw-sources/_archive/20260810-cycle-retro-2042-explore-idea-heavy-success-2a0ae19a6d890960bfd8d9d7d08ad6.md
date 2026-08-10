---
date: "2026-08-10"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "2a0ae19a6d890960bfd8d9d7d08ad63185da7b5a"
---


subtype: cycle-retro
cycle_n: 2042
chain_selected: explore-idea (heavy)
outcome: success
pr_number: 2901
commit_hash: 4bc9ee64

retro.summary: matchup↔team 통계 parity 관점에서 computeMatchupStreak(맞대결 한정
연승/연패)에 대응하는 team 전체 스코프 스트릭이 buildTeamProfile.ts에 없던 gap을
발견해 computeTeamStreak 추가. wave-618/619(avgMargin/blowout/closeGame) 확장
패턴의 6번째 연장. Feature-Drift Cycle 지속 확인 (review-code 2040 → lotto 2041 →
explore-idea 2042).

next_recommended_chain: review-code 또는 operational-analysis
next_recommended_reason: 신규 streak 로직이 team-code 기반(matchup) vs win/loss
기반(team)으로 리턴 타입 달라 이번엔 shared 통합 안 함 — 다음 review-code가 통합
필요성 재평가 가치. op-analysis gap도 23/25로 근접 중.
