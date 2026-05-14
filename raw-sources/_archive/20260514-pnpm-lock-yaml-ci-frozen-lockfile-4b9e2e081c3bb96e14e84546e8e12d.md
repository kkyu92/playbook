---
date: "2026-05-14"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
fingerprint: "4b9e2e081c3bb96e14e84546e8e12de91f5f0213"
---


subtype: lesson
fingerprint: ci-pnpm-lockfile-drift

## 사례

2026-05-07~13 기간 main 커밋 10+ 건에서 CI "pnpm install --frozen-lockfile" 실패.
원인: package.json 에서 의존성 제거(tsx, @testing-library/user-event) 후
pnpm-lock.yaml 를 커밋 없이 main 으로 push.

## 근본 원인

develop-cycle 이 package.json 변경을 포함한 커밋을 push 하면서
pnpm-lock.yaml 의 updated dirty state 를 누락. 특히 직접 push main 워크플로우에서
pre-commit hook 이나 CI pnpm install 검증 없이 커밋 가능.

## 대응

1. pnpm install 재실행 → frozen-lockfile PASS 검증 후 pnpm-lock.yaml 포함 커밋
2. 10개 lesson-pending GH 이슈 수동 close

## 재발 방지

package.json 변경 커밋 전 반드시 pnpm install + pnpm install --frozen-lockfile PASS 확인.
pnpm-lock.yaml 이 unstaged 상태면 반드시 같은 커밋에 포함.
