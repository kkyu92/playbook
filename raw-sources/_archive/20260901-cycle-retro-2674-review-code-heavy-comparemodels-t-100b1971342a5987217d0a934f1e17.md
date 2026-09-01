---
date: "2026-09-01"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "100b1971342a5987217d0a934f1e179d8726b7d6"
---


subtype: cycle-retro
cycle_n: 2674
chain_selected: review-code(heavy)
outcome: success

diagnosis: 개방 issue 0, approved plan 0/23(status: approved 없음), gap trigger 4종
전부 미도달(fix-incident 11/20, op-analysis 8/25, info-arch 26/30, lotto 15/30), 직전8
distinct=3(2-chain lock 미충족). cycle 2673 이 review-code(heavy) 미감사 컴포넌트 소진
명시 → 최종 커밋일 기준 재정렬해 신규 대형 파일 재탐색, compareModels.ts(299줄,
2026-07-16 이후 미터치) 채택.

execution: 서브에이전트 전체 정독 audit + 3개 소비자 교차검증 → drift 2건 확인
(dailyByModel KST 미보정 날짜 버킷 / /debug/model-comparison 헤더 하드코딩 리터럴
'v1.8'). 양쪽 fix + 기존 wave-251 regression guard 갱신 + compareModels.test.ts KST
경계 케이스 보강. tsc/lint clean, vitest 571 files/4476 tests green(+1). main
직접 commit+push(R4/R7, 75864b42 + fb930d53).

retro.summary: "최종 커밋일 기준 정렬"이 review-code(heavy) 신규 후보 발굴에 유효함을
확인 — 컴포넌트급(page.tsx 소비자)뿐 아니라 lib/ 순수 함수 파일도 동일 silent drift
family(하드코딩 버전 리터럴/KST 미보정) 대상이 됨.
next_recommended_chain: review-code(heavy) 계속 (신규 후보: lib/reviews/buildMissReport.ts
216줄 2026-07-16 / app/players/page.tsx 315줄 2026-07-14 / app/reviews/misses/page.tsx
249줄 2026-07-17) 또는 fix-incident/op-analysis/info-arch/lotto gap 자연 대기.
