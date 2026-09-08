---
date: "2026-09-08"
source: "kkyu92/moneyballscore"
type: "worker-error"
payload_type: "error-log"
severity: "error"
fingerprint: "sentry-error-app-next-server-chunks-ssr-root-of-the-server-0"
first_seen: "2026-09-08T23:25:30.219Z"
environment: "production"
run_url: "https://sentry.io/organizations/kyu-au/issues/7720451821/events/292045d3d06c49b2b12453d11fa7a6ce/"
---

## Error
`Error`: buildMlbAccuracySummary mlb_schedule select failed: Service for this project is restricted due to the following violations: exceed_egress_quota. The project owner must upgrade their plan or remove spend caps to restore service.

## Stack (top 5)
```
  at <anon> (app:///_next/server/chunks/ssr/[root-of-the-server]__0qduvi_._.js:2)
  at h (app:///_next/server/chunks/ssr/[root-of-the-server]__1o4k61j._.js:2)
  at process.processTicksAndRejections (node:internal/process/task_queues:104)
  at Promise.all (index 0:?)
  at p (app:///_next/server/chunks/ssr/[root-of-the-server]__1kbokt7._.js:2)
```

## Context
- Environment: `production`
- Release: `[hex]`
- URL: https://moneyballscore.vercel.app/mlb/accuracy
- Culprit: `HEAD /mlb/accuracy`
- Timestamp: 1788909930.219

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
- `server_name`: `169.254.11.241`
- `transaction`: `HEAD /mlb/accuracy`
- `turbopack`: `True`
- `url`: `https://moneyballscore.vercel.app/mlb/accuracy`

## Triggered rule
`[hub] L3 production errors`

## Links
- Sentry: https://sentry.io/organizations/kyu-au/issues/7720451821/events/[hex]/
