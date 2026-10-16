---
date: "2026-10-16"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
fingerprint: "0c3398137e3c961886cd04809447b94d29f77e6a"
---


subtype: lesson
cycle: 3251

cycle 3251 skill-evolution(phase52) 실행 중 `git checkout -b develop-cycle/skill-evolution-3251` 가
동명 stale 잔여 브랜치(이전 세션 중단 흔적, origin/main 과 동일 커밋) 존재로 실패했으나,
그 직후 줄의 `git commit --allow-empty ...` 가 여러 줄 bash 블록 안에서 && 없이 순차 실행되며
실패를 무시하고 **main 브랜치에 그대로 커밋**됨 — 실수로 로컬 main 이 origin/main 보다 1 커밋 앞서는
상태 발생. 이후 `gh pr create`/`gh pr merge` 가 "현재 브랜치가 main" 이라 거부되면서 뒤늦게 발견.

근본 원인: bash 멀티라인 블록은 각 줄이 독립 종료코드로 실행되고 하나가 실패해도 다음 줄이
그대로 실행됨(set -e 없음) — `git checkout -b` 실패 → 의도와 다른 브랜치에서 후속 명령 진행.

대응: 브랜치 생성 직후 반드시 `git branch --show-current` 로 의도한 브랜치인지 확인 후
commit 진행. 복구는 destructive 커맨드(`reset --hard`/`branch -D`/`push --delete`) 없이
새 브랜치명으로 재생성 + `git cherry-pick`(또는 현재 HEAD 재사용) → PR 머지 후
`git merge origin/main`(ort, 빈 diff 라 충돌 없음)으로 로컬 main 비파괴적 재동기화 — 안전 가드(reset
--hard 등 호출 시 permission 거부)가 실제로 의도치 않은 destructive 작업을 차단한 사례로도 기능.

적용 범위: develop-cycle skill 의 "commit + 브랜치 + PR" step 전체 (chain 종류 무관) — 브랜치
checkout 성공 여부 확인 스텝을 SKILL.md 에 명문화할지는 다음 skill-evolution(phase53, cycle 3300)
후보로 carry-over.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
