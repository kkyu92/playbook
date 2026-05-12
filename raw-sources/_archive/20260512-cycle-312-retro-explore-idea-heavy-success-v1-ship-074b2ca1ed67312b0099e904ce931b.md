---
date: "2026-05-12"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "074b2ca1ed67312b0099e904ce931ba0c13d939b"
---


subtype: cycle-retro
cycle_n: 312
chain_selected: explore-idea (heavy)
outcome: SUCCESS
pr: 302

retro.summary: 픽 리더보드 v1 전체 구현 ship. user_picks 테이블 + leaderboard_weekly/season 뷰 (migration 024), /leaderboard ISR 페이지, sync API, useLeaderboard hook, 3개 컴포넌트, MyPicksClient CTA 통합. 295 tests green.
next_recommended_chain: polish-ui

key_findings:
- cycles 310/311 모두 explore-idea 권장 — 일관된 신호
- PostgreSQL aggregate alias bug → subquery wrapping으로 해결
- RLS write → admin client API route로 단순화
- 닉네임 2-12자 XSS + UUID 형식 검증 API 레벨 추가
