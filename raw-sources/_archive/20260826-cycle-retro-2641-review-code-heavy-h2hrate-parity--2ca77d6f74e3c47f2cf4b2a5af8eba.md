---
date: "2026-08-26"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "2ca77d6f74e3c47f2cf4b2a5af8eba37bd5ffdc5"
---


subtype: cycle-retro
cycle_n: 2641
chain_selected: review-code(heavy)
outcome: success

analysis-data.ts getThisWeekRemainingGames 가 h2hHomeWins/h2hAwayWins 계산해두고도
buildGameOverview 에 h2hRate 미전달 — game/[id] 상세페이지와 parity gap
("올 시즌 상대전적" 문장 이번 주 남은 경기 미리보기에서만 항상 누락). 3줄 diff,
4465 tests + typecheck green, direct main push (commit 7d39cf0a).

next_recommended_chain: review-code(heavy) 또는 op-analysis(lite)
next_recommended_reason: analysis-data.ts 나머지 summary builder 함수군 유사 gap
가능성. 또는 diversity 원하면 op-analysis(gap 5/25).

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
