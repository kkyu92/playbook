---
date: "2026-08-23"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "a550ddd45b30d85e5c57ff9ce5917c232144e4bc"
---


subtype: cycle-retro
cycle_n: 2399
chain_selected: review-code (heavy)
outcome: success
pr_number: 3045
merge_commit: 95bd00480ecf311ec515dcf7c98dfaefe561c38a

진단: open issue 0, approved plan 0/22. gap trigger 4종 전부 미도달
(fix-incident 5/20, op-analysis 6/25, lotto 7/30, info-arch 4/30). 2-chain
lock 미충족(직전8 distinct=5). cycle 2398 retro lead(미감사 monolith)
따라 buildTeamProfile.ts 심층 감사.

발견: computeTeamStreak 등 6개 팀 통계 함수가 teamGames 내림차순 정렬을
전제하는데, 그 정렬이 무관한 recentGames 조립문의 .sort() 부수효과로만
보장되던 암묵적 의존 — 문장 순서 변경 시 조용히 깨질 위험. MLB parity
파일(buildMlbTeamProfile.ts)에도 동일 패턴 중복.

실행: 양쪽 파일 정렬을 독립 문장으로 분리. tsc/eslint/tests(500f/4203t)
green. PR #3045 R7 자동 머지.

skill-evolution trigger 평가: trigger3(milestone 2399%50=49) 미충족,
trigger5(직전20 inclusive window review-code=3회 기존발화, sample=11≥10)
미충족. marker 박제 없음.

다음 추천: review-code(heavy) 계속(accuracy/page.tsx 1204줄 후보) 또는
gap trigger 순 대기.
