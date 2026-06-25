---
date: "2026-06-25"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "d6699833d0741d934d9cc7e9d9b010cec27f3444"
---


subtype: cycle-retro
cycle_n: 1385
chain_selected: review-code (heavy)
outcome: success
pr: 2187
commit: a14bac9a

retro.summary: wave 153 = SITE_URL local const 42 prod files (41 pages/routes/components + json-ld.ts) → @moneyball/shared import. Wave 152 batch 1 (8 files, cycle 1381) + batch 2 (42 files) = 50 files. site.ts comment "81 files" — ~31 files remain (SharePicksButton /picks separate + test files + metadata literal strings). 초기 오진 (ISR revalidate literal→const) Turbopack 패턴 테스트로 즉시 포착 + revert — 방향 수정 후 올바른 wave 153 식별. 1251/1251 tests pass.

next_recommended_chain: review-code (heavy) wave 154 OR fix-incident (gap=16, trigger@20 = 4 cycles)
