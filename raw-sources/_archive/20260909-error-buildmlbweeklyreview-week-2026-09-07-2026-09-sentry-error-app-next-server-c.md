---
date: "2026-09-09"
source: "kkyu92/moneyballscore"
type: "worker-error"
payload_type: "error-log"
severity: "error"
fingerprint: "sentry-error-app-next-server-chunks-ssr-root-of-the-server-0"
first_seen: "2026-09-09T06:41:23.348Z"
environment: "production"
run_url: "https://sentry.io/organizations/kyu-au/issues/7721014386/events/26761df008254083bc495d2530c15997/"
---

## Error
`Error`: buildMlbWeeklyReview week 2026-09-07~2026-09-13 schedule select failed: Service for this project is restricted due to the following violations: exceed_egress_quota. The project owner must upgrade their plan or remove spend caps to restore service.

## Stack (top 5)
```
  at <anon> (app:///_next/server/chunks/ssr/[root-of-the-server]__0qduvi_._.js:2)
  at j (app:///_next/server/chunks/ssr/[root-of-the-server]__1wypd7e._.js:2)
  at process.processTicksAndRejections (node:internal/process/task_queues:104)
  at e (app:///_next/server/chunks/ssr/[root-of-the-server]__1wypd7e._.js:12)
  at Promise.all (index 0:?)
```

## Context
- Environment: `production`
- Release: `[hex]`
- URL: https://moneyballscore.vercel.app/mlb/reviews/weekly/2026-W37
- Culprit: `GET /mlb/reviews/weekly/[week]`
- Timestamp: 1788936083.348

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
- `server_name`: `169.254.35.97`
- `transaction`: `GET /mlb/reviews/weekly/[week]`
- `turbopack`: `True`
- `url`: `https://moneyballscore.vercel.app/mlb/reviews/weekly/2026-W37`

## Triggered rule
`[hub] L3 production errors`

## Links
- Sentry: https://sentry.io/organizations/kyu-au/issues/7721014386/events/[hex]/
