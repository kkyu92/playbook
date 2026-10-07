---
date: "2026-10-07"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "1cdac44a39a688c92f23b7f78f0d98e9e574d744"
---


subtype: cycle-retro
cycle_n: 2960
chain_selected: review-code(heavy)
outcome: success
next_recommended_chain: fix-incident 또는 explore-idea

진단: op-analysis gap=36(≥25) 이나 Supabase egress quota 402 재확인(curl 직접, day21+
변화 없음) 미해결 지속. design-system(DESIGN.md mtime 35일 trigger) 토큰 grep 재검사
결과 신규 drift 0건. 2-chain lock 미충족(직전8 distinct=3). unprocessed plan 23개 전부
non-approved. cycle 2959 와 평행한 MLB 영역(mlb-pipeline.ts/mlb-retro.ts) 직접 code read.

mlb-retro.ts buildMlbFactors() 가 cycle 2822 이미 발견했던 recent_form/head_to_head
하드코딩 중립값 미해결 항목 발견 — mlb-pipeline.ts 가 cycle 2353 부터 실측 영속화해온
predictions.home_recent_form/away_recent_form/head_to_head_rate 를 select 안 해서
agent_memories 학습 시 두 factor 가 항상 maxBias 후보에서 구조적 배제되던 버그.
park_factor/elo 와 동일 null-guard 패턴으로 재배선, 신규 테스트 3건 추가.

kbo-data 94 test files / 1230 tests 통과, type-check/lint clean. 직접 main 커밋 3건
(fix + docs + package.json version-sync-guard 수습) push 완료, CI green 확인
(health-alert 실패는 기존 Supabase egress quota 402 incident 와 무관 재확인).

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
