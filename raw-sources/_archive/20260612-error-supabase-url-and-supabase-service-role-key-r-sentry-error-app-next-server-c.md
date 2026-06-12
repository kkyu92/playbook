---
date: "2026-06-12"
source: "kkyu92/moneyballscore"
type: "worker-error"
payload_type: "error-log"
severity: "error"
fingerprint: "sentry-error-app-next-server-chunks-0yy6-next-dist-esm-build"
first_seen: "2026-06-12T10:17:03.078Z"
environment: "production"
run_url: "https://sentry.io/organizations/kyu-au/issues/7546185125/events/a4d7c46af6bb474ca19bfedc1f3e3339/"
---

## Error
`Error`: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY required

## Stack (top 5)
```
  at <anon> (app:///_next/server/chunks/0yy6_next_dist_esm_build_templates_app-route_0-h6cv..js:2)
  at q (app:///_next/server/chunks/0yy6_next_dist_esm_build_templates_app-route_0-h6cv..js:2)
  at O (app:///_next/server/chunks/0yy6_next_dist_esm_build_templates_app-route_0-h6cv..js:2)
  at process.processTicksAndRejections (node:internal/process/task_queues:104)
  at rW.do (/var/task/node_modules/.pnpm/next@16.2.6_@babel+core@7.29.0_@opentelemetry+api@1.9.1_@playwright+test@1.60.0_react-d_a2b63fb340c0bf22509ddf5b0e3ea812/node_modules/next/dist/compiled/next-server/app-route-turbo.runtime.prod.js:5)
```

## Context
- Environment: `production`
- Release: `[hex]`
- URL: (none)
- Culprit: `?(0yy6_next_dist_esm_build_templates_app-route_0-h6cv.)`
- Timestamp: 1781259423.078

## Tags
- `environment`: `production`
- `handled`: `yes`
- `interface_type`: `exception`
- `layer`: `api-route`
- `level`: `error`
- `mechanism`: `generic`
- `mode`: `mlb_predict_final`
- `os`: `Linux`
- `os.name`: `Linux`
- `route`: `mlb-pipeline`
- `runtime`: `node v24.14.1`
- `runtime.name`: `node`
- `release`: `[hex]`
- `server_name`: `169.254.18.251`
- `triggered_by`: `cron`
- `turbopack`: `True`

## Triggered rule
`[hub] L3 production errors`

## Links
- Sentry: https://sentry.io/organizations/kyu-au/issues/7546185125/events/[hex]/
