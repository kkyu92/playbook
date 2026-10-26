---
date: "2026-10-26"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "86d6a53c2e96b1103e2ae508444ba53f2a0b095e"
---


subtype: cycle-retro
cycle_n: 3643
chain_selected: review-code (heavy)
outcome: success

진단: 사용자 `/develop-cycle 22` 호출. open issue 0건, approved+unexpired plan 0/23. 2차 방어선(cycle 3642 retro `b5b3df6b`) OK. 직전8(3635-3642) distinct=2(review-code+fix-incident) — 2-chain lock 조건 충족이나 rule4 예외(잠긴 2개 중 fix-incident 포함 시 lock 무시) 적용. gap 비율 전부 구조적 trigger 미도달(fix-incident 7/20·op-analysis 10/25·info-arch 13/30·lotto 9/30). explore-idea saturation 13/15 충족하나 4-source negative(open issue 0/approved plan 0/TODOS Next-Up 섹션 부재) 확립 skip 패턴 유지. info-arch 는 cycle 3614 체크포인트와 4연속 동일 breadcrumb 목록(구조적 안정, 신규 정보 無) — op-analysis 는 KBO 시즌종료+CREDIT_EXHAUSTED 동결 지속 — lotto 는 직전 cycle(3634) cron 정상 재확인 완료 — 전부 저정보가치 재확인뿐이라 review-code(heavy) 가 cycle 3642 추천 신규 scope(components/{predictions,dashboard,analysis,accuracy}) 로 계속.

Agent 위임 61파일 전수 read(predictions 25+dashboard 17+analysis 15+accuracy 8, 전부 __tests__ 포함) + KBO/MLB twin 교차대조. 확정 버그 2건: (1) `FactorBreakdown.tsx` 가 `key in DEFAULT_WEIGHTS` 필터 사용 — park_weather/umpire_sz(production weight=0, predictor.ts 가 항상 0.5 로 기록)가 DEFAULT_WEIGHTS 의 실제 키라 필터링 안 돼 chart=false(기본) 뷰에서도 매번 12 row(10 아님) 렌더되는 silent drift. 동일 버그가 형제 컴포넌트 `DetailedFactorAnalysis.tsx` 에서 이미 ACTIVE_FACTOR_KEYS 필터로 수정+회귀테스트 박제돼 있었으나 FactorBreakdown.tsx 엔 전파 안 됨 — 동일 패턴 적용(`ACTIVE_FACTOR_KEYS.includes`) + `FactorBreakdown-shadow-factor.test.tsx` 신규 박제. (2) `GameAnalysisProse.tsx`(KBO) 가 homeWinProb===0.5 tie-break 시 strict `>` 로 원정팀 favored 처리 — MLB twin `MlbGameOverview.tsx` + 코드베이스 전역 관례(judge-agent.ts/predictor.ts/deriveMlbOutcome.ts 등 전부 `>=`)와 불일치 — `>=` 로 정합.

검증: `tsc --noEmit` clean, `eslint` clean, 전체 `vitest run` 4824/4824 PASS. 직접 main 커밋(`08108efa`)+push, pre-push hook(lint+type-check+version-sync-guard) 전부 PASS.

**ship-0 서브체크**: PARTIAL_STREAK(3634-3643)=8/10(3635/3637/3643 success 3건) → 10 미충족, hard-stop 불발동. RC_HEAVY_COUNT(3634-3643)=8/10(≥8) 이나 CLEAN_DRIFT_COUNT 기준 미충족(본 cycle 포함 다수가 drift 발견/success, "drift 0건" 아님) → EXHAUSTIVE_SWEEP 미충족.

**검증(skill-evolution 등)**: trigger1(chain-evolution 10건 누적, 신규 없음)/trigger2(5연속 fail 없음)/trigger3(3643%50=43≠0)/trigger4(meta-pattern "SKILL 갱신 필요" 없음) 미충족. trigger5 — 직전20(3624-3643, 현재 포함) review-code/fix-incident/operational-analysis/info-arch/lotto 전부 발화(0회 없음) → 미충족. marker 박제 없음. 1차 방어선 — 본 commit 자체.

다음 사이클 추천 = info-architecture-review/operational-analysis/lotto 자연 대기(전부 구조적 저정보가치 재확인 상태) 또는 review-code(heavy) 계속(남은 component 디렉토리 신규 scope 확인 시) — 2-chain lock 재도달 방지 위해 다양성 우선 고려 권장.
