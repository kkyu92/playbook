---
date: "2026-09-09"
source: "kkyu92/moneyballscore"
type: "worker-error"
payload_type: "error-log"
severity: "error"
fingerprint: "sentry-error-app-next-server-chunks-ssr-root-of-the-server-0"
first_seen: "2026-09-09T07:24:16.532Z"
environment: "production"
run_url: "https://sentry.io/organizations/kyu-au/issues/7721078956/events/ef46fd5bcbfb4a05b29d5aca74a6de05/"
---

## Error
`Error`: dashboard getFactorErrors select failed: Service for this project is restricted due to the following violations: exceed_egress_quota. The project owner must upgrade their plan or remove spend caps to restore service.

## Stack (top 5)
```
  at <anon> (app:///_next/server/chunks/ssr/[root-of-the-server]__0qduvi_._.js:2)
  at A (app:///_next/server/chunks/ssr/apps_moneyball_src_0yflc-e._.js:12)
  at process.processTicksAndRejections (node:internal/process/task_queues:104)
  at Promise.all (index 1:?)
  at C (app:///_next/server/chunks/ssr/apps_moneyball_src_0yflc-e._.js:12)
```

## Context
- Environment: `production`
- Release: `[hex]`
- URL: https://moneyballscore.vercel.app/dashboard
- Culprit: `GET /dashboard`
- Timestamp: 1788938656.532

## Tags
- `browser`: `Chrome 152`
- `browser.name`: `Chrome`
- `client_os`: `macOS`
- `client_os.name`: `macOS`
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
- `server_name`: `169.254.56.227`
- `transaction`: `GET /dashboard`
- `turbopack`: `True`
- `url`: `https://moneyballscore.vercel.app/dashboard`

## Triggered rule
`[hub] L3 production errors`

## Links
- Sentry: https://sentry.io/organizations/kyu-au/issues/7721078956/events/[hex]/
