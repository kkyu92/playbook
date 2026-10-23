---
date: "2026-10-23"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "6acb3e1ddf8bf3549217f6933857a510dc27de19"
---


subtype: meta-pattern
cycle: 3601

informational only — 사용자 결정 요청 아님.

phase59 skill-evolution 감사(직전50 cycle 3551-3600 전수 대조) 중 발견한
cycle-retro commit subject 포맷 drift 2건:

1. cycle 3566 — retro commit 2개 중복 생성 (04c62fa5 / 739323f0, 둘 다
   "cycle-retro 3566" 라벨). chain 분포 집계가 실제 cycle 수보다 +1 과대.
2. cycle 3567 — subject 가 "...ship-0 emergency-stop 발동" 으로 끝나
   표준 대문자 접미사(EMERGENCY-STOP) 누락. outcome 집계(SUCCESS/
   RETRO-ONLY/EMERGENCY-STOP) 어디에도 안 걸려 완전 silent 누락 —
   실제 ship-0 hard-stop 은 3564+3567 2회 발생했는데 단순 grep 은 1회로 집계.

두 drift 가 우연히 상쇄돼 총합(50)은 맞았지만 개별 분포는 틀림
(review-code 42%→실제 41%, emergency-stop 1건→실제 2건).

대응: SKILL.md 에 "커밋 subject 접미사 표준화" 3차 방어선 추가
(SUCCESS/PARTIAL/RETRO-ONLY/EMERGENCY-STOP/FAIL 중 하나로 끝나야 함
의무화 + 같은 cycle_n 재커밋 전 기존 존재 확인 의무화). PR #3192 로
SKILL.md/MIGRATION-PATH.md 갱신 완료.

과거 커밋 2건은 소급 수정 안 함(git history 불변) — MIGRATION-PATH.md
phase59 entry 에 정정값만 박제.
