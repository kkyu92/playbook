---
date: "2026-05-14"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "3c50e93c497e35803f2fa6d453c3b79dba897fa9"
---


subtype: cycle-retro
cycle_n: 374
chain_selected: review-code heavy
outcome: SUCCESS
commit: 8154ee7

retro.summary: leaderboard_weekly/season 뷰 g.status='completed' 필터 →
games.status='final'(pipeline 표준) 와 불일치 → 리더보드 cycle 312 이후 항상 0건.
Migration 026 prod 적용. silent drift family (status enum mismatch) 9번째.

next_recommended_chain: explore-idea or info-architecture-review

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
