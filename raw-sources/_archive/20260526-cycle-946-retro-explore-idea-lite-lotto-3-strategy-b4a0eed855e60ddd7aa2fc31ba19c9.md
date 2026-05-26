---
date: "2026-05-26"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "b4a0eed855e60ddd7aa2fc31ba19c9579d14a467"
---


subtype: cycle-retro
cycle_n: 946
chain_selected: review-code (sweep 64) + explore-idea (plan #8 closure) + explore-idea (lotto balanced) + explore-idea (lotto mix)
outcome: success
plan_n_processed: [8]
pr_number: [1313, 1314]
retro:
  - 사용자 제안 (cycle 946 turn 8) "3 strategy 별 50조합 → 최종 50 합성 + 1등 조합 규칙 전부 부합 재검증"
  - scripts/lotto.ts 안 buildModerateCandidates + pickMdModerate + pickMdMix + verifyAllRules 4 fn 신규 박제
  - pick-md-moderate mode (score [7, 14] cutoff buffer 영역)
  - pick-md-mix mode (17 unique + 17 moderate + 16 balanced 합성 + Fisher-Yates shuffle + dedupe + per-source attribution)
  - verifyAllRules helper (박제 직전 50 picks 전수 256 rules 재검증 + per-pick fail rule JSON evidence)
  - 1226회 mix 50조합 검증 = 256 rules 50/50 PASS (모든 조합 100% 규칙 통과)
  - mix score 분포 min=-3.0 / median=9.4 / max=17.9 / mean=9.3 = 3 영역 균등 cover evidence
  - regression 0 (기존 pick-md / pick-md-balanced / score-backtest mode 변경 X)
  - PR #1314 MERGED (squash + branch delete)
next_recommended_chain: lotto (lite, 5/30 토 추첨 후 OOS — 3 source 별 매칭 분포 비교 evidence 박제) OR fix-incident (lite, 사례 9/10/11 monitoring)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
