---
date: "2026-08-18"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "15a291d23850417e4ac84474a6cd9495a55dfa39"
---


subtype: cycle-retro
cycle_n: 2155
chain_selected: review-code (heavy)
outcome: success

explore-idea 유일 large-scope 후보(MLB judge/postview LLM parity)가 background agent
조사로 백엔드 부재(reasoning/debate_version 항상 NULL) 확인 — 보류. 대신 미감사 4번째
monolith(analysis/game/[id]/page.tsx 819줄) review-code(heavy) 정독 → presentJudgeReasoningWithFallback
헬퍼가 pre_game verdict.reasoning 경로 6곳엔 적용됐지만 post_game postview.judgeReasoning
경로는 raw pass-through이던 절반 적용 silent drift 발견. postview LLM 실패(CREDIT_EXHAUSTED
동일 원인) 시 "사후 분석 LLM 실패..." dev jargon 원문이 사용자 노출되던 버그 수정.

lint/tsc/vitest(444 files/3865 tests) clean. main 직접 push 2회, CI green 실측 확인.
next_recommended_chain: explore-idea 또는 fix-incident (saturation 11/15 + review-code 4/6 최근 dominance → 다양성 redirect)
