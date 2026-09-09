---
date: "2026-09-09"
source: "kkyu92/moneyballscore"
type: "worker-error"
payload_type: "error-log"
severity: "error"
fingerprint: "sentry-error-app-next-server-chunks-ssr-root-of-the-server-0"
first_seen: "2026-09-09T00:21:07.769Z"
environment: "production"
run_url: "https://sentry.io/organizations/kyu-au/issues/7720520398/events/f0c964e6862c4c139a6c194158e6171f/"
---

## Error
`Error`: series.getSeriesByTopic select failed: Service for this project is restricted due to the following violations: exceed_egress_quota. The project owner must upgrade their plan or remove spend caps to restore service.

## Stack (top 5)
```
  at <anon> (app:///_next/server/chunks/ssr/[root-of-the-server]__0qduvi_._.js:2)
  at j (app:///_next/server/chunks/ssr/apps_moneyball_src_1wclp4u._.js:2)
  at process.processTicksAndRejections (node:internal/process/task_queues:104)
  at l (app:///_next/server/chunks/ssr/[root-of-the-server]__0afh4iw._.js:2)
```

## Context
- Environment: `production`
- Release: `[hex]`
- URL: http://moneyballscore.vercel.app/insights/series/ht-vs-sk
- Culprit: `GET /insights/series/[topic]`
- Timestamp: 1788913267.769

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
- `server_name`: `169.254.52.49`
- `transaction`: `GET /insights/series/[topic]`
- `turbopack`: `True`
- `url`: `http://moneyballscore.vercel.app/insights/series/ht-vs-sk`

## Triggered rule
`[hub] L3 production errors`

## Links
- Sentry: https://sentry.io/organizations/kyu-au/issues/7720520398/events/[hex]/
