---
date: "2026-08-24"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "d8a82d7df2278c88bbe79781b7aa3fb4701d5c89"
---


subtype: cycle-retro
cycle_n: 2499
chain_selected: review-code (heavy)
outcome: success

review-code(heavy) accuracy 컴포넌트 계층(FactorAccuracyTable/TeamBiasTable/
ModelVersionHistory/TeamMatchupCards) 최초 전체 감사. TeamMatchupCards.tsx
소표본 opacity threshold(n<3)가 SMALL_SAMPLE_N(5, sweep51 source-of-truth)
미참조 + 근거 부정확한 comment(ScoringRuleDayHeatmap/CohortComparisonHeatmap
실측 결과 해당 threshold 자체 부재, cycle 2199 도입 당시부터 잘못된 근거)
발견·정정. commit 47430fb0, v0.5.62.107.

다음 추천: operational-analysis(gap 21/25 임박) 또는 review-code 계속(standings/
dashboard 계열 미감사 컴포넌트 탐색).

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
