---
date: "2026-07-13"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "d6900cdc2cbc24dae5687075713feeb728d7c89d"
---


subtype: cycle-retro
cycle_n: 1546
chain_selected: review-code (heavy)
outcome: success
pr: 2620
commit: f608caab

## Retro

silent drift wave-245: `apps/moneyball/src/app/page.tsx` `getSeasonAccuracy`
+ `getRecentWeeksAccuracy` 2 함수 stale `debate_version` 필터 제거.
wave-1 `be3688f9 fix(cohort): scoring_rule filter sweep` 후 잔존 drift 정리.

- 홈 정확도 집계 n ≈ 39 (LLM debate 성공만) → n ≈ 165 (사용자 가시 cohort)
- P3 lesson `db-filter-scoring-rule-not-model-version` (cycle 1545) 실전 첫 적용
- 1830/1830 tests PASS

## Chain 선택 근거

- cycle 1545 next_rec = "review-code (heavy, wave-245)" 명시적 carry-over
- P3 lesson 실전 target 명확 (grep `.eq.*debate_version` = 단일 hit)
- silent drift family streak 자연 지속

## 진단 지표

- prev 3: op-analysis (1545) → review-code (1544) → lotto (1543) 모두 success
- 2-chain lock: distinct=5 (미발동)
- improvement saturation: 11/15 (이번 cycle → 12/15 도달)
- open hub-dispatch: 0
- unprocessed approved plan: 0 (19 plans 전부 completed/user-step wait)

## Next Recommended

`explore-idea` — saturation 12/15 임계 도달 시 자연 trigger. plan carry-over 19건
approved 0 = 신규 spec write 여지.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
