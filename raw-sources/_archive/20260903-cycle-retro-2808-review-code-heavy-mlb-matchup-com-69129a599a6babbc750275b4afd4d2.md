---
date: "2026-09-03"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "69129a599a6babbc750275b4afd4d2af78fb288a"
---


subtype: cycle-retro
cycle_n: 2808
chain_selected: review-code(heavy)
outcome: success

진단: open issue 0, unprocessed approved plan 0/23. 2차 방어선(cycle 2807 retro commit 5ee753fb) OK. 직전8(2800-2807) distinct=4 — 2-chain lock 미충족. gap trigger 전부 미도달(fix-incident 1/20 방금 발화, op-analysis 10/25, info-arch 8/30, lotto 26/30). explore-idea saturation 7/15 미충족.

side-finding: gh run list + vercel ls --prod 확인 결과 이번 사이클 시작 시점 push(5ee753fb)에 대해 GitHub→Vercel webhook 이 자동으로 새 git-source 배포(dpl_GW5JocfrZUKack3KkkMTGccLsh5W)를 생성 — cycle 2807 수동 CLI 배포(dpl_fgH5erwfUh)와 별개. cycle 2807 이 요청한 "다음 실제 push 후 webhook 재개 확인" 질문에 자연 답변 — webhook 자체 회복(과거 cycle 2777/2791 self-healed 패턴과 동일), 신규 조치 불필요.

review-code(heavy) 백로그가 cycle 2805/2806 에서 두 번 소진 선언됐으나, git log 커밋 수 기준 components/ + lib/ 디렉토리 sweep 으로 미감사 신규 후보군 발견. MLB matchup 컴포넌트 3개(MlbMatchupConvergencePickRecord/MlbMatchupRecentForm/MlbMatchupSeasonHeadToHead) KBO 대응 원본과 parity 감사 + buildDailyAccuracy.ts 단독 감사.

발견: MlbMatchupRecentForm.tsx 팀명 라벨이 KBO 폭(w-12, 48px, 2글자 한글용)을 그대로 유지 — sibling 컴포넌트 MlbMatchupConvergencePickRecord.tsx 는 이미 긴 영문 팀명(Diamondbacks/White Sox)용 w-20 shrink-0 폭 수정을 반영했는데 이 fix 가 옆 컴포넌트로 포팅 안 됨. 나머지 2개 컴포넌트 + buildDailyAccuracy.ts 는 clean.

조치: MlbMatchupRecentForm.tsx w-12 → w-20 shrink-0 (기존 MLB 패턴 포팅). tsc --noEmit clean + 전체 테스트 580파일/4515건 green. direct main push (55dd2f14).

다음 사이클 추천 = review-code(heavy) 계속(components/ 1-commit 잔여 후보: ThisWeekStatusFilter/GlossaryCategoryFilter/PicksSortControl/PicksStatusFilter/WeeklyHistorySortControl/MlbDetailedFactorAnalysis/PredictReveal) 또는 gap-fill(lotto 27/30 최근접, op-analysis 11/25, info-arch 9/30) 대기.
