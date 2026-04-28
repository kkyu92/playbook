---
name: architecture-first-lite
description: 신규 설계 제안 전, 이미 로드된 CLAUDE.md 핵심 섹션 + .claude/commands 이름 목록만 30초 훑어보기 — 재조합 가능성·철학 충돌 점검. 버그/단일 편집엔 적용 안 함
type: feedback
originSessionId: 1dece797-627e-46d6-8d78-3ea9d3c75294
---
신규 인프라·아키텍처·파이프라인 설계 제안 직전, 프로젝트의 기존 철학·도구를 **30초 안에 훑어본다**. 방대한 재스캔 금지.

**Why:** 놓치면 "ai-study 복리 성장" 같은 프로젝트 핵심 철학을 모르고 반쪽 설계로 튐 (2026-04-17 실수 사례: Push 방향만 설계하고 Pull/양방향 복리 성장 모델 전체를 놓침). 반대로 매번 전체 재스캔하면 토큰 블랙홀. 이 둘 사이 균형점.

**How to apply:**

**Trigger (이것만 적용)**:
- 신규 인프라·아키텍처 제안
- 여러 파일 걸치는 파이프라인 설계
- "상호작용 / 파이프라인 / 흐름 / 철학" 같은 키워드 등장
- 기존 도구 대체·확장 제안

**제외 (절대 적용 안 함)**:
- 버그 수정, 단일 파일 편집, 기계적 작업
- 직전에 같은 영역 확인한 경우 (중복 금지)

**Scope 한정 (full-scan 금지)**:
- CLAUDE.md **재-read 금지** — 이미 세션 시작 시 로드됨. 의식적으로 "떠올리기만"
- 체크할 섹션: "주요 규칙", "운영 루프" 등 핵심만. 전체 X
- `.claude/commands/` → **이름 목록만** (`ls`) 훑기. 파일 내용 read 금지
- INDEX.md → 헤더 수준만

**Time budget**: 30초. 그 이상 쓸 거면 사용자에게 왜 깊이 봐야 하는지 먼저 설명.

**체크 질문 3개**:
1. 이 프로젝트의 핵심 철학/운영 모델과 충돌 없나?
2. 이미 있는 슬래시 커맨드·도구로 재조합 가능한가?
3. 양방향/복리 성장 같은 기저 모델을 한쪽만 보고 있지 않나?

**한계 (강화 사례, 2026-04-28)**:
30초 훑기는 **프로젝트 내부 자료 (CLAUDE.md, .claude/commands, INDEX.md)** 만 다룸. **외부 platform 제약은 docs 별도 확인 필수**:
- Cloudflare Workers Free: 5 cron/account (T9 이관 시 사전 인지 못 함, docs 봐야 알았음)
- Vercel: 일 100회 deploy 한도, 함수 timeout, 메모리 등
- GitHub Actions: silent cron drop, GITHUB_TOKEN cross-repo 권한 0
신규 외부 platform 도입 결정 직전엔 architecture-first lite + **platform docs 한 번 더 훑기** 짝으로 적용.
