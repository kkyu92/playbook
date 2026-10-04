---
date: "2026-10-04"
source: "kkyu92/moneyballscore"
type: "worker-error"
payload_type: "error-log"
severity: "error"
fingerprint: "sentry-error-app-next-server-chunks-ssr-root-of-the-server-0"
first_seen: "2026-10-04T01:21:22.044Z"
environment: "production"
run_url: "https://sentry.io/organizations/kyu-au/issues/7771679067/events/9e6a617fb0b04490a4c5a86f21cf5635/"
---

## Error
`Error`: buildTeamProfile teams select failed: Service for this project is restricted due to the following violations: exceed_egress_quota. The project owner must upgrade their plan or remove spend caps to restore service.

## Stack (top 5)
```
  at <anon> (app:///_next/server/chunks/ssr/[root-of-the-server]__0qduvi_._.js:2)
  at m (app:///_next/server/chunks/ssr/[root-of-the-server]__00wc4w_._.js:12)
  at process.processTicksAndRejections (node:internal/process/task_queues:104)
  at Promise.all (index 0:?)
  at D (app:///_next/server/chunks/ssr/apps_moneyball_src_08dj4sr._.js:10)
```

## Context
- Environment: `production`
- Release: `[hex]`
- URL: https://moneyballscore.vercel.app/teams/HT
- Culprit: `GET /teams/[code]`
- Timestamp: 1791076882.044

## Tags
- `browser`: `Chrome 116`
- `browser.name`: `Chrome`
- `client_os`: `Windows`
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
- `server_name`: `169.254.40.89`
- `transaction`: `GET /teams/[code]`
- `turbopack`: `True`
- `url`: `https://moneyballscore.vercel.app/teams/HT`

## Triggered rule
`[hub] L3 production errors`

## Links
- Sentry: https://sentry.io/organizations/kyu-au/issues/7771679067/events/[hex]/
