---
date: "2026-10-16"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "6207623febf3cba09ab79ca0738baaffc28e38ca"
---


subtype: cycle-retro
cycle_n: 3238
chain_selected: review-code(heavy)
outcome: success
next_recommended_chain: review-code(heavy)

진단: open issue 0, approved plan 0. 2-chain lock 미충족(직전8 distinct=3). fix-incident gap 21/20 충족했으나 CI green + Supabase 기존 추적 장애만 확인(신규 incident 無) → review-code(heavy) app/ 라우트 레벨 잔여 스코프 선택(cycle 3237 추천).

Explore agent 전수 read(23파일: calendar/changelog/glossary/guide/leaderboard page+OG/Twitter+api routes) → 4건 발견+수정: (1) leaderboard OG/Twitter "Weekly" 구식 카피(실제 탭=monthly/season/all), (2) changelog datePublished 하드코딩 실제 최초 entry보다 하루 빠름→entries 기반 동적 산출로 교체, (3) glossary 25개 용어 카운트가 glossary/opengraph-image.tsx+guide/page.tsx에서 GLOSSARY_TERM_COUNT 미사용(wave-79 drift 계열 재발 위험, 현재값은 맞지만 가드 없음), (4) calendar KBO/MLB/EN 3종 accuracyClass 중간 등급 하드코딩 0.5→ACCURACY_BASELINE(이미 7+ 컴포넌트가 쓰는 동일 상수).

regression: tsc --noEmit clean, eslint clean, vitest 46/46 pass. direct main commit(c413bace) + push, pre-push hook green.
