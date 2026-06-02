---
date: "2026-06-02"
source: "kkyu92/moneyballscore"
type: "worker-error"
payload_type: "error-log"
severity: "error"
fingerprint: "sentry-error-app-next-server-chunks-0qc-zco-js-266-productio"
first_seen: "2026-06-02T07:19:51.265Z"
environment: "production"
run_url: "https://sentry.io/organizations/kyu-au/issues/7520621572/events/06ffbc50dcfb4e2cbbfb75d60e97977a/"
---

## Error
`Error`: agent_fallback: pre_game validator: hallucinated_number:hard (주입 블록에 없는 수치 3개: 4.167, 4.8, 0.62) | invented_player_name:hard (주입 블록에 없는 3자 이름 후보 1개: 초저탈)

## Stack (top 5)
```
  at am (app:///_next/server/chunks/_0qc-zco._.js:266)
  at process.processTicksAndRejections (node:internal/process/task_queues:104)
```

## Context
- Environment: `production`
- Release: `[hex]`
- URL: https://moneyballscore.vercel.app/api/pipeline
- Culprit: `POST /api/pipeline`
- Timestamp: 1780384791.265

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
- `server_name`: `169.254.61.121`
- `transaction`: `POST /api/pipeline`
- `turbopack`: `True`
- `url`: `https://moneyballscore.vercel.app/api/pipeline`

## Triggered rule
`[hub] L3 production errors`

## Links
- Sentry: https://sentry.io/organizations/kyu-au/issues/7520621572/events/[hex]/
