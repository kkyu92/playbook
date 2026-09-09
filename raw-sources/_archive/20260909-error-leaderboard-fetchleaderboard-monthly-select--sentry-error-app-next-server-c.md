---
date: "2026-09-09"
source: "kkyu92/moneyballscore"
type: "worker-error"
payload_type: "error-log"
severity: "error"
fingerprint: "sentry-error-app-next-server-chunks-ssr-root-of-the-server-0"
first_seen: "2026-09-09T04:55:00.494Z"
environment: "production"
run_url: "https://sentry.io/organizations/kyu-au/issues/7720870698/events/a1530313886745609aac498ed95ef167/"
---

## Error
`Error`: leaderboard.fetchLeaderboard(monthly) select failed: Service for this project is restricted due to the following violations: exceed_egress_quota. The project owner must upgrade their plan or remove spend caps to restore service.

## Stack (top 5)
```
  at <anon> (app:///_next/server/chunks/ssr/[root-of-the-server]__0qduvi_._.js:2)
  at p (app:///_next/server/chunks/ssr/[root-of-the-server]__10f7vd4._.js:2)
  at process.processTicksAndRejections (node:internal/process/task_queues:104)
  at Promise.all (index 0:?)
  at v (app:///_next/server/chunks/ssr/[root-of-the-server]__10f7vd4._.js:2)
```

## Context
- Environment: `production`
- Release: `[hex]`
- URL: https://moneyballscore.vercel.app/leaderboard
- Culprit: `GET /leaderboard`
- Timestamp: 1788929700.494

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
- `transaction`: `GET /leaderboard`
- `turbopack`: `True`
- `url`: `https://moneyballscore.vercel.app/leaderboard`

## Triggered rule
`[hub] L3 production errors`

## Links
- Sentry: https://sentry.io/organizations/kyu-au/issues/7720870698/events/[hex]/
