---
date: "2026-07-17"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "d57afd3c9930f80f3f444e13dd058038a27962d5"
---


subtype: cycle-retro
cycle_n: 1763
chain_selected: review-code
chain_mode: heavy
outcome: SUCCESS
wave: wave-413-jsdoc-sync
pr: 2721 (merged 5cf508b0)

retro.summary: >
  Feature-Drift Cycle 패턴 — explore-idea(heavy) wave-413 직후 review-code(heavy) 자연 alternation.
  wave-413 이 SP_FIP_STRONG/WEAK 를 xFIP 배지 임계로 재사용했지만 JSDoc callsite 동기 누락.
  WAR_STRONG 도 factor-explanations.ts callsite 미등록. 4 silent drift items 일괄 수정.
  tests 2523/2523 PASS. PR #2721 R7 자동 머지.

next_recommended_chain: explore-idea

lesson: >
  신규 wave 에서 기존 상수 재사용(xFIP → SP_FIP_STRONG/WEAK) 시 JSDoc callsite 목록 ship 당시 동시 갱신 룰.
  Feature-Drift Cycle = explore-idea(heavy) → review-code(heavy) 자연 alternation 패턴 재확인.
