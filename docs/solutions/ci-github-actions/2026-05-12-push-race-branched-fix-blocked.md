---
title: auto-ingest push race — BRANCHED로 수정 origin 미배포 → 재발 루프
category: ci-github-actions
date: 2026-05-12
tags: [auto-ingest, push-race, branched, concurrent-dispatch, push_main_with_retry]
confidence: 3
recurrence: 5
---

## 문제

`auto-ingest.yml`의 `push_main_with_retry` 함수가 concurrent dispatch 시 add/add git conflict로 실패. 수정 후에도 BRANCHED 상태로 origin 미push → 동일 버그 재발.

## 증상

auto-ingest self-report issue 자동 생성:
```
🚨 허브 auto-ingest 실패 — silent drop 방어
```
GH run log:
```
fatal: could not apply ... (concurrent add same file)
⚠️ push 실패 (attempt N/5) — pull --rebase 후 재시도
```

## 발생 조건

1. 동일 fingerprint에서 concurrent dispatch 복수 발생 (예: 같은 CI 실패가 3회 동시 재시도)
2. `push_main_with_retry` 가 동시에 git add + push 시도
3. 선착 1건 push 성공 → 나머지는 pull --rebase 시 add/add conflict

## 근본 원인 — BRANCHED 차단 재발 구조

```
cycle 354 수정 (708be8f) → local commit → BRANCHED → origin 미push
origin 구버전 유지 → 다음 concurrent dispatch에서 동일 레이스 재발
```

수정 5회 이력:
| 사이클 | 커밋 | 수정 내용 |
|--------|------|-----------|
| cycle 29 | f9c59c2 | raw backfill partial, carry-over |
| cycle 47 | 0339d1e | retry 강화, silent drop 차단 |
| cycle 354 | 708be8f | add/add 충돌 후 `git cat-file -e "origin/main:$f"` 존재 확인 → return 0 |
| cycle 357 | a3057da | false-positive 수정 + diagnostic 개선 + word-splitting 방어 |
| cycle 359 | — | BRANCHED로 354+357 수정이 origin 미push → 재발 확인 |

## 현재 LOCAL 수정 상태 (cycle 357 기준)

```bash
push_main_with_retry() {
  local -   # set -euo pipefail 격리
  set +e
  for attempt in 1 2 3 4 5; do
    if git push origin main; then return 0; fi
    if ! git pull --rebase origin main; then
      git rebase --abort 2>/dev/null || true
      git fetch origin main --quiet || true
      local raw_files
      raw_files=$(git diff-tree --no-commit-id -r --name-only HEAD 2>/dev/null | grep "^raw-sources/" || true)
      [ -z "$raw_files" ] && return 1
      local already_in_origin=true
      while IFS= read -r f; do
        git cat-file -e "origin/main:$f" 2>/dev/null || { already_in_origin=false; break; }
      done <<< "$raw_files"
      [ "$already_in_origin" = "true" ] && return 0
      return 1
    fi
    sleep $((attempt * 2))
  done
  return 1
}
```

## 해결

### 단기 (R6 사용자): BRANCHED 해소
```bash
git pull origin main --no-rebase  # merge
git push origin main              # 수정 배포
```

### 예방: CI-critical workflow 수정 시 즉시 batch push 권장
- `fix:` prefix + workflow 수정 시 → 자동으로 TODOS.md에 "즉시 push 권장" 박제

## 재발 이력

| 날짜 | 이슈 | 원인 | 결과 |
|------|------|------|------|
| cycle 29 | #179 stuck OPEN | silent drop | partial |
| cycle 47 | PR #180 | retry 미흡 | PR fix |
| 2026-05-12 cycle 354 | #519 (v1) | add/add conflict | local fix (708be8f) |
| 2026-05-12 cycle 359 | #519 (v2) | BRANCHED → 수정 미배포 | R6 push 대기 |

## 연관 솔루션

- `ci-github-actions/2026-05-12-pr-branch-old-base-audit-failure.md` — 동일 meta: BRANCHED 차단으로 수정이 origin에 미반영
