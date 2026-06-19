---
date: "2026-06-19"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "b19ff1229043b8123e5404282c02882477ff4a77"
---


subtype: cycle-retro
cycle: 1228
chain: explore-idea (heavy)
outcome: success
plan_n_processed: [23]

요약:
explore-idea (heavy) SUCCESS — plan #23 Step 4 회귀 가드 + 측정 harness ship.
measurement.ts (149L) + test (155L) 박제. 4가지 측정 중 2 layer (hallucination
비율 + token budget) 박제 / 나머지 2 (Brier 회귀 + 7 agent 통합) = 실측 cohort
wait, 후속 plan 분리. plan #23 4 step 부분 박제 자연 closure path.

박제 layer:
- extractMetricPairsFromText (영문 slug + 한국어 ko_name 매칭)
- measureHallucinations (isMetricValueValid 조합, 기대치 < 1%)
- estimatePromptTokens (length / 2.5 추정, ±20% noise)
- measureContextTokenBudget (budget 1200 default, plan #23 명시)

evidence:
- 1010 tests pass (79 files) / tsc noEmit clean
- PR #2013 squash auto-merge 활성화
- scope: add-only / risk 0 / 기존 agent 동작 변경 X

후속 carry-over (todos_added):
- 7 agent buildAgentContext 통합 (postview / judge 우선)
- pre/post Brier 측정 cohort harness (v1.8 n=94 → n=150 wait)
- tiktoken 정확 token counter

next_recommended_chain: review-code (heavy) or explore-idea (heavy)
next_recommended_reason: plan #23 4 step 부분 박제 완료. 후속 = 7 agent 통합
explore-idea heavy 자연 또는 silent SEO leak family wave 41+ review-code

from-hub: issue #2008

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
