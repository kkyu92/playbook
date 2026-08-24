---
date: "2026-08-24"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "95c9d223087d16fd3f158945e28841001c90b96a"
---


subtype: cycle-retro
cycle_n: 2510
chain_selected: review-code (heavy)
outcome: success
next_recommended_chain: review-code

sibling 파일 대조(computeWeekRange.ts vs computeMonthRange.ts)로 KST_OFFSET_MS
family(wave 145) 3번째 재발 지점(월 경계 raw UTC) 발견 + 정정. 감사 대상
page.tsx 자체는 문제 없었고 import 체인의 lib 유틸에서 발견 — silent drift
family 재발 탐지 패턴이 "같은 디렉토리 sibling 함수 대조"로도 유효함 확인.
