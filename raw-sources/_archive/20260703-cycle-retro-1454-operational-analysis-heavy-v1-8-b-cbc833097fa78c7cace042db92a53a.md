---
date: "2026-07-03"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "cbc833097fa78c7cace042db92a53ae404be6c94"
---


subtype: cycle-retro
cycle_n: 1454
chain_selected: operational-analysis (heavy)
outcome: success
pr: #2541

retro:
  summary: cycle 1447 lite baseline (n=161 Brier 0.2995) 후속 heavy 분석.
    pre n=118 (Brier 0.2730 CI [0.2439, 0.3023]) vs post n=43 (Brier 0.3723 CI [0.3198, 0.4257]).
    95% bootstrap CI 겹침 X → 통계 유의성 있는 진짜 drift (표본 노이즈 X).
    confidence tier collapse — post 43 중 42건 (97.7%) LOW (conf<0.55), pre 63% 대비.
    acc 상승 (58.5% → 67.4%) vs Brier 악화 (0.2730 → 0.3723) 역설 = 모델 winner 더 잘 맞추지만 confidence spread 압축.
    drift 시점 rolling window (win=30) 로 2026-06-12 부근 (idx 78) 식별.
    scripts/op-analysis-brier-drift.ts + docs/analysis/brier-drift-cycle-1454.md 신규 박제.
    R8 사용자 결정 (v2.0 rebalance / v1.8 유지 / v2.1-B reject) 근거 evidence 강화.
    auto-bundled wave 189 fix (v2-shadow-monitor + v2-preview 미래 조건문) 함께 squash 머지.
  next_recommended_chain: review-code (heavy) 또는 operational-analysis (heavy 후속)
  next_reason: wave 190 후보 hunt 또는 drift 시점 commit sweep 심층. gap 미충족 시 review-code heavy dominance 자연 유지.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
