---
date: "2026-05-29"
source: "kkyu92/moneyballscore"
type: "worker-error"
payload_type: "error-log"
severity: "error"
fingerprint: "sentry-error-app-next-server-chunks-0qc-zco-js-266-productio"
first_seen: "2026-05-29T07:17:48.094Z"
environment: "production"
run_url: "https://sentry.io/organizations/kyu-au/issues/7513289907/events/d48d67e75e8a43a8ab0adae5bbae5c89/"
---

## Error
`Error`: agent_fallback: pre_game validator: invented_player_name:hard (주입 블록에 없는 3자 이름 후보 1개: 고수준)

## Stack (top 5)
```
  at ay (app:///_next/server/chunks/_0qc-zco._.js:266)
  at process.processTicksAndRejections (node:internal/process/task_queues:104)
```

## Context
- Environment: `production`
- Release: `[hex]`
- URL: https://moneyballscore.vercel.app/api/pipeline
- Culprit: `POST /api/pipeline`
- Timestamp: 1780039068.094

## Tags
- `agent_fallback`: `true`
- `agent_path`: `pre_game`
- `backend`: `anthropic`
- `environment`: `production`
- `handled`: `yes`
- `level`: `error`
- `mechanism`: `generic`
- `os`: `Linux`
- `os.name`: `Linux`
- `runtime`: `node v24.14.1`
- `runtime.name`: `node`
- `release`: `[hex]`
- `server_name`: `169.254.61.173`
- `transaction`: `POST /api/pipeline`
- `turbopack`: `True`
- `url`: `https://moneyballscore.vercel.app/api/pipeline`

## Triggered rule
`[hub] L3 production errors`

## Links
- Sentry: https://sentry.io/organizations/kyu-au/issues/7513289907/events/[hex]/
