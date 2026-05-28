---
date: "2026-05-28"
source: "kkyu92/moneyballscore"
type: "worker-error"
payload_type: "error-log"
severity: "error"
fingerprint: "sentry-typeerror-app-next-server-chunks-ssr-root-of-the-serv"
first_seen: "2026-05-28T02:51:05.976Z"
environment: "production"
run_url: "https://sentry.io/organizations/kyu-au/issues/7510598375/events/b4076499803f40b79e84996f8d88bc87/"
---

## Error
`TypeError`: a.match is not a function

## Stack (top 5)
```
  at <anon> (app:///_next/server/chunks/ssr/[root-of-the-server]__0o_08yr._.js:2)
  at j (app:///_next/server/chunks/ssr/[root-of-the-server]__0o_08yr._.js:2)
  at process.processTicksAndRejections (node:internal/process/task_queues:104)
  at n (app:///_next/server/chunks/ssr/[root-of-the-server]__0o_08yr._.js:2)
```

## Context
- Environment: `production`
- Release: `[hex]`
- URL: (none)
- Culprit: `GET /accuracy/shadow`
- Timestamp: 1779936665.976

## Tags
- `browser`: `curl 8.7.1`
- `browser.name`: `curl`
- `environment`: `production`
- `handled`: `no`
- `level`: `error`
- `mechanism`: `auto.function.nextjs.on_request_error`
- `os`: `Linux`
- `os.name`: `Linux`
- `runtime`: `node v24.14.1`
- `runtime.name`: `node`
- `release`: `[hex]`
- `server_name`: `169.254.52.217`
- `transaction`: `GET /accuracy/shadow`
- `turbopack`: `True`

## Triggered rule
`[hub] L3 production errors`

## Links
- Sentry: https://sentry.io/organizations/kyu-au/issues/7510598375/events/[hex]/
