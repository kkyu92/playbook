---
title: "INDEX.md rebase conflict — BRANCHED 상태에서 자동 재생성으로 해소"
date: "2026-06-11"
category: develop-cycle-hub
recurrence: 3
status: known-fix
---

# INDEX.md rebase conflict — auto-regenerate

## 문제

허브 BRANCHED 상태 (origin/main N ahead + local M ahead) 에서 moneyball auto-ingest PR 또는 hub cycle commit 이 동시에 INDEX.md 를 수정하여 rebase/merge 시 충돌 발생.

증상:
```
CONFLICT (content): Merge conflict in INDEX.md
Auto-merging INDEX.md
```

충돌 내용: 타임스탬프 라인, 엔트리 목록 순서, connections 섹션 diff.

## 원인

INDEX.md 는 `node scripts/generate-content-manifest.mjs` 자동 생성 파일. moneyball PR squash merge + hub cycle commit 이 각자 다른 엔트리/connections 으로 INDEX.md 를 갱신 → 3-way merge 불가 충돌.

## 해결

INDEX.md 는 **생성 파일** — 수동 충돌 해소 X. 재생성이 항상 최선:

```bash
node scripts/generate-content-manifest.mjs
git add INDEX.md
git rebase --continue  # 또는 git commit (merge 경우)
```

`generate-content-manifest.mjs` 는 현재 `content/` 상태에서 완전 재생성.
충돌 측 변경사항 무시해도 됨 — 전체 재계산이라 data loss 없음.

## 사전 탐지

```bash
# rebase/merge 전 INDEX.md 충돌 리스크 확인
git diff origin/main -- INDEX.md | wc -l  # 0 이 아니면 충돌 가능
```

BRANCHED (origin N ahead) 상태에서 INDEX.md 수정 사이클 직후 rebase 시도 = 충돌 확률 높음.

## 체크리스트

- [ ] `git rebase origin/main` 또는 `git merge origin/main` 전 BRANCHED 여부 확인
- [ ] INDEX.md 충돌 발생 시 `git checkout -- INDEX.md` 후 `node scripts/generate-content-manifest.mjs` 실행
- [ ] 재생성 후 entry 수 확인 (`grep "## 엔트리" INDEX.md`)

## 재발 이력

| 날짜 | 커밋 | 원인 |
|---|---|---|
| 2026-05-XX | `36a629b` | merge origin/main — INDEX.md regenerate + orphan link 제거 |
| 2026-05-XX | `59bfecc` | merge: origin/main — INDEX regen |
| 2026-06-10 | `3bf455e` | cycle 1084 fix-incident — PR #1449 journal-053 rebase conflict |

## 관련

- Solution: `2026-05-14-fake-batch-anti-pattern.md`
- Wiki: `content/harness-engineering/drift-detection-methodology.mdx`
- CLAUDE.md: 드리프트 감지 프로토콜 Level 0 (`git fetch origin`)
