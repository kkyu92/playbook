---
date: "2026-10-28"
source: "kkyu92/moneyballscore"
type: "worker-incident"
payload_type: "incident"
severity: "error"
fingerprint: "runtime-error-alert-failure"
environment: "production"
run_url: "https://github.com/kkyu92/moneyballscore/actions/runs/40620701452"
---

**Workflow**: runtime-error-alert
**Run**: https://github.com/kkyu92/moneyballscore/actions/runs/40620701452

핵심 production route smoke 가 1개 이상 non-200 응답. 기존 ::error:: annotation 은 GH Actions 탭에서만 보여 사용자가 놓치기 쉬움 — 허브로 명시 dispatch.

