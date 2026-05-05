---
date: "2026-04-30"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
fingerprint: "cd7927440eb03ead13bf657890c4f2bf2894c974"
---


폐기:
- .github/workflows/self-develop.yml (삭제)
- cloudflare-worker/src/worker.ts: dispatchSelfDevelop 함수 + UTC 00:17 분기 (삭제)
- 실제 자연발화 라인 끊음 — KST 09:17 자율 fire 더 이상 발생 안 함

도입:
- ~/.claude/skills/develop-cycle/SKILL.md (글로벌 skill, git untracked)
- /develop-cycle [N=1] 호출 시 N 사이클 반복 (진단 → 결정 → 실행 → commit → push → 회고)
- 컨텍스트 75% 도달 시 handoff save 자동 제안 + carry-over

CLAUDE.md 갱신:
- "자율 수정 범위 정책 R6" 섹션 → "develop-cycle skill (R6 재정의)" 으로 재작성
- 마이그레이션/인프라 섹션의 self-develop.yml 항목 → "폐기 (2026-04-30)" 표시

폐기 이유:
- 자연발화 cron 의 자율성 매력 < 진단 비용
- runner 휘발 worktree, OAuth 회전, push step 누락 사고 등 운영 부담
- 사용자 직접 trigger 가 더 명확 — carry-over 도 handoff save 로 자연스럽게 이어짐

submit-lesson.yml 은 그대로 유지 (4 prefix dispatch). develop-cycle 의 lesson commit 도 동일 dispatch.

직접 trigger: 본 fire 1/10 (run 25143549379) 의 push step 누락 사고가 폐기 결정의 발화점.

본 commit 자체가 develop-cycle 의 첫 사용 사례 — manual 호출 → 인프라 정리 → main 직접 patch → push.
