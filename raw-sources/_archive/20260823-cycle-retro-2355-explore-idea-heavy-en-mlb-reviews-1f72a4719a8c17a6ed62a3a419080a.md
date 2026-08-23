---
date: "2026-08-23"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "1f72a4719a8c17a6ed62a3a419080ae8a3faf3de"
---


subtype: cycle-retro
cycle_n: 2355
chain_selected: explore-idea (heavy)
outcome: success

cycle 2354 retro가 명시한 "explore-idea 또는 op-analysis/lotto/info-arch 주기 trigger
확인" — 주기 trigger 4종 전부 미도달 확인 후 explore-idea 채택. plan #27(MLB
픽/리더보드) 재확인 결과 mlb_pick_poll_events 실측 참여 0건(Supabase COUNT 직접
조회) — 여전히 blocked, 보류. 대신 cycle 620 최초 언급 이후 cycle 2338/2341/2342
retro가 반복 carry-over 한 "en/mlb/reviews weekly 미러 부재"를 채택.

buildMlbWeeklyReview/buildMlbFactorInsights에 locale param 추가(기본 'ko', 기존
KO callsite 무변경) + MlbHighlightCard/WeeklyGamesSortControl locale prop 추가 +
/en/mlb/reviews/weekly(redirect)+[week](KO 전체 mirror)+og/twitter/not-found
신규 + sitemap.ts enMlbWeeklyReviewRoutes + /en/mlb/reviews 허브 진입 카드.
monthly EN 미러는 스코프 밖(별도 cycle 후속).

부수 발견: cycle 2354 두 번째 커밋이 apps/moneyball/package.json 만 갱신하고 루트
package.json/VERSION 갱신을 누락한 3-way version-sync drift를 로컬 테스트 실행 중
발견 — 이번 커밋에서 0.5.62.77 로 동기 정정.

검증: tsc --noEmit(kbo-data+moneyball) clean, eslint(양쪽) clean, pnpm test
(kbo-data 90 files/1165 tests + moneyball 499 files/4189 tests all green).
PR #3041 --squash --auto merge, gh pr view state=MERGED 실측 확인(mergeCommit
7a6e88cc).

skill-evolution trigger 평가: trigger3(2355%50=5) 미충족, trigger5(직전 20cycle
review-code 6회, sample=19≥10) 미충족, trigger1(chain-evolution 누적 8≥5)은 68회
기존 자가진화 역사상 매 사이클 재발화한 적 없어 bootstrap-once 로 처리(신규 마커
미생성). ship-0 체크: 직전 10cycle 9 success/1 retro-only — 정상.

다음 cycle 추천 = en/mlb/reviews/monthly 동일 패턴 미러 또는 review-code(heavy)
신규 코드 audit (Feature-Drift Cycle 자연 교대).

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
