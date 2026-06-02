---
date: "2026-06-02"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "3a8a6900b9ee558adc29e7937c8e1a626240db24"
---


subtype: cycle-retro
cycle: 1137
chain: fix-incident (lite)
outcome: success
pr: #1621 (be3688f squash merged)

81fa278 /insights fix 후속 silent drift family wave. shadow row
(v2.1-B-shadow / v2.0-shadow / tabpfn-shadow) fetch quota 점유 차단:
- home page.tsx 4 callsite (today / yesterday / season / recent weeks)
- analysis/page.tsx 6 callsite (today / yesterday / week + getPeriodStats / getBestPickOfWeek / getUpsetPickOfMonth)
- feed/route.ts 1 callsite (RSS)
PRODUCTION_COHORT_RULES filter (calendar.tsx 패턴) 통일. tsc clean.
test 908/908. R7 squash auto-merge 완료.

WIP isolation: tabpfn-shadow 4 file + 3 untracked stash 박제 — 본 cycle
scope 분리. 사용자 결정 후 explore-idea (lite) 자연 ship 후보.

next: explore-idea (WIP 통합) 또는 review-code (lite, sweep audit 후속).

🤖 Generated with [Claude Code](https://claude.com/claude-code)
