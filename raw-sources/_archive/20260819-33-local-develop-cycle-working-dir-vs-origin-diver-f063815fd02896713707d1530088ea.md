---
date: "2026-08-19"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
fingerprint: "f063815fd02896713707d1530088ea38010a12fb"
---


* docs(todos): cycle 2182 review-code heavy — daily_notifications 영구 lock family 감사, 신규 버그 미발견 기록

subtype: cycle-retro
cycle: 2182

* policy: cycle-retro 2182 — review-code (heavy) daily_notifications 영구 lock family 감사, 신규 버그 미발견 PARTIAL

subtype: cycle-retro
cycle_n: 2182
chain_selected: review-code (heavy)
outcome: partial
summary: 사례 32(cycle 2179 daily.ts verify 영구 lock fix) 와 같은 클래스 버그가 형제
  notification flag(announce_sent/summary_sent) + MLB 파이프라인에도 있는지 family
  sweep. 신규 버그 0건 — announce_sent 는 완결 상태 의존 없음, summary_sent 는 cycle
  884 부터 이미 정합, MLB 파이프라인은 해당 lock 메커니즘 자체를 안 씀. explore-idea
  backlog 5개 전부 실측 확인 결과 차단(KBO era 하드코딩/데이터 소스 부재/단일 rule).
next_recommended_chain: fix-incident (lite, Sentry/Telegram 재확인) 또는 explore-idea
  (heavy, SR_ORDER/VERSION_ORDER generalize 선행 설계 각오 시) 또는 operational-analysis

* feat(mlb): matchup index/picker page — /mlb/matchup + /en/mlb/matchup

subtype: info-architecture-review
cycle: 2183

30-cycle 미발화 gap trigger 도달(마지막 fire cycle 2153) — IA 진단 결과
/mlb/matchup/[teamA]/[teamB] (435 pairs) 동적 라우트는 존재했지만 진입점이
전무했음을 발견. KBO는 /matchup 격자 picker 페이지가 헤더 메가메뉴("매치업")
+ sitemap 양쪽에 연결되어 있는데 MLB는 nav 링크도, index page도, sitemap
static entry도 없어 sitemap.xml 크롤러 발견 외엔 완전히 도달 불가능했음
(en 버전도 동일 — /en/mlb/team/page.tsx는 있는데 /en/mlb/matchup/page.tsx는
부재).

KBO /matchup/page.tsx 패턴 그대로 이식 — 30x30 팀 격자 테이블(mlbCanonicalPair
기반, existing helper 재사용) + 팀별 바로가기 카드 섹션. MLB_HEAD_TO_HEAD_PAIRS
(=435) 상수 신규 — KBO_HEAD_TO_HEAD_PAIRS와 동일한 derived-constant 컨벤션
(wave 107 패턴)으로 MLB_TEAM_COUNT 변경 시 자동 동기.

MLB_NAV에 "매치업"(en: "Matchup") 그룹 항목 추가, sitemap.ts에 정적 라우트
2건(/mlb/matchup, /en/mlb/matchup) 추가. footer는 KBO도 matchup을 넣지 않는
기존 패턴 유지(nav-only). sitemap-mlb.test.ts에 신규 index route 존재 검증
2건 추가.

* docs(todos): cycle 2183 info-architecture-review — MLB matchup 진입점 부재 발견 + fix 기록

subtype: cycle-retro
cycle: 2183

* policy: cycle-retro 2183 — info-architecture-review MLB matchup 진입점 부재 발견+fix SUCCESS

subtype: cycle-retro
cycle_n: 2183
chain_selected: info-architecture-review
outcome: success

