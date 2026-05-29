---
date: "2026-05-29"
source: "kkyu92/moneyballscore"
type: "worker-error"
payload_type: "error-log"
severity: "error"
fingerprint: "sentry-error-app-next-server-chunks-ssr-root-of-the-server-0"
first_seen: "2026-05-29T21:35:31.215Z"
environment: "production"
run_url: "https://sentry.io/organizations/kyu-au/issues/7514588692/events/373f157eeea3460191d2a884a190382d/"
---

## Error
`Error`: home.getSeasonAccuracy select failed: <html>
<head><title>502 Bad Gateway</title></head>
<body>
<center><h1>502 Bad Gateway</h1></center>
<hr><center>cloudflare</center>
</body>
</html>


## Stack (top 5)
```
  at <anon> (app:///_next/server/chunks/ssr/[root-of-the-server]__08mjv~6._.js:2)
  at H (app:///_next/server/chunks/ssr/apps_moneyball_src_0bhoak.._.js:28)
  at process.processTicksAndRejections (node:internal/process/task_queues:104)
  at Promise.all (index 1:?)
  at J (app:///_next/server/chunks/ssr/apps_moneyball_src_0bhoak.._.js:28)
```

## Context
- Environment: `production`
- Release: `[hex]`
- URL: https://moneyballscore.vercel.app/
- Culprit: `GET /`
- Timestamp: 1780090531.215

## Tags
- `browser`: `SentryUptimeBot 1.0`
- `browser.name`: `SentryUptimeBot`
- `environment`: `production`
- `handled`: `no`
- `level`: `error`
- `mechanism`: `auto.function.nextjs.on_request_error`
- `os`: `Linux`
- `os.name`: `Linux`
- `runtime`: `node v24.14.1`
- `runtime.name`: `node`
- `release`: `[hex]`
- `server_name`: `169.254.82.77`
- `transaction`: `GET /`
- `turbopack`: `True`
- `url`: `https://moneyballscore.vercel.app/`

## Triggered rule
`[hub] L3 production errors`

## Links
- Sentry: https://sentry.io/organizations/kyu-au/issues/7514588692/events/[hex]/
