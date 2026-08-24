---
date: "2026-08-24"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
fingerprint: "f1c7ea3991d7aab28d5b9162774a979647d4496e"
---


subtype: lesson
cycle: 2505

cycle 140(PR #131, 2026-05-06)이 daily.ts 의 동점(home_score===away_score) final
경기 winner_team_id silent drift 를 computeWinnerTeamId 헬퍼로 고쳤으나, 동일한
인라인 안티패턴(`homeScore > awayScore ? home : away`)이 live.ts 의
updateGameScore()(실시간 경기 최종 스코어 기록 경로, /api/live 크론) 안에어
독립적으로 남아있어 fix 가 전파 안 됨.

실측 증거:
- 2026-08-21 경기(id=10573, KIA vs 삼성 3:3 무승부)의 games.winner_team_id 가
  team 5(원정팀)로 오설정 — 정상은 NULL(KBO 12회 무승부 규정).
- 최근 1000건 표본 중 동점 final 경기 30건, 그 중 7건이 winner_team_id 오설정
  (2026-06-03 ~ 2026-08-21 사이 분포, 전부 cycle 140 fix 이후 날짜).
- accuracy-update.ts 의 is_correct 채점은 별도 쿼리 필터로 영향 없어 보이나,
  buildSeasonSummary.ts(standings 페이지)는 winner_team_id 를 직접 신뢰
  (`winner_team_id != null` → decided, `winner_team_id === home_team_id` 로
  승/패 카운트) — 오설정된 7+ 경기가 무승부 아닌 원정팀 승리로 standings 오표시.

원인: live.ts:315-317 `updateGameScore()` 가 `packages/kbo-data/src/pipeline/winner-id.ts`
의 `computeWinnerTeamId` 를 import/사용하지 않고 자체 인라인 삼항 연산자 사용.

다음 fix-incident 권장 조치: live.ts updateGameScore 의 winnerId 계산을
computeWinnerTeamId(status, homeScore, awayScore, homeId, awayId) 호출로 교체 +
회귀 테스트 추가. 기존 오설정된 과거 행(최소 7건, 정확한 전체 건수는 페이지네이션
전수 조회 필요)은 별도 backfill UPDATE 필요(games SET winner_team_id=NULL WHERE
home_score=away_score AND winner_team_id IS NOT NULL AND status='final').
