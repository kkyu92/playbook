---
date: "2026-05-19"
source: "kkyu92/moneyballscore"
type: "worker-error"
payload_type: "error-log"
severity: "error"
fingerprint: "sentry-error-app-next-server-chunks-ssr-root-of-the-server-0"
first_seen: "2026-05-19T14:19:56.054Z"
environment: "production"
run_url: "https://sentry.io/organizations/kyu-au/issues/7492183206/events/45af2a12453345249c248c172f7a5018/"
---

## Error
`Error`: predictions.getPredictionDates select failed: column games.home_team_code does not exist

## Stack (top 5)
```
  at <anon> (app:///_next/server/chunks/ssr/[root-of-the-server]__0-29l.8._.js:2)
  at o (app:///_next/server/chunks/ssr/[root-of-the-server]__0-29l.8._.js:2)
  at process.processTicksAndRejections (node:internal/process/task_queues:104)
  at p (app:///_next/server/chunks/ssr/[root-of-the-server]__0-29l.8._.js:2)
```

## Context
- Environment: `production`
- Release: `[hex]`
- URL: (none)
- Culprit: `GET /predictions`
- Timestamp: 1779200396.054

## Tags
- `environment`: `production`
- `handled`: `no`
- `level`: `error`
- `mechanism`: `auto.function.nextjs.on_request_error`
- `os`: `Linux`
- `os.name`: `Linux`
- `runtime`: `node v24.14.1`
- `runtime.name`: `node`
- `release`: `[hex]`
- `server_name`: `169.254.27.237`
- `transaction`: `GET /predictions`
- `turbopack`: `True`

## Triggered rule
`[hub] L3 production errors`

## Links
- Sentry: https://sentry.io/organizations/kyu-au/issues/7492183206/events/[hex]/
