---
date: "2026-10-04"
source: "kkyu92/moneyballscore"
type: "worker-error"
payload_type: "error-log"
severity: "error"
fingerprint: "sentry-error-app-next-server-chunks-ssr-root-of-the-server-0"
first_seen: "2026-10-04T01:49:17.710Z"
environment: "production"
run_url: "https://sentry.io/organizations/kyu-au/issues/7771704907/events/113887af77c64ec1bdb9d0273ced7ea8/"
---

## Error
`Error`: mlb-insights.getRecentMlbInsights predictions select failed: Service for this project is restricted due to the following violations: exceed_egress_quota. The project owner must upgrade their plan or remove spend caps to restore service.

## Stack (top 5)
```
  at <anon> (app:///_next/server/chunks/ssr/[root-of-the-server]__0qduvi_._.js:2)
  at g (app:///_next/server/chunks/ssr/[root-of-the-server]__02mp7-c._.js:2)
  at process.processTicksAndRejections (node:internal/process/task_queues:104)
  at o (app:///_next/server/chunks/ssr/[root-of-the-server]__02mp7-c._.js:2)
```

## Context
- Environment: `production`
- Release: `[hex]`
- URL: https://moneyballscore.vercel.app/mlb/insights
- Culprit: `HEAD /mlb/insights`
- Timestamp: 1791078557.71

## Tags
- `browser`: `Mobile Safari 10.0`
- `browser.name`: `Mobile Safari`
- `client_os`: `iOS 10.3.1`
- `client_os.name`: `iOS`
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
- `server_name`: `169.254.48.171`
- `transaction`: `HEAD /mlb/insights`
- `turbopack`: `True`
- `url`: `https://moneyballscore.vercel.app/mlb/insights`

## Triggered rule
`[hub] L3 production errors`

## Links
- Sentry: https://sentry.io/organizations/kyu-au/issues/7771704907/events/[hex]/
