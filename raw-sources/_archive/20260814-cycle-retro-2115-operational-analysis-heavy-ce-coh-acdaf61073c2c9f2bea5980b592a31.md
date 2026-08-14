---
date: "2026-08-14"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "acdaf61073c2c9f2bea5980b592a3102a64a7336"
---


cycle_n: 2115
chain_selected: operational-analysis (heavy)
outcome: success
pr: #2948 (merged e946c04f) + 5acb81b0 (TODOS stale carry-over fix)

retro.summary: review-code MLB parity sweep 소진 확인 후 원래 픽(explore-idea,
TODOS line 38 locale 항목)이 cycle 2111에 이미 완료된 걸 커밋 read로 발견 —
재작업 대신 op-analysis heavy(CE/비CE cohort 565 cycle 만의 재측정)로 전환.
격차 5.0pp→10.7pp 확대는 LLM 부가가치 결론 반전이 아니라 CE 표본 증분 대부분이
저조한 7월 데이터인 temporal 효과. 비CE n=47 완전 동결(2026-07-01 이후 신규 0),
CREDIT_EXHAUSTED 4+개월 지속 — 사용자 크레딧 재충전 전까진 gap 원인 추가 분리
불가. 부수적으로 stale TODOS carry-over 발견+정정(사전 재작업 방지).

next_recommended_chain: review-code 또는 explore-idea

subtype: cycle-retro
cycle: 2115

Co-authored-by: Claude Sonnet 5 <noreply@anthropic.com>
