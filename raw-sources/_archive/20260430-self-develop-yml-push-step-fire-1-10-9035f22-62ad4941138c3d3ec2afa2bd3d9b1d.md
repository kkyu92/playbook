---
date: "2026-04-30"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
fingerprint: "62ad4941138c3d3ec2afa2bd3d9b1d0569e7e762"
---


본 fire 25143549379 (수동 trigger 검증) 결과:
- Claude turn 정상 (auto 결정 + 9035f22 commit 작성)
- 그러나 commit 후 git push step 부재 → self-hosted runner _work/ 에만 잔존
- main worktree + origin/main 둘 다 9e9e97f 그대로 (silent drop)

근본 원인: workflow 가 Claude 의 commit 후 push 를 강제 안 함.
Claude prompt 의 Step 3 ("branch agent-loop/<slug> + PR") 패턴도
실제로는 main 직접 patch 로 변용됨 (claude-code-action OAuth PR 권한 차단 carry-over).
어느 패턴이든 push step 자체가 없으면 결과물 영구 손실.

수정: Claude turn step 직후 push step 추가 (`if: success()`).
- main 직접 patch + agent-loop/* branch 양쪽 모두 push (`git push origin --all`)
- diff 가 없으면 skip (no-op)
- failure 시는 self-report 가 작동 (push step 은 success 시만)

복구: runner worktree (~/actions-runner-moneyball/_work/...) 에서 9035f22 살아있음.
git format-patch + git am 으로 main worktree 에 1ec77f6 으로 적용 완료.

drift 사례 박제: feat/lesson commit 이 main 에 있다고 해서 실제로 push 됐단 뜻 아님.
self-hosted runner 작업은 항상 push step 명시 강제.
