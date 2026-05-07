# [react] NavLinks useEffect 내 setState 직접 호출 — ESLint 재발 패턴

**카테고리**: react
**날짜**: 2026-05-07
**프로젝트**: moneyballscore
**관련 파일**: `apps/moneyball/src/components/layout/NavLinks.tsx:39`

## 문제

NavLinks.tsx UI 개선 작업 중 `useEffect` 내부에서 state setter를 직접 호출하면 ESLint가 에러로 검출:

```
39:5  error  Error: Calling setState synchronously within an effect can
              trigger cascading renders
```

**재발 이력**:
- 1차: cycle 227 (PR #211 `polish-ui-nav-a11y`) — aria-expanded UI 개선 중 도입 → CI 실패 #329/#330/#332
- 2차: commit fb9b93f (cycle 228 retro 이후 빌드) — main CI 실패 → issue #334 inbound

## 근본 원인

| 원인 | 설명 |
|---|---|
| **useEffect 내 동기 state setter** | `useEffect` 안에서 `setXxx()` 를 조건 없이 직접 호출 → 렌더링 cascade |
| **UI 개선 시 패턴 재도입** | NavLinks 변경 작업마다 동일 anti-pattern 반복 유입 |
| **로컬 lint 미실행** | 개발 시 `pnpm lint` 생략 → CI 에서야 검출, main 머지 후 발견 |

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

NavLinks.tsx (또는 nav 계열 컴포넌트) 수정 시:
```
[ ] useEffect 내 setter 직접 호출 grep:
    grep -n "set[A-Z]" NavLinks.tsx | grep -v "//\|async\|then\|catch"
[ ] pnpm lint 로컬 실행: exit 0 확인
[ ] CI 첫 run "Lint" step 통과 확인
```

## 일반화

navigation 컴포넌트 (NavLinks / Sidebar / Dropdown) 는 active/open 상태를 `useEffect`에서 초기화하려는 패턴이 자주 유입됨. 대안:
- **URL 파생 상태**: `usePathname()` 직접 비교 (state 불필요)
- **컴포넌트 외부 초기값**: 부모에서 초기 상태 계산해서 prop 전달

## 관련

- TODOS: `[P1] moneyball NavLinks.tsx lint fix` → PR #212 머지로 해소 (cycle 229)
- Issue #330/#332/#334: CI failure inbound (3건, 같은 NavLinks 루트)
- 허브 처리: cycle 48 worker-incident-triage (1차) → cycle 217 worker-incident-triage (2차 close)
