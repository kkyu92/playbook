# 2026-06-29 — MDX 테이블 셀 비교 연산자 JSX 태그 파싱 함정

**카테고리**: mdx
**발생**: 2026-06-29 (cycle 1238 — ai-review.yml fix branch Test Gate)
**원인**: MDX 테이블 셀에 `<8.21.0` / `<=8.0.15` 같은 버전 범위를 평문 텍스트로 작성 → JSX 파서가 `<8`을 여는 태그 시작으로 파싱 시도 → 파싱 오류

## 문제

`validate-content.mjs` 출력:
```
⚠️  content/.../cross-fork-ci-failure.mdx Line ~20: <8 JSX 태그 파싱 위험 → "< 8" (공백) 또는 인라인 코드로 감싸기
❌ content/.../cross-fork-ci-failure.mdx (MDX 컴파일 에러)
   Unexpected character `8` (U+0038) before name, expected a character that can start a name

⚠️  content/.../pnpm-transitive-cve-audit-gate-fix-pattern.mdx Line ~58: <8 JSX 태그 파싱 위험
❌ content/.../pnpm-transitive-cve-audit-gate-fix-pattern.mdx (MDX 컴파일 에러)
   Unexpected character `=` (U+003D) before name  ← <=8.0.15 패턴
```

## 원인

MDX = Markdown + JSX. `<` 는 JSX 여는 태그 시작 문자. 뒤에 숫자나 `=` 가 오면 잘못된 태그명 → 컴파일 에러.

| 패턴 | 파서 해석 | 에러 메시지 |
|---|---|---|
| `<8.21.0` | `<8` 여는 태그 → `8` 은 태그명 불가 | `Unexpected character '8'` |
| `<=8.0.15` | `<` 여는 태그 → `=` 은 태그명 불가 | `Unexpected character '='` |
| `<1.8.4` | `<1` 여는 태그 → `1` 은 태그명 불가 | `Unexpected character '1'` |

## 해결 방법

버전 범위를 인라인 코드(backtick)로 감싸기:

```diff
- | ws | <8.21.0 | >=8.21.0 |
+ | ws | `<8.21.0` | `>=8.21.0` |
```

또는 `< ` (공백 추가) — 단, 의미가 모호해질 수 있으므로 backtick 권장.

## 감지 방법

`validate-content.mjs` 의 `detectJsxTraps()` 가 이미 `<숫자` / `<=숫자` 패턴을 ⚠️ warning 으로 감지함. ci-gate (ai-review.yml + prebuild) 가 자동 차단.

## 재발 패턴

- 보안 취약점 테이블 (`<=X.Y.Z`, `<X.Y.Z` 범위 기재 시)
- npm 패키지 버전 비교 테이블
- 수치 범위 비교 (`< 100`, `<= threshold`)
- **백분율 비교** (`<60%` — cycle 1451, 2026-07-12) → `&lt;60%` 또는 `< 60%`
- **ms 단위 성능 지표** (`<200ms` — cycle 1451) → `&lt;200ms`
- **파일 경로 인자** (`<file>` 형태가 태그로 파싱 — cycle 1451) → 백틱으로 감싸기

## 수정 원칙

테이블 셀 및 텍스트에서 `<` 가 숫자, `%`, `=`, 파일명 문자로 이어지면 모두 MDX JSX 태그 파싱 오류. backtick 또는 `&lt;` HTML 엔티티로 처리.

## 연결 솔루션

- [llm-curly-brace-jsx-trap](2026-04-20-llm-curly-brace-jsx-trap.md) — 같은 MDX JSX 함정, `{}` 중괄호 버전
