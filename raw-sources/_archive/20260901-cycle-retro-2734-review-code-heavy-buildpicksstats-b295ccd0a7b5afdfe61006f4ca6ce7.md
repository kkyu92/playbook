---
date: "2026-09-01"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "b295ccd0a7b5afdfe61006f4ca6ce7f7064d0c32"
---


subtype: cycle-retro
cycle_n: 2734
chain_selected: review-code(heavy)
outcome: success

진단: fix-incident gap 38/20 / lotto gap 45/30 재확인 노이즈(gh run list 전수 확인 실 incident 없음, lotto picks/result 파일 둘 다 당일 최신). op-analysis gap 7/25, info-arch gap 25/30 미도달. 직전8 distinct=3(review-code(heavy) 6 + operational-analysis 1 + polish-ui 1) — 2-chain lock 미충족. cycle 2732 추천 component-level 후보 중 buildPicksStats.ts(391줄, MyPicksClient 소비) 최초 전체 감사.

발견 2건(동일 root cause — status 미체크): (1) myIsCorrect = pick==='home'?homeWon:!homeWon 이 KBO 연장전 무승부에서 away 픽만 "정답" 오판정(home 픽은 정상 오답) — PredictionCard.tsx canonical(isFinal+양방향 strict `>`) 대조로 발견. (2) isResolved 가 r.status 미참조 — live.ts 가 status='live' 중에도 스코어 갱신해 진행 중 경기가 확정처럼 노출.

fix: status==='final' 게이트 + 대칭 strict 비교로 단일 수정(8d704e67). 회귀 가드 테스트 2건 추가. tsc/eslint clean, 571파일 4486건 green. CHANGELOG/TODOS/version bump 0.5.62.173(f5465514/c3c5582b).

다음 사이클 추천: review-code(heavy) 계속 시 MlbMatchupFactorCompare.tsx/FactorBreakdown.tsx 컴포넌트 잔존 감사, 또는 info-architecture-review(gap 26/30 근접).
