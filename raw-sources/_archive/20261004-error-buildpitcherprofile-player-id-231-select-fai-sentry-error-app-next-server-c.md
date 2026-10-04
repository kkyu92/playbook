---
date: "2026-10-04"
source: "kkyu92/moneyballscore"
type: "worker-error"
payload_type: "error-log"
severity: "error"
fingerprint: "sentry-error-app-next-server-chunks-ssr-root-of-the-server-0"
first_seen: "2026-10-04T03:07:20.735Z"
environment: "production"
run_url: "https://sentry.io/organizations/kyu-au/issues/7771779309/events/1ec66f0079ac4abda4c9ee061a1b08ae/"
---

## Error
`Error`: buildPitcherProfile player id=231 select failed: Service for this project is restricted due to the following violations: exceed_egress_quota. The project owner must upgrade their plan or remove spend caps to restore service.

## Stack (top 5)
```
  at <anon> (app:///_next/server/chunks/ssr/[root-of-the-server]__0qduvi_._.js:2)
  at f (app:///_next/server/chunks/ssr/[root-of-the-server]__0amx1ce._.js:5)
  at process.processTicksAndRejections (node:internal/process/task_queues:104)
  at p (app:///_next/server/chunks/ssr/[root-of-the-server]__0y3s_7p._.js:2)
```

## Context
- Environment: `production`
- Release: `[hex]`
- URL: https://moneyballscore.vercel.app/players/231
- Culprit: `GET /players/[id]`
- Timestamp: 1791083240.735

## Tags
- `browser`: `Chrome 149`
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
- `runtime`: `node v24.21.0`
- `runtime.name`: `node`
- `release`: `[hex]`
- `server_name`: `169.254.3.27`
- `transaction`: `GET /players/[id]`
- `turbopack`: `True`
- `url`: `https://moneyballscore.vercel.app/players/231`

## Triggered rule
`[hub] L3 production errors`

## Links
- Sentry: https://sentry.io/organizations/kyu-au/issues/7771779309/events/[hex]/
