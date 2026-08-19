---
date: "2026-08-19"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "76bca625ca47feaab3af8490699a178ee5dc9b66"
---


subtype: cycle-retro
cycle_n: 2209
chain_selected: review-code (heavy)
outcome: success
retro.summary: analysis-data.ts 감사(클린) 중 인접 config/model.ts CURRENT_MODEL_FILTER 가 debate_version 등가매칭이라 CE fallback row(debate_version=null) 를 조용히 배제 발견 — DB 실측 verified 143/316건, 최신 verified_at 2026-07-01 고정(7주+ /accuracy 헤드라인 stale). scoring_rule 기준으로 정정(기존 shared 문서 스펙과 정합) → 실측 291/316 + 최신 2026-08-18 회복. 14개 사용처 단일 상수 fix 자동 전파. vitest 449/3909 green(+1). main 직접 commit+push(70613e68), CI green.
next_recommended_chain: operational-analysis or explore-idea

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
