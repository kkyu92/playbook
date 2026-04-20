# Playbook Hub

개인 비공개 지식 허브 + 프로젝트 관제탑.

## 프로젝트 구조
- Next.js 16 (App Router, MDX)
- 별도 레포 (~/projects/playbook/)
- content/: MDX 엔트리 (카테고리별)
- scripts/: 콘텐츠 파이프라인
- .claude/commands/: 허브-워커 슬래시 커맨드

## 기술 스택
- Next.js 16 (App Router, Server Components)
- MDX (next-mdx-remote/rsc, Shiki, Mermaid)
- Tailwind CSS 4
- TypeScript (strict mode)
- Vercel (호스팅)
- GitHub Actions (Gemini 파이프라인)

## 주요 규칙
- 비공개: HMAC 쿠키 인증 필수
- 커밋 메시지: feat/fix/data/content/refactor
- 컴포넌트: 기본 Server Component, 인터랙션 시만 'use client'

## 환경변수
- ADMIN_PASSWORD — 로그인 비밀번호
- ADMIN_SECRET — HMAC 토큰 서명 (16자 이상)
- GITHUB_TOKEN — Classic PAT (playbook write + moneyball read)
- GITHUB_REPO — kkyu92/playbook
- GEMINI_API_KEY — Gemini API

## 위키 관리 규칙 (Karpathy LLM Wiki 패턴)

### 4-Layer 구조
- raw-sources/: 원천 자료 (불변)
- docs/solutions/: **재발 패턴 기록소** (N회 재발 시 필수 기록 — 승격 축)
- content/: 위키 엔트리 (LLM이 생성/관리하는 마크다운 — 정제된 방법론)
- CLAUDE.md + INDEX.md: 스키마 (위키 관리 방법)

### 핵심 명령어
- /ingest: 새 자료 추가 → 위키 엔트리 자동 변환
- /lint: 일관성 검사 → orphan, 고립, stale, 중복 감지
- /lint --fix: 자동 수정 가능한 것만 수정
- /search: JIT 의미 검색 (embeddings.json 기반) → Top-K 청크 반환

### JIT 검색 먼저 계약 (에이전트 필수)

위키 지식이 필요할 때 **MDX 파일을 직접 읽지 말고** 검색을 먼저 실행:

```bash
pnpm search "<질문>" 3 --inject   # 관련 청크만 inject 모드로 출력
```

청크만 반환되므로 context 절감 (전체 위키 → 관련 2~3 청크).

**언제 사용**:
- 특정 패턴/방법론 적용 시 (예: "드리프트 감지 프로토콜")
- 에러/버그 수사 시 기존 solution 존재 확인 ("Mermaid 렌더 에러")
- 엔트리 작성 시 관련 기존 entry 탐색 ("prompt 버전 관리")

**언제 skip**:
- 이미 읽은 엔트리에 대한 질문
- 단순 구조 탐색 (ls / git log 로 충분)
- 5자 이하 쿼리 (쿼리 라우터가 자동 skip)

인덱스 최신화: `pnpm embed-content` (content/ 또는 docs/solutions/ 변경 시).

### 엔트리 생성 규칙
- 새 엔트리는 반드시 connections 1개 이상
- Journal은 append-only (수정 금지)
- confidence 초기값: 2 (실전 검증 전), 검증 후 상향
- INDEX.md는 manifest 생성 시 자동 업데이트

### Solution 기록 규칙 (docs/solutions/)
- **2회+ 재발 시 기록 의무**. 단발은 journal/ 로 충분
- 카테고리별 디렉토리 (`mdx/`, `llm-generation/`, `ci-github-actions/` 등)
- 스키마: `docs/solutions/README.md` 참조
- 카테고리 **3건 누적** 시 `_compiled-truth.md` 작성 + 승격 검토 (→ command/hook/lib)

### 운영 루프
- 매일: /ingest로 새 자료 추가
- 매주: /lint로 위키 건강도 점검 + `scripts/scan-promotions.mjs` 로 solution 승격 후보 감지 (월요일 09:00 KST cron)
- 패턴 3회 반복 시: Journal → Wiki 승격 검토, 또는 Solution → command/lib 승격 검토

## 드리프트 감지 프로토콜 (필수)

가정과 실 리포 사이 4종 괴리를 계층적으로 차단. 상세: [drift-detection-methodology](content/harness-engineering/drift-detection-methodology.mdx).

### Level 0 — 세션 시작 시 (메모리 드리프트 #1)

```bash
git log --oneline -20
git status
ls <주요 디렉토리>
```

체크포인트/메모리와 기계적 대조. 다르면 사용자에게 먼저 보고. `/handoff load` 가 자동 수행 (fingerprint 비교).

### Level 1 — 신규 작업 직전 (존재 드리프트 #2)

신규 파일/패키지/설정 만들기 전에:
```bash
ls path/to/file
find . -name "*pattern*"
cat package.json | grep <name>
```

플랜에 "신규 설치" 라고 적혀 있어도 실행 시점에 재확인. 플랜은 보장 X.

### Level 2 — 머지 후 (작동 드리프트 #3)

`feat:` 커밋 머지 직후:
- `gh run list` 로 CI 결과 확인 (cron 포함 — 사일런트 cron 실패가 가장 위험)
- 프로덕션 환경 실 결과 확인
- DB upsert/insert 결과 `.error` 체크 코드 존재 확인
- VARCHAR 길이, 외부 의존 문자열 (모델 ID 등) validation
- `git log` 에 `debug:` 커밋 연속이면 미해결 사고 의심

### Level 3 — 머지 전 (완전성 드리프트 #4)

`/plan-eng-review` 의 "코드 읽기" 단계:
- 대칭 로직 체크리스트: home/away, source/target, request/response 양쪽 다 처리?
- 한쪽만 사용하는 변수 의심
- DB 양쪽 row count 비교 쿼리 추가 (한쪽 0 이면 alert)

## Skill routing

When the user's request matches an available skill, suggest it before acting.

Key routing rules:
- Product ideas, brainstorming → suggest office-hours
- Bugs, errors → suggest investigate
- Ship, deploy, create PR → suggest ship
- QA, test the site → suggest qa
- Code review → suggest review
- Architecture review → suggest plan-eng-review
