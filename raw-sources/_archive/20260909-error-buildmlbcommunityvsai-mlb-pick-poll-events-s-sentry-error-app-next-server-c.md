---
date: "2026-09-09"
source: "kkyu92/moneyballscore"
type: "worker-error"
payload_type: "error-log"
severity: "error"
fingerprint: "sentry-error-app-next-server-chunks-ssr-root-of-the-server-0"
first_seen: "2026-09-09T01:10:02.748Z"
environment: "production"
run_url: "https://sentry.io/organizations/kyu-au/issues/7720583170/events/26f1dd547cc84ab8bd3311ece9fd229d/"
---

## Error
`Error`: buildMlbCommunityVsAI mlb_pick_poll_events select failed: Service for this project is restricted due to the following violations: exceed_egress_quota. The project owner must upgrade their plan or remove spend caps to restore service.

## Stack (top 5)
```
  at <anon> (app:///_next/server/chunks/ssr/[root-of-the-server]__0qduvi_._.js:2)
  at r (app:///_next/server/chunks/ssr/apps_moneyball_src_lib_mlb_buildMlbTeamAccuracy_ts_1gkx9jr._.js:2)
  at process.processTicksAndRejections (node:internal/process/task_queues:104)
  at Promise.all (index 5:?)
  at p (app:///_next/server/chunks/ssr/[root-of-the-server]__1kbokt7._.js:2)
```

## Context
- Environment: `production`
- Release: `[hex]`
- URL: https://moneyballscore.vercel.app/mlb/accuracy
- Culprit: `HEAD /mlb/accuracy`
- Timestamp: 1788916202.748

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
- `transaction`: `HEAD /mlb/accuracy`
- `turbopack`: `True`
- `url`: `https://moneyballscore.vercel.app/mlb/accuracy`

## Triggered rule
`[hub] L3 production errors`

## Links
- Sentry: https://sentry.io/organizations/kyu-au/issues/7720583170/events/[hex]/
