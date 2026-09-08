---
date: "2026-09-08"
source: "kkyu92/moneyballscore"
type: "worker-error"
payload_type: "error-log"
severity: "error"
fingerprint: "sentry-error-app-next-server-chunks-ssr-root-of-the-server-0"
first_seen: "2026-09-08T22:20:31.457Z"
environment: "production"
run_url: "https://sentry.io/organizations/kyu-au/issues/7720364876/events/392fb3f233a542d38db900174ef9b34c/"
---

## Error
`Error`: home.getWeekAheadSchedule select failed: Service for this project is restricted due to the following violations: exceed_egress_quota. The project owner must upgrade their plan or remove spend caps to restore service.

## Stack (top 5)
```
  at <anon> (app:///_next/server/chunks/ssr/[root-of-the-server]__0qduvi_._.js:2)
  at G (app:///_next/server/chunks/ssr/apps_moneyball_src_0k4axsi._.js:26)
  at process.processTicksAndRejections (node:internal/process/task_queues:104)
  at Promise.all (index 2:?)
  at N (app:///_next/server/chunks/ssr/apps_moneyball_src_0k4axsi._.js:35)
```

## Context
- Environment: `production`
- Release: `[hex]`
- URL: https://moneyballscore.vercel.app/
- Culprit: `GET /`
- Timestamp: 1788906031.457

## Tags
- `browser`: `SentryUptimeBot 1.0`
- `browser.name`: `SentryUptimeBot`
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
- `server_name`: `169.254.30.41`
- `transaction`: `GET /`
- `turbopack`: `True`
- `url`: `https://moneyballscore.vercel.app/`

## Triggered rule
`[hub] L3 production errors`

## Links
- Sentry: https://sentry.io/organizations/kyu-au/issues/7720364876/events/[hex]/
