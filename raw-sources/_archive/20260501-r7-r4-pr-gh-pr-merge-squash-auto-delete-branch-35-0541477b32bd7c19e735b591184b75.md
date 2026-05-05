---
date: "2026-05-01"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "0541477b32bd7c19e735b591184b75d3d92e3cb8"
---


R4 (자동 commit) 의 PR 차원 확장. 본 메인이 만든 PR + CI green → 묻지 않고
즉시 auto-merge 활성화. develop-cycle 사이클 운영을 사용자 머지 confirm 없이
closed loop 자동화.

자동 적용 대상:
- 본 메인이 직접 작성한 PR (4 prefix + feat/fix/data/content/refactor/docs
  /build/ci/perf/test/style + Conventional Commit scope)
- develop-cycle 워커가 만든 PR (develop-cycle/<slug> branch + label)

예외 (사용자 확인 필요):
- 외부 작성자 PR (dependabot, renovate, 사용자 직접)
- main force-push / 충돌 / CI red
- 대규모 변경 (100+ 파일 / breaking change)
- PR description 또는 label 에 do-not-auto-merge / draft / wip
- secrets/credentials 포함 PR

역사적 갭 (#34 이전): lesson 차원 PR squash 머지 시 silent skip → PR #32 가
회피 위해 --merge 강제. fix #34 (PR /commits API fallback) 머지 후 squash 도
안전. R7 시점부터 squash default.

Co-authored-by: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