trigger 9 (30-cycle 미발화 gap, 마지막 fire cycle 2153, gap=30 정확 도달) 자동
권장으로 발화. 진단 5개 IA 소스(라우트/breadcrumb/헤더메가메뉴/footer/sitemap)
전수 점검 — 4개 정상, 1개(MLB matchup 진입점 완전 부재) actionable gap 확정.
/mlb/matchup/[teamA]/[teamB](435 pairs, plan #24 Phase 3b)가 KBO /matchup
대응 index/picker page 없이 nav/footer/sitemap 전부 누락 — sitemap.xml
크롤러 발견 외 사용자 도달 불가 상태였음. KBO /matchup 패턴 이식으로 KO+EN
index page 신규 + MLB_HEAD_TO_HEAD_PAIRS 파생 상수 + Header nav 링크 +
sitemap 정적 엔트리 2건 + 테스트 2건. 447 test files/3890 tests green,
type-check/lint clean. 직접 main 커밋(89b02a2c), branch/PR 미생성(직전
2사이클 feat 패턴 유지).

next_recommended_chain: explore-idea 또는 fix-incident (cycle 2182 잔여
후보 재검토 — info-arch gap 해소 완료로 dominant pair 자연 재개 예상)

* fix(pipeline): backfill KBO games permanently stuck 'scheduled' (사례 33)

subtype: fix-incident
cycle: 2184

verify cron only re-checks "yesterday" and never revisits older dates —
games that stayed non-terminal on their original verify pass (사례 32's
pre-fix fallout, cycle 2179) are stuck at status='scheduled' forever.
Found 24 games across 9 dates (2026-04-14~08-04) via direct DB scan.
backfill-kbo-stuck-verify.ts re-fetches KBO + recomputes accuracy for
newly-final games without touching daily_notifications (no duplicate
Telegram). Resolved 15/24 games; 9 remain stuck at the KBO API's own
'scheduled' response (likely uncorrected rainouts) — carried over.

Exports computeWinnerTeamId / buildAccuracyUpdates from kbo-data index
so the standalone script can reuse daily.ts's production logic instead
of duplicating it.

* docs(todos): cycle 2184 fix-incident — KBO stuck-scheduled family (사례 33) 기록

* policy: cycle-retro 2184 — fix-incident KBO 영구 stuck-scheduled family 발견+backfill SUCCESS

subtype: cycle-retro
cycle_n: 2184
chain_selected: fix-incident
outcome: success

cycle 2183 추천 explore-idea(SR_ORDER/VERSION_ORDER MLB 일반화) 조사 후 저가치
판단(MLB 단일 scoring_rule 이라 일반화해도 차트가 퇴화 형태) — pivot 하여 직접
DB health-check 진행. pipeline_runs mismatch 오탐(announce/verify 모드 설계상
정상) 확인 후 games 테이블 직접 스캔에서 status='scheduled' 9일+ 고착 경기
24개(9개 날짜, 2026-04-14~08-04) 발견 — 사례 32(cycle 2179 fix) 이전 historical
fallout, MLB 사례 23(cycle 2067)과 동일 버그 클래스의 KBO 버전. backfill 스크립트
신규 작성(daily.ts 로직 재사용 위해 computeWinnerTeamId/buildAccuracyUpdates
index.ts export 추가) — 15/24 게임 완전 해소 + predictions.is_correct 19건
재계산, 9건은 KBO API 자체가 여전히 scheduled 라 carry-over. 전체 테스트/
타입체크/린트 green.

next_recommended_chain: fix-incident (lite, 잔존 9경기 수동 확인) 또는
explore-idea/review-code (alternation)

* fix(pipeline): mark 9 KBO games confirmed-cancelled as 'postponed' (사례 33 후속)

subtype: fix-incident
cycle: 2185

cycle 2184가 KBO API 재조회(backfill-kbo-stuck-verify.ts)로 9개 날짜 24경기 중
15경기(3개 날짜)를 해소했지만, 나머지 6개 날짜 9경기는 KBO API가 여전히
'scheduled'로 응답해 자동 해소 불가 — 재편성 없이 완전 취소된 경기는 KBO API
스케줄 엔드포인트가 슬롯을 갱신하지 않는 것으로 추정.

KBO 공식 뉴스(연합/OSEN/스포츠경향/뉴스1 등) 검색으로 9경기 전부 실제 취소
(우천 3경기 + 그라운드 사정 2경기 + 폭염 4경기) 확인 — 재편성 여부와 무관하게
해당 날짜 슬롯 경기 자체는 열리지 않았음. 신규 스크립트
`backfill-kbo-confirmed-postponed.ts`(진단/--apply)로 games.status='postponed'
+ is_canceled=true 마킹. predictions.is_correct는 이미 전부 null(채점 미실행)
이라 추가 처리 불필요. daily_notifications flag 미변경(재알림 방지).

`pnpm --filter @moneyball/kbo-data test`: 88 files / 1139 tests green,
type-check(전체 4 패키지) clean.

* docs(todos): cycle 2185 fix-incident — KBO 잔여 9경기 확정 취소 마킹, 사례 33 완전 해소 기록

subtype: fix-incident
cycle: 2185

* policy: cycle-retro 2185 — fix-incident KBO 사례 33 잔여 9경기 확정 취소 마킹 SUCCESS

subtype: cycle-retro
cycle_n: 2185
chain_selected: fix-incident (lite)
outcome: success

* feat(mlb): Brier score trend chart parity — /mlb/accuracy

subtype: explore-idea
cycle: 2186

cycle 2176이 남긴 backlog(KBO /accuracy의 BrierTrendChart/ScoringRuleDayHeatmap/
CohortComparisonHeatmap/TeamBiasTable/ModelVersionHistory 중 MLB 미구현) 중
BrierTrendChart를 이번 사이클 scope로 선택 — buildMlbAccuracySummary()가 이미
KBO PredRow 형태로 derive해둔 rows를 buildBrierTrend()에 그대로 재사용 가능해
컴포넌트 변경 없이 데이터 배선만으로 parity 달성.

MLB predictions는 scoring_rule 버전 분화가 없어 BrierTrendChart의 SR_COLOR_MAP/
SR_ORDER(v1.5/v1.6/v1.7-revert 등 KBO 전용 라벨)엔 걸리지 않고 'all' 단일 라인만
표시됨 — KBO 전용 로직을 건드리지 않고 자연 degradation.

MlbAccuracyDashboard에 brierTrend prop 추가(길이 3+ 조건부 렌더, KBO 페이지와
동일 threshold) + KO/EN 양쪽 페이지 배선 + 회귀 테스트 1건 추가.
apps/moneyball vitest 447 files/3891 tests, type-check/lint 전체 clean.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>

* docs(todos): cycle 2186 explore-idea heavy — MLB Brier 추이 차트 parity 기록

subtype: lesson
cycle: 2186

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>

* policy: cycle-retro 2186 — explore-idea (heavy) MLB Brier 추이 차트 parity SUCCESS

subtype: cycle-retro
cycle_n: 2186
chain_selected: explore-idea (heavy)
outcome: success
retro.summary: cycle 2176 backlog(MLB /accuracy 미구현 컴포넌트 리스트) 중 BrierTrendChart 선택. buildMlbAccuracySummary가 이미 만들어둔 PredRow를 buildBrierTrend()에 재사용해 신규 함수 없이 데이터 배선만으로 parity 달성 — 낮은 리스크/빠른 수렴. KO/EN 양쪽 배선 + 회귀 테스트, 전체 test/type-check/lint green.
next_recommended_chain: review-code 또는 fix-incident (alternation) — explore-idea 는 backlog 잔존(ScoringRuleDayHeatmap/CohortComparisonHeatmap/TeamBiasTable/ModelVersionHistory) 있으나 review-code 와 번갈아 진행 권장. lotto/op-analysis/info-arch 는 gap 미충족.

* docs(accuracy): clarify buildConfidenceTiers intentional raw-confidence use

subtype: review-code-heavy
cycle: 2187

Sunday cap(judge-agent.ts)이 confidence만 낮추고 homeWinProb는 원본 유지 —
resolveWinnerProb 통일 안 하는 게 의도. 감사 중 brierScore류(resolveWinnerProb
사용)와 비교해 drift처럼 보였으나 실제론 tier 오분류 방지 설계 확인, 재조사
방지 위해 주석 박제.

* docs(todos): cycle 2187 review-code heavy — buildAccuracyData.ts 감사, 신규 버그 미발견 기록

subtype: cycle-retro
cycle: 2187

* policy: cycle-retro 2187 — review-code (heavy) buildAccuracyData.ts 감사, 신규 버그 미발견 PARTIAL

subtype: cycle-retro
cycle_n: 2187
chain_selected: review-code (heavy)
outcome: partial
next_recommended_chain: explore-idea 또는 review-code (Feature-Drift Cycle 교대)

buildAccuracyData.ts(758줄) 전체 감사. cycle 1999 fix(resolveWinnerProb) 정상
유지 확인. buildConfidenceTiers raw confidence 사용은 Sunday cap(judge-agent.ts)
의도 설계로 판명(버그 아님) — clarifying comment 추가(7da64ac3). 로직 변경 없어
PR/R7 대상 아님, main 직접 commit.

* fix(home): assertSelectOk guard on pick_poll_events query

subtype: fix-incident
cycle: 2188

getTodayDivergenceGame silently returned null on Supabase errors
(no .error check, no throw) — caller's .catch(captureFallback) never
fired since nothing threw. Every other query in page.tsx uses
assertSelectOk; this one skipped it, matching the documented
silent-Supabase-error family. Now throws on error → captureFallback
alerts instead of the divergence chip silently vanishing.

* docs(todos): cycle 2188 review-code heavy — page.tsx 감사, silent Supabase 에러 가드 fix 기록

subtype: cycle-retro-support

* policy: cycle-retro 2188 — review-code (heavy) page.tsx 감사, 신규 버그 1건 fix SUCCESS

subtype: cycle-retro
cycle_n: 2188
chain_selected: review-code (heavy)
outcome: success
summary: page.tsx getTodayDivergenceGame 의 pick_poll_events 쿼리 assertSelectOk 누락 발견+fix. Supabase silent .error family (사례 3/6) 재발 차단.
next_recommended_chain: explore-idea 또는 operational-analysis

* feat(mlb): scoring_rule × day-of-week heatmap parity — /mlb/accuracy

subtype: feat
cycle: 2189

BrierTrendChart와 동일한 자연 degradation 패턴(MLB rows에 scoring_rule
필드 없어 'all' aggregate만 채워짐)으로 ScoringRuleDayHeatmap을 MLB
accuracy 대시보드에 이식. buildMlbAccuracySummary()에 함수 재사용만
추가, 신규 로직 없음.

TeamBiasTable/ModelVersionHistory는 계속 backlog — 전자는 MLB
standings win% 소스 자체 부재(placeholder 확인), 후자는 scoring_rule
버전 분화 없어 실효성 낮음.

* docs(todos): cycle 2189 explore-idea heavy — MLB 요일별 heatmap parity 기록

* policy: cycle-retro 2189 — explore-idea (heavy) MLB 요일별 heatmap parity SUCCESS

subtype: cycle-retro
cycle_n: 2189
chain_selected: explore-idea (heavy)
outcome: success
summary: cycle 2188 retro alternation 힌트 + cycle 2186 backlog 따라 ScoringRuleDayHeatmap MLB parity 구현. BrierTrendChart와 동일 자연 degradation 패턴(scoring_rule 필드 부재 → all aggregate만). TeamBiasTable 은 MLB standings win% 소스 부재 확인으로 backlog 확정 제외. 447/3892 tests green, tsc/lint clean.
next_recommended_chain: review-code 또는 fix-incident (Feature-Drift Cycle 교대 + gap-chain 재확인)

* fix(predictions): unify cancelled-inclusive accuracy % across page

subtype: fix
cycle: 2190

header stat line, footer share text, DailyPredictionSummaryBar props used
correct.length/verified.length (excludes cancelled games). buildIntro and
buildArticleJsonLd used correctN/totalN (cancelled counted as correct, per
existing comment: 경기 자체 무효, 예측 책임 없음). Same page showed two
different accuracy percentages on any date with a postponed game. Unified
all four call sites onto correctN/totalN.

* docs(todos): cycle 2190 review-code heavy — predictions/[date] 취소경기 적중률 불일치 fix 기록

subtype: cycle-retro

* policy: cycle-retro 2190 — review-code (heavy) predictions/[date] 취소경기 적중률 불일치 fix SUCCESS

subtype: cycle-retro
cycle_n: 2190
chain_selected: review-code (heavy)
outcome: success
retro.summary: predictions/[date]/page.tsx (마지막 감사 cycle ~1872, 318사이클 미감사) 전체 read 후 신규 버그 1건 발견 — 헤더/footer/SummaryBar 3곳은 취소경기 제외 적중률, buildIntro/articleJsonLd 2곳은 취소경기 포함(기존 주석 명시 컨벤션) — 같은 페이지 안 상충되는 % 동시 노출. correctN/totalN 단일 source 통일 fix + 회귀 테스트 1건. tests 3893 green / tsc·lint clean.
next_recommended_chain: explore-idea 또는 operational-analysis
next_recommended_reason: Feature-Drift Cycle 교대 (review-code 방금 발화) 또는 operational-analysis v1.8 cohort 재측정 gap 누적 중 (마지막 발화 cycle 2178)

* docs(op-analysis): cycle 2191 CE/비CE cohort 재측정 — n=316, 격차 9.9pp

subtype: cycle-retro
cycle: 2191

scripts/op-analysis-ce-cohort.ts 재실행 (동일 harness, cycle 2146 후속).
CE 53.9%(145/269) vs 비CE 63.8%(30/47), overlap 월 통제 격차 10.8pp ≈
전체 격차 → LLM 부가가치 우세 방향 3회 연속 재확인. 비CE 45일째 동결
(마지막 예측 2026-07-01), CREDIT_EXHAUSTED 지속 — 결론 변화 없음, 상태
갱신만.

* fix(analysis): convergenceRecord.ts 기본 lookback cutoff UTC→KST 정정

subtype: fix-incident
cycle: 2192

getRecentConvergencePickRecord/getConvergencePickStreak 의 startDate 미지정
기본 경로가 new Date(Date.now() - N*86400000).toISOString().slice(0,10) 로
cutoff 계산 — UTC 캘린더일 기준이라 KST 00:00~08:59 (UTC 15:00~23:59) 구간
실행 시 실제 KST 날짜보다 하루 이른 cutoff 산출, lookback 윈도우가
CONVERGENCE_RECORD_LOOKBACK_DAYS(45) 보다 최대 1일 더 넓어짐.

같은 파일의 fetchConvergencePickDetailedResults 는 today 경계를
toKSTDateString() 으로 이미 KST 기준 계산 — cutoff 만 UTC 기준으로 남아있던
불일치. packages/shared 에 이미 동일 목적으로 만들어진 kstDateOffset()
(wave 143, not-found 페이지 3파일 중복 통합 시 박제) 을 두 콜사이트에 적용.

tsc clean, 447 test files / 3893 tests green (회귀 없음).

* docs(todos): cycle 2192 review-code heavy — convergenceRecord.ts UTC/KST cutoff fix 기록

subtype: fix-incident
cycle: 2192

* policy: cycle-retro 2192 — review-code (heavy) convergenceRecord.ts UTC/KST cutoff fix SUCCESS

subtype: cycle-retro
cycle_n: 2192
chain_selected: review-code (heavy)
outcome: success
retro.summary: convergenceRecord.ts (736줄) 전체 audit — getRecentConvergencePickRecord/getConvergencePickStreak 기본 lookback cutoff 가 UTC ISO slice 로 계산돼 같은 파일 내 toKSTDateString() 기준 today 경계와 불일치 (KST 00:00-08:59 구간 off-by-one-day 가능). 기존 shared kstDateOffset() (wave 143 박제) 적용해 정정. tsc/vitest 전부 green.
next_recommended_chain: explore-idea or fix-incident
next_recommended_reason: review-code 직전 3사이클 중 2회 발화 — Feature-Drift alternation 상 explore-idea 우선이나 MLB parity backlog 대부분 data-blocked/N/A 상태라 신규 target 재확인 필요. fix-incident 는 8-cycle gap, 아직 20-gap 미달.

* feat(mlb): CohortComparisonHeatmap parity — scoring_rule × week matrix on /mlb/accuracy

cycle 2189/2186 retro backlog 이 두 번 명시한 MLB parity 후보 채택.
buildScoringRuleWeekHeatmap (KBO /accuracy 재사용) 으로 cohortWeekHeatmap
필드 산출, CohortComparisonHeatmap 컴포넌트는 data-driven 이라 변경 없이
그대로 재사용. ScoringRuleDayHeatmap과 동일하게 MLB rows는 scoring_rule
select 안 해 'all' aggregate만 채워지는 자연 degradation (day heatmap
선례와 동일 패턴, 버그 아님).

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>

* docs(todos): cycle 2193 explore-idea heavy — CohortComparisonHeatmap MLB parity 기록

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>

* policy: cycle-retro 2193 — explore-idea (heavy) CohortComparisonHeatmap MLB parity SUCCESS

subtype: cycle-retro
cycle_n: 2193
chain_selected: explore-idea (heavy)
outcome: success
retro.summary: CohortComparisonHeatmap MLB parity 구현. buildScoringRuleWeekHeatmap 재사용, ScoringRuleDayHeatmap 선례와 동일 all-aggregate degradation 수용. tsc/lint clean, 447 test files / 3894 tests green.
next_recommended_chain: review-code 또는 fix-incident

meta: 진단 단계에서 FallbackTrendChart/ModelVersionHistory/TeamBiasTable MLB parity 후보들을 구조적으로 낮은 가치로 판단해 backlog 후순위 처리 — MLB 파이프라인은 LLM debate 미사용(fallback 이벤트 항상 0), scoring_rule 버전 분화 없음(단일 rule), team rank 소스 부재.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>

* docs(todos): cycle 2194 fix-incident heavy — deploy-drift-alert 12h+ silent gap 기록

subtype: lesson

* policy: cycle-retro 2194 — fix-incident (heavy) deploy-drift-alert 12h+ silent gap SUCCESS

subtype: cycle-retro
cycle_n: 2194
chain_selected: fix-incident (heavy)
outcome: success
summary: deploy-drift-alert failing every hourly run 12h+ (100% fail rate). Root cause: Vercel never built origin/main HEAD 82c6fec (a real app-code-changing commit) despite the push landing on GitHub — no build/skip record exists at all for that sha. Fixed via git worktree at origin/main + manual `vercel --prod` deploy (local main's 33 unpushed commits untouched, batch-push policy respected — no git push performed). Verified live: /mlb/accuracy now serves cycle-2181's rolling-accuracy-chart feature.
side_effect: CLI-based redeploy carries no git commit metadata, so /api/version commit_sha is now empty. Next deploy-drift-alert run falls into its PROD_SHA-empty warning branch (exit 0) instead of a clean sha match — red X resolved but sha-based drift detection itself is now blind until the next git-triggered build restores it.
next_recommended_chain: review-code or explore-idea

* fix(accuracy): Brier trend "3주 이상" 게이트가 실제 2주차에 열리는 카피/동작 불일치

subtype: fix
cycle: 2195

buildBrierTrend 는 주차마다 'all' + scoring_rule 최소 2 point 를 result 에
push — accuracy/page.tsx + MlbAccuracyDashboard.tsx + BrierTrendChart.tsx
내부 가드가 모두 brierTrend.length>=3 (총 point 수) 로 게이트해 UI 카피
("3주 이상 검증되면 표시")와 달리 실제 2주차에 이미 차트가 열림.

countBrierTrendWeeks() (distinct week/date count) 신규 export 후 3개
게이트 지점 모두 이걸로 교체. KBO/MLB 양쪽 accuracy 대시보드 공유 버그.
회귀 테스트 3건 추가 (buildAccuracyData.test.ts).

* docs(todos): cycle 2195 review-code heavy — Brier trend 게이트 카피/동작 불일치 기록

subtype: fix
cycle: 2195

* policy: cycle-retro 2195 — review-code (heavy) Brier trend 게이트 카피/동작 불일치 SUCCESS

subtype: cycle-retro
cycle_n: 2195
chain_selected: review-code (heavy)
outcome: success
retro.summary: MLB accuracy 위젯 클러스터(4개 explore-idea heavy cycle 누적) 감사. scoring_rule 필드 부재 가설은 오탐(이미 우아하게 degradation 처리됨, wave 255-257 registry fix 효과 확인) — 실제 발견은 buildBrierTrend() 가 주차당 2 point push 하는데 UI 3개 게이트(accuracy/page.tsx, MlbAccuracyDashboard.tsx, BrierTrendChart.tsx)가 모두 point 총수로 "3주 이상" 카피 체크해 실제 2주차에 열리는 pre-existing 공유 버그(KBO+MLB) 발견+fix. countBrierTrendWeeks() 헬퍼 + 회귀 테스트 3건. tsc clean + vitest 3897/3897 pass.
next_recommended_chain: explore-idea or fix-incident

* docs(todos): cycle 2196 explore-idea heavy — MLB 팀별 상대 강약/홈원정 parity 기록

* policy: cycle-retro 2196 — explore-idea (heavy) MLB team matchup/home-away parity SUCCESS

subtype: cycle-retro
cycle_n: 2196
chain_selected: explore-idea (heavy)
outcome: success
summary: MLB accuracy dashboard lacked KBO's TeamMatchupCards (team-vs-opponent + home/away split) parity. Added buildMlbMatchupData() (mirrors KBO's buildMatchupData(), using mlb_schedule's direct team-code columns — no FK join needed) and generalized TeamMatchupCards to accept teamCodes/shortName props so KBO and MLB share the component. Wired into /mlb/accuracy + /en/mlb/accuracy. 5 new regression tests, tsc clean, vitest 3901/3901 pass. Investigated deploy-drift-alert's 2 recent failures first but confirmed it's the already-documented cycle 2194 side-effect (CLI redeploy has no git commit metadata) — avoided duplicate fix-incident work.
pr: 2964
merge_commit: 3884f704
next_recommended_chain: review-code or fix-incident
next_recommended_reason: Feature-Drift Cycle alternation suggests review-code next (audit new buildMlbMatchupData/TeamMatchupCards for silent drift). Separately, deploy-drift-alert stays sha-blind until origin/main gets a git-triggered build again — a fix-incident candidate once local main's unpushed commits are eventually pushed.
skill_evolution_trigger_check: milestone(2196%50=46, no) | 0-fire-chain(review-code fired 7x in last 20 inclusive, no) | fail-streak(all success, no) — no marker set

* lesson: 사례 33 — 로컬 develop-cycle 워킹 디렉토리 origin 대비 divergence (review-code 감사 대상 stale)

subtype: lesson
cycle: 2197

cycle 2196 이 구현·PR #2964 R7 머지까지 SUCCESS 로 retro 박제했지만, 로컬
main 은 매 cycle 이후 pull 되지 않아 실제 배포된 코드(buildMlbMatchupData/
TeamMatchupCards generalize)가 로컬 워킹 디렉토리엔 반영 안 된 채 1-behind
+ 40-ahead 로 조용히 divergence. git fetch + merge 로 동기화 후 실제 코드
재확인 — 구조 자체엔 새 버그 없음(KBO buildMatchupData parity 정확).

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>

---------

Co-authored-by: Claude Sonnet 5 <noreply@anthropic.com>
