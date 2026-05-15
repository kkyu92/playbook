---
date: "2026-05-15"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "a19e69f01310ea5bc97cb47d5dd0b8b7e6d41877"
---


subtype: cycle-retro
cycle_n: 473
chain_selected: review-code (heavy)
outcome: success
pr_number: 500
commit_hash: 248a709

summary:
- ModelVersionHistory.tsx:28 'v1.8' isActive 하드코딩 → CURRENT_SCORING_RULE
  (@moneyball/shared) 도출
- silent drift family streak 18 cycle 째 (cycle 454~470 17 + 473)
- v1.9/v2.0 bump 시 model-version-labels.ts 1 줄 변경 = 자동 전파
- VERSION_ORDER/VERSION_META historical entry 분리 의도 유지 (drift X)
- type-check PASS / 400 tests PASS / PR #500 R7 자동 머지

next_recommended_chain: review-code (heavy)
next_recommended_reason: silent drift family streak 18 cycle (cycle 135
dominance-positive 룰). 2-chain lock 발동 X (distinct=3). daily.ts 1261 줄
monolith / cycle 471 spec scope A·D 사전 lint rule / buildAccuracyData
VERSION_ORDER·META + CURRENT_SCORING_RULE 동기 강제 함수 = heavy 후보.
