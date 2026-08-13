---
date: "2026-08-13"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "0b761fe52585d04f2ca4dafd0e157d342d4b0325"
---


subtype: cycle-retro
cycle_n: 2074
chain_selected: operational-analysis (heavy)
outcome: success
pr: 2928

retro.summary: 직전 3 cycle(2071/2072/2073) 모두 operational-analysis 추천 +
open issue/CI 모두 clean -> 신선 데이터 측정 착수. op-analysis-brier-drift.ts
재실행 중 CE fallback 판별(confidence===0.3 하드코딩)이 daily.ts 실제 fallback
경로(quant confidence 그대로 흘려보냄, 0.3 고정 아님)와 불일치해 fallback을
대량 undercounting 하고 있음을 발견 — post 구간 보고치 39.1% vs 실측
(debate_version IS NULL 기준) 99.3%. 월별 CE율 5월 53.7%→6월 86.4%→7월 99.0%→
8월 100.0%(n=294) — CLAUDE.md의 "debate 100% fallback" 서술이 맞았고 CE
상황은 개선된 적 없이 지속/악화. scripts/op-analysis-brier-drift.ts를
op-analysis-ce-cohort.ts(cycle 1550 P4 패턴)와 동일 isCE() 기준으로 통일,
CLAUDE.md 예측 엔진 가중치 섹션 정정 라인 추가. Brier 수치 자체(pre 0.2434/
post 0.2514, CI overlap)는 불변 — 모델은 안정, 측정 도구만 틀렸었음.

next_recommended_chain: fix-incident (lite) 또는 review-code
next_recommended_reason: TODOS 최상단 2건(Cloudflare secret, lotto cron 실측)
여전히 시간/사용자 영역 대기. CREDIT_EXHAUSTED 근본 해결은 사용자 Anthropic
크레딧 충전 필요(자율 영역 X, carry-over 유지).

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
