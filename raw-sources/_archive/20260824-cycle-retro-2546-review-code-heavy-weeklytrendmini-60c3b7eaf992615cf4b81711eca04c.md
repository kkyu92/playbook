---
date: "2026-08-24"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "60c3b7eaf992615cf4b81711eca04c8ba942a334"
---


subtype: cycle-retro
cycle_n: 2546
chain_selected: review-code (heavy)
outcome: success

진단: open issue 0, approved plan 0/23. 2-chain lock 없음(직전 8사이클 distinct=3).
fix-incident gap 20/20 도달 → lite 체크(gh run list scheduled workflow + CI 실패 이력)
실행했으나 전부 success/0건 = 실 인시던트 부재(negative). op-analysis 16/25 /
info-arch 29/30 / lotto 8/30 미도달. cycle 2545 retro 소표본 게이트 family 재탐색
권고 → 홈페이지 미감사 컴포넌트(WeeklyTrendMini) 재탐색.

발견: 홈페이지 "최근 4주 성과" 카드의 barColor()가 verified===0만 확인, 히어로
currentPct도 SMALL_SAMPLE_N import 없이 verified>0만 확인 — 홈페이지 최상단 노출
통계라 다른 케이스보다 노출 빈도 큼.

실행: SMALL_SAMPLE_N 게이트 적용(barColor 임계 교체 + 히어로 색상/tooltip + 라벨
"· 소표본" + 막대 tooltip "· 소표본(n<5)"). silent-drift-wave-667.test.ts 신규.

검증: tsc/lint/test(525 files, 4336 tests) 전체 clean. 단일 논리 단위 → PR 없이
직접 main commit+push(R4), 버전 0.5.62.120→121.

다음 사이클 권고: 소표본 게이트 family 5-cycle 연속 완료. next_recommended_chain =
operational-analysis(gap 16/25 근접) 또는 review-code(heavy) 신규 카테고리
(family 재탐색 어려워지면 explore-idea/lotto redirect 고려).
