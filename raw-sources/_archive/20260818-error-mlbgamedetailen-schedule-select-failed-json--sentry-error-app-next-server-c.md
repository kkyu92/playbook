---
date: "2026-08-18"
source: "kkyu92/moneyballscore"
type: "worker-error"
payload_type: "error-log"
severity: "error"
fingerprint: "sentry-error-app-next-server-chunks-ssr-root-of-the-server-0"
first_seen: "2026-08-18T05:27:49.812Z"
environment: "production"
run_url: "https://sentry.io/organizations/kyu-au/issues/7677835710/events/d69389fdc5a842a386b5d42907a19ceb/"
---

## Error
`Error`: MlbGameDetailEn schedule select failed: JSON object requested, multiple (or no) rows returned

## Stack (top 5)
```
  at <anon> (app:///_next/server/chunks/ssr/[root-of-the-server]__0vd8pq-._.js:2)
  at s (app:///_next/server/chunks/ssr/[root-of-the-server]__04z8zqk._.js:2)
  at process.processTicksAndRejections (node:internal/process/task_queues:104)
```

## Context
- Environment: `production`
- Release: `[hex]`
- URL: https://moneyballscore.vercel.app/en/mlb/games/2026-07-17/BOS-vs-TBR
- Culprit: `GET /en/mlb/games/[date]/[slug]`
- Timestamp: 1787030869.812

## Tags
- `browser`: `Chrome 142`
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
- `runtime`: `node v24.18.0`
- `runtime.name`: `node`
- `release`: `[hex]`
- `server_name`: `169.254.35.169`
- `transaction`: `GET /en/mlb/games/[date]/[slug]`
- `turbopack`: `True`
- `url`: `https://moneyballscore.vercel.app/en/mlb/games/2026-07-17/BOS-vs-TBR`

## Triggered rule
`[hub] L3 production errors`

## Links
- Sentry: https://sentry.io/organizations/kyu-au/issues/7677835710/events/[hex]/
