---
date: "2026-08-26"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "fdb0aa927d7478236745925d9360e00f40265df4"
---


subtype: cycle-retro
cycle_n: 2632
chain_selected: review-code(heavy)
outcome: success

진단: open issue 0, approved plan 0/23(전부 completed/archived/tier4). 2-chain lock 미충족(직전8 distinct=5: review-code계열4+polish-ui1+op-analysis1+lotto1+explore-idea1). gap trigger 전부 미도달(fix-incident 17/20, op-analysis 6/25, info-arch 14/30, lotto 4/30). polish-ui negative(DESIGN.md 당일 갱신) / info-architecture-review negative(breadcrumb 미커버 18건 전수 재확인 — community=noindex 플레이스홀더, reviews monthly·weekly 4종=redirect-only stub, debug/*=내부전용, 전부 의도된 제외). 직전3사이클(2629/2630/2631) 모두 diversity 추천했으나 재확인 negative 지속 → dominance-positive streak 룰(cycle 135) 따라 review-code(heavy) 계속.

validateJudgeReasoning 전체 호출부 3곳(judge-agent.ts/postview.ts/validator.ts 자체) grep 전수 확인 중 postview.ts:432 가 rivalryBlock 경로(cycle 2630/2631 fix)와 별개의 독립 gap 보유함을 발견. buildJudgePostviewMessage 가 judge 에게 actual.homeScore/awayScore(실제 스코어) / original.homeWinProb(pre_game 홈승률%) / factorLines(original.factors 편향값, 소수3자리) 를 직접 노출하지만 buildInjectionText 는 pre_game 컨텍스트 전용이라 이 세 값이 전혀 없음 — judge 가 정당 인용해도 checkHallucinatedNumbers 환각 오탐(테스트 미커버, 스코어는 단일 digit이라 NUMERIC_WHITELIST 로 우연 통과하지만 승률%·편향값 대부분 미통과 실측 확인).

수정: buildInjectionText(context, rivalryBlock='', extraContext='') 3번째 인자 추가, validateJudgeReasoning(..., rivalryBlock='', extraContext='') 5번째 인자로 연결(4번째 rivalryBlock 은 기존 fix 그대로 pre_game 전용 유지, postview 는 항상 빈 문자열 전달해 서로 간섭 없음). postview.ts 에 buildPostviewExtraInjection(actual, original) 신규 export — buildJudgePostviewMessage 와 동일 소스로 조립해 validateJudgeReasoning 호출부 5번째 인자로 전달. agents-validator.test.ts 회귀 가드 2건 신규.

pnpm --filter moneyball exec tsc --noEmit clean + @moneyball/kbo-data vitest 91 files/1198 tests(+2) green + pnpm lint clean. version 157→158 3-way sync(scripts/bump-version.sh). 단일 논리 단위 → 직접 main commit(286b78ea)+push(R4/R7). TODOS.md 엔트리(3098d3b1).

skill-evolution trigger 5개 전부 미충족 — 진행 정상.

next_recommended_chain: dimension-cycle 또는 explore-idea (polish-ui/info-architecture-review 3사이클 연속 negative)
next_recommended_reason: diversity 추천 두 chain 이 3사이클 연속 재확인 negative 로 소진 — 다른 방향 전환 검토 시점. review-code(heavy) 는 postview.ts 496줄 전체 정독 미완이라 남은 스코프도 존재.
