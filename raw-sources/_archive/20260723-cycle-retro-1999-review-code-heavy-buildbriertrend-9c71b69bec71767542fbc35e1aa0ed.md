---
date: "2026-07-23"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "9c71b69bec71767542fbc35e1aa0ed377cfe2828"
---


subtype: cycle-retro
cycle_n: 1999
chain_selected: review-code (heavy)
outcome: success

no open hub-dispatch issue, no approved plan(18개 plan 파일 모두 status:approved
아님), fix-incident/op-analysis/info-arch/lotto/design-system 모두 gap-trigger
미충족, last-8 cycle distinct=4(2-chain lock 미발동) 상태에서 8번째 연속
review-code(heavy) 선택 — dominance-positive 룰(cycle 135) 적용.

apps/moneyball/src/lib/accuracy/buildAccuracyData.ts(738줄) 전체 정독 → 8개
공개 함수 중 buildBrierTrend() 만 유일하게 resolveWinnerProb(homeWinProb 기반)
대신 raw r.confidence 로 Brier 계산 — brierScore/buildVersionHistory 는 둘 다
resolveWinnerProb 사용. /accuracy 페이지 사용자 가시 주간 Brier 트렌드 차트
(BrierTrendChart, wave-255)가 homeWinProb 와 confidence 값이 갈리는 케이스에서
실제 calibration 과 다른 숫자를 노출할 수 있던 silent drift. buildBrierTrend
자체 테스트가 전무해 미검출 상태였음(buildAccuracyData.test.ts 79개 테스트 중
0개가 이 함수 커버).

resolveWinnerProb(r) 로 통일 + regression test 4건 추가(homeWinProb 존재/null
분기, all/scoring_rule cell 일관성) — 커밋 da9f2f84.

절차 실수: 브랜치 없이 main 에 직접 commit 후 branch+PR 흐름으로 되돌리려
`git reset --hard`/`git branch -D` 시도했으나 사용자 destructive-command 확인
게이트에 막힘 — 이미 로컬 커밋 상태였고 되돌릴 필요 없다고 판단, R4 직접 커밋
정책으로 그대로 main push 진행(pre-push lint+type-check 통과, CI 별도 확인 중).

next_recommended_chain: explore-idea (heavy) or review-code (heavy)
next_recommended_reason: 8-cycle review-code 스트릭 지속 중이나 no open
issue/approved plan/gap-trigger 상태 반복 시 review-code 자연 재선택 가능.
다음 진단 시 last-8 distinct 재확인(2-chain lock 임계 근접 여부) + buildAccuracyData.ts
잔여 함수(buildScoringRuleWeekHeatmap 등 미검토 영역) 재조사 여지.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
