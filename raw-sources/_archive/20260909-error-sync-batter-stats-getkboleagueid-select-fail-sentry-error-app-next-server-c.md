---
date: "2026-09-09"
source: "kkyu92/moneyballscore"
type: "worker-error"
payload_type: "error-log"
severity: "error"
fingerprint: "sentry-error-app-next-server-chunks-root-of-the-server-1zxpc"
first_seen: "2026-09-09T03:17:37.885Z"
environment: "production"
run_url: "https://sentry.io/organizations/kyu-au/issues/7720753665/events/105f4049f4f64b178e4ad438a49c8f32/"
---

## Error
`Error`: sync-batter-stats.getKBOLeagueId select failed: Service for this project is restricted due to the following violations: exceed_egress_quota. The project owner must upgrade their plan or remove spend caps to restore service.

## Stack (top 5)
```
  at <anon> (app:///_next/server/chunks/[root-of-the-server]__1zxpc6b._.js:2)
  at o5 (app:///_next/server/chunks/_0dzw4t-._.js:493)
  at process.processTicksAndRejections (node:internal/process/task_queues:104)
  at o6 (app:///_next/server/chunks/_0dzw4t-._.js:493)
  at q (app:///_next/server/chunks/[root-of-the-server]__1zxpc6b._.js:2)
```

## Context
- Environment: `production`
- Release: `[hex]`
- URL: (none)
- Culprit: `POST /api/sync-batter-stats`
- Timestamp: 1788923857.885

## Tags
- `environment`: `production`
- `handled`: `yes`
- `interface_type`: `exception`
- `layer`: `api-route`
- `level`: `error`
- `mechanism`: `generic`
- `os`: `Linux`
- `os.name`: `Linux`
- `route`: `sync-batter-stats`
- `runtime`: `node v24.18.0`
- `runtime.name`: `node`
- `release`: `[hex]`
- `server_name`: `169.254.17.189`
- `transaction`: `POST /api/sync-batter-stats`
- `turbopack`: `True`

## Triggered rule
`[hub] L3 production errors`

## Links
- Sentry: https://sentry.io/organizations/kyu-au/issues/7720753665/events/[hex]/
