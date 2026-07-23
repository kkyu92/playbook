---
date: "2026-07-23"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
fingerprint: "23c9639f9b1d2dcb63c31f5a5d45456a3a33ff9f"
---


subtype: lesson
cycle: 2000

CLAUDE.md R7 (자동 머지 정책) 이 `gh pr merge <#> --squash --auto --delete-branch` 를
전제하나, 본 repo 는 GitHub 설정상 "Allow auto-merge" 가 비활성화되어 있어
`--auto` 플래그가 `GraphQL: Auto merge is not allowed for this repository
(enablePullRequestAutoMerge)` 로 즉시 실패함 (PR #2856 실측, cycle 2000).

**대응**: `--auto` 실패 시 fallback — CI checks green 확인 후 `--auto` 없이
`gh pr merge <#> --squash --delete-branch` 직접 실행. develop-cycle 세션은
Monitor 로 `gh pr checks` 를 polling 하여 전부 non-pending 될 때까지 대기 후 merge.

**후속 (사용자 영역)**: repo Settings → General → Pull Requests → "Allow auto-merge"
체크 시 향후 사이클부터 `--auto` 정상 작동. 본 메인은 repo 설정 변경 API 권한 없음
(GitHub REST `PATCH /repos/{owner}/{repo}` 의 `allow_auto_merge` 필드로 사용자가
직접 활성화 가능 — 참고용, 본 메인 자율 변경 대상 아님).
