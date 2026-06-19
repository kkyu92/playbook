---
date: "2026-06-19"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "5c220c1b058a89da7dbf95e651ca69d60f4f7053"
---


subtype: needs
cycle: 1247
discovered_via: fix-incident (lite) baseline check pipeline_runs 7d scan

evidence:
- 2026-06-19 07:17 UTC predict run: CREDIT_EXHAUSTED 5/5 games
- 7d 누적: 4 runs CREDIT_EXHAUSTED
- engineering fallback (debate_fallback_quant) 정상 작동, predictions 5건 모두 생성
- 잔존 시 LLM debate agent quality 미사용 (quant-only fallback 지속)

action_required (사용자 영역):
- Anthropic Console (https://console.anthropic.com/settings/billing) 잔액 충전
- 자동 결제 설정 검토 (auto-recharge)

reference:
- CLAUDE.md "외부 SaaS 자율 결제 시도" 금지 정책 — carry-over 박제 only
- cycle 819 PR #1179 silent-drift-alert.ts Sentry warning 채널은 predict_final silent silent drop family (window_too_late) 검출용. CREDIT_EXHAUSTED 는 별도 fallback path
