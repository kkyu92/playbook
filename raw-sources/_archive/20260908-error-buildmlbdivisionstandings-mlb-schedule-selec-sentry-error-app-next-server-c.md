---
date: "2026-09-08"
source: "kkyu92/moneyballscore"
type: "worker-error"
payload_type: "error-log"
severity: "error"
fingerprint: "sentry-error-app-next-server-chunks-ssr-root-of-the-server-0"
first_seen: "2026-09-08T23:22:10.164Z"
environment: "production"
run_url: "https://sentry.io/organizations/kyu-au/issues/7720447591/events/58169ff7fc224d03979e56edd62010a3/"
---

## Error
`Error`: buildMlbDivisionStandings mlb_schedule select failed: Service for this project is restricted due to the following violations: exceed_egress_quota. The project owner must upgrade their plan or remove spend caps to restore service.

## Stack (top 5)
```
  at <anon> (app:///_next/server/chunks/ssr/[root-of-the-server]__0qduvi_._.js:2)
  at f (app:///_next/server/chunks/ssr/[root-of-the-server]__16711sv._.js:2)
  at process.processTicksAndRejections (node:internal/process/task_queues:104)
  at n (app:///_next/server/chunks/ssr/[root-of-the-server]__16711sv._.js:2)
```

## Context
- Environment: `production`
- Release: `[hex]`
- URL: https://moneyballscore.vercel.app/mlb/standings
- Culprit: `GET /mlb/standings`
- Timestamp: 1788909730.164

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
- `server_name`: `169.254.29.87`
- `transaction`: `GET /mlb/standings`
- `turbopack`: `True`
- `url`: `https://moneyballscore.vercel.app/mlb/standings`

## Triggered rule
`[hub] L3 production errors`

## Links
- Sentry: https://sentry.io/organizations/kyu-au/issues/7720447591/events/[hex]/
