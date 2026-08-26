---
date: "2026-08-26"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "9823a9c518fc08f47d1a3f1b9ef45138d07dbafa"
---


subtype: cycle-retro
cycle_n: 2634
chain_selected: review-code(heavy)
outcome: success

진단: open issue 0, approved plan 0/23. gap trigger 전부 미도달(fix-incident 19/20, op-analysis 8/25, info-arch 16/30, lotto 6/30). 직전8 distinct=6 — 2-chain lock 미충족. DESIGN.md 당일 갱신(polish-ui negative). cycle 2633 explore-idea(lite) 가 명시 추천한 신규 축(retro.ts/llm.ts, validator.ts 환각검증 gap family 완전 소진 이후) 채택.

llm.ts 직독 중 cycle 986 주석("529 단독 attempts 4 로 확장: 2.5s→5s→10s→20s = 총 37.5s window")과 실제 동작 불일치 발견. MAX_OVERLOADED_ATTEMPTS = OVERLOADED_BACKOFF_MS.length(4)이고 루프는 attempt < maxAttempts-1 일 때만 sleep 하므로 마지막 attempt(index 3)는 sleep 없이 즉시 실패 반환 — 배열 마지막 값 20000ms 가 죽은 코드, 실측 대기시간 2500+5000+10000=17500ms(17.5s) = 확장 전과 동일. 2026-05-19 5경기 fallback 재발 evidence 로 의도했던 "37.5s 로 확장" 효과가 실제로는 무력화된 상태(단순 주석 오기가 아니라 production resilience 실효성 문제).

수정: MAX_OVERLOADED_ATTEMPTS = OVERLOADED_BACKOFF_MS.length + 1(4→5)로 fencepost 정정. 테스트 전부 심볼 참조라 값 변경만으로 기존 회귀 없이 통과. agents-llm.test.ts 에 setTimeout spy 로 backoff 배열 [2500,5000,10000,20000] 전량 소비 + 합계 37500ms 직접 검증하는 회귀 가드 신규. 스코프: 동일 off-by-one 패턴이 일반 경로(MAX_ATTEMPTS)/llm-deepseek.ts/llm-ollama.ts 에도 존재하나 evidence-backed 수치 주장 없어 이번 스코프 제외.

pnpm --filter kbo-data exec tsc --noEmit clean + vitest 91 files/1199 tests(+1) green + lint clean. version 158→159(scripts/bump-version.sh). 단일 논리 단위 → 직접 main commit(e42a9296)+push(R4/R7). TODOS.md 엔트리(dc36ad06).

skill-evolution trigger 5개 전부 미충족 — 진행 정상.
