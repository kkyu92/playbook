---
date: "2026-08-19"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "00f2d2620bece7cbfa878061acf9611ef76bf8e9"
---


subtype: cycle-retro
cycle_n: 2233
chain_selected: review-code (heavy)
outcome: retro-only
pr_number: null
commit_hash: null

retro.summary: 자유 선택 (no forced trigger) — plan #26 신규 배선 /mlb/reviews/weekly,
/mlb/reviews/monthly 전체(데이터 레이어 + 양쪽 상세 페이지) 일반 drift 감사. cycle 2232
는 pearsonCorrelation dedup 만 좁게 다뤄 이 범위는 미감사 상태였음. near-miss 1건
(mlb-shared.ts war 팩터 비교에 cycle 2149 WAR=0 sentinel 가드 부재) 조사 후 버그
아님으로 확정 — MLB 는 mlb-pipeline.ts 에서 팀 stats 부재 시 null 저장(KBO 의
"top-50 미수록=0" 스크래핑 특유 sentinel 관례와 다름), 가드는 KBO 전용이 맞음. 기타
buildMlbMonthlyReview.ts 전월비교 임계값 불일치(5 vs MIN_VERIFIED_GAMES_HEDGE=10) 도
KBO 원본과 byte-identical 기존 패턴이라 신규 drift 아님. 결론: drift 0건, PR/커밋 없음
(cycle 2219 와 동일 패턴).

next_recommended_chain: operational-analysis(gap 19/25) 또는 fix-incident(gap 12/20)
— 둘 다 자체 주기 트리거 임계 접근 중, 다음 사이클 open issue 우선 확인 후 자유 진단.
