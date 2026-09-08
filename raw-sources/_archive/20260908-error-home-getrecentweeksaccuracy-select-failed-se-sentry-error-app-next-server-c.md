---
date: "2026-09-08"
source: "kkyu92/moneyballscore"
type: "worker-error"
payload_type: "error-log"
severity: "error"
fingerprint: "sentry-error-app-next-server-chunks-ssr-root-of-the-server-0"
first_seen: "2026-09-08T22:17:31.770Z"
environment: "production"
run_url: "https://sentry.io/organizations/kyu-au/issues/7720360802/events/c1a449c3feec4800b0618925488dfca5/"
---

## Error
`Error`: home.getRecentWeeksAccuracy select failed: Service for this project is restricted due to the following violations: exceed_egress_quota. The project owner must upgrade their plan or remove spend caps to restore service.

## Stack (top 5)
```
  at <anon> (app:///_next/server/chunks/ssr/[root-of-the-server]__0qduvi_._.js:2)
  at M (app:///_next/server/chunks/ssr/apps_moneyball_src_0k4axsi._.js:35)
  at process.processTicksAndRejections (node:internal/process/task_queues:104)
  at Promise.all (index 6:?)
  at N (app:///_next/server/chunks/ssr/apps_moneyball_src_0k4axsi._.js:35)
```

## Context
- Environment: `production`
- Release: `[hex]`
- URL: https://moneyballscore.vercel.app/
- Culprit: `GET /`
- Timestamp: 1788905851.77

## Tags
- `browser`: `SentryUptimeBot 1.0`
- `browser.name`: `SentryUptimeBot`
- `environment`: `production`
- `handled`: `yes`
- `interface_type`: `exception`
- `layer`: `page-fallback`
- `level`: `error`
- `mechanism`: `generic`
- `os`: `Linux`
- `os.name`: `Linux`
- `route`: `/`
- `runtime`: `node v24.18.0`
- `runtime.name`: `node`
- `release`: `[hex]`
- `server_name`: `169.254.30.41`
- `source`: `getRecentWeeksAccuracy`
- `transaction`: `GET /`
- `turbopack`: `True`
- `url`: `https://moneyballscore.vercel.app/`

## Triggered rule
`[hub] L3 production errors`

## Links
- Sentry: https://sentry.io/organizations/kyu-au/issues/7720360802/events/[hex]/
