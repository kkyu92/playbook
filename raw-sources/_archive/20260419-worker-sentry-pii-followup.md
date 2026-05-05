---
date: "2026-04-19"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
parent: "raw-sources/20260419-worker-sentry-sentry-instrumentation-pii.md"
---

# [워커 → 허브 보고 v2] P3 가드 B PASS + 부수 3건 추가

## 요약 갱신

직전 보고 (버그 A + B) 에 더해 **가드 B v2 PASS 확정** + **부수 3건 추가 발견**. 가드 B 의도적 테스트가 총 5건 (근본 2 + 부수 3) 동시 폭로.

## 가드 B v2 재테스트 결과 (PASS)

- v2 이벤트: stamp `1776607028370`, fingerprint 강제 `['pii-guard-b-v2-beforeSend']`
- **Cmd+F "fake" → 0 matches** ✅
- beforeSend 훅 + 재귀 walk + SENSITIVE_KEYS 코드화 → 전원 [Filtered]

## 부수 1 — Sentry sourcemap 업로드 미배선

**원인**: `SENTRY_AUTH_TOKEN` env 미설정 → 빌드 sourcemap 업로드 skip → 이벤트마다 "Processing Error" 배지 (`app:///` URL fetch 실패).

**영향**: 기능 영향 없음. 스택트레이스가 minified 이름만 보임. **pre-existing** — 이번 가드 B 와 무관하지만 가드 B 테스트 중에 시각적으로 노출됨.

**해결**: `SENTRY_AUTH_TOKEN` Vercel env 설정 + `next.config.js` 의 sentry plugin 에 token 전달.

## 부수 2 — 같은 제목 이벤트 그룹 묶임 → fingerprint 강제

**원인**: Sentry 그룹핑이 `type` + `stacktrace` 기준 → beforeSend 배선 전/후 이벤트가 한 이슈에 묶여서 사용자가 새 이벤트 찾기 어려움.

**해결**: `event.fingerprint = ['pii-guard-b-v2-beforeSend']` 강제 → 별개 이슈 착륙. 이후 비교 검증 가능.

**일반화**: **가드 테스트 이벤트는 버전 별 fingerprint 강제해서 구 이슈 그룹과 분리**. 안 그러면 비교 검증 어려움.

## 부수 3 — Vercel 서버리스 Sentry.captureException flush 누락 ⚠️

**원인**: `Sentry.captureException()` 호출 후 Response 반환 즉시 function 종료 → 백그라운드 send 중이던 이벤트 유실. 서버리스 환경의 기본 trap.

**해결**:
```ts
Sentry.captureException(err);
await Sentry.flush(2000); // 2~3초 timeout
return Response.json({ ok: false }, { status: 500 });
```

**메타**: "기본 중 기본인데 Sentry Next.js SDK 가이드에 잘 부각 안 됨". 다른 Vercel 워커 모두 만날 가능성.

## 메타 패턴 — 가드 테스트가 N건 근본 버그 동시 폭로

가드 B (PII 스크러빙 검증) 1회 실행이 다음 5건 동시 폭로:
1. 버그 A — 서버 Sentry 사망
2. 버그 B — 깊이 매칭 부정확
3. 부수 1 — sourcemap 미업로드
4. 부수 2 — 그룹핑 묶임
5. 부수 3 — flush 누락

이 구조 자체가 메타 패턴: **의도적 검증 테스트는 sub-system 의 silent 실패를 다발로 드러낸다**.

## 워커 다음 진행 (Step 2~5)

- Step 2: Internal Integration (Sentry → GitHub Issue 자동 연동)
- Step 3: Vercel env (SENTRY_AUTH_TOKEN)
- Step 4: Alert Rule (Slack/email 노티)
- Step 5: 가드 D E2E (전체 체인)
- 최종: sentry-test 라우트 revert (E2E 완료 후)

## 제안 (허브 측)

1. **신규 wiki entry**:
   - `infrastructure/sentry-serverless-flush` — Vercel 서버리스 flush trap (단독)
   - `harness-engineering/guard-test-pattern` — 의도적 검증 테스트 = N건 동시 폭로 메타 패턴
2. **기존 entry 보강**: `infrastructure/sentry-pii-scrubbing-beforesend` 에 부수 1 (sourcemap), 부수 2 (fingerprint) 함정 절 추가
3. **ambient 배포**: 둘 다 `workers: [all]` — Vercel/Sentry 쓰는 모든 워커가 reference
