---
date: "2026-09-09"
source: "kkyu92/moneyballscore"
type: "worker-error"
payload_type: "error-log"
severity: "error"
fingerprint: "sentry-error-app-next-server-chunks-ssr-root-of-the-server-0"
first_seen: "2026-09-09T11:40:25.327Z"
environment: "production"
run_url: "https://sentry.io/organizations/kyu-au/issues/7721499009/events/d204dda6426d439ca02dcceee5f9ff2c/"
---

## Error
`Error`: MlbGames predictions select failed: Service for this project is restricted due to the following violations: exceed_egress_quota. The project owner must upgrade their plan or remove spend caps to restore service.

## Stack (top 5)
```
  at <anon> (app:///_next/server/chunks/ssr/[root-of-the-server]__0qduvi_._.js:2)
  at p (app:///_next/server/chunks/ssr/[root-of-the-server]__0ix9a_r._.js:2)
  at process.processTicksAndRejections (node:internal/process/task_queues:104)
  at q (app:///_next/server/chunks/ssr/[root-of-the-server]__0ix9a_r._.js:2)
```

## Context
- Environment: `production`
- Release: `[hex]`
- URL: https://moneyballscore.vercel.app/mlb/games/2026-06-26
- Culprit: `GET /mlb/games/[date]`
- Timestamp: 1788954025.327

## Tags
- `browser`: `GoogleOther`
- `browser.name`: `GoogleOther`
- `client_os`: `Android 6.0.1`
- `client_os.name`: `Android`
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
- `server_name`: `169.254.30.113`
- `transaction`: `GET /mlb/games/[date]`
- `turbopack`: `True`
- `url`: `https://moneyballscore.vercel.app/mlb/games/2026-06-26`

## Triggered rule
`[hub] L3 production errors`

## Links
- Sentry: https://sentry.io/organizations/kyu-au/issues/7721499009/events/[hex]/
