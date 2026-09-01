---
date: "2026-09-01"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "f49aab1115c624cbe00acd1f9541d973f2c8685b"
---


subtype: cycle-retro
cycle: 2708
chain_selected: review-code(heavy)
outcome: success

retro.summary: buildTeamProfile.ts(601줄) 대형파일 정독 중 TeamProfile.color/MlbTeamProfile.color 가 meta.color 복사값인데 전체 앱 어디서도 profile 경유로 소비 안 됨(직접 KBO_TEAMS/MLB_TEAMS.color 참조) 발견 — computed-but-unconsumed 계열(cycle 2661/2690) 재발. 양쪽 인터페이스+생성지점 제거, tsc/eslint clean, 관련 8파일 59테스트 green. 단일 논리단위 main 직접 push(commit d6620830).
retro.next_recommended_chain: review-code(heavy)
retro.next_recommended_reason: 잔여 미감사 대형파일(analysis-data.ts/buildAccuracyData.ts 776줄, buildMatchupProfile.ts 594줄) rotation 계속. gap trigger 4종 전부 미도달(fix-incident 12/20, op-analysis 17/25, info-arch 29/30 근접, lotto 19/30), 직전8 distinct=3 — 2-chain lock 미충족.
