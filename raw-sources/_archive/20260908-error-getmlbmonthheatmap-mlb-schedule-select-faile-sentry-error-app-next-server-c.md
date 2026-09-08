---
date: "2026-09-08"
source: "kkyu92/moneyballscore"
type: "worker-error"
payload_type: "error-log"
severity: "error"
fingerprint: "sentry-error-app-next-server-chunks-ssr-root-of-the-server-0"
first_seen: "2026-09-08T23:25:30.669Z"
environment: "production"
run_url: "https://sentry.io/organizations/kyu-au/issues/7720451831/events/eae3fef740c0493b98140a271e8cc07b/"
---

## Error
`Error`: getMlbMonthHeatmap mlb_schedule select failed: Service for this project is restricted due to the following violations: exceed_egress_quota. The project owner must upgrade their plan or remove spend caps to restore service.

## Stack (top 5)
```
  at <anon> (app:///_next/server/chunks/ssr/[root-of-the-server]__0qduvi_._.js:2)
  at f (app:///_next/server/chunks/ssr/[root-of-the-server]__06imro_._.js:2)
  at process.processTicksAndRejections (node:internal/process/task_queues:104)
  at j (app:///_next/server/chunks/ssr/[root-of-the-server]__06imro_._.js:2)
  at l (app:///_next/server/chunks/ssr/[root-of-the-server]__06imro_._.js:2)
```

## Context
- Environment: `production`
- Release: `[hex]`
- URL: https://moneyballscore.vercel.app/mlb/calendar
- Culprit: `HEAD /mlb/calendar`
- Timestamp: 1788909930.669

## Tags
- `environment`: `production`
- `handled`: `no`
- `interface_type`: `exception`
- `level`: `error`
- `mechanism`: `auto.function.nextjs.on_request_error`
- `os`: `Linux`
- `os.name`: `Linux`
- `runtime`: `node v24.18.0`
- `runtime.name`: `node`
- `release`: `[hex]`
- `server_name`: `169.254.23.181`
- `transaction`: `HEAD /mlb/calendar`
- `turbopack`: `True`
- `url`: `https://moneyballscore.vercel.app/mlb/calendar`

## Triggered rule
`[hub] L3 production errors`

## Links
- Sentry: https://sentry.io/organizations/kyu-au/issues/7720451831/events/[hex]/
