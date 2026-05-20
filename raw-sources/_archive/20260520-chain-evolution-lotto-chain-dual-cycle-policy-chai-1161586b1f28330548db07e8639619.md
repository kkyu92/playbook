---
date: "2026-05-20"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "1161586b1f28330548db07e8639619e1e930f2f1"
---


subtype: chain-evolution
slug: lotto
trigger:
  - (1) 직전 lotto cycle 이후 ≥ 5 cycle cooldown 만료 + countValid 측정 ≥ 7일 미갱신
  - (2) 새 회차 추첨 D-7 안 + ~/lotto_picks/<next-saturday>.md 부재
  - (3) 직전 회차 추첨 직후 OOS 박제 부재
  - (4) 사용자 발화 ("로또"/"lotto"/"추첨"/"OOS"/"<NNNN>회")
  - (5) 256+N rules saturation 이후 신규 rule 후보 자연 발견
  - (6) 마지막 lotto 발화 이후 ≥ 30 사이클 (장기 미발화 주기 보정, cycle 772 박제)

sequence:
  - lite: pnpm tsx scripts/lotto.ts count + (있으면) pick 50 → ship
  - heavy: 신규 rule + countValid delta 측정 + ship + OOS 박제

stop:
  - lite: picks/OOS ship (success) / count_smoke 측정 부재 → partial 강제
  - heavy: rule + delta>0 (success) / delta=0 (partial) / 직전 2 cycle delta=0 → 5 cycle cooldown

execution.results 5 field 의무 (cycle 431 박제):
  count_smoke / new_rules / pick_sample / self_verify / rules_before+after

evidence:
  - cycle 444 (2026-05-15): 256 rules saturation 도달
  - cycle 509 (2026-05-17): 1224 OOS + 1225 picks ship (마지막 lotto fire)
  - cycle 510~772 (2026-05-17~2026-05-20): 263 cycle silent skip (dual-cycle N/2 강제 룰 실효성 X evidence)
  - cycle 772 (2026-05-20): 사용자 발화 trigger + C 옵션 확정

recommendation: chain pool 10 → 11. dual-cycle N/2 강제 폐기. skill-evolution trigger 5 평가 대상 = review-code / polish-ui / lotto 3개. 영구 opt-out X — silent skip 재발 monitor 의무.

박제 위치:
  - ~/.claude/skills/develop-cycle/SKILL.md (chain pool table line 68.5 + 진단 source line 211.5 + trigger 5 평가 대상 갱신)
  - ~/.claude/projects/.../memory/feedback_dual_cycle_policy.md (chain pool 흡수 명시)
  - docs/superpowers/specs/2026-05-20-cycle-772-followup-chain-evolution-lotto.md (본 spec)

next cycle 773 진단 시 trigger 4 + 6 자연 충족 — cycle 49 0회 발화 우선 룰 적용 가능.

Co-authored-by: Claude Opus 4.7 <noreply@anthropic.com>
