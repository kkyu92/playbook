---
date: "2026-10-10"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "d1f7d76062e6176f20b6dab15f464ae85e33535b"
---


subtype: cycle-retro
cycle_n: 3012
chain_selected: review-code(heavy)
outcome: success

components/dashboard/ 17파일(39일 미커밋 최장기) 전수 read (subagent 위임). AccuracyChart/
DailyAccuracyChart/ConfidenceBucketChart/TeamPerformanceChart 가 ACCURACY_BASELINE_PCT
상수 대신 리터럴 50 하드코딩 — 7개 chart 중 4개만 registry-vs-literal silent drift 상태
(나머지 3개는 이미 상수 참조). ChartTooltip.tsx 의 title prop + formatRows 미지정 fallback
분기 + formatNumber 헬퍼 — 전역 호출부 13개 전수 확인 전부 미사용 dead code 확정, 제거
+ formatRows 필수 prop 승격. ScoringRuleDayHeatmap/CohortComparisonHeatmap 색상 tier
차이 1건은 재검증 결과 false positive(comment 가 색상 동일성 주장 안 함) 판단, 수정 보류.

tsc/lint/test(585/585·4619/4619) PASS. 직접 main 커밋(PR 미경유, R4 범위).

next_recommended_chain: review-code(heavy) 계속(components/accuracy·matchup·picks·predictions) 또는 fix-incident(gap 4/20) 또는 lotto(gap 3/30)
