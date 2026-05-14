---
date: "2026-05-14"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "29b16063caf5e9aa668349debb1e3e57cfe0bcf9"
---


subtype: cycle-retro
cycle_n: 370
chain_selected: fix-incident
outcome: success
commit: e4f9a09

retro.summary: 10+ lesson-pending CI 이슈 근본 원인 = pnpm-lock.yaml stale (tsx/user-event 제거 후 미동기화). pnpm install 재실행 → lockfile 재생성 → commit. 10개 GH 이슈 close + lesson commit 박제.
next_recommended_chain: operational-analysis
