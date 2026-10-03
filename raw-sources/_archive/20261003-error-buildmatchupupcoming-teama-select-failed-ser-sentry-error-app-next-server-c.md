---
date: "2026-10-03"
source: "kkyu92/moneyballscore"
type: "worker-error"
payload_type: "error-log"
severity: "error"
fingerprint: "sentry-error-app-next-server-chunks-ssr-root-of-the-server-0"
first_seen: "2026-10-03T22:31:55.130Z"
environment: "production"
run_url: "https://sentry.io/organizations/kyu-au/issues/7771500523/events/0154e22904bf4563852137a10b175815/"
---

## Error
`Error`: buildMatchupUpcoming teamA select failed: Service for this project is restricted due to the following violations: exceed_egress_quota. The project owner must upgrade their plan or remove spend caps to restore service.

## Stack (top 5)
```
  at <anon> (app:///_next/server/chunks/ssr/[root-of-the-server]__0qduvi_._.js:2)
  at o (app:///_next/server/chunks/ssr/apps_moneyball_src_01yu2t3._.js:13)
  at process.processTicksAndRejections (node:internal/process/task_queues:104)
  at Promise.all (index 5:?)
```

## Context
- Environment: `production`
- Release: `[hex]`
- URL: https://moneyballscore.vercel.app/matchup/LG/SS
- Culprit: `GET /matchup/LG/SS`
- Timestamp: 1791066715.13

## Tags
- `browser`: `Chrome 150`
- `browser.name`: `Chrome`
- `client_os`: `macOS`
- `client_os.name`: `macOS`
- `environment`: `production`
- `handled`: `yes`
- `interface_type`: `exception`
- `layer`: `page-fallback`
- `level`: `error`
- `mechanism`: `generic`
- `os`: `Linux`
- `os.name`: `Linux`
- `route`: `/matchup/[teamA]/[teamB]`
- `runtime`: `node v24.21.0`
- `runtime.name`: `node`
- `release`: `[hex]`
- `server_name`: `169.254.81.247`
- `source`: `buildMatchupUpcoming`
- `transaction`: `GET /matchup/LG/SS`
- `turbopack`: `True`
- `url`: `https://moneyballscore.vercel.app/matchup/LG/SS`

## Triggered rule
`[hub] L3 production errors`

## Links
- Sentry: https://sentry.io/organizations/kyu-au/issues/7771500523/events/[hex]/
