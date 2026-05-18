---
date: "2026-05-15"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "877962c2af88e269394fd95acb2554576757dc2a"
---


subtype: needs
priority: P1
cycle_n: 461

context:
- 2026-05-15 daily-pipeline 부분 성공 alert = ANTHROPIC_API_KEY credit 잔액 부족 (raw API 응답: "Your credit balance is too low to access the Anthropic API. Please go to Plans & Billing to upgrade or purchase credits.")
- 코드 측면 fix-incident 완료 (cycle 461 PR #491) — alert leak 차단 + classifier 6 분류. 그러나 잔액 자체 = 사용자 액션 필요 (외부 결제 자율 금지 cost-guard)
- 영향: AI 토론 (Haiku 팀/회고 + Sonnet 심판) 호출 실패 → quant-only fallback. 사용자 가시 UI = "정량 모델 v1.5 결과 사용" 라벨 (cycle 458-460 박제). 데이터 손실 X / Brier 측정은 quant-only 라인 가시화
- 충전 후 자연 회복: 다음 cron (18:00 KST live-update 또는 내일 09:00 KST announce) 부터

action:
- console.anthropic.com → Plans & Billing → 크레딧 충전 (or plan 업그레이드)
- 충전 후 다음 daily-pipeline alert 모니터 — "Debate agents fallback" errors.push 비어있으면 회복 확인
- alternatives (선택): LLM_BACKEND=deepseek (전역) 또는 LLM_BACKEND_HAIKU=deepseek + LLM_BACKEND_SONNET=claude (Hybrid, cycle 461 llm.ts:30-37 박제) — DeepSeek API key 보유 시

related:
- cycle 458-460 박제 quant-only fallback UI 라벨 family (4 component 배지 / /accuracy 30일 stacked bar)
- cycle 461 PR #491 (alert leak 차단)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
