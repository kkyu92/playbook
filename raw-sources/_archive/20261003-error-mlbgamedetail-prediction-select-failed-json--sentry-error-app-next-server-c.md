---
date: "2026-10-03"
source: "kkyu92/moneyballscore"
type: "worker-error"
payload_type: "error-log"
severity: "error"
fingerprint: "sentry-error-app-next-server-chunks-ssr-root-of-the-server-0"
first_seen: "2026-10-03T17:02:54.664Z"
environment: "production"
run_url: "https://sentry.io/organizations/kyu-au/issues/7771073196/events/6bcdc4c8968249d1bcc8acc271498e52/"
---

## Error
`Error`: MlbGameDetail prediction select failed: JSON object requested, multiple (or no) rows returned

## Stack (top 5)
```
  at <anon> (app:///_next/server/chunks/ssr/[root-of-the-server]__0qduvi_._.js:2)
  at B (app:///_next/server/chunks/ssr/apps_moneyball_src_app_mlb_games_[date]_[slug]_page_tsx_18paw19._.js:26)
  at process.processTicksAndRejections (node:internal/process/task_queues:104)
```

## Context
- Environment: `production`
- Release: `[hex]`
- URL: https://moneyballscore.vercel.app/mlb/games/2026-09-23/BAL-vs-TOR
- Culprit: `GET /mlb/games/[date]/[slug]`
- Timestamp: 1791046974.664

## Tags
- `browser`: `Chrome 118.0.0`
- `browser.name`: `Chrome`
- `client_os`: `Linux`
- `client_os.name`: `Linux`
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
- `server_name`: `169.254.34.233`
- `transaction`: `GET /mlb/games/[date]/[slug]`
- `turbopack`: `True`
- `url`: `https://moneyballscore.vercel.app/mlb/games/2026-09-23/BAL-vs-TOR`

## Triggered rule
`[hub] L3 production errors`

## Links
- Sentry: https://sentry.io/organizations/kyu-au/issues/7771073196/events/[hex]/
