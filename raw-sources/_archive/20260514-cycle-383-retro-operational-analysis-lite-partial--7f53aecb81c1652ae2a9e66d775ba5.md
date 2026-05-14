---
date: "2026-05-14"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "7f53aecb81c1652ae2a9e66d775ba540d949d1ef"
---


subtype: cycle-retro
cycle_n: 383
chain_selected: operational-analysis lite
outcome: partial
commit_hash: f867732
pr_number: null

retro.summary: operational-analysis lite partial — W22 모니터링 중 v1.8 era 전체 quant-only fallback 발견 (5/13 fire 5건 pre_game + 5건 postview 모두 totalTokens=0 + reasoning='에이전트 토론 불가'). ANTHROPIC_API_KEY credit 소진 의심. PR #372 fix(5/13 17:24 merge) 가 v1.8 pre_game(16:17 fire) 보다 1h 늦음 → mv='v2.0-debate' silent 라벨 + postview path mv='v2.0-postview' 동일 silent 잔존. v1.8 가중치 효과 측정 불가능. lesson 박제 (docs/lessons/2026-05-14-anthropic-credit-silent-fallback-v18.md) + TODOS/CHANGELOG 갱신. 코드 변경 0.

next_recommended_chain: fix-incident heavy
next_recommended_reason: silent operational drift family 6 (관측 인프라 silent 실패) 동일 family. 우선 ANTHROPIC API key 상태 확인 + postview path agentsFailed 가시화 + Sentry captureException 직접 호출 = 우선순위 fix. 향후 v1.8 가중치 신뢰성 확보 위해 5/14 이후 예측 정상화 필수.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
