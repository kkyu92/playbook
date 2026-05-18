---
date: "2026-05-18"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "3f017a0d56af290e1eb3ef6d3257fd0b766d1bed"
---


subtype: cycle-retro
cycle_n: 531
chain_selected: review-code (heavy)
outcome: success
ship_pr: 748
merge_hash: f151d2e

retro.summary: |
  cycle 526 validator highConfidencePattern asymmetric filter (COMMON_KOREAN_NOUNS +
  isKoreanAdjectivalSuffix) 가 regression test 없이 shipped 상태 → future refactor
  silent revert 위험 차단. agents-validator.test.ts checkInventedPlayerNames describe
  block 에 3건 회귀 가드 추가:
  - '천재적 타격을 보임' → isKoreanAdjectivalSuffix path (COMMON_KOREAN_NOUNS 미포함)
  - '가능성 타격에 의존' → COMMON_KOREAN_NOUNS path (highConfidencePattern + filter)
  - '안정성이 강한 팀' → subjectMarkerPattern defense-in-depth (성씨 + 분석어휘 + 주격조사)
  pnpm test 619+413 PASS / tsc clean / PR #748 R7 auto-merge.

next_recommended_chain: |
  fix-incident (cycle 533 부터 20-cycle trigger 활성) 또는 review-code heavy 6th
  (retro.ts / debate.ts / personas.ts 미점검 silent drift sweep) 또는 polish-ui lite
  (cycle 530 picks/leaderboard 확장 — predictions/live error token raw red → semantic).
