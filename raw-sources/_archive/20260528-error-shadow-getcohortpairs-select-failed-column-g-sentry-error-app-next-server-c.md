---
date: "2026-05-28"
source: "kkyu92/moneyballscore"
type: "worker-error"
payload_type: "error-log"
severity: "error"
fingerprint: "sentry-error-app-next-server-chunks-ssr-root-of-the-server-0"
first_seen: "2026-05-28T02:44:47.197Z"
environment: "production"
run_url: "https://sentry.io/organizations/kyu-au/issues/7510590349/events/8e55af4f9c2042e49725543b35e4b22b/"
---

## Error
`Error`: shadow.getCohortPairs select failed: column games_1.home_winner_team_id does not exist

## Stack (top 5)
```
  at <anon> (app:///_next/server/chunks/ssr/[root-of-the-server]__0cdnm0a._.js:2)
  at j (app:///_next/server/chunks/ssr/[root-of-the-server]__0o_08yr._.js:2)
  at process.processTicksAndRejections (node:internal/process/task_queues:104)
  at n (app:///_next/server/chunks/ssr/[root-of-the-server]__0o_08yr._.js:2)
```

## Context
- Environment: `production`
- Release: `[hex]`
- URL: https://moneyballscore.vercel.app/accuracy/shadow
- Culprit: `GET /accuracy/shadow`
- Timestamp: 1779936287.197

## Tags
- `browser`: `curl 8.7.1`
- `browser.name`: `curl`
- `environment`: `production`
- `handled`: `no`
- `level`: `error`
- `mechanism`: `auto.function.nextjs.on_request_error`
- `os`: `Linux`
- `os.name`: `Linux`
- `runtime`: `node v24.14.1`
- `runtime.name`: `node`
- `release`: `[hex]`
- `server_name`: `169.254.55.37`
- `transaction`: `GET /accuracy/shadow`
- `turbopack`: `True`
- `url`: `https://moneyballscore.vercel.app/accuracy/shadow`

## Triggered rule
`[hub] L3 production errors`

## Links
- Sentry: https://sentry.io/organizations/kyu-au/issues/7510590349/events/[hex]/
