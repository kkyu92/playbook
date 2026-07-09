---
date: "2026-07-09"
source: "kkyu92/moneyballscore"
type: "worker-error"
payload_type: "error-log"
severity: "error"
fingerprint: "sentry-error-app-next-server-chunks-0dzw4t-js-266-production"
first_seen: "2026-07-09T12:21:00.756Z"
environment: "production"
run_url: "https://sentry.io/organizations/kyu-au/issues/7601880350/events/233a42e37a4c411dad493263f890bdf3/"
---

## Error
`Error`: agent_fallback: post_game CREDIT_EXHAUSTED: Anthropic API 잔액 부족 (Plans & Billing 충전 필요)

## Stack (top 5)
```
  at av (app:///_next/server/chunks/_0dzw4t-._.js:266)
  at process.processTicksAndRejections (node:internal/process/task_queues:104)
```

## Context
- Environment: `production`
- Release: `[hex]`
- URL: https://moneyballscore.vercel.app/api/live
- Culprit: `POST /api/live`
- Timestamp: 1783599660.756

## Tags
- `agent_fallback`: `true`
- `agent_path`: `post_game`
- `backend`: `anthropic`
- `environment`: `production`
- `handled`: `yes`
- `interface_type`: `exception`
- `level`: `error`
- `mechanism`: `generic`
- `os`: `Linux`
- `os.name`: `Linux`
- `runtime`: `node v24.18.0`
- `runtime.name`: `node`
- `release`: `[hex]`
- `server_name`: `169.254.43.41`
- `transaction`: `POST /api/live`
- `turbopack`: `True`
- `url`: `https://moneyballscore.vercel.app/api/live`

## Triggered rule
`[hub] L3 production errors`

## Links
- Sentry: https://sentry.io/organizations/kyu-au/issues/7601880350/events/[hex]/
