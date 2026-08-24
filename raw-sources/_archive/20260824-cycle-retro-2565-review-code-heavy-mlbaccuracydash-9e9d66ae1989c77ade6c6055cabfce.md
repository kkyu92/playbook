---
date: "2026-08-24"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "9e9d66ae1989c77ade6c6055cabfcef51f59797d"
---


subtype: cycle-retro
cycle_n: 2565
chain_selected: review-code (heavy)
outcome: success

components 대형 파일 순회 계속 — PredictionCard.tsx/PredictionCardLive.tsx 는
SMALL_SAMPLE_N family 미해당(단일 경기 신뢰도, false positive 회피) 확인 후 제외.
MlbAccuracyDashboard.tsx 팀 테이블 게이트가 import된 MIN_TEAM_PREDICTIONS 대신
로컬 TEAM_TABLE_MIN_N=3 shadow 상수 사용 발견 — cycle 2528 fix 가 같은 파일
cohortWeekHeatmap 섹션만 swap하고 팀 테이블 섹션은 놓친 partial fix 잔여.
commit e79af5d3, 회귀 테스트 silent-drift-cycle-2565.test.ts 신규.
next_recommended: review-code(heavy) 또는 explore-idea (saturation 11/15 근접).
