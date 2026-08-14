---
date: "2026-08-14"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "dc8bf72d180c1df3ac9d5fb2e36b60cdf2e78907"
---


subtype: cycle-retro
cycle_n: 2097
chain_selected: operational-analysis(heavy) → fix-incident 겸
outcome: success

plan #25 Phase 3 backtest 착수 시도 중 mlb_team_stats/mlb_schedule team_code
컨벤션 불일치(7팀 alias 미정규화, cycle 2081 사례27 과 동일 패턴이 핵심 예측
조회 지점엔 미적용)를 발견해 fix. normalizeMlbTeamCode 양쪽 적용 + 회귀 테스트 +
기존 762건 backfill 재실행. lint/test 전체 green. plan #25 Phase 3 backtest 는
alias fix 반영된 신규 예측 데이터 축적 후 재착수로 이월.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
