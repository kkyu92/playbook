---
date: "2026-05-14"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "079a784f8d9b3837b18f33f75082d691919373f1"
---


subtype: cycle-retro
cycle_n: 386
chain_selected: fix-incident heavy
outcome: success
pr: #415
commit: ac22f54

retro.summary: cycle 386 op-analysis lite 진단 → 5/14 5건 reasoning.debate
깊이 query 결과 agentsFailed/agentError 키 부재 발견 (cycle 384 postview path
만 fix 됨 evidence). chain 자연 전환 fix-incident heavy. final-reasoning.ts
DebatePayload 인터페이스 옵션 필드 추가 + daily.ts spread 갱신 + 3 회귀
테스트. 변경 +53 / -0 (3 파일). 1039 tests pass. dominance-positive streak
7 연속 success (368/371/374/375/379/385/386) — silent drift family detection
channel 작동 검증.

evidence:
- 5/14 pre_game 5건 reasoning.debate.verdict.reasoning = "에이전트 토론 불가. 정량 모델 v1.8 결과 사용."
- totalTokens=0 / confidence=0.3 clamp default (ANTHROPIC credit 미회복)
- 5/14 mv='v1.8' 강등 라벨 박제 작동 (cycle 384 PR #413 fix evidence)
- 5/13 mv='v2.0-debate' silent 잔존 (PR #413 머지 이전 fire)
- reasoning.debate 객체 agentsFailed/agentError 키 부재 (전체 시점)

next_recommended_chain: operational-analysis lite
next_recommended_reason: ANTHROPIC credit 회복 모니터링 + n=99→100+ verify 누적 + v1.8 가중치 효과 측정 무효 박제. 사용자 후속 검증 영역.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
