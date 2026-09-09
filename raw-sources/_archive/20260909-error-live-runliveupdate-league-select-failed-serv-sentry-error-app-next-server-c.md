---
date: "2026-09-09"
source: "kkyu92/moneyballscore"
type: "worker-error"
payload_type: "error-log"
severity: "error"
fingerprint: "sentry-error-app-next-server-chunks-root-of-the-server-16o01"
first_seen: "2026-09-09T09:41:00.865Z"
environment: "production"
run_url: "https://sentry.io/organizations/kyu-au/issues/7721313269/events/05d35293afd84110a7f8b6054c9f6cf3/"
---

## Error
`Error`: live.runLiveUpdate league select failed: Service for this project is restricted due to the following violations: exceed_egress_quota. The project owner must upgrade their plan or remove spend caps to restore service.

## Stack (top 5)
```
  at <anon> (app:///_next/server/chunks/[root-of-the-server]__16o01kg._.js:2)
  at o1 (app:///_next/server/chunks/_0dzw4t-._.js:493)
  at process.processTicksAndRejections (node:internal/process/task_queues:104)
  at q (app:///_next/server/chunks/[root-of-the-server]__16o01kg._.js:2)
  at rJ.do (/var/task/node_modules/.pnpm/next@16.2.10_@babel+core@7.29.7_@opentelemetry+api@1.9.1_@playwright+test@1.61.1_react-_e7ef6af02144761039f4a3f4d9d0a948/node_modules/next/dist/compiled/next-server/app-route-turbo.runtime.prod.js:5)
```

## Context
- Environment: `production`
- Release: `[hex]`
- URL: (none)
- Culprit: `?([root-of-the-server]__16o01kg._)`
- Timestamp: 1788946860.865

## Tags
- `environment`: `production`
- `handled`: `yes`
- `interface_type`: `exception`
- `layer`: `api-route`
- `level`: `error`
- `mechanism`: `generic`
- `os`: `Linux`
- `os.name`: `Linux`
- `route`: `live`
- `runtime`: `node v24.18.0`
- `runtime.name`: `node`
- `release`: `[hex]`
- `server_name`: `169.254.15.237`
- `turbopack`: `True`

## Triggered rule
`[hub] L3 production errors`

## Links
- Sentry: https://sentry.io/organizations/kyu-au/issues/7721313269/events/[hex]/
