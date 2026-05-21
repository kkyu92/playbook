# [ci-github-actions] 워커 신규 기능 무조건부 주입 → 테스트 기댓값 불일치

**날짜**: 2026-05-21
**발생 파일**: `src/lib/editor.ts`, `src/lib/__tests__/editor.test.ts` (blog-autopilot)
**관련 PR/커밋**: issue #1045 (feat(adsense) commit, cycle 952), issue #1046 (chore(adsense) f6e1abd, cycle 953)
**재발 여부**: 2nd 재발 (blog-autopilot CI → 허브 dispatch 2회)

## 문제

blog-autopilot `feat(adsense)`: author box를 HTML 출력에 무조건부로 주입하는 코드 추가.
이후 `editor.test.ts`의 "author box 없음" 케이스들이 assertion 실패:

```
AssertionError: expected '<p>본문 내용</p><div style="margin-top:40…' to be undefined
```

워커가 새 commit (chore(adsense): About 페이지 업데이트) 푸시 후에도 동일 테스트 suite CI 실패. 허브에 incident #1045 → #1046 재발 dispatch.

## 원인

신규 기능(author box 주입)을 무조건부로 활성화한 채 관련 테스트 갱신 미실시:
1. `editor.ts`에 author box inject 로직 추가 → 모든 review 케이스에 적용
2. 기존 테스트: `modified_html === undefined` 기대 케이스 다수 존재
3. 새 inject → `modified_html` 에 HTML 문자열 반환 → `toBeUndefined()` fail

## 해결

워커 자체 fix 필요 (R6 외부 레포). 두 가지 옵션:
1. **조건부 주입**: `if (authorBoxEnabled && condition) inject` — 기존 테스트 유지
2. **테스트 업데이트**: 새 behavior 반영한 기댓값으로 갱신

허브 처리: 분석 comment 추가 후 issue close (워커 fix carry-over).

## 사전 탐지 방법

```bash
# inject 로직 추가 시 테스트 기댓값 sync 확인
grep -n "toBeUndefined\|toBe(undefined" src/lib/__tests__/editor.test.ts
# 새 inject 영향 케이스 수 미리 확인
grep -c "author.box\|inject" src/lib/editor.ts
```

## 체크리스트

- [ ] 신규 inject 기능 추가 시 관련 테스트 파일 동시 grep
- [ ] `undefined` 기대 케이스 vs 신규 기능 충돌 확인 후 push
- [ ] CI locally 돌린 후 push

## 관련

- Wiki entry: `harness-engineering/agentic-worker-incident-triage-transient-vs-structural-ci-failure-classification`
- issue #1045 (cycle 952 worker-incident-triage — 1st dispatch)
- issue #1046 (cycle 953 worker-incident-triage — 2nd dispatch)
- `docs/solutions/ci-github-actions/_compiled-truth.md`
