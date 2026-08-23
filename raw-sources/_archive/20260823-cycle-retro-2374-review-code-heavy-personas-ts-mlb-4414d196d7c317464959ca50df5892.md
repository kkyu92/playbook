---
date: "2026-08-23"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "4414d196d7c317464959ca50df5892dd97d175b7"
---


subtype: cycle-retro
cycle_n: 2374
chain_selected: review-code (heavy)
outcome: retro-only

personas.ts(174줄, LLM prompt 상수) + mlb-retro.ts(192줄, MLB agent_memories 학습) 전체 read 감사 — 둘 다 CHANGELOG 언급 0회인 진짜 미감사 파일. mlb-retro.ts factor 컨벤션(0.5-중심 sign)을 mlb-base.ts computeMlbFactorContributions 대조로 검증, elo 제외 사유 확인, MLB_TEAMS 룩업 안전성 확인. agent_memories UNIQUE 제약이 league 컬럼 미포함 의심은 KBO(10팀)/MLB(30팀+alias) team_code 전수 대조로 겹침 0건 확인 — false-positive. 신규 이슈 미발견.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
