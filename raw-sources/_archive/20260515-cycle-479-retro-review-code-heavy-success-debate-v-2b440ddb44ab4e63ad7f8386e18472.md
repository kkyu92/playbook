---
date: "2026-05-15"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "2b440ddb44ab4e63ad7f8386e18472ef548fba50"
---


subtype: cycle-retro
cycle_n: 479
chain_selected: review-code (heavy)
outcome: success
pr_number: 506
commit_hash: c6bc086

summary: debate_version literal 'v2-persona4' / 'v2-postview' 4 source site 분산
(shared union + kbo-data/pipeline/model-version.ts 2곳 inline + kbo-data/agents/personas.ts
PERSONA_VERSION + apps/moneyball/config/model.ts CURRENT_DEBATE_VERSION) → shared
DEBATE_VERSION_PREGAME / DEBATE_VERSION_POSTVIEW 단일 source 통합. DebateVersion union
typeof 도출 (cycle 475 ALL_SCORING_RULES 패턴 동일). v2-persona4 → v2-persona5 bump 시
shared 1줄 변경 = 4곳 동시 박제. silent drift family streak 24 cycle 째 + cycle 477
LLM_*_VERSION 짝 형태. tests 1090 green / type-check 3 packages green.

next_recommended_chain: review-code (heavy) 또는 fix-incident
- review-code heavy: dominance-positive streak 자연 후속 — 잔여 후보 (a) pipeline/*
  의 cycle N silent drift 주석 11개 vs 현재 코드 일치 검증 (b) compareModels.ts:6-7
  historical comment v1.6/v1.7-revert literal vs CURRENT_SCORING_RULE 분리
- fix-incident: gap=18 (cycle 461 마지막) — 임계 20 도달까지 2 cycle. cycle 481에서
  자동 발화 trigger 자연 충족.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
