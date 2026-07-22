---
date: "2026-07-22"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "5117ebb658773af11bfabb7d4d141a3181af988b"
---


subtype: cycle-retro
cycle_n: 1980
chain_selected: review-code (heavy)
outcome: success
pr: 2847

wave-599 자체는 clean (day-of-week 로직/테스트 정확) — 넓게 grep 한 결과 page.tsx /
debug/factor-correlation / buildAccuracyData.ts / reviews/page.tsx 4곳에 동일 한글
요일 라벨 배열이 독립 중복 정의되어 있던 걸 발견해 packages/shared 로 단일화.
값 변경 없는 순수 리팩토링, 전체 3532 테스트 통과. wave-598 HighlightCard 중복 통합과
동일한 silent-drift-family 패턴 — review-code(heavy) 가 계속 주요 탐지 채널로 기능.
