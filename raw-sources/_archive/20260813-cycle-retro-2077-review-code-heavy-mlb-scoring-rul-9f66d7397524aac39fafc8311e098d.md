---
date: "2026-08-13"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "9f66d7397524aac39fafc8311e098d086d2c5705"
---


subtype: cycle-retro
cycle_n: 2077
chain_selected: review-code (heavy)
outcome: success
next_recommended_chain: fix-incident (lite, 08-14 금/08-15 토 lotto cron 실측)

TODOS 최우선 2건(lotto cron 실측, Cloudflare secret) 모두 시간·사용자 대기 재확인.
model-version-labels.ts 주석이 예고한 mlb-pipeline.ts MLB_SCORING_RULE 통합이 실제
미완료였음을 grep 으로 발견 — 5곳 하드코딩 치환, KBO PRODUCTION_COHORT_RULES 하드코딩
family 와 동일 구조의 MLB 신규 drift 사전 예방. type-check/vitest(1085)/lint 통과,
main 직접 push (branch+PR 생략, 낮은 리스크 판단).
