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
- `--font-display: 'Geist Sans', system-ui, sans-serif`
- `--font-body: 'Geist Sans', 'Pretendard Variable', sans-serif`
- `--font-code: var(--font-jetbrains-mono), 'Geist Mono', monospace`
- `--font-data: 'Geist Mono', monospace`

> ⚠️ 미해결: `--font-display` 가 Geist 로 박혀 있어 Satoshi 로드된 게 헤딩에 적용 안 됨. 의도 vs 누락 사용자 결정 필요 (공개 대비 lens 포함).

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
| `--accent` | #0891b2 (cyan, dark 와 의도적 분리) |

> ⚠️ 미해결: light theme 가 dark amber 가 아닌 cyan 으로 분기. 일관성 vs 다크/라이트 별도 브랜드 선택 — 사용자 vision 결정 필요.

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

`globals.css` 에는 spacing scale 박제 X — Tailwind 기본 scale 사용.

| Radius | Token | px |
|---|---|---|
| sm | `--radius-sm` | 6 |
| md | `--radius-md` | 8 |
| lg | `--radius-lg` | 12 |

## 5. Layout

- `body`: `min-h-screen antialiased pb-14 lg:pb-0` (모바일 하단 nav 공간 확보)
- 데스크탑: `MobileNav` hidden (lg+), 데스크탑 nav 는 페이지별 Header
- Container: 페이지별 자유 (`max-w-*` Tailwind)

> ⚠️ 미해결: 글로벌 grid / column / max-width 표준 부재. 페이지마다 자유. 공개 대비 시 일관성 가이드라인 필요.

## 6. Motion

- `disableTransitionOnChange` (theme switch 깜박임 방지)
- 카드 hover / 링크 underline-offset 등 마이크로 인터랙션은 컴포넌트 레벨 자유
- Magnetic mode / Cursor glow 등 effect 은 과거 사양 (현행 미적용)

> ⚠️ 미해결: 모션 spec 통일 X. duration / easing 토큰 정의 필요 (공개 대비 lens).

## 7. Prose (MDX)

`.prose-custom` 클래스로 위키 본문 스타일링. 주요 규칙:
- h2: 1.5rem 700, display font, letter-spacing -0.02em
- h3: 1.25rem 700, display font
- code (인라인): 0.875em, surface bg, border
- pre: shiki 인라인 bg 보존 + radius-md
- blockquote: accent 좌측 보더 3px, italic muted
- table: 2px bottom border (th), 1px (td)

## 8. 미해결 — 공개 대비 vision 입력 영역

### 8a. Display font 의도 정리
Satoshi 가 layout.tsx 에서 로드되지만 CSS 변수에 미적용. 의도:
- (A) 헤딩에 Satoshi 적용 → `--font-display: 'Satoshi', ...` 갱신
- (B) Satoshi 로드 제거 → preconnect + link 정리
- 결정 필요.

### 8b. Light theme 색 정합
다크 amber, 라이트 cyan 의도 분리 vs 일관성. 공개 대비 lens 에서 재검토.

### 8c. Motion / Spacing 토큰화
duration / easing / spacing scale CSS 변수 박제 → 컴포넌트 일관성. 현재 자유로 잠재 균열.

### 8d. Layout / Container 표준
페이지별 자유 max-width / padding → 공개 대비 시 일관 reading width 필요.

### 8e. Magnetic / Cursor glow / Neon glow effect
과거 spec (구 DESIGN.md). 현재 적용 X. 부활 vs 폐기 결정 필요.

## 9. Reference

- `src/app/globals.css` — CSS 변수 source of truth
- `src/app/layout.tsx` — font loading (Satoshi / Pretendard / JetBrains Mono)
- `src/app/dashboard/dashboard.module.css` — 대시보드 `--d-*` 변수 (SYNC 필수)
- PR #155 — JetBrains Mono next/font 마이그레이션
- 본 문서 갱신 ≥ 4주 시 `develop-cycle-hub design-system` chain trigger
