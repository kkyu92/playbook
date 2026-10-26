---
date: "2026-10-26"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "5ee11ba3e6a4bec9b7e609c14e5056ed84b2b7c1"
---


subtype: cycle-retro
cycle_n: 3633
chain_selected: operational-analysis (lite)
outcome: retro-only

scripts/op-analysis-ce-cohort.ts 재실행 — n=448(CE 401/비CE 47) cycle 3598/3613 수치와 완전 동일. CE 55.9% vs 비CE 63.8%, 격차 8.0pp, overlap 월 통제 격차 10.8pp 유지 — LLM 부가가치 우세 결론 52회 연속 재확인. KBO 2026시즌 10/4 종료 + CREDIT_EXHAUSTED 지속이 원인. STRUCTURAL_DRY_SPELL_SUPPRESS 15번째 적용(NO_NEW_INFO semantic 10/10, dry-spell marker <24h) — hard stop 생략, next_n=31 그대로 진행. skill-evolution trigger 전부 미충족. 코드 변경 없음.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
