---
date: "2026-04-19"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
---

# [워커 → 허브 보고] P3 배선 중 발견한 근본 버그 2종 — 서버 사이드 Sentry 완전 사망 + PII 스크럽 부분 실패

## 요약

가드 B (PII 스크러빙 검증) 실 테스트가 두 가지 독립된 근본 버그를 동시에 드러냄:

- **버그 A** — 서버 사이드 Sentry 완전 사망 (2026-04-19 09:58 / `9a9df54` 이후)
- **버그 B** — 대시보드 Sensitive Fields 가 user/contexts/tags/extras 깊이 매칭 못함

둘 다 CI 통과 / 클라이언트 기능 정상 / 빌드 무에러로 silent. 가드 B 가 없었으면 영구 숨어 있을 버그.

## 버그 A — 서버 사이드 Sentry 완전 사망

**근본 원인**: Next.js 16 + `src/app` 구조에서 `instrumentation.ts` 는 **`src/instrumentation.ts`** 로 있어야 Next 가 자동 감지·로드. 프로젝트 루트 `apps/moneyball/instrumentation.ts` 는 Next 가 파일 존재조차 인식 못함 → `Sentry.init` 모듈스코프도, `register()` 도 둘 다 no-op.

**탐지 경로**: 가드 B 이벤트가 Sentry 에 안 뜸 → 진단 response 에 `Sentry.getClient()` 반환값 노출 → `undefined` 확인 → 라우트 모듈스코프 직접 init 으로 임시 작동 확인 → 영구 수정은 파일 이동.

**영향**: `9a9df54` (2026-04-19 새벽) 이후 프로덕션 서버 에러 (API 라우트/SSR/RSC) 포착률 0%. 1인 pre-런칭 프로젝트라 실 에러 발생률 낮았을 가능성 높음 — 단 "포착 못 함 = 알 수 없음".

**수정**: `453153c` + `34dd858`
- 모듈스코프 `Sentry.init` 추가 (register 보완)
- `instrumentation*.ts` 둘 다 `src/` 로 이동 (Next 16 컨벤션)
- 복구 후 `clientInitialized:true`, `flushed:true` 확인

## 버그 B — Sentry "Additional Sensitive Fields" 가 깊이 매칭 안 됨

**근본 원인**: 기본 UI 의 Sensitive Fields 는 `request.data` 와 일부 프레임에만 매칭. `user` / `contexts` / `tags` / `extras` 의 커스텀 필드는 디폴트 `@password`/`@ip`/`@bearer` 규칙이 필드명에 "auth" / "ip" / "bearer" 포함한 케이스만 우연히 커버.

**실 테스트 결과** (stamp `1776605359405` 이벤트):

✅ 스크럽됨: `contexts.auth`, `extra.oauth`, `extra.supabase.auth` (전부 이름에 "auth"), `user.ip_address` (자동 `@ip`)
❌ RAW 누출: `user.{id,email,username}`, `contexts.payment.{stripe,customer_id,payment_method,charge}`, `contexts.integration.{discord_id,slack_user_id,webhook_url}`, `extra.supabase.user`, `extra.referrer`, `tags.{member_id,subscriber_id}`

즉 사용자가 대시보드에 "stripe, customer_id, discord_id, email, user_id, ..." 전부 등록해도 **대부분 실제로 매칭 안 됨**. 디폴트 규칙이 우연히 걸린 것만 작동.

**수정**: `7c79825` — `beforeSend` 훅으로 전환
- `src/sentry-scrub.ts`: 허브 가드 1 리스트 + 기본 중첩, 재귀 walk, `[Filtered]` 치환
- `instrumentation.ts` (서버) + `instrumentation-client.ts` (클라이언트) 양쪽 `beforeSend` 연결
- 대시보드 설정 의존 버림. 버전 컨트롤·테스트 가능·리뷰 가능

## 탐지 경로 공통

가드 B (PII 검증 테스트) 가 없었으면 둘 다 영구 숨어 있었을 버그. "사이드 효과로 근본 문제 둘 찾아냈다"는 구조는:

1. 의도적으로 확인 가능한 테스트 케이스 설계 (structured context + fake PII)
2. 실 체인 동작 여부를 외부 관측점(Sentry 대시보드)에서 검증
3. 기대와 다르면 깊이 파고 내려감

## 일반화 — 가드 설계 원칙

**관측 인프라 배선은 항상 의도적 테스트 이벤트 수신 확인과 짝**. 설정만 해놓고 넘어가면 silent 실패 감지 불가. 이 원칙 자체가 다른 워커에도 재사용 가치 있음.

## Phase 3 관점

이번에 발견된 버그 2종은 Phase 3 (Claude Agent CI 자동 cross-update) 도래 시 "가드 B 패턴" 자체를 다른 워커에 전파하는 레퍼런스로 가치 있음. 즉 "가드 테스트가 근본 버그를 드러낸 사례" 를 knowledge graph 에 박아두면 후속 워커들이 같은 사고 회피.

## 워커 측 다음 액션 (사용자 확인 대기)

- 사용자 Sentry 확인 결과 (PASS 또는 어느 필드 남음) 알려주세요 → 결과에 따라:
  - 전원 Filtered → Step 2 (Internal Integration) 진행
  - 일부 남음 → 남은 필드명 기반 SENSITIVE_KEYS 보강 후 재배포 + 재테스트
- `sentry.server.config.ts` dead code → 세션 끝 sentry-test revert 때 정리
