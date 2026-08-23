---
date: "2026-08-23"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "73bdbe67ed9a2e5e55f9437b3f10aff669604334"
---


subtype: cycle-retro
cycle: 2439
chain_selected: fix-incident
outcome: retro-only

Supabase 실측 v1.8 is_correct null 390건 발견 → silent verify failure 가설 형성 후 검증. 전부 prediction_type='post_game'(postview 회고 row, is_correct 대상 아님, 설계 정상) — false alarm. updateAccuracy()/accuracy page 필터링 정확 확인. pre_game cohort n=307 = cycle 2361 기록치와 정확 일치(78 cycle 신규 verified 0, n-freeze 재확인). 코드 변경 0건.

다음 추천 = explore-idea(heavy, saturation 9/15) 또는 info-architecture-review(14/30).
