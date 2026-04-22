---
date: "2026-04-22"
source: "kkyu92/moneyballscore"
type: "worker-error"
payload_type: "error-log"
severity: "error"
fingerprint: "sentry-typeerror-raven-js-62"
first_seen: "2026-04-22T07:51:58.037Z"
run_url: "https://sentry.io/organizations/kyu-au/issues/7432660841/events/172212257084429fbdd44df1bcbbdade/"
---

## Error
`TypeError`: Object [object Object] has no method 'updateFrom'

## Stack (top 5)
```
  at apply (raven.js:62)
  at poll (../../sentry/scripts/views.js:389)
  at merge (../../sentry/scripts/views.js:268)
  at member (../../sentry/scripts/views.js:283)
```

## Context
- Environment: `(none)`
- Release: `(none)`
- URL: http://example.com/foo
- Culprit: `../../sentry/scripts/views.js in poll`
- Timestamp: 1776844318.037

## Tags
- `browser`: `Chrome 65.0.3325`
- `browser.name`: `Chrome`
- `client_os`: `Windows 8`
- `client_os.name`: `Windows`
- `level`: `error`
- `os`: `Mac OS X 10.13.4`
- `os.name`: `Mac OS X`
- `sample_event`: `yes`
- `user`: `id:1`
- `url`: `http://example.com/foo`

## Triggered rule
`Error Monitor`

## Links
- Sentry: https://sentry.io/organizations/kyu-au/issues/7432660841/events/[hex]/
