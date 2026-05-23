---
date: "2026-05-22"
source: "kkyu92/moneyballscore"
type: "worker-error"
payload_type: "error-log"
severity: "error"
fingerprint: "sentry-error-app-next-server-chunks-ssr-root-of-the-server-0"
first_seen: "2026-05-22T13:34:43.935Z"
environment: "production"
run_url: "https://sentry.io/organizations/kyu-au/issues/7499843619/events/3b1573f35c8e45df95289aa4a7cb225f/"
---

## Error
`Error`: predictions/[date] getGamePredictions select failed: invalid input syntax for type date: "%5Bdate%5D"

## Stack (top 5)
```
  at <anon> (app:///_next/server/chunks/ssr/[root-of-the-server]__0xhp7-n._.js:2)
  at v (app:///_next/server/chunks/ssr/apps_moneyball_src_app_predictions_[date]_page_tsx_0tdfkc0._.js:21)
  at process.processTicksAndRejections (node:internal/process/task_queues:104)
  at x (app:///_next/server/chunks/ssr/apps_moneyball_src_app_predictions_[date]_page_tsx_0tdfkc0._.js:21)
```

## Context
- Environment: `production`
- Release: `[hex]`
- URL: https://moneyballscore.vercel.app/predictions/[date]
- Culprit: `GET /predictions/[date]`
- Timestamp: 1779456883.935

## Tags
- `browser`: `GoogleOther`
- `browser.name`: `GoogleOther`
- `client_os`: `Android 6.0.1`
- `client_os.name`: `Android`
- `environment`: `production`
- `handled`: `no`
- `level`: `error`
- `mechanism`: `auto.function.nextjs.on_request_error`
- `os`: `Linux`
- `os.name`: `Linux`
- `runtime`: `node v24.14.1`
- `runtime.name`: `node`
- `release`: `[hex]`
- `server_name`: `169.254.45.143`
- `transaction`: `GET /predictions/[date]`
- `turbopack`: `True`
- `url`: `https://moneyballscore.vercel.app/predictions/[date]`

## Triggered rule
`[hub] L3 production errors`

## Links
- Sentry: https://sentry.io/organizations/kyu-au/issues/7499843619/events/[hex]/
