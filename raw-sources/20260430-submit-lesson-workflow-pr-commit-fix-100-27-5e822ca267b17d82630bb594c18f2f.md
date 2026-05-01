---
date: "2026-04-30"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
fingerprint: "5e822ca267b17d82630bb594c18f2f8832fa5376"
---


push event 의 head_commit 만 검사하던 현행 로직은 PR 머지 시 GitHub default merge commit 메시지 ("Merge pull request #N from ...") 가 4 prefix 미해당이라 silent skip. PR #26 머지 시 dispatch skip 발견 (run 25161393739, 1s) — 직접 push lesson commit 만 정상 fire (run 25143854720, 7s).

해결: commits 배열 loop 로 머지 commit 안에 포함된 lesson commit 검출. head_commit 우선 (직접 push 일반 케이스) + 매칭 없으면 commits 배열 jq filter (PR 머지 케이스). 매칭 commit 첫 번째 사용 (id + message + prefix).

- Why: silent dispatch skip = 양방향 흡수 흐름 깨짐. silent drop 진단 비용 큼 (feedback_gh_actions_cron_unreliable 패턴). PR 머지 = 가장 자연스러운 워커→허브 lesson 흐름이라 이게 silent skip 되면 100% 자동화 목표 거리.
- Impact: 미래 모든 lesson commit (직접 push + PR 머지 + squash) 모두 dispatch fire. 사용자 manual 부담 X.
- 적용 범위: 머니볼 즉시 + blog-autopilot Phase 5 진입 시 동일 패턴 (submit-lesson.yml 신규 작성 시).

Refs: kkyu92/playbook#84 (evidence #2), kkyu92/moneyballscore#26 (직전 PR — 갭 발견 트리거)

Co-authored-by: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
