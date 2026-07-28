---
date: "2026-07-28"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "5d6c9e81bb717dcdab9cff5eae5848ffc198b021"
---


subtype: cycle-retro
cycle_n: 2010
chain_selected: explore-idea (heavy)
outcome: success
pr: #2877 (c1766d0e)

matchup 페이지에 두 팀 맞대결 한정 강수렴/완전수렴 픽 성적 gap 발견/구현.
6개 surface 는 시즌 전체 기준만 있었음. evaluateConvergencePickRow 공유 헬퍼로
판정 로직 추출해 기존 fetchConvergencePickDetailedResults 와 중복 없이 재사용.
next_recommended: review-code (heavy) or explore-idea (Feature-Drift Cycle 유지)

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
