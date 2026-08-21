---
date: "2026-08-21"
source: "kkyu92/moneyballscore"
type: "worker-error"
payload_type: "error-log"
severity: "error"
fingerprint: "sentry-typeerror-app-next-server-chunks-ssr-root-of-the-serv"
first_seen: "2026-08-21T10:55:55.298Z"
environment: "production"
run_url: "https://sentry.io/organizations/kyu-au/issues/7684617958/events/3d42e39366d8415aa9442dd9cb129915/"
---

## Error
`TypeError`: Cannot read properties of undefined (reading 'name')

## Stack (top 5)
```
  at <anon> (app:///_next/server/chunks/ssr/[root-of-the-server]__0rxclnw._.js:2)
  at eP (/var/task/node_modules/.pnpm/next@16.2.10_@babel+core@7.29.7_@opentelemetry+api@1.9.1_@playwright+test@1.61.1_react-_e7ef6af02144761039f4a3f4d9d0a948/node_modules/next/dist/compiled/next-server/app-page-turbo.runtime.prod.js:5)
  at e (/var/task/node_modules/.pnpm/next@16.2.10_@babel+core@7.29.7_@opentelemetry+api@1.9.1_@playwright+test@1.61.1_react-_e7ef6af02144761039f4a3f4d9d0a948/node_modules/next/dist/compiled/next-server/app-page-turbo.runtime.prod.js:5)
  at eF (/var/task/node_modules/.pnpm/next@16.2.10_@babel+core@7.29.7_@opentelemetry+api@1.9.1_@playwright+test@1.61.1_react-_e7ef6af02144761039f4a3f4d9d0a948/node_modules/next/dist/compiled/next-server/app-page-turbo.runtime.prod.js:5)
  at Array.toJSON (/var/task/node_modules/.pnpm/next@16.2.10_@babel+core@7.29.7_@opentelemetry+api@1.9.1_@playwright+test@1.61.1_react-_e7ef6af02144761039f4a3f4d9d0a948/node_modules/next/dist/compiled/next-server/app-page-turbo.runtime.prod.js:5)
```

## Context
- Environment: `production`
- Release: `[hex]`
- URL: https://moneyballscore.vercel.app/mlb/reviews/monthly/2026-07
- Culprit: `GET /mlb/reviews/monthly/[month]`
- Timestamp: 1787309755.298

## Tags
- `browser`: `Chrome 146`
- `browser.name`: `Chrome`
- `client_os`: `Windows`
- `client_os.name`: `Windows`
- `environment`: `production`
- `handled`: `no`
- `interface_type`: `exception`
- `level`: `error`
- `mechanism`: `auto.function.nextjs.on_request_error`
- `os`: `Linux`
- `os.name`: `Linux`
- `runtime`: `node v24.18.1`
- `runtime.name`: `node`
- `release`: `[hex]`
- `server_name`: `169.254.68.173`
- `transaction`: `GET /mlb/reviews/monthly/[month]`
- `turbopack`: `True`
- `url`: `https://moneyballscore.vercel.app/mlb/reviews/monthly/2026-07`

## Triggered rule
`[hub] L3 production errors`

## Links
- Sentry: https://sentry.io/organizations/kyu-au/issues/7684617958/events/[hex]/
