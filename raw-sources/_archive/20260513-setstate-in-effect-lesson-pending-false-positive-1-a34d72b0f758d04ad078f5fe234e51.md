---
date: "2026-05-13"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
fingerprint: "a34d72b0f758d04ad078f5fe234e512198ac498f"
---


## 사례 요약

cycle 302 (/picks 페이지 신규) 이후 localStorage 읽기를 useEffect 안에서 setState 로
초기화하는 패턴이 9차례 재발 (cycles 302→305→321→325 fix 반복).

## 근본 원인

```ts
// ❌ setState-in-effect 패턴 (ESLint 에러)
const [value, setValue] = useState<T>(defaultValue);
useEffect(() => { setValue(readFromLocalStorage()); }, []);

// ✅ lazy init 패턴 (fix)
const [value, setValue] = useState<T>(() => readFromLocalStorage());
```

`useEffect` 안 setState 는 React Compiler 관점에서 cascading render trigger.
ESLint `react-hooks/react-compiler` 룰이 잡아냄. CI lint 실패 원인.

## 재발 경로

use-user-picks.ts / use-leaderboard.ts 두 파일이 독립적으로 같은 패턴 도입:
- cycle 305: fix(picks) — 1차 fix
- cycle 321: fix(leaderboard) use-leaderboard lazy init — 8차 재발 근본 수정 (Fixes #511 #512 #513)
- cycle 325: fix(picks) use-user-picks lazy init — 9차 재발 근본 수정

## lesson-pending false-positive 10건 (issues #350-#359)

허브 incident-followup.yml 이 fingerprint 기반으로 생성. 해당 CI 실패는
모두 후속 커밋 (cycles 305/321/325) 에서 수정 완료. 현재 lint PASS + CI green.
개별 lesson commit 중복 작성 대신 본 lesson 으로 대표 박제 후 manual batch close.

## 방지 룰

새 localStorage hook 작성 시:
1. useState 초기값으로 반드시 lazy init `() => read()` 사용
2. PR 전 로컬 `pnpm run lint` 확인

Closes #350 #351 #352 #353 #354 #355 #356 #357 #358 #359

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
