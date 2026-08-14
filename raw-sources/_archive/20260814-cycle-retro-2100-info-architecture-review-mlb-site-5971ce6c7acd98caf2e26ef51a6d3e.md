---
date: "2026-08-14"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "5971ce6c7acd98caf2e26ef51a6d3e2ac0e9e92e"
---


subtype: cycle-retro
cycle_n: 2100
chain_selected: info-architecture-review
outcome: success

30-cycle gap trigger(마지막 발화 cycle 2069) + 신규 라우트 7건/7일 동시 충족.
sitemap.ts 60 url vs page.tsx 80개 mismatch 추적 → /mlb/games/[date]/[slug]
(cycle 2098/2099 shipped SportsEvent JSON-LD 개별 경기 페이지) 가 sitemap
전혀 미반영 확인 — KBO analysis/game/[id] parity gap. predictions(league=mlb)
선행 조회로 미예측 경기(404) 배제 + en 미러 포함 fix. 기존 sitemap-mlb
mock 이 새 쿼리 체인(.eq/.in)에서 깨져 chainable+thenable builder 로 교체 +
회귀 테스트 2건 추가. 264 files/2451 tests pass, tsc clean. direct push
main (commit 4a146b0a).

milestone: cycle 2100 (%50==0) — trigger 3 충족, skill-evolution marker
cycle 2101 로 deferred (cycle 1600~2050 기존 패턴 유지).

next_recommended_chain: skill-evolution (forced, marker set)
