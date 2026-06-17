---
title: PR Branch Old-Base Audit Failure — BRANCHED 상태에서 security patch 미반영
category: ci-github-actions
date: 2026-05-12
tags: [audit, branched, security-patch, pr-branch, nextjs, protobufjs]
confidence: 3
recurrence: 3
---

## 문제

`pnpm audit --audit-level high` CI gate 가 자동 생성된 PR (daily-ingest, auto-ingest) 에서 실패.

## 증상

```
✗ Run pnpm audit --audit-level high
Process completed with exit code 1
```

main branch CI 는 통과하는데 PR CI 만 실패. PR이 `old origin/main` 기반이기 때문.

## 발생 조건

1. local main 에 security patch 커밋 (예: Next.js CVE fix) 이 있음
2. push 정책상 해당 패치가 origin/main 에 반영되지 않은 상태 (**BRANCHED** — zero-touch push 정책)
3. 이 상황에서 origin/main 기반으로 PR 브랜치 자동 생성됨 (daily-ingest, auto-ingest)
4. PR 브랜치의 package.json 에 patch 이전 버전 존재 → audit high 취약점 잔존

## 근본 원인

**zero-touch push 금지 정책 + security patch 비동기 구조**. 허브는 local commit 을 즉시 push 하지 않는다 (`feedback_deploy_strategy`). Vercel 100 deploy/일 한도 보호. 그러나 origin 기반으로 생성되는 워크플로 PR 은 patch 이전 상태를 보게 된다.

**패턴 구조**:
```
local main: ...[security-patch]...[other commits]  ← patch 있음
origin main: ...[기존 commit]                       ← patch 없음 (push 대기)
auto-ingest PR: origin 기반 생성 → package.json 구버전
```

## 해결

### 단기 (R6 사용자 영역): push 실행
```bash
git push origin main
```
→ PR CI 자동 재실행 → audit 통과 (PR branch 는 base merge 후 재평가)

또는 PR branch 직접 rebase:
```bash
git checkout auto-ingest/geeknews-YYYYMMDD
git rebase origin/main  # push 완료 후
git push --force-with-lease origin auto-ingest/geeknews-YYYYMMDD
```

### 장기 (예방): push 주기 단축
- security patch 커밋 후 즉시 batch push 실행 (사용자 주도)
- 또는 `fix-incident` chain 에서 security patch 커밋 시 TODOS.md 에 "즉시 push 권장" 항목 박제

## 체크리스트

- [ ] local main 에 security patch 가 있는가? `git log --oneline origin/main..HEAD | grep -i "fix\|cve\|patch\|upgrade"`
- [ ] origin main 이 앞서 있는가? `git rev-list --left-right --count origin/main...main`
- [ ] push 후 PR CI 자동 재실행 확인: `gh run list --branch <pr-branch>`

## 재발 이력

| 날짜 | PR | 원인 | 해결 |
|------|-----|------|------|
| 2026-05-12 | #418, #421 | Next.js 16.2.3 (cycle 295 patch 미push) | cycle 303 root cause 확인, push 대기 |
| 2026-05-12 | (moneyball 22건 batch) | protobufjs CVE — develop-cycle 브랜치 8건 + main 14건 | protobufjs >=7.5.6 fix PR #546 머지로 해소. cycle 452 triage CLOSE |
| 2026-06-16 | (moneyball 28건 batch) | ws <8.21.0 (Memory exhaustion DoS) + vite <=8.0.15 (server.fs.deny bypass on Windows) — cycle 1205-1207 SEO wave CI 전체 실패 | hub issues #1584,#1612-#1649 batch-close (cycle 1110 triage). fix: moneyball `pnpm update ws vite` 후 재push 필요. |

## 연관 솔루션

- `ci-github-actions/2026-05-07-billing-block-all-workflows-blocked.md` — push 정책 근본 배경
