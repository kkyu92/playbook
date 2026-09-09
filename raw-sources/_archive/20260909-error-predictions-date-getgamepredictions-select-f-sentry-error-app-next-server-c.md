---
date: "2026-09-09"
source: "kkyu92/moneyballscore"
type: "worker-error"
payload_type: "error-log"
severity: "error"
fingerprint: "sentry-error-app-next-server-chunks-ssr-root-of-the-server-0"
first_seen: "2026-09-09T00:06:42.800Z"
environment: "production"
run_url: "https://sentry.io/organizations/kyu-au/issues/7720502228/events/61372d04aa494d17bbe82ba722d683ee/"
---

## Error
`Error`: predictions/[date] getGamePredictions select failed: Service for this project is restricted due to the following violations: exceed_egress_quota. The project owner must upgrade their plan or remove spend caps to restore service.

## Stack (top 5)
```
  at <anon> (app:///_next/server/chunks/ssr/[root-of-the-server]__0qduvi_._.js:2)
  at y (app:///_next/server/chunks/ssr/apps_moneyball_src_app_predictions_[date]_page_tsx_1dltcas._.js:22)
  at process.processTicksAndRejections (node:internal/process/task_queues:104)
  at A (app:///_next/server/chunks/ssr/apps_moneyball_src_app_predictions_[date]_page_tsx_1dltcas._.js:22)
```

## Context
- Environment: `production`
- Release: `[hex]`
- URL: https://moneyballscore.vercel.app/predictions/2026-09-09
- Culprit: `GET /predictions/[date]`
- Timestamp: 1788912402.8

## Tags
- `browser`: `com/bot`
- `browser.name`: `com/bot`
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
- `transaction`: `GET /predictions/[date]`
- `turbopack`: `True`
- `url`: `https://moneyballscore.vercel.app/predictions/2026-09-09`

## Triggered rule
`[hub] L3 production errors`

## Links
- Sentry: https://sentry.io/organizations/kyu-au/issues/7720502228/events/[hex]/
