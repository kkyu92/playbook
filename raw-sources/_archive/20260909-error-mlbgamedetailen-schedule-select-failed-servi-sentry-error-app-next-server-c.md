---
date: "2026-09-09"
source: "kkyu92/moneyballscore"
type: "worker-error"
payload_type: "error-log"
severity: "error"
fingerprint: "sentry-error-app-next-server-chunks-ssr-root-of-the-server-0"
first_seen: "2026-09-09T01:15:30.431Z"
environment: "production"
run_url: "https://sentry.io/organizations/kyu-au/issues/7720589654/events/85f5693984484bcaafd9db884dd324a8/"
---

## Error
`Error`: MlbGameDetailEn schedule select failed: Service for this project is restricted due to the following violations: exceed_egress_quota. The project owner must upgrade their plan or remove spend caps to restore service.

## Stack (top 5)
```
  at <anon> (app:///_next/server/chunks/ssr/[root-of-the-server]__0qduvi_._.js:2)
  at A (app:///_next/server/chunks/ssr/apps_moneyball_src_app_en_mlb_games_[date]_[slug]_page_tsx_1s761i7._.js:2)
  at process.processTicksAndRejections (node:internal/process/task_queues:104)
```

## Context
- Environment: `production`
- Release: `[hex]`
- URL: https://moneyballscore.vercel.app/en/mlb/games/2026-09-07/MIL-vs-CHC
- Culprit: `GET /en/mlb/games/[date]/[slug]`
- Timestamp: 1788916530.431

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
- `server_name`: `169.254.5.49`
- `transaction`: `GET /en/mlb/games/[date]/[slug]`
- `turbopack`: `True`
- `url`: `https://moneyballscore.vercel.app/en/mlb/games/2026-09-07/MIL-vs-CHC`

## Triggered rule
`[hub] L3 production errors`

## Links
- Sentry: https://sentry.io/organizations/kyu-au/issues/7720589654/events/[hex]/
