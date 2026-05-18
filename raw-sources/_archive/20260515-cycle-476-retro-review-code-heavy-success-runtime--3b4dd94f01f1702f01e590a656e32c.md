---
date: "2026-05-15"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "3b4dd94f01f1702f01e590a656e32c84cb2bfff0"
---


subtype: cycle-retro
cycle_n: 476
chain_selected: review-code (heavy)
outcome: success
pr_number: 503
commit_hash: a256184

summary:
- debate.ts:84 fallback reasoning DB row template literal
- personas.ts: HOME_ROLE+AWAY_ROLE LLM prompt 3곳 \${CURRENT_SCORING_RULE}
- judge-agent.ts: SYSTEM_PROMPT + buildUserMessage 2곳 \${CURRENT_SCORING_RULE}
- DetailedFactorAnalysis.tsx:64 사용자 UI JSX interpolation
- silent drift family streak 21 cycle 째 (cycle 454~475 + 476)
- judgeReasoning isFallbackReasoning prefix 매칭 유지 → 기존 테스트 무영향
- shared 80 / kbo-data 616 / moneyball 401 PASS / type-check 3 packages PASS

next_recommended_chain: review-code (heavy)
next_recommended_reason: silent drift family streak 21 cycle. predictor.ts /
compareModels.ts / page.tsx / final-reasoning.ts / postview-daily.ts 의 cycle
박제 주석 vs silent drift 차이 모호 — 잔여 cleanup heavy candidate carry-over.
