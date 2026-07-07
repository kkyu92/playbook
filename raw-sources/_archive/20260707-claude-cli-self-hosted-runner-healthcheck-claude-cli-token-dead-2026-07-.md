---
date: "2026-07-07"
source: "kkyu92/blog-autopilot"
type: "worker-incident"
payload_type: "incident"
severity: "critical"
fingerprint: "claude-cli-token-dead-2026-07-07"
environment: "production"
run_url: "https://github.com/kkyu92/blog-autopilot/actions/runs/28865063760"
---

claude --print 'ok' 실패. 다음 KST 01:17 cron 에서 healthcheck fail → 전체 publish skip 위험.

stderr: 
stdout: Ready.

조치:
1. home-mbp 터미널에서: claude logout && claude login (브라우저 재인증)
2. 재인증 후 workflow_dispatch 로 이 워크플로 재실행해 검증
Runbook: https://github.com/kkyu92/blog-autopilot/blob/main/docs/runbook/claude-cli-renewal.md

Run: https://github.com/kkyu92/blog-autopilot/actions/runs/28865063760
