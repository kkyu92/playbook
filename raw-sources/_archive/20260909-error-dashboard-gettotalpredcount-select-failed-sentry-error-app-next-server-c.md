---
date: "2026-09-09"
source: "kkyu92/moneyballscore"
type: "worker-error"
payload_type: "error-log"
severity: "error"
fingerprint: "sentry-error-app-next-server-chunks-ssr-root-of-the-server-0"
first_seen: "2026-09-09T08:41:22.443Z"
environment: "production"
run_url: "https://sentry.io/organizations/kyu-au/issues/7721204403/events/85dfb5e425864a98b5c6364a97a65454/"
---

## Error
`Error`: dashboard getTotalPredCount select failed: 

## Stack (top 5)
```
  at <anon> (app:///_next/server/chunks/ssr/[root-of-the-server]__0qduvi_._.js:2)
  at B (app:///_next/server/chunks/ssr/apps_moneyball_src_0yflc-e._.js:12)
  at process.processTicksAndRejections (node:internal/process/task_queues:104)
  at Promise.all (index 2:?)
  at C (app:///_next/server/chunks/ssr/apps_moneyball_src_0yflc-e._.js:12)
```

## Context
- Environment: `production`
- Release: `[hex]`
- URL: https://moneyballscore.vercel.app/dashboard
- Culprit: `GET /dashboard`
- Timestamp: 1788943282.443

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
- `server_name`: `169.254.58.127`
- `transaction`: `GET /dashboard`
- `turbopack`: `True`
- `url`: `https://moneyballscore.vercel.app/dashboard`

## Triggered rule
`[hub] L3 production errors`

## Links
- Sentry: https://sentry.io/organizations/kyu-au/issues/7721204403/events/[hex]/
