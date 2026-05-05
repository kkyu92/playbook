---
date: "2026-05-04"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "712b1e10ed05d981aabf2d41e49eeb5449adcb54"
---


subtype: meta-pattern
description: R5 강화 룰 (실측 fire PASS 또는 사용자 자연 발화 검증) 의 누적 적용 6번째.
isolated smoke 통과 = 충분 X 패턴 박제 6번째.

evidence:
- cycle 25/26: watch.sh fire 가짜 (정정 33 PPID chain)
- cycle 39/40: base PR 자동 fire 가짜 (정정 41 fire 시퀀스)
- cycle 41: fire 시퀀스 가짜 (정정 42 first fire)
- cycle 42.5 hotfix: smoke + SIGINT 가짜 (정정 42.5 22:06 second fire)
- cycle 42.5 ensure_session: session 검증 가짜 (정정 43 pane wrapper)
- cycle 43 pane wrapper: 자동 fire 충분 가짜 (정정 48 본 hang = silent gap fix)

pattern: 매 fix 가 다음 layer 잔여 한계 노출. R5 룰 = 추측 차단 의존.

recommendation:
1. cycle 49 first real fire 실측 = 본 fix 잔여 한계 (a) warm-up 30s+ race
   (b) send-keys 도달 후 TUI 무시 (c) /handoff load hang 검증
2. R5 룰 자체 stop 조건 = "isolated smoke ≠ success 박제" 강화 (cycle 46 SKILL.md
   적용 후 본 cycle 48 = 첫 살아있는 적용 검증 대기)
3. meta-pattern 6번째 누적 = "verification-cycle" chain 후보 가치 평가 시점

reference: cycle 48 spec + cycle 47 R5 강화 룰 첫 적용 (PR #181 retry race catch)
