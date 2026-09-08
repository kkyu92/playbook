---
date: "2026-09-08"
source: "kkyu92/moneyballscore"
type: "worker-error"
payload_type: "error-log"
severity: "error"
fingerprint: "sentry-error-app-next-server-chunks-ssr-root-of-the-server-0"
first_seen: "2026-09-08T22:18:29.773Z"
environment: "production"
run_url: "https://sentry.io/organizations/kyu-au/issues/7720362200/events/92699b68ac0c4fcab502e98cf59d009a/"
---

## Error
`Error`: buildAllTeamAccuracy select failed: Service for this project is restricted due to the following violations: exceed_egress_quota. The project owner must upgrade their plan or remove spend caps to restore service.

## Stack (top 5)
```
  at <anon> (app:///_next/server/chunks/ssr/[root-of-the-server]__0qduvi_._.js:2)
  at h (app:///_next/server/chunks/ssr/[root-of-the-server]__1kwmfz3._.js:10)
  at process.processTicksAndRejections (node:internal/process/task_queues:104)
  at Promise.all (index 5:?)
  at N (app:///_next/server/chunks/ssr/apps_moneyball_src_0k4axsi._.js:35)
```

## Context
- Environment: `production`
- Release: `[hex]`
- URL: https://moneyballscore.vercel.app/
- Culprit: `GET /`
- Timestamp: 1788905909.773

## Tags
- `browser`: `Edge 114.0.1823`
- `browser.name`: `Edge`
- `client_os`: `Windows >=10`
- `client_os.name`: `Windows`
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
- `source`: `buildAllTeamAccuracy`
- `transaction`: `GET /`
- `turbopack`: `True`
- `url`: `https://moneyballscore.vercel.app/`

## Triggered rule
`[hub] L3 production errors`

## Links
- Sentry: https://sentry.io/organizations/kyu-au/issues/7720362200/events/[hex]/
