---
date: "2026-08-18"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "3fc8186069a6be0ff3e92af20517474eaa7f414d"
---


subtype: cycle-retro
cycle_n: 2169
chain_selected: explore-idea (heavy, scoped)
outcome: success
commit_hash: b353a7a61e3bf98cbd84d51a7e54920083501cec

RivalryMemorySurface(agent_memories 기반) KBO→MLB parity 완성. 3개 설계 gap
(is_correct 항상 NULL / factors JSON 컬럼 부재 / verify 모드 없음) 을 신규
computeMlbFactorContributions + generateMlbAgentMemories 경로로 해소. 순수
리팩터로 기존 computeMlbProbability 회귀 안전 확인. CI green 실측 확인
(headSha=b353a7a6, CI/heartbeat-stale 모두 success) — PR 미경유 직접 main push.

이전 세션이 구현+커밋+push 완료 후 retro/signal 단계 전 중단(active-cycle
PID dead 로 발견) — 본 세션이 retroactive 회고 박제 (사례 15 mitigation).

next_recommended_chain: review-code 또는 polish-ui (free judgment)
