---
date: "2026-09-09"
source: "kkyu92/moneyballscore"
type: "worker-error"
payload_type: "error-log"
severity: "error"
fingerprint: "sentry-error-app-next-server-chunks-root-of-the-server-1cs-z"
first_seen: "2026-09-09T05:09:53.754Z"
environment: "production"
run_url: "https://sentry.io/organizations/kyu-au/issues/7720890041/events/c087b4f9678a4ef9acf24698590116cc/"
---

## Error
`Error`: sitemap.mlb-predictions select failed: Service for this project is restricted due to the following violations: exceed_egress_quota. The project owner must upgrade their plan or remove spend caps to restore service.

## Stack (top 5)
```
  at <anon> (app:///_next/server/chunks/[root-of-the-server]__1cs-zpb._.js:2)
  at I (app:///_next/server/chunks/apps_moneyball_src_app_sitemap_ts_03syw1g._.js:2)
  at process.processTicksAndRejections (node:internal/process/task_queues:104)
  at m (app:///_next/server/chunks/[root-of-the-server]__1cs-zpb._.js:2)
  at rJ.do (/var/task/node_modules/.pnpm/next@16.2.10_@babel+core@7.29.7_@opentelemetry+api@1.9.1_@playwright+test@1.61.1_react-_e7ef6af02144761039f4a3f4d9d0a948/node_modules/next/dist/compiled/next-server/app-route-turbo.runtime.prod.js:5)
```

## Context
- Environment: `production`
- Release: `[hex]`
- URL: https://moneyballscore.vercel.app/api/seo/indexnow/ping
- Culprit: `GET /api/seo/indexnow/ping`
- Timestamp: 1788930593.754

## Tags
- `component`: `sitemap`
- `environment`: `production`
- `handled`: `yes`
- `interface_type`: `exception`
- `level`: `error`
- `mechanism`: `generic`
- `op`: `mlb-games-query`
- `os`: `Linux`
- `os.name`: `Linux`
- `runtime`: `node v24.18.0`
- `runtime.name`: `node`
- `release`: `[hex]`
- `server_name`: `169.254.36.233`
- `silent_drift_family`: `wave_624`
- `transaction`: `GET /api/seo/indexnow/ping`
- `turbopack`: `True`
- `url`: `https://moneyballscore.vercel.app/api/seo/indexnow/ping`

## Triggered rule
`[hub] L3 production errors`

## Links
- Sentry: https://sentry.io/organizations/kyu-au/issues/7720890041/events/[hex]/
