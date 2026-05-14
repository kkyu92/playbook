---
title: "React `react-hooks/purity` lint 재발 패턴 — moneyball cycle 385/391 fix 후 또 재발"
date: "2026-05-14"
category: react
recurrence: 3
status: open-pattern
---

# React `react-hooks/purity` lint 재발 패턴

## 문제

moneyball CI lint:

```
185:33  error  Error: Cannot call impure function during render  react-hooks/purity
✖ 1 problem (1 error, 0 warnings)
ELIFECYCLE  Command failed with exit code 1
```

cycle 385 / cycle 391 fix 했는데 **세 번째 재발** (cycle 393 ~ 2026-05-14). 18건 inbound CI 실패 (#596~#619) 단일 root cause.

## 사전 탐지

```bash
# pre-commit hook 또는 ship pipeline:
pnpm lint
# react-hooks/purity rule = render 안 impure call (Math.random / Date.now / 외부 mutation / sync DOM read) 차단
```

## 원인

React 19+ `react-hooks/purity` rule 강제. render 동안 impure call:
- `Math.random()` / `Date.now()` — non-deterministic
- 외부 mutable state read (DOM / localStorage / global)
- 외부 store mutation
- side-effect 트리거 함수

LLM 가 새 component 작성 시 무의식 도입 (특히 v1.7→v1.8 같은 model_version 전환에서 새 logic 추가 시).

## 대응

| 패턴 | 잘못된 코드 | 올바른 코드 |
|---|---|---|
| 랜덤값 | `<div id={Math.random()}>` | `useId()` 또는 useMemo |
| 시간값 | `<div data-ts={Date.now()}>` | `useState(() => Date.now())` |
| Storage | `localStorage.getItem('x')` 직접 | `useSyncExternalStore` |
| Mutation | `array.push(...)` | unshift 안전 사본 / Effect 격리 |

## 재발 박제 (3회+)

- **cycle 385** (moneyball): postview fallback visibility 영역 첫 발견, ESLint cleanup
- **cycle 391** (moneyball): cycle 385 영역 재발 — heavy review-code 로 silent drift cleanup
- **cycle 495** (허브 inbound): 18건 CI 실패 누적, line 185:33 동일 위치 또는 인근 새 violation

## 승격 후보

3회+ 재발 → **command/lib 승격 검토 가능**:
1. moneyball 측 `pnpm lint --max-warnings 0` strict 모드 default 화
2. CI failing fast 시 자동 line:col 표시 (이미 함)
3. pre-commit husky hook 으로 `pnpm lint` 강제

## Related

- moneyball cycle 385 commit (postview fallback visibility)
- moneyball cycle 391 commit (heavy review-code silent drift)
- 허브 inbound 18건 (#596~#619, 2026-05-14 batch close cycle 495)
