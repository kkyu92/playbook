---
date: "2026-06-30"
source: "kkyu92/moneyballscore"
type: "worker-error"
payload_type: "error-log"
severity: "error"
fingerprint: "sentry-error-app-next-server-chunks-0qc-zco-js-266-productio"
first_seen: "2026-06-30T13:20:21.320Z"
environment: "production"
run_url: "https://sentry.io/organizations/kyu-au/issues/7584493212/events/31969ecd92ad4a8a896364348d795dcb/"
---

## Error
`Error`: agent_fallback: post_game CREDIT_EXHAUSTED: Anthropic API 잔액 부족 (Plans & Billing 충전 필요)

## Stack (top 5)
```
  at aG (app:///_next/server/chunks/_0qc-zco._.js:266)
  at process.processTicksAndRejections (node:internal/process/task_queues:104)
```

## Context
- Environment: `production`
- Release: `[hex]`
- URL: https://moneyballscore.vercel.app/api/live
- Culprit: `POST /api/live`
- Timestamp: 1782825621.32

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
- `runtime`: `node v24.14.1`
- `runtime.name`: `node`
- `release`: `[hex]`
- `server_name`: `169.254.45.105`
- `transaction`: `POST /api/live`
- `turbopack`: `True`
- `url`: `https://moneyballscore.vercel.app/api/live`

## Triggered rule
`[hub] L3 production errors`

## Links
- Sentry: https://sentry.io/organizations/kyu-au/issues/7584493212/events/[hex]/
