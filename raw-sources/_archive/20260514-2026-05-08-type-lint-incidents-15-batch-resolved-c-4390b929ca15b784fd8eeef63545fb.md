---
date: "2026-05-14"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
fingerprint: "4390b929ca15b784fd8eeef63545fbffb60cf348"
---


subtype: lesson
fingerprints:
  - ci-develop-cycle-matchup-facto
  - ci-main-09f63092f8026737ac4bed
  - ci-main-64302812c14c923e02e181
  - ci-main-8dd4b342fef441a67874f3
  - ci-main-9941847de7b9c036f63274
  - ci-main-a50239cd07446c3857bd13
  - ci-main-249a29e016eb55e3c467bc
  - ci-main-ba5b346c5593155bf5a4ab
  - ci-main-25f08273426d0c33884977
  - ci-main-c75fbc18335a86161ae7c7
  - ci-main-000c42df3c950fe5b44fcd
  - ci-main-e041ec008fd570371bae73
  - ci-main-ba4b7e9870878a391b050b
  - vercel-deploy-ba4b7e9
  - ci-main-31946cac9fa8b539248ad1

hub_incidents: playbook#385, #387, #389, #390, #391, #393, #394, #396, #397, #399, #401, #402, #403, #405, #406
worker_reminders: #453~#467

진단:
  - 15건 모두 2026-05-08 발생 (cycle 270~272 시점) type/lint 회귀
  - TS7053 PitcherFipTrend color literal + TS2769 silent-drift.test.ts MockResult overload
  - PR CI green + main CI red = monorepo CI input 차이로 인한 회귀 silent drift

resolution:
  - cycle 272 retro 가 main CI Type check 회귀 fix 박제 (commit 0778ef9)
  - cycle 391~433 main CI green 유지 = 회귀 재발 X
  - 외부 요인 (이미 resolved) — batch close

후속:
  - 본 commit 박제 후 15건 reminder issue (#453~#467) 수동 close (lesson link 첨부)

lesson_doc: docs/lessons/2026-05-15-lesson-pending-batch-resolved-incidents.md
