---
date: "2026-10-04"
source: "kkyu92/moneyballscore"
type: "worker-error"
payload_type: "error-log"
severity: "error"
fingerprint: "sentry-error-app-next-server-chunks-root-of-the-server-13cd9"
first_seen: "2026-10-04T01:19:46.721Z"
environment: "production"
run_url: "https://sentry.io/organizations/kyu-au/issues/7771677457/events/fd9e3e61031144ecabf0e3dfcdcbccdb/"
---

## Error
`Error`: opengraph-image[id] getGameOg select failed: Service for this project is restricted due to the following violations: exceed_egress_quota. The project owner must upgrade their plan or remove spend caps to restore service.

## Stack (top 5)
```
  at <anon> (app:///_next/server/chunks/[root-of-the-server]__13cd9ba._.js:2)
  at p (app:///_next/server/chunks/[root-of-the-server]__13cd9ba._.js:7)
  at process.processTicksAndRejections (node:internal/process/task_queues:104)
  at h (app:///_next/server/chunks/[root-of-the-server]__13cd9ba._.js:7)
  at rJ.do (/var/task/node_modules/.pnpm/next@16.2.10_@babel+core@7.29.7_@opentelemetry+api@1.9.1_@playwright+test@1.61.1_react-_e7ef6af02144761039f4a3f4d9d0a948/node_modules/next/dist/compiled/next-server/app-route-turbo.runtime.prod.js:5)
```

## Context
- Environment: `production`
- Release: `[hex]`
- URL: (none)
- Culprit: `GET /analysis/game/[id]/opengraph-image`
- Timestamp: 1791076786.721

## Tags
- `component`: `opengraph-image`
- `environment`: `production`
- `handled`: `yes`
- `interface_type`: `exception`
- `level`: `error`
- `mechanism`: `generic`
- `os`: `Linux`
- `os.name`: `Linux`
- `route`: `analysis/game/[id]`
- `runtime`: `node v24.21.0`
- `runtime.name`: `node`
- `release`: `[hex]`
- `server_name`: `169.254.2.241`
- `transaction`: `GET /analysis/game/[id]/opengraph-image`
- `turbopack`: `True`

## Triggered rule
`[hub] L3 production errors`

## Links
- Sentry: https://sentry.io/organizations/kyu-au/issues/7771677457/events/[hex]/
