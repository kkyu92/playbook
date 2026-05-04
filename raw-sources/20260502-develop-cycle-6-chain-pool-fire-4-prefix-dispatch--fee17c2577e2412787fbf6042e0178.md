---
date: "2026-05-02"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
fingerprint: "fee17c2577e2412787fbf6042e0178d71404f3d4"
---


본 lesson 은 별도 commit 으로 분리하여 submit-lesson workflow 에 dispatch.
lesson md 본문은 직전 fix(ci) commit 에 이미 추가됨. 본 commit 은 메타 한 단락
보강 + lesson prefix 로 4 prefix 정책 (lesson/policy/feedback/memory) trigger.

박제 5건 핵심:
1. 회피 신호 = LLM 추론 input, 강제 X
2. skill ceremony lite 모드 (N 사이클 budget 보존)
3. auto-merge R7 closed loop 작동
4. silent quality drift 정량 cost (4 cycle 누적 12+12 errors)
5. operational-analysis trigger 부족 (sp_log 5일치)

🤖 develop-cycle/6 lesson commit

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
