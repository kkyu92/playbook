---
date: "2026-09-09"
source: "kkyu92/moneyballscore"
type: "worker-error"
payload_type: "error-log"
severity: "error"
fingerprint: "sentry-error-app-next-server-chunks-root-of-the-server-1cs-z"
first_seen: "2026-09-09T05:09:53.706Z"
environment: "production"
run_url: "https://sentry.io/organizations/kyu-au/issues/7720890015/events/f3f4828c53774d438eb98f99d79afd0f/"
---

## Error
`Error`: insights.listInsightsDates select failed: Service for this project is restricted due to the following violations: exceed_egress_quota. The project owner must upgrade their plan or remove spend caps to restore service.

## Stack (top 5)
```
  at <anon> (app:///_next/server/chunks/[root-of-the-server]__1cs-zpb._.js:2)
  at x (app:///_next/server/chunks/[root-of-the-server]__1cs-zpb._.js:2)
  at process.processTicksAndRejections (node:internal/process/task_queues:104)
  at I (app:///_next/server/chunks/apps_moneyball_src_app_sitemap_ts_03syw1g._.js:2)
  at m (app:///_next/server/chunks/[root-of-the-server]__1cs-zpb._.js:2)
```

## Context
- Environment: `production`
- Release: `[hex]`
- URL: https://moneyballscore.vercel.app/api/seo/indexnow/ping
- Culprit: `GET /api/seo/indexnow/ping`
- Timestamp: 1788930593.706

## Tags
- `component`: `sitemap`
- `environment`: `production`
- `handled`: `yes`
- `interface_type`: `exception`
- `level`: `error`
- `mechanism`: `generic`
- `op`: `insights-dates-query`
- `os`: `Linux`
- `os.name`: `Linux`
- `runtime`: `node v24.18.0`
- `runtime.name`: `node`
- `release`: `[hex]`
- `server_name`: `169.254.36.233`
- `silent_drift_family`: `wave_174`
- `transaction`: `GET /api/seo/indexnow/ping`
- `turbopack`: `True`
- `url`: `https://moneyballscore.vercel.app/api/seo/indexnow/ping`

## Triggered rule
`[hub] L3 production errors`

## Links
- Sentry: https://sentry.io/organizations/kyu-au/issues/7720890015/events/[hex]/
