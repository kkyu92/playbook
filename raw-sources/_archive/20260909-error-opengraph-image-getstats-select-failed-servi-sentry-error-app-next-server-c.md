---
date: "2026-09-09"
source: "kkyu92/moneyballscore"
type: "worker-error"
payload_type: "error-log"
severity: "error"
fingerprint: "sentry-error-app-next-server-chunks-root-of-the-server-1mow0"
first_seen: "2026-09-09T00:35:54.144Z"
environment: "production"
run_url: "https://sentry.io/organizations/kyu-au/issues/7720540251/events/c4b1c616002f49e8a60ecd5669893868/"
---

## Error
`Error`: opengraph-image getStats select failed: Service for this project is restricted due to the following violations: exceed_egress_quota. The project owner must upgrade their plan or remove spend caps to restore service.

## Stack (top 5)
```
  at <anon> (app:///_next/server/chunks/[root-of-the-server]__1mow054._.js:2)
  at p (app:///_next/server/chunks/[root-of-the-server]__1mow054._.js:2)
  at process.processTicksAndRejections (node:internal/process/task_queues:104)
  at u (app:///_next/server/chunks/[root-of-the-server]__1mow054._.js:2)
  at rJ.do (/var/task/node_modules/.pnpm/next@16.2.10_@babel+core@7.29.7_@opentelemetry+api@1.9.1_@playwright+test@1.61.1_react-_e7ef6af02144761039f4a3f4d9d0a948/node_modules/next/dist/compiled/next-server/app-route-turbo.runtime.prod.js:5)
```

## Context
- Environment: `production`
- Release: `[hex]`
- URL: (none)
- Culprit: `?([root-of-the-server]__1mow054._)`
- Timestamp: 1788914154.144

## Tags
- `component`: `opengraph-image`
- `environment`: `production`
- `handled`: `yes`
- `interface_type`: `exception`
- `level`: `error`
- `mechanism`: `generic`
- `os`: `Linux`
- `os.name`: `Linux`
- `route`: `predictions/[date]`
- `runtime`: `node v24.18.0`
- `runtime.name`: `node`
- `release`: `[hex]`
- `server_name`: `169.254.18.113`
- `turbopack`: `True`

## Triggered rule
`[hub] L3 production errors`

## Links
- Sentry: https://sentry.io/organizations/kyu-au/issues/7720540251/events/[hex]/
