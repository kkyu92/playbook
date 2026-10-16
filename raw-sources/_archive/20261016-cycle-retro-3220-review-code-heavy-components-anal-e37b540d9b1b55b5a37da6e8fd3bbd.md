---
date: "2026-10-16"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "e37b540d9b1b55b5a37da6e8fd3bbd177634c868"
---


subtype: cycle-retro
cycle_n: 3220
chain_selected: review-code(heavy)
outcome: success
next_recommended_chain: review-code(heavy)

components/analysis + components/matchup 전수 감사(Agent 2개 병렬). DetailedFactorAnalysis.tsx 가 DEFAULT_WEIGHTS(12키, shadow 2개 포함) 로 필터링해 park_weather/umpire_sz shadow factor 가 raw key 그대로 노출되던 실버그 발견+수정(ACTIVE_FACTOR_KEYS 로 정정, 회귀 테스트 추가). MlbMatchupFactorCompare.tsx 의 xFIP/WAR MLB 미수집 주장 stale 주석(cycle 2771 정정이 본 파일엔 전파 안 됨) 정정. vitest 111 tests PASS, tsc/eslint clean, direct main commit+push.

다음 추천: review-code(heavy) components/accuracy+shared 또는 op-analysis(Supabase 복구 시).
