---
date: "2026-04-19"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
---

상황: Sentry Security & Privacy 의 "Additional Sensitive Fields" 에 전체 PII 리스트 (email, user_id, stripe, discord_id 등 30+ 항목) 등록했는데 구조화된 이벤트 (user / contexts / tags / extras) 의 대부분 필드가 RAW 로 Sentry 에 도착.

근본 원인: 기본 UI 의 Sensitive Fields 는 주로 request.data 와 일부 프레임에만 매칭. user / contexts / tags / extras 의 커스텀 필드는 디폴트 @password / @ip / @bearer 규칙이 필드명에 "auth" / "ip" / "bearer" 포함한 케이스만 우연히 커버. 커스텀 리스트 자체는 깊은 매칭 안 함.

검증 증거: 가드 B 테스트 결과 — contexts.auth / extra.oauth / extra.supabase.auth (이름에 "auth") 만 스크럽됨. contexts.payment.stripe / integration.discord_id / user.email 등은 전부 RAW.

수정: src/sentry-scrub.ts 에 SENSITIVE_KEYS Set + 재귀 walk + [Filtered]. instrumentation.ts (서버) + instrumentation-client.ts (클라이언트) Sentry.init 에 beforeSend: scrubSentryEvent 훅. 대시보드 설정 의존 완전 버림.

교훈: Sentry 대시보드 Sensitive Fields 는 기본 @password / @ip / @bearer 패턴 + request.data 위주라 믿으면 안 됨. 코드 레벨 beforeSend 훅이 reliable. 버전 컨트롤 + 테스트 fixture + 리뷰 가능.

부수 교훈: Vercel 서버리스에선 Sentry.captureException 후 await Sentry.flush(2000~3000) 누락 시 함수 종료로 이벤트 유실.

부수 교훈 2: playbook auto-ingest.yml 이 journal 번호 race condition 에 취약 — 동시 lesson dispatch 시 같은 번호로 충돌. hub 측 수정 후보.

참조:
- playbook/content/infrastructure/sentry-pii-scrubbing-beforesend.mdx
- playbook/content/infrastructure/sentry-serverless-flush.mdx
