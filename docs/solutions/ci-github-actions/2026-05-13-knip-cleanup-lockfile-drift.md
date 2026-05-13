# [ci-github-actions] knip cleanup 후 pnpm-lock.yaml 미갱신 패턴

**날짜**: 2026-05-13
**발생 파일**: `kkyu92/moneyballscore: apps/moneyball/package.json` + `pnpm-lock.yaml`
**관련 커밋/이슈**: hub issues #552/#553/#555 (commits `760501c`, `6fa51b5`)
**재발 여부**: 첫 기록 (단발) — moneyball cycle 353 review-code heavy

## 문제

moneyball main CI `pnpm install --frozen-lockfile` 실패:

```
ERR_PNPM_OUTDATED_LOCKFILE  Cannot install with "frozen-lockfile"
because pnpm-lock.yaml is not up to date with <ROOT>/apps/moneyball/package.json

Failure reason:
* 1 dependencies were removed: @testing-library/user-event@^14.6.1
```

## 원인

cycle 353 `review-code (heavy)` — knip 분석에서 `@testing-library/user-event` 미사용 감지 후 `package.json`에서 제거. 그러나 `pnpm install` 실행 없이 바로 커밋 → `pnpm-lock.yaml` stale.

CI 환경은 `pnpm install --frozen-lockfile` (기본값) 사용 → lockfile mismatch = 즉시 exit 1.

- **commit 760501c** (`refactor(dead-code): knip 0 이슈`): package.json 변경 + lockfile 미갱신
- **commit 6fa51b5** (`policy: cycle 353 retro`): lockfile 여전히 stale → 동일 CI 실패 연쇄

## 해결

moneyball 워커 세션에서:

```bash
cd apps/moneyball
pnpm install                # lockfile 재생성
git add pnpm-lock.yaml
git commit -m "fix: update pnpm-lock.yaml after @testing-library/user-event removal"
```

**수정 범위**: moneyball 워커 세션에서 처리 (hub 자율 처리 불가 — R6 외부 레포).

## 사전 탐지 방법

```bash
# knip 으로 package 제거 시 반드시 pnpm install 후 lockfile diff 확인
pnpm install
git diff pnpm-lock.yaml | head -30
# lockfile 변경 있으면 함께 커밋 의무
```

```bash
# CI 환경 재현 (frozen-lockfile 모드)
pnpm install --frozen-lockfile
# exit 0 이어야 커밋 가능
```

## 패턴 일반화

- **dependency 추가/제거 시**: `package.json` 변경 = lockfile 변경 의무 쌍. 한쪽만 커밋 = CI 차단.
- **knip 자동 cleanup**: knip 이 자동으로 package.json 수정 시 (`--fix`) lockfile 재생성 자동화 필요.
- **LLM 에이전트 주의**: knip cleanup 스크립트가 typecheck/test는 통과해도 lockfile은 별도 확인 필요 (test 에서 lockfile 검증 안 함).

## 체크리스트

- [ ] moneyball: `pnpm install` 실행 + `pnpm-lock.yaml` 갱신 커밋
- [ ] moneyball CI PASS 확인 (commit 6fa51b5 이후 첫 green)
- [ ] hub issues #552/#553/#555 close
- [ ] Vercel Production 재배포 자동 트리거 (CI green 후)

## 관련

- [compareModels-shadow test sync gap](2026-05-13-refactor-const-rename-test-sync-gap.md) — 유사: 리팩터 후 동기화 누락 패턴
- hub issue: #552 (Vercel), #553 (CI 760501c), #555 (CI 6fa51b5)
- TODOS: moneyball lockfile fix carry-over
