---
date: "2026-09-08"
source: "kkyu92/moneyballscore"
type: "worker-error"
payload_type: "error-log"
severity: "error"
fingerprint: "sentry-error-app-next-server-chunks-ssr-root-of-the-server-0"
first_seen: "2026-09-08T23:34:20.653Z"
environment: "production"
run_url: "https://sentry.io/organizations/kyu-au/issues/7720463014/events/da6f53a6d00141e6ac529fd1bd8478fa/"
---

## Error
`Error`: analysis getPeriodStats select failed: Service for this project is restricted due to the following violations: exceed_egress_quota. The project owner must upgrade their plan or remove spend caps to restore service.

## Stack (top 5)
```
  at <anon> (app:///_next/server/chunks/ssr/[root-of-the-server]__0qduvi_._.js:2)
  at p (app:///_next/server/chunks/ssr/apps_moneyball_src_03o0j6l._.js:52)
  at process.processTicksAndRejections (node:internal/process/task_queues:104)
  at Promise.all (index 4:?)
  at D (app:///_next/server/chunks/ssr/apps_moneyball_src_1g0_4t9._.js:12)
```

## Context
- Environment: `production`
- Release: `[hex]`
- URL: https://moneyballscore.vercel.app/analysis
- Culprit: `GET /analysis`
- Timestamp: 1788910460.653

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
- `transaction`: `GET /analysis`
- `turbopack`: `True`
- `url`: `https://moneyballscore.vercel.app/analysis`

## Triggered rule
`[hub] L3 production errors`

## Links
- Sentry: https://sentry.io/organizations/kyu-au/issues/7720463014/events/[hex]/
