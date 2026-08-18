---
date: "2026-08-18"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "89cab5e1c5df6fbfa3edc0886229fc5a0ec0922d"
---


subtype: cycle-retro
cycle_n: 2160
chain_selected: review-code (heavy)
outcome: success

matchup 영역(buildMatchupProfile.ts + matchup page) Explore agent 스카우팅에서
나온 confToWinProb 단서를 직접 코드로 추적해 실제 버그 확정. deriveMlbOutcome()
의 confidence(0.5~1 winnerProb 스케일)를 KBO DB confidence 컬럼 스케일(0~1,
tossup=0) 전용인 confToWinProb()에 넣는 이중 변환 — cycle 1641 wave-310 스윕이
MLB 페이지도 KBO와 동일 스케일로 오인 포함시킨 게 원인. 4페이지(KO/EN team,
KO/EN matchup) 전부 수정 + wave-310 가드 테스트 정정 + 신규 회귀 가드 4건 추가.
vitest 3872 passed, tsc/eslint clean, main 직접 push CI green 실측(run
32123117955). dead column 2건 + EN matchup 요약 누락은 스코프 밖 TODOS carry-over.

next_recommended_chain: review-code 또는 fix-incident 자유 판단
