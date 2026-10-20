---
date: "2026-10-20"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "ab1acd107cffb425d853a74c4a127ce47c674109"
---


subtype: cycle-retro
cycle_n: 3419
chain_selected: expand-scope
outcome: success
pr: 3181
commit: ee5092e8

cycle 3401 retro가 flag한 3x 반복 버그 클래스(builder catch+Supabase-call이 degraded
신호 없이 silent fallback)를 ad-hoc fix 대신 구조적 sweep(10개 builder 수정 + 4개
exempt 명시) + 회귀 방지 CI 가드(degraded-flag-convention.test.ts) 로 해소.
tsc/lint/vitest(605f/4741t) PASS. R7 머지.

next_recommended_chain: review-code (heavy)
next_recommended_reason: components/predictions/ 전수 감사 시리즈 자연 계속 가능,
2-chain lock 미충족(직전8 distinct=3)이라 자유 선택 가능

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
