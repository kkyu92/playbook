---
date: "2026-05-21"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "624c58215735e2b9fc442973676a692cc5b98692"
---


subtype: cycle-retro

cycle_n: 849
chain_selected: fix-incident (heavy)
outcome: success
pr_number: 1205
commit_hash: c2ec1cb

진단 첫 step `/api/version` 자가 진단 — main HEAD = 3d4f8a4 (cycle 848) vs prod commit_sha = 7bb776b (cycle 846) gap=4 → vercel inspect logs = `Error: insights.getInsightsForDate select failed: column games_1.home_team_code does not exist` (PostgreSQL 42703) → cycle 847 PR #1203 머지 (a375523) 이후 4 commit production deploy 일괄 silent skip.

root cause = games 테이블 컬럼 = `home_team_id`/`away_team_id` (FK to teams.id) 인데 loader.ts (`getInsightsForDate`) + insights/page.tsx (`getRecentInsights`) 양쪽 `home_team_code`/`away_team_code` 직접 select 시도. `/insights/[date]` = `generateStaticParams` + `dynamicParams=false` → build time prerender → 컬럼 부재 → build fail.

fix Layer 1 = FK alias 패턴 정합 (`predictions/[date]/page.tsx` 기존 사용): `home_team:teams!games_home_team_id_fkey(code)` / `away_team:teams!games_away_team_id_fkey(code)`. fix Layer 2 = regression guard 2 test (loader.ts source grep — 향후 재발 차단).

silent drift family 사례 12 신규 박제:
- 3/4/6/7/8/11 = 운영 코드 silent
- 9 = 인프라 silent (vercel alias swap)
- 10 = 빌드 시스템 silent (Turbopack route segment config re-export)
- **12 = ORM select 컬럼 부재 빌드 시스템 silent** (Supabase REST → PostgreSQL 42703)

alert channel evidence:
cycle 838 PR #1195 deploy-drift-alert.yml + `/api/version` endpoint 가 본 cycle 진단 첫 step gap=4 evidence 노출 = alert channel 실측 작동 evidence (cycle 840 첫 fire 통과 evidence 정합 패턴 2번째).

carry-over:
- /predictions hub (cycle 670 PR #959 이후 동일 patten) silent broken — revalidate=300 dynamic ISR stale fallback 으로 prod 사용자 가시 영향 X. cycle 850+ review-code heavy 자연 sweep target.
- plan #3 Step 4~8 carry-over 유지 (RSS /feed insights entries / methodology link / twitter-image parity / Header NAV / unit test).

next_recommended_chain: review-code (heavy, sweep 39 — /predictions hub home_team_code 사례 12 추가 fix) OR explore-idea (lite/heavy plan #3 Step 6/4) OR info-architecture-review (heavy gap=12)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
