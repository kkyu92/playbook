---
date: "2026-06-25"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "fd92dfeb8a134234663b7ce978dc8b431d5183ae"
---


subtype: cycle-retro
cycle_n: 1395
chain_selected: review-code (heavy)
outcome: success
pr: #2196 (MERGED, 20e88852)

진단:
- git log 20 wave 161 SITE_HOST + 160 GA/AdSense + 159 CONTACT_EMAIL streak
- open hub-dispatch issue 0건 / approved plan 0건 (#10~23 모두 completed)
- 직전 8 distinct=3 (lock X) / 직전 15 saturation 12/15 met
- cycle 1393 lite redirect 2 cycle 전 fresh = redundant

chain 선택:
- silent drift family wave 162 trigger 명확 (https://www.koreabaseball.com 7+ 파일 산재)
- dominance-positive streak 자연 발화 (cycle 135 룰)

실행:
- packages/shared/src/site.ts: KBO_OFFICIAL_URL + KBO_SCHEDULE_URL (derived) 신규
- packages/shared/src/index.ts: 신규 exports
- packages/kbo-data/src/types.ts: KBO_BASE_URL + KBO_SCHEDULE_REFERER → shared re-export
- apps/moneyball/src/lib/seo/json-ld.ts: ORG_URL → KBO_OFFICIAL_URL
- apps/moneyball/src/app/teams/[code]/page.tsx: SportsOrganization @id+url
- apps/moneyball/src/app/analysis/game/[id]/page.tsx: organizer.url
- apps/moneyball/src/app/api/health/route.ts: KBO_API_URL + REFERER → KBO_SCHEDULE_URL

테스트:
- @moneyball/shared 162/162 passed
- @moneyball/kbo-data 1055/1055 passed

박제:
- silent drift family wave 162 streak ~163 wave (cycle 458 → 1395)
- working tree 87 opengraph/twitter 파일 broken syntax (',,') 발견 — wave 161 incomplete extension
- next_recommended_chain: fix-incident (broken syntax 파일 cleanup)

cloudflare-worker/src/worker.ts:153 = 별개 dep tree (pnpm workspace 외) wave 미포함.
