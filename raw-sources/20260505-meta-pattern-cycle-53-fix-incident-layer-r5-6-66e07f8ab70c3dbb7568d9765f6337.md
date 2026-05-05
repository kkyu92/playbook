---
date: "2026-05-05"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "66e07f8ab70c3dbb7568d9765f6337de12141052"
---


subtype: meta-pattern
pattern: "fix-incident chain 의 fix 가 직전 layer (silent gap / pane wrapper / fire 시퀀스 / ensure_session) 차단 PASS 했음에도 다음 layer (warm-up race / FIRE_PENDING 덮어쓰기 실패 / 새 claude 진단 진입 미실측) 에서 잔여 한계 노출. R5 정정 누적 6번째 패턴."

evidence (cycle_n list):
- cycle 25/26 → cycle 33: "watch.sh fire 검증됐다" 거짓 (fix=PPID chain ancestor 매칭)
- cycle 39+40 → cycle 41: "base PR 자동 fire 작동" 거짓 (fix=fire 시퀀스 /exit + C-d + handoff load + develop-cycle)
- cycle 41 → cycle 42: "fire 시퀀스 검증됐다" 거짓 (fix=cycle 42.5 hotfix mcc alias bash wrapper)
- cycle 42.5 → cycle 43: "smoke + SIGINT survival 통과" 거짓 (fix=ensure_session pane wrapper 검증)
- cycle 42.5 → cycle 43: "session 검증 충분" 거짓 (fix=pane_pid comm=bash case 분기)
- cycle 48 → cycle 53 (현재): "FIRE_PENDING + check_timeout 충분" — silent gap 차단 PASS 했으나 warm-up race 차단 X. **6번째 후보 (정식 박제는 다음 진짜 차단 fix PR 머지 시점)**

pattern_description:
fix-incident chain 의 ship 시점에 isolated smoke / single 실측 / partial 검증 으로
"fix 충분" 박제하면 다음 layer 의 잔여 한계 발현 시 거짓 박제 노출. 매 fix 가
직전 layer 차단 PASS 함과 동시에 다음 layer 잔여 한계 명시 + Iron Law 준수
(추측 fix 회피, evidence 결정적 시점까지 logging 만 보강) 하면 R5 정정 누적
잡음 차단.

recommended_action:
- fix-incident chain 의 ship 박제 시 outcome=success 단정 회피. 다음 layer
  잔여 한계 명시 (cycle 48 → cycle 53 의 PARTIAL 박제 패턴 재현)
- isolated smoke 단독 = success 박제 X (cycle 49 SKILL.md 룰 박제 — 본 패턴 검증)
- 단일 실측 = evidence 결정적 X 경우 logging 보강 + 다음 자연 발화 대기
- R5 누적 카운트 박제 (메모리 메타 패턴) — fix-incident chain 의 자기 한계 명시

related_memory:
- memory/feedback_diagnose_existing_artifacts_first.md (carry-over read first)
- meta-pattern cycle 49 — SKILL.md chain 균형 trigger 강화 (cycle 49 룰 = 본 패턴 차단 도구)
- meta-pattern cycle 51 — SKILL.md milestone 50 + cycle 49 룰 cycle 50 PASS

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
