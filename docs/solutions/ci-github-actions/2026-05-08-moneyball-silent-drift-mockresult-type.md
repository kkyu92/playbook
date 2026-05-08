# [ci-github-actions] moneyball silent-drift.test.ts MockResult<T> type 재발 패턴

**날짜**: 2026-05-08
**발생 파일**: `kkyu92/moneyballscore: src/lib/players/__tests__/silent-drift.test.ts`
**관련 PR/커밋**: hub issue #365, #367 (cycle 266), #369, #370, #371, #373 (cycle 268)
**재발 여부**: 6건 재발 (2026-05-08 단일 세션에 4건 연속)

## 문제

moneyball main CI 가 TypeCheck step 에서 연속 실패:

```
src/lib/players/__tests__/silent-drift.test.ts(147,7): error TS2769: No overload matches this call.
src/lib/players/__tests__/silent-drift.test.ts(148,77): error TS2345:
  Argument of type '{ value: Record<string, unknown>; }' is not assignable to
  parameter of type 'MockResult<Record<string, unknown>>'.
```

같은 에러가 lines 160-161 에도 반복. 매 commit push 시마다 CI fail → hub inbound incident 자동 생성.

## 원인

vitest 의 `MockResult<T>` 타입이 discriminated union 으로 강화됨:

```typescript
// 이전 (동작하던 형식)
{ value: Record<string, unknown> }

// 현재 요구 (discriminated union)
{ type: 'return'; value: Record<string, unknown> }
// 또는
{ type: 'throw'; value: Record<string, unknown> }
```

`silent-drift.test.ts` 는 예전 plain object 형식을 사용 중 — `type` discriminator 필드 누락.

## 해결

moneyball repo 에서 `silent-drift.test.ts` 의 MockResult 사용 부분 수정:

**Before** (lines 147-148, 160-161):
```typescript
mockFn.mock.results = [{ value: someValue }];
```

**After**:
```typescript
mockFn.mock.results = [{ type: 'return', value: someValue }];
```

**수정 범위**: moneyball 워커 세션에서 PR fix 필요 (hub 자율 처리 불가 — R6 외부 레포).

## 사전 탐지 방법

```bash
# moneyball 레포에서 실행
grep -r "mock\.results\s*=\s*\[{" src/ --include="*.ts" | grep -v "type:"
```

`type:` 필드 없는 MockResult 할당 = 잠재적 타입 에러.

## 패턴 특이사항

- hub 의 inbound incident 자동화가 정상 작동 중 (CI fail → dispatch → hub issue 생성 → hub triage)
- 그러나 fix 가 moneyball R6 영역이라 hub 사이클이 반복 triage 하는 구조
- **개선 포인트**: 같은 fingerprint 계열 incident 는 1건으로 dedup (현재는 commit 별로 별도 issue 생성)

## 체크리스트

- [ ] moneyball `silent-drift.test.ts` line 147-148, 160-161 `type:` 필드 추가
- [ ] moneyball CI TypeCheck PASS 확인
- [ ] hub inbound incident 자연 회피 확인 (다음 push 후 CI green)
- [ ] 동일 test 파일 내 다른 MockResult 사용 부분 추가 점검

## 관련

- 허브 이슈: #365, #367 (cycle 266 triage), #369, #370, #371, #373 (cycle 268 triage)
- cycle_state: `~/.develop-cycle-hub/cycles/266.json`, `~/.develop-cycle-hub/cycles/268.json`
- TODOS: [P1] moneyball silent-drift.test.ts MockResult<T> fix (moneyball 워커 영역)
