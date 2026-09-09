---
date: "2026-09-09"
source: "kkyu92/moneyballscore"
type: "worker-error"
payload_type: "error-log"
severity: "error"
fingerprint: "sentry-error-app-next-server-chunks-0dzw4t-js-477-production"
first_seen: "2026-09-09T00:17:17.088Z"
environment: "production"
run_url: "https://sentry.io/organizations/kyu-au/issues/7720520348/events/2fdad85be4ab437a8a086458385eb086/"
---

## Error
`Error`: pipeline_runs insert error: Service for this project is restricted due to the following violations: exceed_egress_quota. The project owner must upgrade their plan or remove spend caps to restore service.

## Stack (top 5)
```
  at E (app:///_next/server/chunks/_0dzw4t-._.js:477)
  at process.processTicksAndRejections (node:internal/process/task_queues:104)
  at g (app:///_next/server/chunks/[root-of-the-server]__1g6-tso._.js:2)
  at rJ.do (/var/task/node_modules/.pnpm/next@16.2.10_@babel+core@7.29.7_@opentelemetry+api@1.9.1_@playwright+test@1.61.1_react-_e7ef6af02144761039f4a3f4d9d0a948/node_modules/next/dist/compiled/next-server/app-route-turbo.runtime.prod.js:5)
  at rJ.handle (/var/task/node_modules/.pnpm/next@16.2.10_@babel+core@7.29.7_@opentelemetry+api@1.9.1_@playwright+test@1.61.1_react-_e7ef6af02144761039f4a3f4d9d0a948/node_modules/next/dist/compiled/next-server/app-route-turbo.runtime.prod.js:5)
```

## Context
- Environment: `production`
- Release: `[hex]`
- URL: https://moneyballscore.vercel.app/api/pipeline
- Culprit: `POST /api/pipeline`
- Timestamp: 1788913037.088

## Tags
- `component`: `pipeline-daily`
- `environment`: `production`
- `handled`: `yes`
- `interface_type`: `exception`
- `level`: `error`
- `mechanism`: `generic`
- `op`: `pipeline_runs_insert`
- `os`: `Linux`
- `os.name`: `Linux`
- `runtime`: `node v24.18.0`
- `runtime.name`: `node`
- `release`: `[hex]`
- `server_name`: `169.254.2.105`
- `silent_drift_family`: `wave_177`
- `transaction`: `POST /api/pipeline`
- `turbopack`: `True`
- `url`: `https://moneyballscore.vercel.app/api/pipeline`

## Triggered rule
`[hub] L3 production errors`

## Links
- Sentry: https://sentry.io/organizations/kyu-au/issues/7720520348/events/[hex]/
