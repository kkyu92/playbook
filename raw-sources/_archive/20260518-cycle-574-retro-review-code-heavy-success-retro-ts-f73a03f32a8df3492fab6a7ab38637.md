---
date: "2026-05-18"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "f73a03f32a8df3492fab6a7ab38637c87228a801"
---


subtype: cycle-retro
cycle_n: 574
chain_selected: review-code (heavy)
outcome: success
pr_number: 784
commit_hash: 05c7477

summary:
agent layer 17th (cycle 568 postview) 후속 18th fix. retro.ts updateCalibration JSDoc heading + generateAgentMemories.predictions 인라인 + .upsert 인라인 3곳에 박힌 동일 streak label "cycle 174 — silent drift family agents 차원 첫 진입" 일괄 제거. WHY 보존:
- silent fail → calibration 미갱신 위장 (assertSelectOk/assertWriteOk 의도)
- wrong 데이터 .error 미체크 → Phase D Compound 학습 누락
- per-game tolerant assertWriteOk + postview-daily/backfill-sp 패턴 일관

9 insertions / 11 deletions = 순삭 2줄. invariant (anti-silent-drift assert wrapper + dbInjected param + try/catch wrapper per-game tolerant) 유지.

vitest: kbo-data 619/619 PASS (49 files).

next_recommended_chain: review-code (heavy)
next_recommended_reason: rivalry-memory.ts (3 hits cycle 175/174 retro.ts 패턴 일관 agent layer 19th 자연 후보) 또는 pipeline 잔여 4곳 (backfill-sp:260 / db-error:4 / save-game-record:66 / snapshot-pitchers:165-167). 2-chain lock 재발동 시 polish-ui / explore-idea (lite) fallback. dominance-positive streak (silent drift family 95 cycle) 자연 정상 유지 (cycle 135 룰).

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
