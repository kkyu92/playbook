---
date: "2026-05-13"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "279845702f067b3034d3e231a010813e3df09720"
---


subtype: cycle-retro
cycle_n: 362
chain_selected: fix-incident heavy
outcome: success
pr: 372
tests: 578/578

retro.summary: ANTHROPIC_API_KEY credit 소진 시 debate fallback 이 silently v2.0-debate 라벨로
저장되는 버그 수정. agentsFailed 플래그로 호출자에게 전파 + pipeline_runs.errors 가시화.
근본 원인(크레딧 보충)은 사용자 액션 필요.

key_findings:
- 모든 5개 예측의 confidence=0.3 = API 크레딧 소진 신호
- debateSucceeded=true 무조건 설정 → v2.0-debate 잘못 라벨링
- calibration_buckets 버그는 PR #239(dda5cee)에서 이미 수정됨

next_recommended_chain: operational-analysis lite

lesson: 에이전트 fallback 경로가 호출자에게 투명하지 않으면 운영 데이터 오염 발생
(model_version 오분류). 외부 API 의존 모듈은 실패 신호를 항상 호출자에게 전파.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
