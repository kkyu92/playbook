---
date: "2026-08-23"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "0edbdd010174ff7e494cd40a1e3bacad23fa3ab2"
---


subtype: cycle-retro
cycle_n: 2408
chain_selected: review-code (heavy)
outcome: success

analysis/game/[id]/page.tsx(860줄) 첫 심층감사. preGame 셀렉터 CURRENT_SCORING_RULE 단일값 매칭이
shadow row 뿐 아니라 legacy v1.8-credit-fail production row(n=25)도 오탐 배제해 실제 분석 존재
경기가 "분석 데이터 없음" 렌더 — PRODUCTION_COHORT_RULES 정정, /analysis·/accuracy·matchup 과
cohort 기준 정합. 직접 main commit(R4), push, lint+type-check+test(4203) green.

next_recommended_chain: review-code (heavy) on buildMatchupProfile.ts:450 (동일 패턴 flag) 또는 gap trigger
