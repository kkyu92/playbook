---
date: "2026-04-19"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
---


상황: @sentry/nextjs SDK v10 마이그레이션 커밋이 CI / 빌드 / 클라이언트 Sentry 전부 통과. 하지만 서버 사이드 Sentry 는 완전히 죽은 상태로 방치됐음. 약 14시간 동안 모든 프로덕션 API / SSR / RSC 에러가 포착 안 됨.

근본 원인: Next.js 16 + src/app 라우터 구조에서 instrumentation.ts 는 프로젝트 루트 (apps/moneyball/) 가 아닌 **src/ 내부** (apps/moneyball/src/instrumentation.ts) 에 있어야 Next 가 자동 감지·로드. 루트 위치면 파일 존재조차 인식 못해서 register() 호출 0, 모듈스코프 실행 0.

증상: Sentry.getClient() 가 모든 서버 함수에서 undefined. 클라이언트 사이드 (instrumentation-client.ts 는 webpack chunk 로 번들되는 경로라 작동) 는 영향 없음.

수정: git mv instrumentation.ts src/instrumentation.ts + instrumentation-client.ts 도 동일 이동. Sentry.init 을 모듈스코프 + register() 둘 다 호출하도록 리팩터 (dynamic import 의존 제거).

교훈: 마이그레이션 커밋이 CI / 빌드 / 클라이언트 통과해도 서버 observability 는 silent 죽을 수 있음. 관측 인프라 배선은 반드시 의도적 테스트 이벤트 수신 확인 짝.

탐지: 가드 B (PII 스크러빙 검증) 테스트 이벤트가 Sentry 에 안 뜨는 것만 단서 → 진단 response 에 Sentry.getClient() 값 노출해서 undefined 확인.

참조: playbook/content/context-engineering/nextjs-instrumentation-location.mdx
