---
date: "2026-10-16"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "1743ac23e83f1a81125b989a6a572504fc327fd0"
---


subtype: cycle-retro
cycle_n: 3239
chain_selected: review-code(heavy)
outcome: success

진단: open issue 0, approved plan 0(전부 completed/archived/superseded/pending-user-step), 2-chain lock 미충족(직전8(3231-3238) distinct=3: review-code(heavy)6+polish-ui1+expand-scope1). fix-incident gap=22/20 도달했으나 gh run list 전부 green/skipped + Supabase DNS 지속 NXDOMAIN(기존 추적 인시던트)으로 신규 incident 부재 재확인. info-arch gap=29/30, lotto gap=25/30 둘 다 근접이나 미도달. cycle 3238 추천대로 review-code(heavy) app/ 잔여 스코프 선택 — reviews/ 클러스터(6파일: page/misses/monthly/[month]/weekly/[week]) 감사.

발견 1건(확정): reviews/page.tsx(허브)는 강수렴/완전수렴 W-L 카드에 total<SMALL_SAMPLE_N 시 "소표본(n<5)" 가드를 붙이는데(commit 45db51e2, cycle 2564 fix, 범위=/reviews+/seasons/[year]+/mlb/reviews+/en/mlb/reviews 4페이지로 명시 한정), 동일 카드 마크업을 가진 monthly/[month]+weekly/[week] 디테일 페이지(KBO+MLB+EN/MLB 6파일)는 범위 밖이라 가드 누락 — 특히 주간 수렴픽이 "주당 3~5건"(packages/shared 문서 주석)이라 SMALL_SAMPLE_N=5 미만이 일상적인 weekly 페이지가 가장 취약. 6파일 12곳 전부 동일 가드 추가.

regression: tsc --noEmit clean, eslint(reviews+mlb/reviews+en/mlb/reviews) clean, vitest 593 files 4665 tests 전부 PASS. direct main commit f904b3dc + push, pre-push hook(lint+type-check+version-sync-guard+test) green.

zero-finding: reviews/page.tsx, reviews/misses/page.tsx, reviews/monthly|weekly/page.tsx(redirect) — 전부 clean. monthly/weekly twin 구조 차이(요일배지/전월대비/정렬컨트롤/slice lookback) 전부 기존 테스트+인라인 주석으로 의도된 설계 확인, 버그 아님.

다음 사이클 추천 = review-code(heavy) app/ 잔여 스코프(accuracy+analysis+matchup+methodology+predictions 클러스터, accuracy 1271줄/analysis 2860줄 대형 파일 포함 — 1 사이클에 분할 필요) 또는 fix-incident(실제 incident 부재 재확인)/info-arch(29/30)/lotto(25/30) gap 자연 대기. op-analysis는 Supabase 복구 전까지 계속 블락.
