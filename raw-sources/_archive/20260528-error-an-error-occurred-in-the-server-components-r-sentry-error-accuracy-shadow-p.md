---
date: "2026-05-28"
source: "kkyu92/moneyballscore"
type: "worker-error"
payload_type: "error-log"
severity: "error"
fingerprint: "sentry-error-accuracy-shadow-production"
first_seen: "2026-05-28T02:45:37.718Z"
environment: "production"
run_url: "https://sentry.io/organizations/kyu-au/issues/7510591549/events/9637ea579dbd445abc4fe86c68a6ced5/"
---

## Error
`Error`: An error occurred in the Server Components render. The specific message is omitted in production builds to avoid leaking sensitive details. A digest property is included on this error instance which may provide additional details about the nature of the error.

## Stack (top 5)
```
```

## Context
- Environment: `production`
- Release: `[hex]`
- URL: https://moneyballscore.vercel.app/accuracy/shadow
- Culprit: `/accuracy/shadow`
- Timestamp: 1779936337.718

## Tags
- `browser`: `Chrome 124.0.0`
- `browser.name`: `Chrome`
- `environment`: `production`
- `handled`: `yes`
- `level`: `error`
- `mechanism`: `generic`
- `os`: `Linux`
- `os.name`: `Linux`
- `release`: `[hex]`
- `transaction`: `/accuracy/shadow`
- `turbopack`: `True`
- `url`: `https://moneyballscore.vercel.app/accuracy/shadow`

## Triggered rule
`[hub] L3 production errors`

## Links
- Sentry: https://sentry.io/organizations/kyu-au/issues/7510591549/events/[hex]/
