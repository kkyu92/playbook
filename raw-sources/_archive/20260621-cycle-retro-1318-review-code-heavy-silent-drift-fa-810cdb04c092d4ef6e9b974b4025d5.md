---
date: "2026-06-21"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "810cdb04c092d4ef6e9b974b4025d5e251a7f8b1"
---


subtype: cycle-retro
cycle_n: 1318
chain_selected: review-code (heavy)
outcome: success
pr: #2092
commit: cd5c02c

retro.summary:
silent drift family wave 104 — `0.5` coin-flip accuracy baseline 4 chart file
4 occurrence 하드코딩 재선언 → ACCURACY_BASELINE registry 단일 source.
RollingAccuracyChart.tsx:82 + WeeklyTrendMini.tsx:115 + WinnerProbBucketChart.tsx:94
ReferenceLine + ScoringRuleDayHeatmap.tsx:16 색상 threshold (>=50% yellow).

family wave streak: 95~104 (10 consecutive review-code (heavy) SUCCESS).
type-check 8.7s + test 1051 PASS / 81 files. 차트 시각 변경 X.

next_recommended_chain: review-code (heavy)
next_recommended_reason:
silent drift family wave 105 candidate hunt 자연 진행. ELO_NEUTRAL 1500 / 0.6
confidence threshold / minSamples 30 default 등 신규 wave 후보 grep 매칭 가능.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
