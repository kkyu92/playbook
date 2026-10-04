---
date: "2026-10-04"
source: "kkyu92/moneyballscore"
type: "worker-error"
payload_type: "error-log"
severity: "error"
fingerprint: "sentry-error-app-next-server-chunks-ssr-root-of-the-server-0"
first_seen: "2026-10-04T02:15:31.264Z"
environment: "production"
run_url: "https://sentry.io/organizations/kyu-au/issues/7771730197/events/5e1a7151e0a848d6b20797707aacdd31/"
---

## Error
`Error`: buildMlbMatchupUpcoming mlb_schedule MIL vs SDP select failed: Service for this project is restricted due to the following violations: exceed_egress_quota. The project owner must upgrade their plan or remove spend caps to restore service.

## Stack (top 5)
```
  at <anon> (app:///_next/server/chunks/ssr/[root-of-the-server]__0qduvi_._.js:2)
  at k (app:///_next/server/chunks/ssr/apps_moneyball_src_0xlnw3s._.js:2)
  at process.processTicksAndRejections (node:internal/process/task_queues:104)
  at Promise.all (index 8:?)
```

## Context
- Environment: `production`
- Release: `[hex]`
- URL: (none)
- Culprit: `?([root-of-the-server]__0qduvi_._)`
- Timestamp: 1791080131.264

## Tags
- `environment`: `production`
- `handled`: `yes`
- `interface_type`: `exception`
- `layer`: `page-fallback`
- `level`: `error`
- `mechanism`: `generic`
- `os`: `Linux`
- `os.name`: `Linux`
- `route`: `/en/mlb/matchup/[teamA]/[teamB]`
- `runtime`: `node v24.21.0`
- `runtime.name`: `node`
- `release`: `[hex]`
- `server_name`: `169.254.84.93`
- `source`: `buildMlbMatchupUpcoming`
- `turbopack`: `True`

## Triggered rule
`[hub] L3 production errors`

## Links
- Sentry: https://sentry.io/organizations/kyu-au/issues/7771730197/events/[hex]/
