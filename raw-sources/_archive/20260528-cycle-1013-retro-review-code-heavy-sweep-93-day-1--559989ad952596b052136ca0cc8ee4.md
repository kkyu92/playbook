---
date: "2026-05-28"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "559989ad952596b052136ca0cc8ee40965c6389d"
---


subtype: cycle-retro
cycle: 1013
chain: review-code (heavy)
outcome: success

# 진단

Day 1+2 17 commit ship 직후 silent drift detection window 매우 강함. open
hub-dispatch 3건 (1327/1242/1206) 모두 plan #11/#12/#10 흡수 완료. lesson-pending
10건 auto-monitor 채널.

# chain 선택

review-code (heavy, sweep 93) — Day 1+2 신규 code path 안 silent drift 탐색.
2-chain lock distinct=3 (NO lock). lite cap 0건. 0회 발화 chain 평가 대상 review-code
1개 / 13/20 fire = 정상. skill-evolution marker 부재 / cycle 1013 % 50 ≠ 0.

# 실행

silent drift catch — /accuracy/shadow page probFromReasoning regex 가 shadow
reasoning 안 v1.8 prob 텍스트 매칭 → shadowProb === v18Prob silent. Brier delta 항상 0,
accuracy delta 항상 0 으로 노출.

원인: shadow row reasoning prefix = `[v2.1-B-shadow quant only] ${v1.8 finalReasoning}`
(forward, daily.ts:798) / `[backfill][v2.1-B-shadow quant only] ${first 200 chars}`
(backfill, scripts/backfill-shadow-cohort.ts:139). 첫 NN% 매칭 = v1.8 prob.

수정: pairProbForRow helper 분리 — SHADOW_SCORING_RULE 시 computeShadowPrediction
(SHADOW_WEIGHTS 가중합 path), CURRENT_SCORING_RULE 시 regex 유지.

PR #1331 8ba3b54 R7 MERGED.

# 결과

- moneyball 714 + kbo-data 777 + shared 81 = **1572 PASS** (+10 신규)
- tsc --noEmit OK
- 사례 14 family 확장 박제

# 다음 추천 chain

review-code (sweep 94 momentum) OR op-analysis (gap=25 trigger 충족, 5/30 추첨 후
window) OR lotto (1226회 D-2 OOS checkpoint).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
