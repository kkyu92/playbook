# Contributing — Playbook Hub

비공개 허브이지만 워커 레포 (예: moneyballscore) 가 inbound dispatch 로 자료를 던지는 인터페이스가 있습니다. 본 문서는 그 인터페이스 + 본인이 미래 세션에서 일관되게 작업하기 위한 컨벤션입니다.

상세 운영 규칙은 [`CLAUDE.md`](./CLAUDE.md) 와 [`docs/`](./docs/) 참조.

## 커밋 메시지 prefix

| Prefix     | 용도                                              |
|------------|---------------------------------------------------|
| `feat:`    | 신규 기능 / 신규 인프라                           |
| `fix:`     | 버그 fix / 회귀 fix                               |
| `data:`    | 외부 데이터 추가 (auto-ingest, raw)               |
| `content:` | 위키 엔트리 신규 / 수정 / cross-update            |
| `refactor:`| 동작 변화 없는 구조 개선                          |
| `docs:`    | README, CLAUDE.md, ARCHITECTURE, CHANGELOG 등     |
| `chore:`   | 의존성 / CI / 잡일                                |
| `lesson:`  | 워커 → 허브 dispatch 시 lesson 성격 (Pull (b))    |

## 워커 → 허브 dispatch (inbound)

워커 레포가 `repository_dispatch` 로 raw 자료를 던지면:

1. `.github/workflows/auto-ingest.yml` 가 raw 파일을 `raw-sources/` 에 저장
2. inbound issue 자동 생성 (label `inbound`)
3. 머지 후 허브 세션에서 `/ingest` no-arg → 가장 최근 raw 자동 처리

워커 측 dispatch payload 포맷은 [`docs/setup-worker-integration.md`](./docs/setup-worker-integration.md) 참조.

## 위키 엔트리 작성

- 새 엔트리: 반드시 `connections` 1개 이상
- `confidence` 초기값 2 (실전 검증 전), 검증 후 상향
- Journal 시리즈는 append-only (수정 금지)
- frontmatter 검증: `pnpm validate`
- 일관성 검사: `pnpm lint:wiki` (orphan / isolated / stale / 패턴 후보)
- 슬래시 커맨드: `/ingest <자료>`, `/lint`, `/lint --fix`

## 코드 변경 전 체크

```bash
pnpm test       # vitest (현재 13/13)
pnpm lint       # eslint (0 errors 목표)
pnpm lint:wiki  # 위키 일관성
```

## 컴포넌트 규칙

- 기본 Server Component
- 인터랙션 필요 시만 `"use client"`
- localStorage / DOM 의존 effect 의 `set-state-in-effect` 는 case-by-case `eslint-disable` + WHY 코멘트

## 환경변수

`.env.example` 참고. 로컬 dev 는 `cp .env.example .env.local` 후 실값 입력.

## 드리프트 감지 (필수)

CLAUDE.md 의 Level 0~3 프로토콜 준수. 세션 시작 시 `/handoff load`, 종료 시 `/handoff save`.
