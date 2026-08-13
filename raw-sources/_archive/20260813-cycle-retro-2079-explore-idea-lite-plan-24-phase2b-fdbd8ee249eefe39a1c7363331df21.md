---
date: "2026-08-13"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "fdbd8ee249eefe39a1c7363331df2196bc931900"
---


subtype: cycle-retro
cycle_n: 2079
chain_selected: explore-idea (lite)
outcome: partial
next_recommended_chain: fix-incident (lite, 08-14/08-15 lotto cron fire 실측 — 날짜 도달)

review-code(heavy) 4연속 SUCCESS streak 후 diversity redirect. plan #24 남은 Phase 2b
(MLB matchup Elo 추이 차트 blocker, cycle 2057부터 BLOCKED)를 별도 plan #25로 분리.
Explore agent가 KBO Elo 내부 구조를 실측 조사한 결과, KBO도 자체 K-factor 갱신 로직이
리포에 없음이 드러남 — KBO Fancy Stats 외부 페이지를 매일 스크랩한 스냅샷을
predictions.home_elo/away_elo에 그대로 저장할 뿐이고, team_season_stats.elo_rating
컬럼(003 migration)은 참조 0건 dead schema. 즉 plan #24의 "KBO 로직 포팅" 가정이
틀렸고, MLB Elo는 K-factor 수식 자체를 신규 설계해야 하는 더 큰 스코프임을 확인.

plan #25에 Phase 1(엔진+백필)/Phase 2(자동갱신+UI)/Phase 3(예측 반영) 구조로 재분해,
Phase 3는 CLAUDE.md "데이터로만 이야기" 룰에 맞춰 op-analysis backtest 게이트 명시
(v1.8 유지 확정/v2.1-B reject 히스토리와 동일 원칙 — 미검증 팩터로 실 예측 win_prob
자율 flip 금지). plan #24는 잔여 없이 closed. 코드 변경 없음(spec-only) — TODOS.md만
동기 갱신.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
