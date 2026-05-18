---
date: "2026-05-18"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "265c11175109f0e0f0395a3f7f1dd1ad202372d4"
---


subtype: cycle-retro
cycle_n: 555
chain_selected: review-code (heavy)
outcome: success
pr: #768 (squash merged 9202379d)

retro.summary:
LLM dispatcher 3 파일 (llm.ts / llm-ollama.ts / llm-deepseek.ts) 의 stale "팀/회고 에이전트"
표현 정정. Haiku 실제 사용 3종 (team-agent / calibration-agent / postview team-postview-agent)
+ Sonnet 양쪽 심판 (pre-game judge + postview factor-attribution) 명시.

cycle 550 calibration-agent.ts "retro/calibration 정체성 분리" + cycle 553 judge-agent.ts
JSDoc Sunday cap 박제 의 LLM dispatcher 계층 후속 silent drift family fix.

silent drift family streak 79 cycle phase 7축 LLM dispatcher layer 첫 fix → 누적 18건
(agent layer 11 + UI 5 + Footer 1 + LLM dispatcher 1).

619 tests PASS. dominance-positive streak 인정 (cycle 135 룰) — 큰 파일 monolith 신규
영역 heavy 명확 trigger 검출. JSDoc 주석만 변경 = 코드 거동 변경 X 안전.

next_recommended_chain: polish-ui (lite) 또는 review-code (heavy)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
