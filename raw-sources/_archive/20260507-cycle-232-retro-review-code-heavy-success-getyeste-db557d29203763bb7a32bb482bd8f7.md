---
date: "2026-05-07"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "db557d29203763bb7a32bb482bd8f7ee132ebe92"
---


subtype: cycle-retro
cycle_n: 232
chain_selected: review-code heavy
outcome: success
pr_number: 214
commit_hash: e11f42a
retro.summary: daily.ts getYesterdayKST off-by-1 버그 발견 및 수정. UTC 서버에서 d.getDate()=UTC day → KST midnight(UTC 전날 15:00)에 setDate(-1) 2일 소급. recent form window 하루 짧아지는 silent data bias + postview cleanup 하루 이른 날짜. 수정: toKSTDateString(d.getTime()-86400s). updateAccuracy assertSelectOk 일관성. sp_fip Δ=-0.15 원인은 데이터 staleness 아님 확인.
next_recommended_chain: explore-idea

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
