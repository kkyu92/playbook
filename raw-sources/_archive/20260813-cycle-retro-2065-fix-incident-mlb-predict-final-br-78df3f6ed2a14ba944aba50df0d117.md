---
date: "2026-08-13"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "78df3f6ed2a14ba944aba50df0d1179e95ca20d8"
---


subtype: cycle-retro
cycle_n: 2065
chain_selected: fix-incident
outcome: success

plan #24 Phase 3c(수렴 픽 H2H) 착수 전 실측 확인 중 mlb-pipeline.ts
runPredictFinal 이 실측 팩터를 계산에만 쓰고 predictions breakdown 컬럼엔
저장 안 하던 버그 발견+fix+테스트+backfill(578/755건, PR #2921 merged
053afa25). 검증 과정에서 훨씬 큰 문제 발견 — teams/games 테이블에 MLB row
가 0건이라 /mlb/matchup·/mlb/team 이 Phase 1(cycle 2054)부터 프로덕션에서
항상 0경기로 렌더링되고 있었음(4 cycle 동안 테스트 통과에도 불구, curl
실측으로만 드러남). 별도 lesson 커밋(4ea9f46d, 사례 22)으로 박제 —
"테스트 통과 ≠ 프로덕션 검증" 프로세스 갭 일반화. next_recommended_chain =
fix-incident(heavy) 또는 신규 plan, teams/games FK gap 전담 (Tier 3, plan
#24 범위 밖).

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
