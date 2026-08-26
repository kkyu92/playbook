---
date: "2026-08-26"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "097c23f36ffdf3808ee58ad698bc44762f0a4332"
---


subtype: cycle-retro
cycle_n: 2638
chain_selected: review-code (heavy)
outcome: success

review-code(heavy) 재발화 — cycle 2636 이 "injection-validation family 4곳 모두 소진" 선언했으나
형제 경로(judge-postview) 대비 검증 비대칭이던 5번째 call site (runTeamPostviewAgent, postview.ts)
발견. team/judge/calibration/postview-judge 4곳 고친 것과 동일 패턴 — summary/missedBy LLM 텍스트가
/analysis/game/[id] PostviewPanel 에 검증 없이 직결됨. buildTeamPostviewExtraInjection 추가 +
validateJudgeReasoning/notifyValidationViolations/logValidatorEvent/maskViolatedReasoning 배선.
테스트 2건 추가(환각 마스킹 + 정당인용 false-positive guard), pnpm test 568파일/4465 테스트 통과.
main 직접 commit+push (e8bb7b80), 단일 논리 단위라 PR 생략.

교훈: "N곳 모두 소진" 결론은 실제 완전탐색이 아니라 확인된 call site 기준이었을 수 있음 —
형제 경로 존재 시 비대칭 검증 상태를 별도로 재확인할 가치 있음.

다음 추천: polish-ui 또는 info-architecture-review (review-code 이번 포함 last20 dominance 65%,
진짜 다양성 확보 필요).

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
