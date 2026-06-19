---
date: "2026-06-19"
source: "kkyu92/moneyballscore"
type: "worker-error"
payload_type: "error-log"
severity: "error"
fingerprint: "sentry-error-app-next-server-chunks-0qc-zco-js-266-productio"
first_seen: "2026-06-19T07:17:25.793Z"
environment: "production"
run_url: "https://sentry.io/organizations/kyu-au/issues/7561808757/events/5dd31921819942d3b309f7ecaabe49e4/"
---

## Error
`Error`: agent_fallback: pre_game CREDIT_EXHAUSTED: Anthropic API 잔액 부족 (Plans & Billing 충전 필요)

## Stack (top 5)
```
  at aU (app:///_next/server/chunks/_0qc-zco._.js:266)
  at process.processTicksAndRejections (node:internal/process/task_queues:104)
```

## Context
- Environment: `production`
- Release: `[hex]`
- URL: https://moneyballscore.vercel.app/api/pipeline
- Culprit: `POST /api/pipeline`
- Timestamp: 1781853445.793

## Tags
- `agent_fallback`: `true`
- `agent_path`: `pre_game`
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
- `server_name`: `169.254.20.15`
- `transaction`: `POST /api/pipeline`
- `turbopack`: `True`
- `url`: `https://moneyballscore.vercel.app/api/pipeline`

## Triggered rule
`[hub] L3 production errors`

## Links
- Sentry: https://sentry.io/organizations/kyu-au/issues/7561808757/events/[hex]/
