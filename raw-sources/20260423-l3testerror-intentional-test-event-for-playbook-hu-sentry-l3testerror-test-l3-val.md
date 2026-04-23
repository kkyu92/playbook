---
date: "2026-04-23"
source: "kkyu92/moneyballscore"
type: "worker-error"
payload_type: "error-log"
severity: "error"
fingerprint: "sentry-l3testerror-test-l3-validation-ts-42-production"
first_seen: "2026-04-23T02:13:41.682Z"
environment: "production"
run_url: "https://sentry.io/organizations/kyu-au/issues/7435283002/events/76ab0420a2ec418faa637c8aae5b22d7/"
---

## Error
`L3TestError`: intentional test event for Playbook Hub Relay integration validation 2026-04-23

## Stack (top 5)
```
  at validateL3Flow (test/l3-validation.ts:42)
```

## Context
- Environment: `production`
- Release: `l3-test-2026-04-23`
- URL: (none)
- Culprit: `validateL3Flow(test/l3-validation.ts)`
- Timestamp: 1776910421.682056

## Tags
- `environment`: `production`
- `l3_test`: `true`
- `level`: `error`
- `release`: `l3-test-2026-04-23`
- `test_source`: `claude-code-session`

## Triggered rule
`[hub] L3 production errors`

## Links
- Sentry: https://sentry.io/organizations/kyu-au/issues/7435283002/events/[hex]/
