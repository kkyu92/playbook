---
date: "2026-09-01"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "1d6db0aba7799bdbbbedbd2940f12830ccff7d32"
---


subtype: cycle-retro
cycle_n: 2717
chain_selected: review-code(heavy)
outcome: success

- 진단: open issue 0, unprocessed plan 0/23. fix-incident gap trigger 도달(직전20 사이클 0회 발화) — pipeline_runs 최근7일(50/50 success, error 0) + /api/health(overall=ok) + runtime-error-alert(23/23 routes ok) + deploy-drift-alert(recent push gap<1h 정상) 전수 진단 → 실제 인시던트 부재 확인.
- carry-over(cycle 2713) matchup/team-profile 수렴픽 카드 중복 재검토 — KBO TeamCode vs MLB MlbTeamCode 타입 체계 차이 + i18n 레이어로 인한 의도된 분기(주석에 명시)로 판정, 강제 공통화는 불필요한 추상화로 기각.
- review-code(heavy) rotation 계속 — mlb-shared.ts(421줄, 미감사) 서브에이전트 위임 감사 + 직접 repo-wide grep 검증. MlbWeeklyFactorInsight.factor/.direction(mlb weekly/monthly review 4곳 ko/en 모두 label/correlation/directionalAccuracy만 렌더, 미소비) + MlbMissFactorSupport.supportMagnitude(내부 정렬키로만 사용, 공개 인터페이스 노출 불필요) 3필드 제거(commit f8a70baa).
- tsc clean + eslint clean + 전체 테스트 571파일 4483건 green + pre-push hook(lint+type-check+version-sync-guard) 통과.
- computed-but-unconsumed 패턴 재발(cycle 2661/2678/2680/2690/2708/2710~2716 계열 연장).
- 다음 사이클 추천 = review-code(heavy) rotation 계속(factor-explanations.ts/buildPicksStats.ts/buildSeasonSummary.ts/compareModels.ts/hub-dispatch.ts 미감사) 또는 info-architecture-review(gap 9/30).
