# Playbook Hub

개인 비공개 지식 허브 + 프로젝트 관제탑. ai-study 복제 기반.

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

## Skill routing

When the user's request matches an available skill, suggest it before acting.

Key routing rules:
- Product ideas, brainstorming → suggest office-hours
- Bugs, errors → suggest investigate
- Ship, deploy, create PR → suggest ship
- QA, test the site → suggest qa
- Code review → suggest review
- Architecture review → suggest plan-eng-review
