---
date: "2026-05-06"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "f23378e10cf881c104cb63ffd634a513d56f3bed"
---


subtype: cycle-retro
cycle_n: 179
chain_selected: review-code (heavy) on packages/kbo-data/src/agents/validator.ts
outcome: success
pr: #167 (merged)

silent drift 3건 (validator.ts:391-406 vs team-agent.ts:28-63):
- SP WAR: validator spLine WAR ${p.war} 포함 — team-agent SP 표기 부재 (LLM 미노출 → 환각 통과 갭, false negative 보안 갭)
- gameTime: team-agent 시간: ${gameTime} 포함 — validator 부재 (시간 숫자 false positive)
- recentForm: team-agent Math.round(form*100)% — validator raw decimal (round-off 불일치 시 false positive)

수정 + 회귀 가드 3건. 테스트 520→523 PASS / type-check PASS / PR #167 머지.

cycle 124 dominance-positive streak 룰 작동 evidence: cycle 174~179 agents 차원 6 cycle SUCCESS streak ship 6 누적 (retro / rivalry / debate / postview / validator), cycle 49 룰 PASS_ship 누적 52.

agents 차원 잔존 review target = validator-logger.ts (54 lines, 1 supabase op). next_rec = review-code (heavy) validator-logger 또는 다양성 redirect (op-analysis lite, cycle 166 = 13 cycle 전 cooldown 만료).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
