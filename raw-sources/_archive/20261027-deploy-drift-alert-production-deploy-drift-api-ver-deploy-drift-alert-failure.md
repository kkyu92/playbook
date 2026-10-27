---
date: "2026-10-27"
source: "kkyu92/moneyballscore"
type: "worker-incident"
payload_type: "incident"
severity: "error"
fingerprint: "deploy-drift-alert-failure"
environment: "production"
run_url: "https://github.com/kkyu92/moneyballscore/actions/runs/40469154217"
---

**Workflow**: deploy-drift-alert
**Run**: https://github.com/kkyu92/moneyballscore/actions/runs/40469154217

production /api/version 응답 비정상 또는 main HEAD 대비 장기 drift 감지. 기존 ::error:: annotation 은 GH Actions 탭에서만 보여 사용자가 놓치기 쉬움 — 허브로 명시 dispatch.

