---
date: "2026-10-19"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "4ffb6acb58cefc82e7b20a8fbe04034c1fbfc864"
---


subtype: cycle-retro
cycle_n: 3318
chain_selected: review-code(heavy)
outcome: success

cycle 3317 carry-over(lib/picks,predictions,teams,accuracy 19파일) 완결 + 신규 스코프 lib/{calendar,debug,leaderboard,observability,stats} 11파일 추가 전수 read. leaderboard/server.ts fetchLeaderboard()가 4개 leaderboard view(weekly/monthly/season/all) 조회 시 .order() 없이 .limit()만 사용 — view 내부 ORDER BY accuracy_pct DESC가 outer query에 전파 보장 안 되는 Postgres 특성상 확정 silent correctness risk. .order() 2개 추가해 수정. tsc/lint/pre-push hook 전부 PASS, 직접 main 커밋+push(0dd26134).

next_recommended_chain: op-analysis(lite, gap 25/25 도달) 또는 review-code(heavy) 계속
