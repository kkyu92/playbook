---
date: "2026-05-22"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "5f0ad923fe18467f0eeff35e108b07ccdffe0269"
---


subtype: cycle-retro
cycle_n: 876
chain_selected: review-code (heavy, sweep 46)
outcome: success
pr_number: 1232
commit_hash: b2af331
files_changed: 5
lines: +69 -10
test_delta: 554 → 559 (+5)

summary:
silent drift family detection — topFactors.ts:NEUTRAL_LO/HI=0.45/0.55 박제 (cycle 875) 후 4 위치 inline hardcode 잔존 발견. factor axis 3 위치 통합 (FactorBreakdown / determineFavor / topFavoringFactors). source-of-truth = factorLabels.ts (factor axis 의미적 home, circular import 회피). 5 신규 regression guard test. silent drift family streak ~335 cycle (cycle 458 → cycle 876) 유지. dominance-positive streak 인정 (cycle 135 박제).

carry-over:
- 박빙 tag (factor-explanations.ts:293 prob axis 0.45~0.55) 통합 검토 — factor axis 와 본질 다른 axis

next_recommended_chain: review-code (sweep 47) OR lotto (lite — 2026-05-23 토 21:00 KST 추첨 D-Day) OR fix-incident OR explore-idea (lite plan #4 TabPFN carry-over)
