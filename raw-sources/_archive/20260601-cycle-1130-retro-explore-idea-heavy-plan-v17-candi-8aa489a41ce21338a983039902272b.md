---
date: "2026-06-01"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "8aa489a41ce21338a983039902272b33f8258630"
---


subtype: cycle-retro
cycle_n: 1130
chain_selected: explore-idea (heavy, plan-v17 candidate P TabPFN cohort CSV pipeline Tier 2)
outcome: success
pr: 1525
commit: dccf98a
from-hub: issue #1206

scope:
- scripts/export-predictions-tabpfn.ts cycle 1013 stub body 박제 (105 LOC). supabase
  pagination fetch + 18 column CSV write + drop reason 7종 집계.
- apps/moneyball/src/lib/tabpfn-export.ts 신규 (137 LOC). REQUIRED_FACTORS 10 +
  HOME_ADVANTAGE constant + ExtractFactorsResult tagged union + buildCsvRow / deriveHomeWinProb
  / deriveHomeWon / extractFactors.
- apps/moneyball/src/__tests__/lib/tabpfn-export.test.ts 신규 (226 LOC, 21 케이스).

schema (docs/research/tabpfn-data-prep.md §2.1 정합):
- 18 column = game_id / game_date / prediction_type / scoring_rule + 10팩터 +
  home_advantage(0.015) + predicted_home_win_prob (reasoning.homeWinProb 우선,
  confidence fallback) + home_won (winner_team_id 진짜 outcome) + is_correct (모델 적중)
- target 두 컬럼 박제 — home_won = 진짜 outcome (Brier 계산), is_correct = 모델 적중 (fidelity check)

자율 영역 한도 (data-prep.md §1):
- CSV 박제 only. TabPFN inference / Python sidecar / HuggingFace checkpoint = Step 3 사용자 영역
- production prediction path 영향 X (read-only export)

verification:
- pnpm vitest run apps/moneyball/src/__tests__/lib/tabpfn-export.test.ts → 21 PASS
- pnpm type-check (moneyball) → clean
- pnpm lint (moneyball) → clean

v17 series 진척:
- N feature flag Tier 2 callsite swap → cycle 1127 PR #1523 SHIPPED
- O /accuracy/shadow Header utility nav → cycle 1129 PR #1524 SHIPPED
- P TabPFN cohort CSV pipeline → cycle 1130 PR #1525 SHIPPED (본 cycle)
- 잔여 자율 candidate: Q (CalibrationPlot v2.1-B auto-activate, n=100+ ETA 2026-06-17 16일 후),
  R (silent drift family 19 lazy), T (debate/postview Tier 2, 낮 ROI)
- 사용자 영역 wait: S (MLB cohort scraping)

3 consecutive autonomous ship streak (cycle 1127/1129/1130 explore-idea).
silent drift family streak 자연 유지 (cycle 458 → cycle 1130).

skill_evolution trigger eval:
- trigger 1 (chain-evolution ≥5 누적): cooldown (재 fire 회피)
- trigger 2 (5 consecutive fail): miss
- trigger 3 (milestone): 1130 % 50 = 30, miss
- trigger 4 (meta-pattern): 본 cycle 발화 없음
- trigger 5 (chain pool 0회 in 20 inclusive): review-code 6/19 sample, miss
- fire: false

ship-0 emergency stop: miss (success ≥1 in 10 cycle window)

next_recommended:
- explore-idea (lite, v17 candidate T debate/postview Tier 2 callsite swap, 낮 ROI N 후속)
- 또는 explore-idea (lite, v17 candidate Q CalibrationPlot auto-activate pre-cohort 박제)
- 또는 review-code (lite/heavy, silent drift family 19 자연 발견 시)
- 또는 op-analysis (gap=8 trigger ≥25 미충족), info-arch (gap=10 trigger ≥30 미충족),
  lotto (gap=26 trigger ≥30 미충족, 4 cycle 후 자연 fire)

🤖 Generated with [Claude Code](https://claude.com/claude-code)
