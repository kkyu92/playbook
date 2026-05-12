# [react] useEffect 내 setState 직접 호출 — ESLint 재발 패턴 (NavLinks / useLeaderboard)

**카테고리**: react
**날짜**: 2026-05-07 (갱신: 2026-05-12, 8차 — 근본 수정 완료)
**프로젝트**: moneyballscore
**관련 파일**: `apps/moneyball/src/components/layout/NavLinks.tsx:39`, `apps/moneyball/src/lib/leaderboard/use-leaderboard.ts:75`

## 문제

NavLinks.tsx UI 개선 작업 중 `useEffect` 내부에서 state setter를 직접 호출하면 ESLint가 에러로 검출:

```
39:5  error  Error: Calling setState synchronously within an effect can
              trigger cascading renders
```

**재발 이력**:
- 1차: cycle 227 (PR #211 `polish-ui-nav-a11y`) — aria-expanded UI 개선 중 도입 → CI 실패 #329/#330/#332
- 2차: commit fb9b93f (cycle 228 retro 이후 빌드) — main CI 실패 → issue #334 inbound
- 3차: cycle 316 (PR #307 `this-week-archive-316`) — `use-leaderboard.ts:75` `setNickname(readNickname())` → CI 실패 #490/#491/#493 inbound (2026-05-12)
- **4차: cycle 318 이후 push (ia-ai-nav-megamenu PR #308 + main 연속)** — 동일 `use-leaderboard.ts:75` 미수정 상태 → CI 실패 #494/#495/#497 inbound (2026-05-12). 허브 cycle 340 triage
- **5차: cycle 318~320 이후 push (picks-polish 연속 push)** — 동일 `use-leaderboard.ts:75` → CI 실패 #499/#500/#501 inbound (2026-05-12). 허브 cycle 341 triage
- **6차: cycle 320 이후 push (ci-stubs batch 포함)** — 동일 → CI 실패 #503/#504/#505 inbound (2026-05-12). 허브 cycle 348 triage
- **7차: cycle 320 `ai-hint-polish` PR #311 + main 연속 push** — 동일 `use-leaderboard.ts:75` 미수정 → CI 실패 #507/#508/#509 inbound (2026-05-12). 허브 cycle 350 triage
- **8차: PR #312 `leaderboard-autosync` merge 후 main + branch CI 실패 #511/#512/#513** (2026-05-12). 허브 cycle 353에서 **근본 수정 완료** — `useState<string | null>(() => readNickname())` lazy init 교체 + `useEffect` deps에 `nickname` 추가. moneyball commit `44947fd`. 이후 재발 시 이 파일을 직접 regression으로 처리.

## 근본 원인

| 원인 | 설명 |
|---|---|
| **useEffect 내 동기 state setter** | `useEffect` 안에서 `setXxx()` 를 조건 없이 직접 호출 → 렌더링 cascade |
| **UI/훅 개선 시 패턴 재도입** | NavLinks·leaderboard 훅 변경 작업마다 동일 anti-pattern 반복 유입 |
| **로컬 lint 미실행** | 개발 시 `pnpm lint` 생략 → CI 에서야 검출, main 머지 후 발견 |
| **파일 범위 확산** | 1~2차: NavLinks.tsx (컴포넌트), 3차: use-leaderboard.ts (훅) — UI 계층에서 비즈니스 훅으로 패턴 확산 |

## 해결 패턴

```tsx
// ❌ 안티패턴: useEffect 내 동기 state setter
useEffect(() => {
  setIsActive(true);          // ESLint error: cascading renders 위험
  setOpenIndex(someIndex);    // 동일 rule 위반
}, [deps]);

// ✅ 패턴 1: useState 초기값 함수로 계산
const [isActive, setIsActive] = useState(() => deriveInitialActive(props));

// ✅ 패턴 2: 파생 상태 → useMemo (state 불필요 경우)
const isActive = useMemo(() => computeActive(pathname, href), [pathname, href]);

// ✅ 패턴 3: useEffect 의존성 배열로 처리 (비동기 외부 데이터)
useEffect(() => {
  fetchData().then(data => setIsActive(data.active)); // async는 OK
}, [id]);
```

## 재발 방지 체크리스트

NavLinks.tsx (nav 계열) + use-xxx.ts (훅) 수정 시:
```
[ ] useEffect 내 setter 직접 호출 grep (컴포넌트 + 훅 모두):
    grep -rn "set[A-Z][a-zA-Z]*(.*)" src/ --include="*.ts" --include="*.tsx" | grep "useEffect" -A3
    또는: grep -n "set[A-Z]" use-leaderboard.ts | grep -v "//\|async\|then\|catch"
[ ] useState lazy initializer 대안 검토:
    setState(syncFn())  →  useState(() => syncFn())  (useEffect 불필요)
[ ] pnpm lint 로컬 실행: exit 0 확인
[ ] CI 첫 run "Lint" step 통과 확인
```

## 일반화

navigation 컴포넌트 (NavLinks / Sidebar / Dropdown) 뿐 아니라 **훅 (use-xxx.ts)** 에서도 동일 패턴 발생:

```typescript
// 3차 재발 코드 (use-leaderboard.ts:74-76)
useEffect(() => {
  setNickname(readNickname());   // ❌ sync setState in effect
}, []);

// ✅ 수정: lazy useState initializer 사용
const [nickname, setNickname] = useState(() => readNickname());
// useEffect 불필요 — 초기화는 lazy initializer로
```

컴포넌트 계층을 넘어 비즈니스 훅으로 패턴 확산 중. `use-*.ts` 신규 작성 시 동일 점검 필수.

## 관련

- TODOS: `[P1] moneyball NavLinks.tsx lint fix` → PR #212 머지로 해소 (cycle 229)
- Issue #330/#332/#334: CI failure inbound (3건, 같은 NavLinks 루트) — 1차/2차
- Issue #490/#491/#493: CI failure inbound (3건, use-leaderboard.ts 루트) — 3차 (2026-05-12)
- Issue #494/#495/#497: CI failure inbound (3건, use-leaderboard.ts:75 동일) — 4차 (2026-05-12)
- Issue #499/#500/#501: CI failure inbound (3건, use-leaderboard.ts:75 동일) — 5차 (2026-05-12)
- Issue #503/#504/#505: CI failure inbound (3건, use-leaderboard.ts:75 동일) — 6차 (2026-05-12)
- Issue #507/#508/#509: CI failure inbound (3건, use-leaderboard.ts:75 동일) — 7차 (2026-05-12)
- Issue #511/#512/#513: CI failure inbound (3건, use-leaderboard.ts:76 동일) — **8차 (2026-05-12), 근본 수정 완료**
- 허브 처리: cycle 48(1차) → cycle 217(2차) → cycle 338(3차) → cycle 340(4차) → cycle 341(5차) → cycle 348(6차) → cycle 350(7차) close → **cycle 353(8차) lazy init 근본 수정**
- **✅ 근본 수정 (cycle 353)**: `useState<string | null>(() => typeof window === 'undefined' ? null : readNickname())` 교체. useEffect 내 `setNickname` 제거. moneyball commit `44947fd`.
