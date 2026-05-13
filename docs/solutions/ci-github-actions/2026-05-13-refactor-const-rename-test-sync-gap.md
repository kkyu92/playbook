# [ci-github-actions] 리팩터 상수 rename → 테스트 동기화 누락 패턴

**날짜**: 2026-05-13
**발생 파일**: `kkyu92/moneyballscore: apps/moneyball/src/__tests__/lib/compareModels-shadow.test.ts`
**관련 커밋/이슈**: hub issue #548 (commit `91f828d`)
**재발 여부**: 첫 기록 (단발)

## 문제

moneyball main CI Test step 실패:

```
AssertionError: expected 'quant-only-shadow' to be 'v1.6-pure-shadow'
 ❯ src/__tests__/lib/compareModels-shadow.test.ts:40:37

AssertionError: expected undefined to be defined
 ❯ src/__tests__/lib/compareModels-shadow.test.ts:66:18
```

## 원인

`compareModels.ts` 리팩터에서 shadow row 의 `model_version` 상수를 rename:

```typescript
// Before
model_version: 'v1.6-pure-shadow'

// After
model_version: 'quant-only-shadow'
```

그러나 `compareModels-shadow.test.ts` 의 기댓값은 그대로 `'v1.6-pure-shadow'` 유지 → mismatch.

## 해결

moneyball repo 에서 테스트 파일 기댓값 동기화:

```typescript
// compareModels-shadow.test.ts line 40
- expect(shadowRows[0].model_version).toBe('v1.6-pure-shadow')
+ expect(shadowRows[0].model_version).toBe('quant-only-shadow')
```

line 66 의 `expected undefined to be defined` 도 동일 rename 으로 인한 `find()` miss — 동일 수정으로 해소.

**수정 범위**: moneyball 워커 세션에서 처리 (hub 자율 처리 불가 — R6 외부 레포).

## 사전 탐지 방법

```bash
# 상수 rename 시 테스트 동기화 누락 방지
# 리팩터 커밋 전 확인 명령
grep -r "v1.6-pure-shadow" src/ --include="*.ts"
# rename 전 쌍으로 grep — 테스트 파일에도 존재하면 함께 수정
```

## 패턴 일반화

- `buildShadowRows()` 처럼 **string literal 상수를 직접 반환하는 함수** 리팩터 시 테스트 기댓값도 함께 수정 의무
- TypeScript 타입 시스템이 잡지 못하는 string literal mismatch — 테스트만이 감지 가능

## 체크리스트

- [ ] `compareModels-shadow.test.ts` line 40, 66 기댓값 `'quant-only-shadow'` 로 업데이트
- [ ] moneyball CI Test PASS 확인
- [ ] hub issue #548 close

## 관련

- [moneyball silent-drift MockResult 재발 패턴](2026-05-08-moneyball-silent-drift-mockresult-type.md) — 유사 패턴: 외부 변화 → 테스트 기댓값 미동기
- hub issue: #548
