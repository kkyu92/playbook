---
date: "2026-06-19"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "574e2cebef0ffe57f8a3fc3ae3c46ba83e33a698"
---


subtype: cycle-retro
cycle: 1230
chain: review-code (heavy)
outcome: success
pr: #2016
merge_commit: ea2803594439174116f03820053f04fba23ee04a

진단:
- plan #23 Step 4 measurement.ts shipped (cycle 1228, 4 함수 + 2 타입) — index.ts barrel export 누락 발견
- scripts/llm-context-baseline.ts 직접 path import 로 우회 작동 — 외부 consumer @moneyball/kbo-data barrel 통한 access 부재
- agents/ 안 buildAgentContext 호출 0건 (Step 5 carry-over 명시, v1.8 cohort n=150 ETA wait)

chain 선택:
- review-code (heavy) — silent drift family wave 41 후보 detection channel
- LLM prompt 변경 회피 (v1.8 cohort 안전 유지)
- 2-chain lock 미발동 (distinct=4 in last 8)

실행:
- packages/kbo-data/src/index.ts — measurement export 블록 추가 (4 함수: extractMetricPairsFromText / measureHallucinations / estimatePromptTokens / measureContextTokenBudget + 2 타입: HallucinationStats / TokenBudgetStats)
- pnpm -F @moneyball/kbo-data test → 79 files / 1010 tests pass
- PR #2016 squash merged

회고:
- silent drift family wave 41 detection — 인프라 ship + barrel 미동기 패턴 catch
- 12 line add / risk 0 (add-only, 기존 API surface 변경 X)
- 후속 7 agent 통합 path 정상화 — barrel 통한 정식 import 가능

skill_evolution_trigger: 미충족 (T1 sticky / T2 success streak / T3 1230%50=30 / T4 absent / T5 review-code 11 in N-19..N inclusive)
ship_0_emergency_stop: 미충족 (직전 10 outcome success 7건)

next_recommended_chain: explore-idea (heavy) or review-code (heavy)
