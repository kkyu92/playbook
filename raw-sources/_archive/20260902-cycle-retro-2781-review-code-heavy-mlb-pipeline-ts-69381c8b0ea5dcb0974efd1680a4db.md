---
date: "2026-09-02"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "69381c8b0ea5dcb0974efd1680a4db5f2e3e8dc6"
---


subtype: cycle-retro
cycle_n: 2781
chain_selected: review-code(heavy)
outcome: success

mlb-pipeline.ts(875줄, 최고령 미감사 대형파일) 전체 감사. runPredictFinal
의 DB select 실패 3곳(mlb_team_stats/mlb_team_elo/mlb_schedule finished)
이 errors[] 만 기록하고 액티브 알림 없어 pipeline_runs.status/
captureSilentDriftAlert 양쪽 다 못 잡는 silent 경로 발견 — 같은 파일
runEloUpdate 의 기존 우회 패턴(Sentry.captureException 직접 호출)을 동일
적용. tsc/lint/vitest 전체 green. direct main commit+push(437f7036).

next_recommended_chain: review-code(heavy)
next_recommended_reason: 잔여 미감사 대형파일(postview.ts 588줄 동률
최고령) rotation 가능, 단 lotto gap 29/30 임박 — 다음 사이클 30 도달
여부 우선 확인 권장.
