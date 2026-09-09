---
date: "2026-09-09"
source: "kkyu92/moneyballscore"
type: "worker-error"
payload_type: "error-log"
severity: "error"
fingerprint: "sentry-error-app-next-server-chunks-ssr-root-of-the-server-0"
first_seen: "2026-09-09T04:59:40.488Z"
environment: "production"
run_url: "https://sentry.io/organizations/kyu-au/issues/7720876410/events/b977613a8f3a4518b8589bb7cd198d3d/"
---

## Error
`Error`: insights.getInsightsForDate select failed: Service for this project is restricted due to the following violations: exceed_egress_quota. The project owner must upgrade their plan or remove spend caps to restore service.

## Stack (top 5)
```
  at <anon> (app:///_next/server/chunks/ssr/[root-of-the-server]__0qduvi_._.js:2)
  at v (app:///_next/server/chunks/ssr/[root-of-the-server]__08axcgg._.js:2)
  at process.processTicksAndRejections (node:internal/process/task_queues:104)
  at z (app:///_next/server/chunks/ssr/[root-of-the-server]__08axcgg._.js:2)
```

## Context
- Environment: `production`
- Release: `[hex]`
- URL: http://moneyballscore.vercel.app/insights/2026-08-19
- Culprit: `GET /insights/[date]`
- Timestamp: 1788929980.488

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
- `server_name`: `169.254.35.61`
- `transaction`: `GET /insights/[date]`
- `turbopack`: `True`
- `url`: `http://moneyballscore.vercel.app/insights/2026-08-19`

## Triggered rule
`[hub] L3 production errors`

## Links
- Sentry: https://sentry.io/organizations/kyu-au/issues/7720876410/events/[hex]/
