---
date: "2026-08-13"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "68b567f264009b7aab5f83b4ee26419de1b7bb08"
---


subtype: cycle-retro
cycle_n: 2078
chain_selected: review-code (heavy)
outcome: success
next_recommended_chain: fix-incident (lite, 08-14/08-15 lotto cron fire 실측)

TODOS 최우선 2건 여전히 시간/사용자 대기. plan #24 CRITICAL Part 2 재검증 중 이미 해소된
문제를 stale하게 blocked로 서술 중인 걸 발견 + TODOS.md/plan24.md 정정. 부수 발견 —
pipeline_runs.triggered_by VARCHAR(20) overflow가 daily.ts/mlb-pipeline.ts 양쪽 모두
Sentry 미연동으로 완전 silent(console.error만) 였던 걸 직접 재현 확인, 양쪽 Sentry
capture 추가 + API route 경계 clamp. PR #2929 머지 완료(ab6d374b, state=MERGED 실측 확인).

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
