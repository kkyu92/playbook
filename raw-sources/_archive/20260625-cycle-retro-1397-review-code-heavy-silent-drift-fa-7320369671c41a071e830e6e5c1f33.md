---
date: "2026-06-25"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "7320369671c41a071e830e6e5c1f33b79661bbaa"
---


subtype: cycle-retro
cycle_n: 1397
chain_selected: review-code (heavy)
outcome: success
pr: #2198
commit_hash: 98b62ec5

summary: working tree 9 prod 파일 ISR revalidate magic numbers (600/3600/21600/86400/60) → @moneyball/shared *_ISR_SECONDS 상수 통합. imports + registry 사전 박제 = 즉시 ship. wave 162 OG sweep parallel sub-sweep.

files:
  - apps/moneyball/src/app/analysis/game/[id]/page.tsx (600 → ANALYSIS_GAME_ISR_SECONDS)
  - apps/moneyball/src/app/analysis/page.tsx (3600 → ANALYSIS_INDEX_ISR_SECONDS)
  - apps/moneyball/src/app/calendar/page.tsx (21600 → CALENDAR_ISR_SECONDS)
  - apps/moneyball/src/app/insights/[date]/page.tsx (86400 → INSIGHTS_ISR_SECONDS)
  - apps/moneyball/src/app/insights/page.tsx (86400 → INSIGHTS_ISR_SECONDS)
  - apps/moneyball/src/app/insights/series/[topic]/page.tsx (3600 → INSIGHTS_SERIES_ISR_SECONDS)
  - apps/moneyball/src/app/page.tsx (600 → HOME_ISR_SECONDS)
  - apps/moneyball/src/app/sitemap.ts (21600 → SITEMAP_ISR_SECONDS)
  - apps/moneyball/src/app/v2-shadow-monitor/page.tsx (60 → V2_SHADOW_MONITOR_ISR_SECONDS)

context:
  - 2-chain lock distinct=3 미발동 (review-code 6 / fix-incident 1 / explore-idea 1)
  - dominance-positive streak (cycle 135 룰) — review-code (heavy) silent drift family detection channel
  - silent drift family wave streak ~164 (cycle 1234~1397)

next_recommended_chain: review-code (heavy) — wave 164 자연 재진입 가능성 (잔여 timeout/cache TTL/window magic numbers 또는 다른 literal 카테고리)
