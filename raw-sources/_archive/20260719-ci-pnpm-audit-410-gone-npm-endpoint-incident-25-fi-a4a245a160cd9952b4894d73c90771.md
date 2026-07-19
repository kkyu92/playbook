---
date: "2026-07-19"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
fingerprint: "a4a245a160cd9952b4894d73c907719e988fe2fb"
---


subtype: lesson
cycle: 1863

## 사례
2026-07-16 npm registry 가 `/v1/security/audits/quick` + `/v1/security/audits` endpoint 를
퇴역 (410 Gone) → `pnpm audit --audit-level=high` CI step 전체 실패.
pnpm 10.x 가 아직 새 bulk advisory API 로 미전환 — 코드 변경 없이 CI 가 외부 인프라 변화로 깨진 패턴.

## 영향
- 25개 CI 실패 fingerprint (ci-main-*) 생성 (2026-07-16 기간)
- D5 cron (2026-07-19) 이 lesson 미박제 감지 → 25 lesson-pending reminder issue 오픈

## Fix (cycle 1681, 2026-07-16)
`.github/workflows/ci.yml` — `Dependency audit` step 에 `continue-on-error: true` 추가.
pnpm 이 새 bulk advisory API 지원 배포 시 제거 예정.

## 박제 위치
- git commit `84ba5128 fix(ci): continue-on-error for pnpm audit — npm audit endpoint 410 Gone`
- cycle 1681 retro policy commit `fd3218b9`

## 교훈
외부 npm registry endpoint 퇴역 = 코드/의존성 변경 없이 CI silent kill 가능.
pnpm audit CI step = 외부 SaaS 의존 → endpoint 퇴역 alert 채널 없으면 25건 누적 가능.
`continue-on-error` 는 임시 mitigation — pnpm 릴리즈 주시 필요.

## 후속
lesson-pending issue 2766~2790 (25건) 수동 close (D5 cron 자동 close X).

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
