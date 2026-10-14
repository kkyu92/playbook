---
date: "2026-10-14"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "e992b86cd9865734e4e396b05e222732eac33054"
---


subtype: cycle-retro
cycle_n: 3189
chain_selected: review-code(heavy)
outcome: SUCCESS
retro.summary: packages/kbo-data/src/pipeline/backtest-{manual-weights,grid,v3,wayback}-run.ts 4개 전수 감사. backtest-manual-weights-run.ts sp_fip/lineup_woba 비대칭-null(편측 결측 시 4.5/0 기본값) 팩터 왜곡 버그 1건 발견+수정(sfr 패턴/predictor.ts WAR-SFR 패턴과 동일 클래스) + 헤더 "4 모델" stale 서술 정정. 나머지 3개 drift 0건(cycle 3161 PR #3151 이 이미 1차 스윕 완료 확인). tsc --noEmit + vitest(96파일/1216테스트) + eslint 전체 통과. 서브에이전트가 진단 단계 추정(400+ cycle 전 감사)을 실행 중 git log 재확인으로 정정(실제 cycle 3161).
next_recommended_chain: review-code(heavy) 또는 lotto(gap 21)
next_recommended_reason: lib/leaderboard·lib/standings 마지막 전수감사 cycle 2863/2866(320+ cycle 전)로 review-code(heavy) 재탐색 후보. lotto/info-arch/fix-incident/op-analysis 전부 gap 미도달 또는 Tier4 비actionable.
