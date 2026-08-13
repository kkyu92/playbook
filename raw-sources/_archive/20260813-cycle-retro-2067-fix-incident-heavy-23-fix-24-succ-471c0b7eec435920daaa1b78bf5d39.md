---
date: "2026-08-13"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "471c0b7eec435920daaa1b78bf5d399fb5c80a9f"
---


subtype: cycle-retro
cycle_n: 2067
chain_selected: fix-incident (heavy)
outcome: success
next_recommended_chain: fix-incident (lite) or explore-idea (plan #24 Phase 4)

fix-incident(heavy) success -- 사례23(mlb_statsapi_scrape backfill 부재) fix
완료(cloudflare-worker 최근 3일 재스크랩 + 57개 stuck 날짜 backfill script,
0→748 final rows) 후 curl 재검증에서 화면이 여전히 안 바뀜을 발견 → 조사 결과
더 깊은 별개 root cause(사례24: mlb_schedule RLS anon read policy 부재,
038_mlb_schedule.sql 이 044_mlb_team_stats.sql 패턴을 빠뜨림 — anon key
SELECT 항상 0 rows silent, service role 검증으론 못 잡음) 규명 + 045 migration
으로 fix. anon-key 경로로 직접 재검증(다른 테이블과 대조 diff + curl 프로덕션
페이지) 해서 사례22/23/24 를 전부 뚫고 실제 렌더 결과("아직 완료된 경기
없음" → "올 시즌 상대전적 4승 5패, AI 예측 44%") 확인.

carry-over: cloudflare-worker wrangler deploy 로컬 toolchain 깨짐 — worker.ts
fix 는 main 에 push 됐지만 Cloudflare Worker 런타임엔 미반영 (다음
fix-incident 후보).

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
