---
date: "2026-10-04"
source: "kkyu92/moneyballscore"
type: "worker-error"
payload_type: "error-log"
severity: "error"
fingerprint: "sentry-event-calendar-production"
first_seen: "2026-10-04T00:32:19.525Z"
environment: "production"
run_url: "https://sentry.io/organizations/kyu-au/issues/7771623670/events/92c40af16e7e42e1b7b536e22dc033eb/"
---

## Error
`Event`: Event `Event` (type=error) captured as promise rejection

## Stack (top 5)
```
```

## Context
- Environment: `production`
- Release: `[hex]`
- URL: https://moneyballscore.vercel.app/calendar
- Culprit: `/calendar`
- Timestamp: 1791073939.525

## Tags
- `browser`: `HeadlessChrome 154.0.0`
- `browser.name`: `HeadlessChrome`
- `environment`: `production`
- `handled`: `no`
- `interface_type`: `exception`
- `level`: `error`
- `mechanism`: `auto.browser.global_handlers.onunhandledrejection`
- `os`: `Linux`
- `os.name`: `Linux`
- `release`: `[hex]`
- `transaction`: `/calendar`
- `turbopack`: `True`
- `url`: `https://moneyballscore.vercel.app/calendar`

## Triggered rule
`[hub] L3 production errors`

## Links
- Sentry: https://sentry.io/organizations/kyu-au/issues/7771623670/events/[hex]/
