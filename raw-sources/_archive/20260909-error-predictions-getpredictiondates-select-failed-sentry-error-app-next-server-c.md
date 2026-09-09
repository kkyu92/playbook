---
date: "2026-09-09"
source: "kkyu92/moneyballscore"
type: "worker-error"
payload_type: "error-log"
severity: "error"
fingerprint: "sentry-error-app-next-server-chunks-ssr-root-of-the-server-0"
first_seen: "2026-09-09T00:21:03.285Z"
environment: "production"
run_url: "https://sentry.io/organizations/kyu-au/issues/7720520322/events/02d2abf2df8a44b69d5ff2c4b29593f8/"
---

## Error
`Error`: predictions.getPredictionDates select failed: Service for this project is restricted due to the following violations: exceed_egress_quota. The project owner must upgrade their plan or remove spend caps to restore service.

## Stack (top 5)
```
  at <anon> (app:///_next/server/chunks/ssr/[root-of-the-server]__0qduvi_._.js:2)
  at t (app:///_next/server/chunks/ssr/[root-of-the-server]__1h-jv_t._.js:2)
  at process.processTicksAndRejections (node:internal/process/task_queues:104)
  at u (app:///_next/server/chunks/ssr/[root-of-the-server]__1h-jv_t._.js:2)
```

## Context
- Environment: `production`
- Release: `[hex]`
- URL: https://moneyballscore.vercel.app/predictions
- Culprit: `GET /predictions`
- Timestamp: 1788913263.285

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
- `server_name`: `169.254.52.49`
- `transaction`: `GET /predictions`
- `turbopack`: `True`
- `url`: `https://moneyballscore.vercel.app/predictions`

## Triggered rule
`[hub] L3 production errors`

## Links
- Sentry: https://sentry.io/organizations/kyu-au/issues/7720520322/events/[hex]/
