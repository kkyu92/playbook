---
date: "2026-09-09"
source: "kkyu92/moneyballscore"
type: "worker-error"
payload_type: "error-log"
severity: "error"
fingerprint: "sentry-error-app-next-server-chunks-ssr-root-of-the-server-0"
first_seen: "2026-09-09T06:01:39.805Z"
environment: "production"
run_url: "https://sentry.io/organizations/kyu-au/issues/7720956712/events/b1fff69d99ea4a76a674304f91cd079a/"
---

## Error
`Error`: analysis-game.getGameAnalysis select failed: Service for this project is restricted due to the following violations: exceed_egress_quota. The project owner must upgrade their plan or remove spend caps to restore service.

## Stack (top 5)
```
  at <anon> (app:///_next/server/chunks/ssr/[root-of-the-server]__0qduvi_._.js:2)
  at O (app:///_next/server/chunks/ssr/apps_moneyball_src_1ych5j4._.js:24)
  at process.processTicksAndRejections (node:internal/process/task_queues:104)
  at Module.N [as generateMetadata] (app:///_next/server/chunks/ssr/apps_moneyball_src_1ych5j4._.js:6)
```

## Context
- Environment: `production`
- Release: `[hex]`
- URL: https://moneyballscore.vercel.app/analysis/game/736
- Culprit: `GET /analysis/game/[id]`
- Timestamp: 1788933699.805

## Tags
- `browser`: `Firefox 137.0`
- `browser.name`: `Firefox`
- `client_os`: `Windows >=10`
- `client_os.name`: `Windows`
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
- `server_name`: `169.254.11.121`
- `transaction`: `GET /analysis/game/[id]`
- `turbopack`: `True`
- `url`: `https://moneyballscore.vercel.app/analysis/game/736`

## Triggered rule
`[hub] L3 production errors`

## Links
- Sentry: https://sentry.io/organizations/kyu-au/issues/7720956712/events/[hex]/
