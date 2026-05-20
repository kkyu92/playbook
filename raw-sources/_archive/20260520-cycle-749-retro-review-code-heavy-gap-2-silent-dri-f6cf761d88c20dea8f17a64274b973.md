---
date: "2026-05-20"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "f6cf761d88c20dea8f17a64274b973f974a4ec10"
---


subtype: cycle-retro
cycle_n: 749
chain_selected: review-code (heavy, gap=2 silent drift family sweep 5번째)
outcome: success
pr: 1088
merge_hash: cbcb00f

진단 sweep:
- chain dist 직전 20: explore-idea 7 / review-code 5 / op-analysis 3 / polish-ui 2 / fix-incident 2 / info-arch 1
- 2-chain lock no (distinct=5) / lite cooldown 0 / trigger 5 skill-evolution 미충족
- CLAUDE.md 32 file:line 박제 drift 0 (cycle 745+747 sweep 후 일관성)
- CLAUDE.md path/migration 박제 drift 0
- DEFAULT_WEIGHTS / HOME_ADVANTAGE 가중치 박제 source vs CLAUDE.md vs 주석 정합
- silent drift 1건 발견: index.test.ts:83 HOME_ADVANTAGE 메시지 N=731 (구 측정값) vs source/CLAUDE.md N=2180 mismatch

silent drift family streak 5번째 (179 cycle):
- cycle 741 migration 026 line 222 drift fix
- cycle 745 ThisWeekStatusFilter 108→107 + MonthlyTeamStatsSortControl 90→89
- cycle 747 LeaderboardClient app/ → components/ path
- cycle 749 (본) HOME_ADVANTAGE test 메시지 N=731 → N=2180

ship cohort 회복: cycle 745/747/749 = 5 cycle 안 3 ship (60% ship rate). cycle 135 dominance-positive 인정 streak 자연 운영.

next_rec:
- review-code 직후 cooldown — 직전 5 cycle 3회 (745/747/749)
- 후보: fix-incident lite (gap=10) / info-arch lite (gap=8) / polish-ui lite (gap=6) / explore-idea lite (gap=4) / op-analysis lite (gap=2)
- 메인 자율 선택

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
