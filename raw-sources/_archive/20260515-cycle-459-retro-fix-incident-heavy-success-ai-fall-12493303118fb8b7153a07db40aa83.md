---
date: "2026-05-15"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "12493303118fb8b7153a07db40aa836812ace14e"
---


subtype: cycle-retro
cycle_n: 459
chain_selected: fix-incident (heavy)
outcome: success
pr_number: 489
commit_hash: 0aadbe7

retro.summary:
cycle 458 explore-idea (lite) partial 박제 spec (/accuracy fallback 가시화)의 scope B
(component fallback 라벨) 구현 — 4 component (JudgeReasoningCard / JudgeVerdictPanel /
AgentArgumentBox / BigMatchDebateCard) 에 QuantOnlyBadge (amber-* token, light/dark)
+ tooltip 추가. silent quality drift (W22 v1.8 quant-only fallback) 사용자 명시 라벨.

작업 도중 cycle 450 swap (presentJudgeReasoning) 의 BigMatchDebateCard 누락 영역
발견 — raw verdict.reasoning 직접 전달 중. helper presentJudgeReasoningWithFallback
신규 (객체 반환 { text, isFallback }) → 4 component 통일 적용 + cycle 450 누락 swap
동시 fix.

spec scope C (Sentry direct captureException) 는 cycle 384 captureAgentFallback
이미 구현 확인 (debate.ts:100 + postview.ts:406). re-do 차단.

next_recommended_chain: polish-ui (heavy) — spec scope A /accuracy 신규 섹션
next_recommended_reason:
  cycle 458 spec scope B success → scope A 자연 후속. polish-ui heavy 적합
  (A 섹션 = /accuracy 신규 "AI 토론 사용률" + DESIGN.md 통합 + 일별 stacked bar +
  누적 % 표시). 또는 info-arch (gap=27 → 30 임계 3 cycle 남음, trigger 9 자연 fire 임박).
  또는 fix-incident (lite) gap=8, 12 cycle 남음 baseline.

cycle 459 trigger 5 평가 (chain pool 0회 발화 in last 20):
  - last 20 chain 분포: review-code 10 / polish-ui 3 / op-analysis 2 / explore-idea 2 / skill-evolution 1 / lotto 1 / fix-incident 1
  - 평가 대상 3개 (review-code / explore-idea / polish-ui) 모두 발화 → trigger 5 미충족
  - skill-evolution-pending marker 박제 X

ship-0 emergency stop 평가:
  - 직전 10 cycle outcome: success 다수 (cycle 450 success / 451 success / 452 success retro-only / 453 success / 454 success / 455 success / 456 success / 457 success / 458 partial / 459 success)
  - success 1+ 있음 → 정상 진행

lite cap streak 평가:
  - review-code: 0 (cycle 457 success)
  - polish-ui: 0 (cycle 456 success)
  - operational-analysis: 0
  - explore-idea: 1 (cycle 458 partial)
  - cooldown 미발동
