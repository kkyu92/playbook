---
date: "2026-07-13"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "c919b93eff2223812132bff33dcf4bd9c9ce8b74"
---


subtype: cycle-retro
cycle: 1562
chain_selected: review-code (heavy)
outcome: success
pr: #2634
merged: eff6e980

silent drift family wave 256 후속 sweep. SCORING_RULE_HEATMAP_ROWS 하드코딩 era
리스트 (buildAccuracyData.ts:294) → PRODUCTION_ERA_HISTORY registry 참조 swap.
CohortComparisonHeatmap + ScoringRuleDayHeatmap 양쪽 자동 반영.

wave-255 (BrierTrendChart SR_ORDER, cycle 1559) 정합 pattern. 신규 prod era 추가
시 PRODUCTION_ERA_HISTORY 한 곳 갱신 → dashboard heatmap 자동 반영.

review-code (heavy) 자연 fire — fix-incident gap=2 (fresh) / op-analysis gap=12
(need 25) / info-arch gap=5 (fresh) / lotto gap=19 (need 30) 주기 trigger 모두
미충족 + silent drift candidate grep 명확.

verify:
- pnpm exec tsc --noEmit 0 error
- pnpm test buildAccuracyData 208 files / 1861 tests pass
- 컴파일 결과 array 내용 identical

next_recommended_chain: review-code (heavy) 또는 op-analysis (lite)
next_recommended_reason: wave-256+ 후속 candidate 잔여 monitor / op-analysis gap 25 임계 12 cycle 후 자동 trigger
