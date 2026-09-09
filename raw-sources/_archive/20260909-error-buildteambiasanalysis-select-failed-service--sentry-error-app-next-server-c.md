---
date: "2026-09-09"
source: "kkyu92/moneyballscore"
type: "worker-error"
payload_type: "error-log"
severity: "error"
fingerprint: "sentry-error-app-next-server-chunks-ssr-root-of-the-server-0"
first_seen: "2026-09-09T04:54:59.483Z"
environment: "production"
run_url: "https://sentry.io/organizations/kyu-au/issues/7720870638/events/dc74b4f5336744ffbaeafa51e3b6fbd1/"
---

## Error
`Error`: buildTeamBiasAnalysis select failed: Service for this project is restricted due to the following violations: exceed_egress_quota. The project owner must upgrade their plan or remove spend caps to restore service.

## Stack (top 5)
```
  at <anon> (app:///_next/server/chunks/ssr/[root-of-the-server]__0qduvi_._.js:2)
  at j (app:///_next/server/chunks/ssr/[root-of-the-server]__1kwmfz3._.js:23)
  at process.processTicksAndRejections (node:internal/process/task_queues:104)
  at Promise.all (index 7:?)
  at E (app:///_next/server/chunks/ssr/apps_moneyball_src_app_accuracy_page_tsx_065--r2._.js:2)
```

## Context
- Environment: `production`
- Release: `[hex]`
- URL: https://moneyballscore.vercel.app/accuracy
- Culprit: `GET /accuracy`
- Timestamp: 1788929699.483

## Tags
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
- `server_name`: `169.254.35.61`
- `transaction`: `GET /accuracy`
- `turbopack`: `True`
- `url`: `https://moneyballscore.vercel.app/accuracy`

## Triggered rule
`[hub] L3 production errors`

## Links
- Sentry: https://sentry.io/organizations/kyu-au/issues/7720870638/events/[hex]/
