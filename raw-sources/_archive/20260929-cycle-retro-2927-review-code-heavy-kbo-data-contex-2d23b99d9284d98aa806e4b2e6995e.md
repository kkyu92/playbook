---
date: "2026-09-29"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "2d23b99d9284d98aa806e4b2e6995e7e9e08afb5"
---


subtype: cycle-retro
cycle: 2927
chain_selected: review-code(heavy)
outcome: success

진단: 2-chain lock 미충족(직전8 distinct=4). open issue 0, unprocessed approved plan 0/23.
사용자 요청으로 본 세션 안 10 cycle 연속 진행(자동 체인 대신 수동, N=50 chain 직전 실패
evidence 기반 사용자 선택).

general-purpose subagent 독립 검증(context/ 4파일 1695줄, 배럴 외부 사용처까지 확인) —
dead export 11건(타입/인터페이스, 테스트 파일 포함 재확인 후 zero named import 확정):
MetricObservation/AgentGameMeta/HallucinationStats/TokenBudgetStats/BrierStats/
ContextLayerBrierDelta/SeasonPhase/TimeWindowKey/MetricUnit/MetricSource/MetricDirection.
export 키워드만 제거, index.ts 재export 라인도 제거. comment drift 3건 발견+정정
(agent-context.ts/domain.ts/metrics.ts 동일 근본원인) — "7 agent(...personas/debate...)
소비" 서술이 실측 결과 personas.ts/debate.ts 미소비, validator.ts/retro.ts/predictor.ts
실사용처 누락돼 있었음. PR #3107(56fa9af4) + VERSION sync PR #3108(a71d44c9).

tsc clean(kbo-data+moneyball), test 94/94파일 1224/1224 green.

다음 사이클 추천 = review-code(heavy) packages/kbo-data 잔여 스코프(factors/backtest/
scrapers/agents/pipeline) 계속.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
