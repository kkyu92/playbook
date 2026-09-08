---
date: "2026-09-08"
source: "kkyu92/moneyballscore"
type: "worker-error"
payload_type: "error-log"
severity: "error"
fingerprint: "sentry-error-app-next-server-chunks-ssr-root-of-the-server-0"
first_seen: "2026-09-08T22:19:31.672Z"
environment: "production"
run_url: "https://sentry.io/organizations/kyu-au/issues/7720363637/events/754468be8dab40b7ac2a0c031ba39bf2/"
---

## Error
`Error`: home.getYesterdayResults select failed: Service for this project is restricted due to the following violations: exceed_egress_quota. The project owner must upgrade their plan or remove spend caps to restore service.

## Stack (top 5)
```
  at <anon> (app:///_next/server/chunks/ssr/[root-of-the-server]__0qduvi_._.js:2)
  at H (app:///_next/server/chunks/ssr/apps_moneyball_src_0k4axsi._.js:31)
  at process.processTicksAndRejections (node:internal/process/task_queues:104)
  at Promise.all (index 3:?)
  at N (app:///_next/server/chunks/ssr/apps_moneyball_src_0k4axsi._.js:35)
```

## Context
- Environment: `production`
- Release: `[hex]`
- URL: https://moneyballscore.vercel.app/
- Culprit: `GET /`
- Timestamp: 1788905971.672

## Tags
- `browser`: `SentryUptimeBot 1.0`
- `browser.name`: `SentryUptimeBot`
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
- `server_name`: `169.254.19.101`
- `transaction`: `GET /`
- `turbopack`: `True`
- `url`: `https://moneyballscore.vercel.app/`

## Triggered rule
`[hub] L3 production errors`

## Links
- Sentry: https://sentry.io/organizations/kyu-au/issues/7720363637/events/[hex]/
