---
date: "2026-08-23"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "4a2d29714bac6e5b9617b21db0df32d538dd6cd1"
---


subtype: cycle-retro
cycle: 2357
chain_selected: fix-incident
outcome: retro-only

pipeline_runs DB 직접 조회 결과 predict_final mode가 8/16-8/22 6일 연속
games_found=5/predictions=0 패턴을 보여 사례 11 family(silent drop) 재발
의심으로 조사. games 테이블 조인 확인 결과 predict 모드가 이미 게임 시작 전
대부분/전부 예측 완료, predict_final 도달 시점엔 모든 경기가 final/postponed
상태라 shouldPredictGame의 status-check 우선순위(already_predicted보다 먼저
not_scheduled 반환)에 의해 정상 스킵되는 의도된 설계임을 확인
(pipeline-schedule.test.ts 156-198행에 명시적으로 테스트됨). daily.ts의
별도 gap-check(line 1055)가 final/postponed/live 제외한 expected로 진짜
누락만 잡아내도록 분리 설계되어 있고 6일간 GAP 알림 없음 확인. 코드 변경 없음.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
