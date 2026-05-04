# Playbook Hub — Design System

> Source of truth: `src/app/globals.css` (CSS 변수) + `src/app/layout.tsx` (font loading) + 대시보드 모듈 (`src/app/dashboard/dashboard.module.css`).
> 본 문서는 reverse-inferred 스냅샷 + 미해결 vision 입력 영역. 컴포넌트 변경 시 양쪽 동기화 필수.

## 1. Aesthetic — "Dark Operator"

다크 우선, amber accent 한 점, monospace 데이터/지표. 해커 터미널 + 관제 콘솔 감성. 카테고리는 neon terminal palette 로 분리 가시화.

기존 "Neon Terminal cyan #06b6d4" → **amber #d4a04a 로 교체** (이유: cyan 이 카테고리 색 (`cat-context #00bfff`) 와 충돌, 관제탑 lens 에서 amber 가 더 절제됨).

## 2. Typography

| 역할 | Font | Weight | 로드 방식 |
|---|---|---|---|
| Display (heading) | Satoshi | 700 / 900 | Fontshare CDN `<link>` (layout.tsx) |
| Body (한글 우선) | Pretendard Variable | 100~900 | jsDelivr CDN `<link>` (layout.tsx) |
| Body (라틴 fallback) | Geist Sans | — | next/font (자동) |
| Code | JetBrains Mono | 400 / 600 | `next/font/google` (PR #155) |
| Code (fallback) | Geist Mono | — | next/font (자동) |
| Data (지표/숫자) | Geist Mono | — | `--font-data` 별 변수 |

CSS 변수 (`globals.css` `@theme inline`):
- `--font-display: 'Satoshi', 'Geist Sans', system-ui, sans-serif`
- `--font-body: 'Geist Sans', 'Pretendard Variable', sans-serif`
- `--font-code: var(--font-jetbrains-mono), 'Geist Mono', monospace`
- `--font-data: 'Geist Mono', monospace`

## 3. Color

### 3a. Base (Dark — default)

| 토큰 | HEX | 용도 |
|---|---|---|
| `--bg` | #0e0f12 | body 배경 |
| `--surface` | #16181d | card / panel |
| `--surface-hover` | #1c1f25 | hover state |
| `--border` | #2a2d34 | divider / outline |
| `--text` | #e8e9eb | primary text |
| `--muted` | #8a8e96 | secondary text |
| `--accent` | #d4a04a | link / focus / brand |
| `--accent-hover` | #e0b25c | accent hover |

### 3b. Light (`[data-theme="light"]`)

| 토큰 | HEX |
|---|---|
| `--bg` | #fafafa |
| `--surface` | #ffffff |
| `--surface-hover` | #f0f0f5 |
| `--text` | #1a1a2e |
| `--muted` | #6b6b80 |
| `--border` | #e0e0e8 |
| `--accent` | #b8782e (dark amber 와 일관, 가독성 위해 톤 darker) |
| `--accent-hover` | #a36919 |

### 3c. Category (Neon Terminal)

| Category | Token | HEX |
|---|---|---|
| prompt-engineering | `--cat-prompt` | #ffd700 |
| context-engineering | `--cat-context` | #00bfff |
| harness-engineering | `--cat-harness` | #ff4757 |
| agents | `--cat-agents` | #00ff88 |
| evaluation | `--cat-eval` | #ccff00 |
| infrastructure | `--cat-infra` | #708090 |
| frontend-ai | `--cat-frontend-ai` | #ffa07a |
| project-ops | `--cat-project-ops` | #ff6348 |
| data-engineering | `--cat-data-eng` | #ff69b4 |

### 3d. Semantic

| 의미 | Token | HEX |
|---|---|---|
| success | `--success` | #00ff88 (= cat-agents) |
| warning | `--warning` | #ffd700 (= cat-prompt) |
| error | `--error` | #ff4757 (= cat-harness) |
| info | `--info` | #00bfff (= cat-context) |

> 의도: semantic 색이 카테고리 색과 충돌하지 않도록 매핑. 하지만 "agents 카테고리 = success 색" 같은 동등시는 의도하지 않은 시각 혼동 가능. 공개 대비 lens 에서 재검토 필요.

## 4. Spacing & Radius

Spacing scale: Tailwind 기본 scale 사용 (4px 단위).

| Radius | Token | px |
|---|---|---|
| sm | `--radius-sm` | 6 |
| md | `--radius-md` | 8 |
| lg | `--radius-lg` | 12 |

## 5. Layout

- `body`: `min-h-screen antialiased pb-14 lg:pb-0` (모바일 하단 nav 공간 확보)
- 데스크탑: `MobileNav` hidden (lg+), 데스크탑 nav 는 페이지별 Header

Container max-width 토큰 (`globals.css`):

| Token | px | 용도 |
|---|---|---|
| `--container-narrow` | 720 | reading-first (위키 본문 단일 컬럼) |
| `--container-default` | 960 | 카드/그리드 페이지 |
| `--container-wide` | 1200 | 대시보드/관제 페이지 |

페이지에서 `max-width: var(--container-*)` 또는 Tailwind arbitrary value 로 호출.

## 6. Motion

`disableTransitionOnChange` (theme switch 깜박임 방지) + 토큰화된 duration / easing.

| Token | 값 | 용도 |
|---|---|---|
| `--duration-fast` | 120ms | hover / focus / 마이크로 |
| `--duration-normal` | 200ms | 패널/모달/dropdown |
| `--duration-slow` | 320ms | 페이지 전환/큰 영역 |
| `--easing-standard` | cubic-bezier(0.4, 0, 0.2, 1) | 일반 |
| `--easing-emphasized` | cubic-bezier(0.2, 0, 0, 1) | 강조 (CTA / 알림) |

Magnetic mode / Cursor glow / Neon glow effect 는 과거 사양 — 현행 코드 0건 grep 확인 후 **폐기**.

## 7. Prose (MDX)

`.prose-custom` 클래스로 위키 본문 스타일링. 주요 규칙:
- h2: 1.5rem 700, display font, letter-spacing -0.02em
- h3: 1.25rem 700, display font
- code (인라인): 0.875em, surface bg, border
- pre: shiki 인라인 bg 보존 + radius-md
- blockquote: accent 좌측 보더 3px, italic muted
- table: 2px bottom border (th), 1px (td)

## 8. Reference

- `src/app/globals.css` — CSS 변수 source of truth
- `src/app/layout.tsx` — font loading (Satoshi / Pretendard / JetBrains Mono)
- `src/app/dashboard/dashboard.module.css` — 대시보드 `--d-*` 변수 (SYNC 필수)
- PR #155 — JetBrains Mono next/font 마이그레이션
- 본 문서 갱신 ≥ 4주 시 `develop-cycle-hub design-system` chain trigger
