---
date: "2026-05-14"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "d9e1a03953407f5bbfd3e34e1922a0e3dfa769e9"
---


subtype: cycle-retro
cycle_n: 384
chain_selected: fix-incident heavy
outcome: success
pr_number: 413
commit_hash: 2e2e455

retro.summary: PR #372 (cycle 362) debate 차원 silent drift fix 의 postview path 확장. PostviewResult agentsFailed/agentError 필드 + decidePostviewModelVersion v1.8-postview 강등 + captureAgentFallback Sentry helper (Cloudflare Workers cron alert 보장) + /accuracy 최근 7일 LLM 활성률 transparency 카드. 15개 회귀 테스트.

next_recommended_chain: operational-analysis lite
next_recommended_reason: credit 충전 후 첫 fire 시점 mv='v2.0-postview' 박제 + /accuracy transparency 카드 사라짐 확인. n=99→100+ 누적 가속 재시작 가능 여부 측정.

박제 포인트:
- silent drift family detection channel — PR #372 (debate) → cycle 384 (postview) 패턴 확장
- model_version 강등 helper (decideModelVersion / decidePostviewModelVersion) 2개 pair 로 분리 — 단일 라벨 silent 차단
- Sentry captureException 직접 호출 (Cloudflare Workers cron 환경 console.error 누락 보완)
- 사용자 가시 transparency 카드 (정량 fallback 운영 중 알림) — 데이터로만 이야기 원칙 (모든 주장 측정 숫자 baseline)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
