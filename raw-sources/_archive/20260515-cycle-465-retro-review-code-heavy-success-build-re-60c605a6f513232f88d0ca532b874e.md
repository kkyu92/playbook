---
date: "2026-05-15"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "60c605a6f513232f88d0ca532b874e37974ab99f"
---


subtype: cycle-retro
cycle_n: 465
chain_selected: review-code (heavy)
outcome: success

PR #494 (squash 76e5ff5) — apps/moneyball/src/lib/reviews/ shared.ts 신설 +
buildWeeklyReview / buildMonthlyReview 5개 영역 dedupe (PredictionRow / supabase
select / mapRowsToHighlightCandidates / buildTeamStats / buildFactorInsights).
"모델 v1.6" 하드코딩 2곳 → 버전-neutral. 379 lines del + 265 lines add (net -114).

review-code (heavy) silent drift family streak 12 cycle 째 자연 후속 — cycle 125~134
(10) + cycle 457 + cycle 464 + cycle 465. dominance-positive 인정 룰 (cycle 135).
cycle 464 retro 명시 권장 (build*Review dedupe) 정확 매핑.

next_recommended_chain: review-code (heavy) silent drift family streak 계속
(agents/postview / lib/predictions). 또는 op-analysis (lite) gap=17 → 25-cycle 임박.
또는 polish-ui (heavy) DESIGN.md token 균열 grep.

검증: pnpm test (전체) 1089 PASS / type-check 3 packages PASS / R7 auto-merge.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
