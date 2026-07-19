---
date: "2026-07-19"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "34a1a5a2137e7f5a57a52e9eb002782ca02ee334"
---


subtype: cycle-retro
cycle_n: 1876
chain_selected: review-code (heavy)
outcome: success
wave: 509
retro_summary: >
  computeCompositeDuel.ts 가 8개 DUEL 상수를 모두 사용하나 6개 상수의 JSDoc "변경 시" 라인에
  computeCompositeDuel.ts callsite 누락. LINEUP_WOBA_DUEL_MIN/SFR_DUEL_MIN/BULLPEN_FIP_DIFF_MIN/
  SP_FIP_DUEL_MIN/SP_XFIP_DUEL_MIN/RECENT_FORM_DUEL_MIN 6개 sync. WAR_DUEL_MIN/ELO_GAP_STRONG 기존 정상.
  Feature-Drift Cycle 패턴 정상 작동 (explore-idea wave-508 → review-code wave-509). 18 PASS.
next_recommended_chain: explore-idea (heavy)
next_recommended_reason: >
  Feature-Drift Cycle: review-code(wave-509) → explore-idea(wave-510).
  배지 후보: SP xFIP / SFR / 최근폼 — AI 예측 카드 직접 대결 배지 추가.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
