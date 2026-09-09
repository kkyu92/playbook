---
date: "2026-09-09"
source: "kkyu92/moneyballscore"
type: "worker-error"
payload_type: "error-log"
severity: "error"
fingerprint: "sentry-error-app-next-server-chunks-ssr-root-of-the-server-0"
first_seen: "2026-09-09T01:10:05.214Z"
environment: "production"
run_url: "https://sentry.io/organizations/kyu-au/issues/7720583325/events/03ec25e186ec49b1998a59b21f09f4cc/"
---

## Error
`Error`: buildAllMlbTeamAccuracy mlb_schedule select failed: Service for this project is restricted due to the following violations: exceed_egress_quota. The project owner must upgrade their plan or remove spend caps to restore service.

## Stack (top 5)
```
  at <anon> (app:///_next/server/chunks/ssr/[root-of-the-server]__0qduvi_._.js:2)
  at g (app:///_next/server/chunks/ssr/apps_moneyball_src_lib_mlb_buildMlbTeamAccuracy_ts_1gkx9jr._.js:2)
  at process.processTicksAndRejections (node:internal/process/task_queues:104)
  at Promise.all (index 1:?)
  at p (app:///_next/server/chunks/ssr/[root-of-the-server]__1kbokt7._.js:2)
```

## Context
- Environment: `production`
- Release: `[hex]`
- URL: https://moneyballscore.vercel.app/mlb/accuracy
- Culprit: `GET /mlb/accuracy`
- Timestamp: 1788916205.214

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
- `server_name`: `169.254.5.49`
- `transaction`: `GET /mlb/accuracy`
- `turbopack`: `True`
- `url`: `https://moneyballscore.vercel.app/mlb/accuracy`

## Triggered rule
`[hub] L3 production errors`

## Links
- Sentry: https://sentry.io/organizations/kyu-au/issues/7720583325/events/[hex]/
