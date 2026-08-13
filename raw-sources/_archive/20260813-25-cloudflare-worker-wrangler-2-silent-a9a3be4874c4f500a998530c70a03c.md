---
date: "2026-08-13"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
fingerprint: "a9a3be4874c4f500a998530c70a03c1e236b032c"
---


subtype: lesson
cycle: 2068

## 사례

Cloudflare Worker(`moneyballscore-cron`, 모든 프로덕션 cron 의 primary trigger)
배포가 로컬 개발자 머신의 `wrangler` OAuth 세션 단일 경로에만 의존하고 있었다.
`~/Library/Preferences/.wrangler/config/default.toml` 의 refresh_token 발급일이
2026-06-12 로 고정돼 있었고, 그 이후 refresh 시도는 non-interactive 환경에서
`400 Bad Request`("Token refresh failed")로 조용히 실패했다.

git log 로 `cloudflare-worker/src/worker.ts` 변경 이력을 대조한 결과, 2026-06-12
커밋(b1be1aac, MLB cron trigger 추가) 이후의 worker.ts 변경 3건 — cron fire count
정합 fix(b7380691)/Sentry capture(6be40626)/mlb_schedule KST backfill fix
(643dba4e, 사례 23/24, 바로 이전 cycle) — 이 main 브랜치에는 있지만 실제
Cloudflare Worker 런타임에는 배포되지 않았을 가능성이 높다고 추정된다(직접적인
배포 로그 확인은 wrangler 인증 복구 후에나 가능 — 이 추정 자체가 100% 확정은
아님, 단 oauth 발급일과 마지막 worker.ts 배포 관련 커밋 날짜가 정확히 일치하는
것은 강한 정황 증거).

## 원인

1. `cloudflare-worker/`가 `pnpm-workspace.yaml` packages glob(`apps/*`,
   `packages/*`) 밖에 있어 `wrangler` 의존성이 root `.pnpm` store 에 정상
   hoist 되지 않고 dangling symlink 만 남음 — 로컬 `wrangler deploy`/`--version`
   자체가 `MODULE_NOT_FOUND` 로 아예 실행 불가능한 상태였다(이것과 별개로 auth
   문제도 존재).
2. 배포 경로가 로컬 개발자 세션(브라우저 OAuth) 단일 지점 — CI/CD 자동 배포
   워크플로우가 처음부터 없었다. GH Actions 의 daily-pipeline.yml/mlb-pipeline.yml
   등은 모두 "수동 재실행 전용"이라고 명시돼 있었는데, 이는 반대로 "Cloudflare
   Worker 가 primary" 임을 재확인해줄 뿐 배포 그 자체의 자동화는 아니었다.
3. 이 gap 이 여러 develop-cycle 사이클(2065/2066/2067) 동안 발견되지 않은 이유
   = worker.ts 소스 코드 fix + prod DB 재검증(curl)까지 다 했지만, "코드가
   main 에 merge 됨" 과 "그 코드가 실제 실행 환경에 배포됨" 을 동일시했다 —
   Vercel(API 라우트)은 push 시 자동 배포되므로 이 가정이 반사적으로 굳어져
   있었고, Cloudflare Worker 도 같을 거라 무의식적으로 넘겨짚었다.

## 대응 (cycle 2068)

- `pnpm-workspace.yaml` + `package.json` `onlyBuiltDependencies` 수정으로
  toolchain 복구 (`wrangler --version`/`whoami` 정상 동작 확인, turbo 4 packages
  인식).
- `.github/workflows/deploy-cloudflare-worker.yml` 신규 — `cloudflare-worker/**`
  push 시 `CLOUDFLARE_API_TOKEN` secret 으로 자동 `wrangler deploy`. 로컬 세션
  만료에 더 이상 구조적으로 의존하지 않음.
- 사용자 조치 필요(carry-over, TODOS.md): (1) GH secret `CLOUDFLARE_API_TOKEN`
  등록 (2) 급한 경우 로컬 `wrangler login`(브라우저) 1회 수동 실행.

## 박제 위치

- 일반화 룰 후보: "Vercel 처럼 push 시 자동 배포될 거라 가정하지 말 것 — 배포
  경로가 여러 개(Vercel / Cloudflare Worker / 기타 인프라)인 프로젝트에서는
  각 배포 경로가 실제로 CI 자동화됐는지 개별 확인 필요. 코드가 main 에 있다
  ≠ 프로덕션에서 실행 중이다."는 CLAUDE.md 드리프트 사례 계열(사례 3/4/6/8/11)
  과 본질적으로 같은 패밀리 — "박제됨" 주장을 현실과 대조하라는 기존 룰이
  '배포 파이프라인 자체의 존재 여부'까지 검증 범위를 넓혀야 함을 보여준 사례.
