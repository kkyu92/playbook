---
date: "2026-08-23"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
fingerprint: "0f102bac075f3d5e282f4bfff929ee5621a2fc68"
---


subtype: lesson
cycle: 2350

develop-cycle 진단 체크리스트가 GH issue label `hub-dispatch` 만 확인해 `lesson-pending`
라벨 reminder 18건(#3021~3038)이 조용히 누적됐다. 원인 역추적 결과 14건(ci-main-*)이
2026-08-19~20 구간 version-sync-guard.test.ts race(VERSION 파일 bump 가 package.json
bump 와 같은 커밋에 원자적으로 안 들어간 순간의 일시적 CI 실패) 동일 원인이었고, 2026-08-20
이후 커밋부터 원자적 bump 관행이 정착돼 재발 0건(현재 HEAD 기준 CI 전량 green) 확인. 나머지
4건은 이미 삭제된 develop-cycle feature branch pre-merge 실패 + fingerprint 라벨링 불일치.
코드 수정 불필요 — 18건 모두 근거 코멘트와 함께 close, memory/drift-cases.md 사례 20 박제
(재발 방지 carry-over: 진단 체크리스트에 lesson-pending 라벨 스캔 추가 검토).

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
