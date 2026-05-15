---
date: "2026-05-15"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "c23ff292b9358fd39249b5bbb7e2ac10db1ab2d3"
---


subtype: cycle-retro
cycle_n: 448
chain_selected: review-code (heavy)
outcome: success
commit: 9899512
pr: #481

summary: cycle 445 가 scoring_rule 만 CURRENT_SCORING_RULE 통합. model_version literal
('v1.8' / 'v1.8-postview' / 'v1.8-live') 3개 + buildAccuracyData FALLBACK_VERSIONS 4개
영역 하드코드 family 발견. 신규 packages/shared/src/model-version-labels.ts 박제로
v2.0 bump 시 CURRENT_SCORING_RULE 1줄 변경 = 4곳 동시 박제 보장. silent drift family
7번째 (cycle 420 / 443 / 445 / 446 후속, 4 연속 cleanup streak).

shared 패키지 위치 선택: kbo-data 의 @sentry/nextjs dynamic import 가 apps/moneyball
의 vitest 에서 buildAccuracyData.test 안 transitive import 시 해결 실패. shared 는
sentry 의존 X → 양쪽 package 안전.

tests: 1048 PASS / type-check PASS / ship rate 12/13 (92.3%).
next_recommended_chain: 메인 자유 추론 — 4 연속 review-code (heavy) streak. polish-ui
gap=7 / fix-incident gap=14 / op-analysis gap=8 (n=99/150 미달) / info-arch gap=16 /
dimension-cycle fallback 자연. 사용자 N=26 잔여=25.
