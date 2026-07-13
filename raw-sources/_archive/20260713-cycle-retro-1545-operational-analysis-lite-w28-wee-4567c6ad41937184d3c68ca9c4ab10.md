---
date: "2026-07-13"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "4567c6ad41937184d3c68ca9c4ab10d1be1abd67"
---


subtype: cycle-retro
cycle: 1545
chain_selected: operational-analysis (lite)
outcome: success

diagnosis:
  key_findings:
    - op-analysis 25-cycle gap 도달 (cycle 1520 마지막 발화)
    - improvement saturation 12/15 (explore-idea 경계, op-analysis 우선)
    - plan #20 expired (2026-06-07) → archived

execution:
  skills: [weekly-review, extract-pattern, compound]
  results:
    weekly_review: W28 13경기 7/13=53.8% / CE 2/5=40% 비CE 5/8=62.5% / 홈팀 9/13=69.2%
    extract_pattern: 3 learnings 등록 (CE 희석 / Elo fallback 홈보정 / scoring_rule 필터)
    compound: v0.5.51.1 + retro + CLAUDE.md n 불일치 박제
  outcome: success

retro:
  summary: CE vs 비CE 10.4pp 격차 첫 수치 확인. n=178 vs n=165 불일치 미규명 carry-over.
  next_recommended_chain: review-code (heavy, wave-245) or fix-incident (n 불일치 원인)

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
