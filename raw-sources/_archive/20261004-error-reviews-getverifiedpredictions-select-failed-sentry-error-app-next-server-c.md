---
date: "2026-10-04"
source: "kkyu92/moneyballscore"
type: "worker-error"
payload_type: "error-log"
severity: "error"
fingerprint: "sentry-error-app-next-server-chunks-ssr-root-of-the-server-0"
first_seen: "2026-10-04T00:31:51.941Z"
environment: "production"
run_url: "https://sentry.io/organizations/kyu-au/issues/7771623582/events/be8a7db2d66946ec9ad2ad8fee70f46e/"
---

## Error
`Error`: reviews getVerifiedPredictions select failed: Service for this project is restricted due to the following violations: exceed_egress_quota. The project owner must upgrade their plan or remove spend caps to restore service.

## Stack (top 5)
```
  at <anon> (app:///_next/server/chunks/ssr/[root-of-the-server]__0qduvi_._.js:2)
  at s (app:///_next/server/chunks/ssr/apps_moneyball_src_1t4ot_s._.js:10)
  at process.processTicksAndRejections (node:internal/process/task_queues:104)
  at Promise.all (index 0:?)
  at t (app:///_next/server/chunks/ssr/apps_moneyball_src_1t4ot_s._.js:10)
```

## Context
- Environment: `production`
- Release: `[hex]`
- URL: https://moneyballscore.vercel.app/reviews
- Culprit: `GET /reviews`
- Timestamp: 1791073911.941

## Tags
- `browser`: `Chrome 145.0.0`
- `browser.name`: `Chrome`
- `client_os`: `Windows >=10`
- `client_os.name`: `Windows`
- `environment`: `production`
- `handled`: `no`
- `interface_type`: `exception`
- `level`: `error`
- `mechanism`: `auto.function.nextjs.on_request_error`
- `os`: `Linux`
- `os.name`: `Linux`
- `runtime`: `node v24.21.0`
- `runtime.name`: `node`
- `release`: `[hex]`
- `server_name`: `169.254.22.237`
- `transaction`: `GET /reviews`
- `turbopack`: `True`
- `url`: `https://moneyballscore.vercel.app/reviews`

## Triggered rule
`[hub] L3 production errors`

## Links
- Sentry: https://sentry.io/organizations/kyu-au/issues/7771623582/events/[hex]/
