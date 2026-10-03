---
date: "2026-10-03"
source: "kkyu92/moneyballscore"
type: "worker-error"
payload_type: "error-log"
severity: "error"
fingerprint: "sentry-error-app-next-server-chunks-ssr-root-of-the-server-0"
first_seen: "2026-10-03T22:26:27.703Z"
environment: "production"
run_url: "https://sentry.io/organizations/kyu-au/issues/7771494969/events/4eabafadda07471792790ed082dd154e/"
---

## Error
`Error`: buildMlbTeamProfile mlb_team_stats select failed: Service for this project is restricted due to the following violations: exceed_egress_quota. The project owner must upgrade their plan or remove spend caps to restore service.

## Stack (top 5)
```
  at <anon> (app:///_next/server/chunks/ssr/[root-of-the-server]__0qduvi_._.js:2)
  at k (app:///_next/server/chunks/ssr/[root-of-the-server]__13bydp-._.js:30)
  at process.processTicksAndRejections (node:internal/process/task_queues:104)
  at B (app:///_next/server/chunks/ssr/apps_moneyball_src_app_mlb_team_[code]_page_tsx_1s9as3h._.js:2)
```

## Context
- Environment: `production`
- Release: `[hex]`
- URL: https://moneyballscore.vercel.app/mlb/team/NYY
- Culprit: `GET /mlb/team/[code]`
- Timestamp: 1791066387.703

## Tags
- `browser`: `Chrome 118.0.0`
- `browser.name`: `Chrome`
- `client_os`: `Linux`
- `client_os.name`: `Linux`
- `environment`: `production`
- `handled`: `no`
- `interface_type`: `exception`
- `level`: `error`
- `mechanism`: `auto.function.nextjs.on_request_error`
- `os`: `Linux`
- `os.name`: `Linux`
- `runtime`: `node v24.21.0`
- `runtime.name`: `node`
- `release`: `[hex]`
- `server_name`: `169.254.81.247`
- `transaction`: `GET /mlb/team/[code]`
- `turbopack`: `True`
- `url`: `https://moneyballscore.vercel.app/mlb/team/NYY`

## Triggered rule
`[hub] L3 production errors`

## Links
- Sentry: https://sentry.io/organizations/kyu-au/issues/7771494969/events/[hex]/
