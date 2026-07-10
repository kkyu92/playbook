---
date: "2026-07-08"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "fb116daf468ed96735880177aa00d1671a2d62bf"
---


subtype: cycle-retro
cycle_n: 1521
chain_selected: review-code (heavy)
outcome: success
commit_hash: 065d4c97
pr_number: 2602

retro.summary: >
  FactorAccuracyTable.tsx BASELINE_ACCURACY=0.609 stale 하드코딩 (wave 142) 발견·수정.
  cycle 1516 accuracy 섹션 추가 후 첫 review-code heavy 점검에서 발견.
  n=178 cycle 1447 snapshot → overallAcc prop 동적 연산으로 교체.
  WAR/park_factor 사용처 전수 확인 정상.
  1622/1622 tests PASS. PR #2602 squash 머지.

key_findings:
  - wave-142: FactorAccuracyTable BASELINE_ACCURACY hardcoded 0.609 → overallAcc prop dynamic
  - WAR fetchTeamStats leaders 집계 정상 (1519 fix 검증)
  - DEFAULT_PARK_FACTORS[game.stadium] 정상 (1519 fix 검증)
  - DB_CONSTRAINTS 단일소스 정상

next_recommended_chain: fix-incident (lite)
next_recommended_reason: 1520 retro recommendation + CREDIT_EXHAUSTED 5th recurrence 상태 파악

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
