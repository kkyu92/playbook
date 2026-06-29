---
date: "2026-06-29"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "fde6fd6e318abf9f90048a5010cead5383423802"
---


subtype: cycle-retro
cycle: 1410
chain: review-code (heavy)
outcome: success
pr: #2513
commit: 3bb46a31

**diagnosis**: cycle 1409 carry-over wave 166 후보 점검 명시 + ISR magic 51/51 commented (wave 165 종료) + silent .catch family 4 client component 발견 + vitest run 시 5 cross-domain ISR constant→literal 자동 전환 발생 (wave 164/165 leftover)

**chain_selected**: review-code (heavy) — wave 166 client silent .catch family + wave 164/165 leftover bundle

**execution**:
- Theme A: 4 client .catch(() => {}) → Sentry.captureException + tags silent_drift_family:wave_166 (UserVsAIScorecard / PickButton x2 / use-leaderboard)
- Theme B: 5 cross-domain ISR constant→literal (insights / insights/series / lotto / page / sitemap)
- guards 3 추가 (packages/shared + lotto-routes + mlb-hub-page)
- tests 1413 (+4 from 1409)
- PR #2513 merge auto-squash

**silent drift family streak**: ~943 cycle (cycle 458 → 1410)

**next_recommended_chain**: review-code (heavy)
**reason**: wave 167 후보 = SSR fallback .catch(() => []/null/{}) family (page.tsx / standings / matchup / teams / opengraph-image / api routes) 명확. wave 166 패턴 정합 적용 가능.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
