---
date: "2026-06-25"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "51a93d04ea2139a82adde33eb3289522f0fc7775"
---


subtype: cycle-retro
cycle_n: 1390
chain_selected: review-code (heavy)
outcome: success
pr: #2191
silent_drift_streak: 933+ cycle (cycle 458 → 1390)

진단:
  - open hub-dispatch 0건
  - unprocessed plans 0건 (plan 10~19 모두 completed/split/pending)
  - silent drift wave 158 후보 grep: const LIMIT = 30 2 prod files
  - fix-incident trigger 7 (20+ cycle 미발화) 활성 — wave 158 ROI 우선
  - 2-chain alternation lock 미발동 (distinct=3 / 직전 8: review-code 6 / explore-idea 1 / lotto 1)
  - trigger 5 미충족 (review-code 15/20 발화)

실행:
  - INSIGHTS_LIMIT = 30 export → @moneyball/shared registry (JSDoc 적용 surface 명시)
  - insights/page.tsx: const LIMIT = INSIGHTS_LIMIT (import 추가)
  - v2-preview/page.tsx: const LIMIT = INSIGHTS_LIMIT (import 추가)
  - insights-routes.test.ts: regex check 갱신 (LIMIT INSIGHTS_LIMIT pattern)
  - smoke: vitest 36 passed + tsc --noEmit 통과

retro:
  - silent drift family streak 933+ cycle (cycle 458 → 1390) 누적
  - wave 158 종료 = INSIGHTS_LIMIT (LIMIT magic number 류 신규 sub-family)
  - 다음 cycle: 신규 silent drift target grep (timeout / locale / cache key 류) OR fix-incident trigger 7 lite 평가

next_recommended_chain: review-code 또는 polish-ui 자율
next_n: 29
