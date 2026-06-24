---
date: "2026-06-24"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "47837ba51be09e13ba6d408a6d88c2ee43772d14"
---


subtype: cycle-retro
cycle_n: 1377
chain_selected: review-code (heavy)
outcome: success
pr_number: 2164
commit_hash: 7f6811f2

summary:
review-code (heavy) wave 148 success — 일반 LLM retry exponential backoff
[500, 1000, 2000] 2 LLM backend module 동일 array 중복 박제 (llm.ts +
llm-deepseek.ts) → LLM_RETRY_BACKOFF_MS 단일 shared registry 통합.

scope:
- packages/shared/src/index.ts: LLM_RETRY_BACKOFF_MS = [500, 1000, 2000] as const 신규 박제 (12줄 도큐먼트)
- packages/kbo-data/src/agents/llm.ts: import + RETRY_BACKOFF_MS local 제거 + MAX_ATTEMPTS = .length 도출 유지
- packages/kbo-data/src/agents/llm-deepseek.ts: import + RETRY_BACKOFF_MS local 제거 + 동일 패턴 정합

local 유지:
- OVERLOADED_BACKOFF_MS = [2500, 5000, 10000, 20000] llm.ts 안 local 유지
  (Anthropic 529 capacity 한계 전용, DeepSeek share X)

wave 147 (SCRAPER_RATE_LIMIT_DEFAULT_MS / FANGRAPHS_KBO_MS) 와 별도 카테고리
— LLM API retry vs 일반 scraper rate-limit. 같은 silent drift pattern
(literal array vs constant name 의미 박제).

smoke:
- shared: 148/148 tests pass
- kbo-data: 1055/1055 tests pass
- backoffMs(0,503)=500 / (1,503)=1000 / (2,503)=2000 정합 유지

silent drift family streak ~893 cycle 유지 (cycle 458 → cycle 1377).
dominance-positive 인정 (cycle 135 룰) — review-code (heavy) silent drift
detection channel 정상 작동. emergency stop streak = 2 (10 미달).

next_recommended_chain:
operational-analysis (lite) v1.8 cohort 측정 갱신 (gap=3 from cycle 1375,
25-cycle threshold 미달이지만 v2.0 n=150 잔여 ~27건 monitor) OR review-code
(heavy) wave 149 자연 발견 시 OR fix-incident hub-dispatch (gap=9, under 20)
OR info-arch (gap=5, under 30).
