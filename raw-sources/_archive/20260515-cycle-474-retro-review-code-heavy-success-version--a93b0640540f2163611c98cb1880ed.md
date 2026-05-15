---
date: "2026-05-15"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "a93b0640540f2163611c98cb1880edcb467d921f"
---


subtype: cycle-retro
cycle_n: 474
chain_selected: review-code (heavy)
outcome: success
pr_number: 501
commit_hash: 796fe25

summary:
- buildAccuracyData VERSION_ORDER + VERSION_META CURRENT_SCORING_RULE invariant
  test 추가. 401 tests PASS (1 new).
- silent drift family streak 19 cycle 째 (cycle 454~473 + 474)
- 사후 grep 의존 (cycle 471 spec scope A·B·C·D·E) → 사전 CI 자동 차단 변환의
  첫 단발 evidence. v2.0 bump 시 VERSION_ORDER+META 갱신 누락 = CI fail.
- 실패 메시지에 buildAccuracyData.ts VERSION_ORDER 추가 hint 박제.

next_recommended_chain: review-code (heavy)
next_recommended_reason: silent drift family streak 19 cycle (cycle 135
dominance-positive 룰). 본 cycle = 사전 자동 차단 첫 evidence — 같은 방향
잔여 후보 다수 (model-version-labels.ts ScoringRule 타입 + VERSION_ORDER
union check, daily.ts monolith partial extract, cycle 471 spec scope D
Tailwind color CI grep).
