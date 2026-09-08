---
date: "2026-09-08"
source: "kkyu92/moneyballscore"
type: "worker-error"
payload_type: "error-log"
severity: "error"
fingerprint: "sentry-error-app-next-server-chunks-ssr-root-of-the-server-0"
first_seen: "2026-09-08T23:34:19.266Z"
environment: "production"
run_url: "https://sentry.io/organizations/kyu-au/issues/7720463009/events/e573608203024832836eb462c0ffb8f2/"
---

## Error
`Error`: fetchConvergencePickDetailedResults select failed: Service for this project is restricted due to the following violations: exceed_egress_quota. The project owner must upgrade their plan or remove spend caps to restore service.

## Stack (top 5)
```
  at <anon> (app:///_next/server/chunks/ssr/[root-of-the-server]__0qduvi_._.js:2)
  at q (app:///_next/server/chunks/ssr/apps_moneyball_src_lib_analysis_convergenceRecord_ts_1-_5dmo._.js:12)
  at process.processTicksAndRejections (node:internal/process/task_queues:104)
  at G (app:///_next/server/chunks/ssr/apps_moneyball_src_lib_analysis_convergenceRecord_ts_1-_5dmo._.js:32)
  at Promise.all (index 7:?)
```

## Context
- Environment: `production`
- Release: `[hex]`
- URL: (none)
- Culprit: `HEAD /reviews`
- Timestamp: 1788910459.266

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
- `server_name`: `169.254.40.181`
- `transaction`: `HEAD /reviews`
- `turbopack`: `True`

## Triggered rule
`[hub] L3 production errors`

## Links
- Sentry: https://sentry.io/organizations/kyu-au/issues/7720463009/events/[hex]/
