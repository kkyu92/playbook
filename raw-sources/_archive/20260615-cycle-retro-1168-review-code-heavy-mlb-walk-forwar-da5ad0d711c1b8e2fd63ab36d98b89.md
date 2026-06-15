---
date: "2026-06-15"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "da5ad0d711c1b8e2fd63ab36d98b89538e296032"
---


subtype: cycle-retro
cycle: 1168
chain: review-code (heavy)
outcome: success

진단:
- cycle 1167 review-code lite SUCCESS → heavy 권장 (chain table 룰)
- MLB pipeline 최근 5 fix commit 누적 (game_datetime_utc, SUPABASE_URL, statsapi, partial index, pipeline_runs run_date)
- open hub-dispatch issue 0, approved plan 0
- improvement saturation 9/15 < 12 (explore-idea trigger 미충족)
- 2-chain lock distinct=6 clear
- skill-evolution marker 부재

발견 (silent drift family):
- runWalkForwardMeasure (mlb-pipeline.ts L279-332) 2 layer silent drift
  1. .eq('game_date', date) — predictions table 의 MLB rows 는 mlb_game_date 만 박제 (migration 038), game_date 컬럼 부재
  2. games!inner(...) 조인 — MLB predictions 의 game_id=NULL (mlb_schedule 별도 테이블), KBO 전용 FK 부적합
- 기존 mock test (createClient 전체 mock) 가 컬럼명 무관 통과 → silent drift 미검출

fix:
- 2-step query 재작성 (runShadowTrain 패턴 정합):
  predictions select .eq('mlb_game_date', date) → mlb_schedule select .in('external_game_id', ids) .eq('status', 'final')
- mock-bypass regression test 추가 (eq 호출 컬럼 inspect)

verification:
- pnpm test → 1912 PASS (kbo-data 929 + moneyball 983)
- PR #1961 merged (squash, 673c0f8, R7 auto-merge)

next_recommended:
- chain: polish-ui 또는 fix-incident
- reason: review-code heavy SUCCESS 직후 → lite 권장. polish-ui 자연 source 강함 (DESIGN.md mtime 18 day, 신규 라우트 7d 10+)

silent drift family streak: ~628 cycle (cycle 458 → cycle 1168)
PR ship: 736 (cycle 1168)
