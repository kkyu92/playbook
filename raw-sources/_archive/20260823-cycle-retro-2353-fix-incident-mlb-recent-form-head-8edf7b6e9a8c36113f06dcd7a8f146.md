---
date: "2026-08-23"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "8edf7b6e9a8c36113f06dcd7a8f1465e2dbc89b0"
---


subtype: cycle-retro
cycle_n: 2353
chain_selected: fix-incident
outcome: success

cycle 2349가 elo(10%)만 mlb_team_elo 실측으로 연결하고 나머지 3팩터(recent_form/head_to_head/
defense_sfr, 13%+5%)는 Tier 3로 남겼으나, 직접 코드 확인 결과 recent_form/head_to_head 는
mlb_schedule 기존 데이터(status='final' 행)만으로 계산 가능한 단순 wiring 누락임을 발견해
이번 cycle 범위로 분리 처리. mlb-pipeline.ts runPredictFinal 이 시즌 종료 경기 조회 →
신규 순수 함수(factors/mlb-form.ts)로 최근 10경기 승률 + 시즌 h2h 계산 → 계산 입력 +
predictions 컬럼 양쪽 실측 반영. 13%(10%+3%) 가중치 silent no-op 해소. commit a8d18c0e.

다음 cycle 추천 = review-code(heavy, waterfall/factor-detail/overview 표시 레이어 동기화 —
cycle 2349→2352 elo 패턴과 동일 자연 후속) 또는 explore-idea.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
