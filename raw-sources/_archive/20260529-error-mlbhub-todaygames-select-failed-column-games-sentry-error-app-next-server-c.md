---
date: "2026-05-29"
source: "kkyu92/moneyballscore"
type: "worker-error"
payload_type: "error-log"
severity: "error"
fingerprint: "sentry-error-app-next-server-chunks-ssr-root-of-the-server-0"
first_seen: "2026-05-29T08:53:51.670Z"
environment: "production"
run_url: "https://sentry.io/organizations/kyu-au/issues/7513414890/events/7d864413283e4b4cbcdfc23bf230c4ad/"
---

## Error
`Error`: MlbHub todayGames select failed: column games_1.league does not exist

## Stack (top 5)
```
  at <anon> (app:///_next/server/chunks/ssr/[root-of-the-server]__0l_qf4g._.js:2)
  at i (app:///_next/server/chunks/ssr/[root-of-the-server]__0b50ou.._.js:5)
  at process.processTicksAndRejections (node:internal/process/task_queues:104)
```

## Context
- Environment: `production`
- Release: `[hex]`
- URL: https://moneyballscore.vercel.app/mlb
- Culprit: `GET /mlb`
- Timestamp: 1780044831.67

## Tags
- `environment`: `production`
- `handled`: `no`
- `level`: `error`
- `mechanism`: `auto.function.nextjs.on_request_error`
- `os`: `Linux`
- `os.name`: `Linux`
- `runtime`: `node v24.14.1`
- `runtime.name`: `node`
- `release`: `[hex]`
- `server_name`: `169.254.5.87`
- `transaction`: `GET /mlb`
- `turbopack`: `True`
- `url`: `https://moneyballscore.vercel.app/mlb`

## Triggered rule
`[hub] L3 production errors`

## Links
- Sentry: https://sentry.io/organizations/kyu-au/issues/7513414890/events/[hex]/
