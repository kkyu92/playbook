# Playbook Hub

개인 비공개 지식 허브 + 프로젝트 관제탑. AI 에이전트 활용 패턴을 엔트리로 누적하고, 다른 프로젝트 (워커) 와 양방향 복리로 성장한다.

## 기능

- **MDX 위키**: 지식 그래프, 검색, 카테고리, confidence / connections / workers 태그 기반
- **학습 트래커**: 스트릭, 히트맵, Quiz SRS
- **/projects 관제탑**: 워커 프로젝트 상태 원뷰
- **GeekNews 일일 ingest**: Cloudflare cron (06:00 KST) → `daily-ingest-geeknews` → `raw-sources/` 자동 수집 → 사용자 `/ingest` 로 검토
- **허브-워커 양방향 자동화**: 워커 에러/교훈 → 자동 dispatch → auto-ingest → cross-update → ambient symlink 배포
- **HMAC 쿠키 인증**: 비공개 (admin 영역만 — 위키 열람은 공개)

## 기술 스택

- **Next.js 16** (App Router, MDX, proxy.ts middleware)
- **Tailwind CSS 4** + **TypeScript strict**
- **Vercel** (호스팅, Edge, Analytics, Speed Insights)
- **GitHub Actions** × 14 (auto-ingest, ai-review, daily-ingest-geeknews 등 — 상세 표는 `ARCHITECTURE.md` § 6)
- **Vitest** (단위 테스트)

## Quick Start

```bash
# 1. Clone + install
git clone https://github.com/kkyu92/playbook.git
cd playbook
pnpm install

# 2. Environment setup
cp .env.example .env.local
# .env.local 편집 — 5개 필수 변수 입력

# 3. Dev server
pnpm dev
# → http://localhost:3000

# 4. Admin login
# → http://localhost:3000/admin/login
```

상세 환경변수 설명은 `.env.example` 주석 참조.

## 환경변수 (5개 필수 + 1개 선택)

| 변수 | 필수 | 용도 |
|---|---|---|
| `ADMIN_PASSWORD` | ✓ | /admin 로그인 (8자+) |
| `ADMIN_SECRET` | ✓ | HMAC 쿠키 서명 (16자+) |
| `GITHUB_TOKEN` | ✓ | /api/admin entry CRUD (Classic PAT, repo scope) |
| `GITHUB_REPO` | ✓ | `owner/name` (예: `kkyu92/playbook`) |
| `GEMINI_API_KEY` | ✓ | daily-lesson cron + /api/ai |
| `NEXT_PUBLIC_SITE_URL` | ✗ | 커스텀 도메인 (sitemap / RSS / OG image) |

## 주요 명령어

```bash
pnpm dev           # 로컬 개발 (content watcher + Next.js)
pnpm build         # 프로덕션 빌드 (prebuild: validate + manifest)
pnpm test          # Vitest 단위 테스트
pnpm lint          # ESLint (src/)
pnpm lint:wiki     # 위키 건강도 검사 (orphan / stale / pattern)
pnpm new-entry     # 신규 MDX 엔트리 스캐폴딩
pnpm generate-lesson  # Gemini 기반 콘텐츠 생성 (cron 과 동일 로직)
```

## 슬래시 커맨드 (Claude Code 세션)

| 커맨드 | 용도 |
|---|---|
| `/ingest <URL\|raw>` | 새 자료 → wiki entry + cross-update N개 (ai-study 의 최대 약점 정면 돌파) |
| `/ingest` (no-arg) | raw-sources/ 자동 스캔 → 미처리 일괄 처리 |
| `/lint` | 위키 일관성 + 패턴 승격 후보 감지 (`pnpm lint:wiki` 가 결정론 부분) |
| `/handoff save` / `/handoff load` | 세션 핸드오프 + git HEAD fingerprint 드리프트 자동 감지 |
| `/compound` | 복리 축적 기록 |
| `/sync-rules` | 허브 `shared-rules/common/*.md` → 워커 memory 수동 전파 |

## 허브-워커 연동

`docs/setup-worker-integration.md` — 다른 프로젝트 (워커) 를 연결해서 양방향 자동화 구축. 하이브리드 2 경로 (`worker-error` + `worker-lesson`), PII 가드, 대시보드 설정까지 단계별.

## Architecture

`ARCHITECTURE.md` — 데이터 흐름 다이어그램 (mermaid), 3-layer wiki 구조, 자동화 인프라 맵, 보안 레이어.

## 위키 관리 규칙

Karpathy LLM Wiki 패턴 (compilation over retrieval). 상세: `CLAUDE.md` 의 "위키 관리 규칙" 섹션 + `content/harness-engineering/hub-worker-compounding-pattern.mdx`.

## 드리프트 방어

4종 드리프트 (메모리 / 존재 / 작동 / 완전성) 계층 감지. 상세: `CLAUDE.md` 의 "드리프트 감지 프로토콜" + `content/harness-engineering/drift-detection-methodology.mdx`.

## 설계 문서

- `CLAUDE.md` — Claude Code 세션 규칙, 주요 규약, 스킬 라우팅
- `ARCHITECTURE.md` — 시스템 흐름
- `docs/hub-scripts.md` — `~/bin/` 의 hub-start / hub-sync-rules / hub-scan-promotions / hub-promote 상세
- `docs/setup-worker-integration.md` — 워커 추가 절차
- `content/` — wiki entries (지식 원본)
