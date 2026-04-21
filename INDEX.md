# Playbook Wiki Index
Updated: 2026-04-21T07:15:03.407Z

## 엔트리 (17개)

### Prompt Engineering
- [Prompt Engineering을 위한 견고한 프롬프트 버전 관리 및 테스트 전략](wiki/prompt-engineering/prompt-versioning-and-testing) — confidence: 1, status: draft

### Context Engineering
- [Ambient Knowledge Injection via Symlink](wiki/context-engineering/ambient-knowledge-injection) — confidence: 3, status: complete
- [Next.js 16 instrumentation.ts 위치 — 프레임워크 컨벤션 silent 실패](wiki/context-engineering/nextjs-instrumentation-location) — confidence: 3, status: complete

### Harness Engineering
- [Drift Detection Methodology — 가정과 현실 사이 4종 괴리](wiki/harness-engineering/drift-detection-methodology) — confidence: 4, status: complete
- [Guard Test Pattern — 의도적 검증 테스트가 N건 근본 버그 동시 폭로](wiki/harness-engineering/guard-test-pattern) — confidence: 3, status: complete
- [Hub-Worker Compounding Pattern — 양방향 자동 지식 흐름](wiki/harness-engineering/hub-worker-compounding-pattern) — confidence: 3, status: complete
- [Question Own Defaults — AI 가 자기 제안/상속값 자가 의심하기](wiki/harness-engineering/question-own-defaults) — confidence: 2, status: complete
- [Playbook Journal 000 — 부트스트랩](wiki/journal/playbook-journal-000-bootstrap) — confidence: 3, status: in-progress
- [Playbook Journal 001 — 구현된 코드를 그린필드로 간주한 드리프트](wiki/journal/playbook-journal-001-drift-greenfield) — confidence: 5, status: complete
- [Playbook Journal 002 — 이미 설치된 것을 신규로 간주한 드리프트](wiki/journal/playbook-journal-002-drift-existing-setup) — confidence: 5, status: complete
- [Playbook Journal 003 — 머지됐지만 죽어있는 코드 드리프트](wiki/journal/playbook-journal-003-drift-silent-bugs) — confidence: 5, status: complete
- [Playbook Journal 004 — 반쪽짜리 작동 드리프트](wiki/journal/playbook-journal-004-drift-half-working) — confidence: 5, status: complete
- [Playbook Journal 005 — moneyballscore ↔ playbook 연동 E2E 테스트](wiki/journal/playbook-journal-005-moneyballscore-playbook-e2e) — confidence: 4, status: complete
- [Playbook Journal 006 — Next.js 16 src/app 구조에서 instrumentation.ts 위치 — silent 서버 Sentry 사망](wiki/journal/playbook-journal-006-next-js-16-src-app-instrumentation-ts-silent-sentr) — confidence: 3, status: in-progress
- [Playbook Journal 007 — Sentry 대시보드 Sensitive Fields 깊이 매칭 한계 — beforeSend 훅이 정답](wiki/journal/playbook-journal-007-sentry-sensitive-fields-beforesend) — confidence: 3, status: in-progress

### Infrastructure
- [Sentry PII Scrubbing — beforeSend 훅 vs 대시보드 Sensitive Fields](wiki/infrastructure/sentry-pii-scrubbing-beforesend) — confidence: 3, status: complete
- [Sentry on Vercel Serverless — captureException 후 flush() await 필수](wiki/infrastructure/sentry-serverless-flush) — confidence: 3, status: complete

## 교차 참조 (connections 기반)
- context-engineering/ambient-knowledge-injection ↔ harness-engineering/hub-worker-compounding-pattern
- context-engineering/ambient-knowledge-injection ↔ journal/playbook-journal-005-moneyballscore-playbook-e2e
- context-engineering/ambient-knowledge-injection ↔ infrastructure/sentry-pii-scrubbing-beforesend
- context-engineering/ambient-knowledge-injection ↔ context-engineering/nextjs-instrumentation-location
- context-engineering/ambient-knowledge-injection ↔ infrastructure/sentry-serverless-flush
- context-engineering/ambient-knowledge-injection ↔ harness-engineering/guard-test-pattern
- context-engineering/ambient-knowledge-injection ↔ prompt-engineering/prompt-versioning-and-testing
- context-engineering/nextjs-instrumentation-location ↔ harness-engineering/drift-detection-methodology
- context-engineering/nextjs-instrumentation-location ↔ journal/playbook-journal-003-drift-silent-bugs
- context-engineering/nextjs-instrumentation-location ↔ journal/playbook-journal-004-drift-half-working
- context-engineering/nextjs-instrumentation-location ↔ harness-engineering/hub-worker-compounding-pattern
- context-engineering/nextjs-instrumentation-location ↔ infrastructure/sentry-pii-scrubbing-beforesend
- context-engineering/nextjs-instrumentation-location ↔ infrastructure/sentry-serverless-flush
- context-engineering/nextjs-instrumentation-location ↔ harness-engineering/guard-test-pattern
- context-engineering/nextjs-instrumentation-location ↔ journal/playbook-journal-006-next-js-16-src-app-instrumentation-ts-silent-sentr
- harness-engineering/drift-detection-methodology ↔ journal/playbook-journal-001-drift-greenfield
- harness-engineering/drift-detection-methodology ↔ journal/playbook-journal-002-drift-existing-setup
- harness-engineering/drift-detection-methodology ↔ journal/playbook-journal-003-drift-silent-bugs
- harness-engineering/drift-detection-methodology ↔ journal/playbook-journal-004-drift-half-working
- harness-engineering/drift-detection-methodology ↔ journal/playbook-journal-005-moneyballscore-playbook-e2e
- harness-engineering/drift-detection-methodology ↔ harness-engineering/hub-worker-compounding-pattern
- harness-engineering/drift-detection-methodology ↔ infrastructure/sentry-pii-scrubbing-beforesend
- harness-engineering/drift-detection-methodology ↔ infrastructure/sentry-serverless-flush
- harness-engineering/drift-detection-methodology ↔ harness-engineering/guard-test-pattern
- harness-engineering/drift-detection-methodology ↔ journal/playbook-journal-006-next-js-16-src-app-instrumentation-ts-silent-sentr
- harness-engineering/drift-detection-methodology ↔ journal/playbook-journal-007-sentry-sensitive-fields-beforesend
- harness-engineering/drift-detection-methodology ↔ prompt-engineering/prompt-versioning-and-testing
- harness-engineering/drift-detection-methodology ↔ harness-engineering/question-own-defaults
- harness-engineering/guard-test-pattern ↔ harness-engineering/hub-worker-compounding-pattern
- harness-engineering/guard-test-pattern ↔ infrastructure/sentry-pii-scrubbing-beforesend
- harness-engineering/guard-test-pattern ↔ infrastructure/sentry-serverless-flush
- harness-engineering/guard-test-pattern ↔ journal/playbook-journal-003-drift-silent-bugs
- harness-engineering/guard-test-pattern ↔ journal/playbook-journal-006-next-js-16-src-app-instrumentation-ts-silent-sentr
- harness-engineering/guard-test-pattern ↔ journal/playbook-journal-007-sentry-sensitive-fields-beforesend
- harness-engineering/guard-test-pattern ↔ prompt-engineering/prompt-versioning-and-testing
- harness-engineering/guard-test-pattern ↔ harness-engineering/question-own-defaults
- harness-engineering/hub-worker-compounding-pattern ↔ journal/playbook-journal-005-moneyballscore-playbook-e2e
- harness-engineering/hub-worker-compounding-pattern ↔ journal/playbook-journal-000-bootstrap
- harness-engineering/hub-worker-compounding-pattern ↔ journal/playbook-journal-001-drift-greenfield
- harness-engineering/hub-worker-compounding-pattern ↔ infrastructure/sentry-pii-scrubbing-beforesend
- harness-engineering/hub-worker-compounding-pattern ↔ infrastructure/sentry-serverless-flush
- harness-engineering/hub-worker-compounding-pattern ↔ journal/playbook-journal-006-next-js-16-src-app-instrumentation-ts-silent-sentr
- harness-engineering/hub-worker-compounding-pattern ↔ journal/playbook-journal-007-sentry-sensitive-fields-beforesend
- harness-engineering/hub-worker-compounding-pattern ↔ prompt-engineering/prompt-versioning-and-testing
- harness-engineering/hub-worker-compounding-pattern ↔ harness-engineering/question-own-defaults
- infrastructure/sentry-pii-scrubbing-beforesend ↔ journal/playbook-journal-003-drift-silent-bugs
- infrastructure/sentry-pii-scrubbing-beforesend ↔ infrastructure/sentry-serverless-flush
- infrastructure/sentry-pii-scrubbing-beforesend ↔ journal/playbook-journal-007-sentry-sensitive-fields-beforesend
- infrastructure/sentry-serverless-flush ↔ journal/playbook-journal-007-sentry-sensitive-fields-beforesend
- infrastructure/sentry-serverless-flush ↔ journal/playbook-journal-003-drift-silent-bugs
- journal/playbook-journal-000-bootstrap ↔ journal/playbook-journal-005-moneyballscore-playbook-e2e
- journal/playbook-journal-000-bootstrap ↔ journal/playbook-journal-001-drift-greenfield
- journal/playbook-journal-000-bootstrap ↔ journal/playbook-journal-002-drift-existing-setup
- journal/playbook-journal-000-bootstrap ↔ journal/playbook-journal-003-drift-silent-bugs
- journal/playbook-journal-000-bootstrap ↔ journal/playbook-journal-004-drift-half-working
- journal/playbook-journal-001-drift-greenfield ↔ journal/playbook-journal-002-drift-existing-setup
- journal/playbook-journal-001-drift-greenfield ↔ journal/playbook-journal-003-drift-silent-bugs
- journal/playbook-journal-002-drift-existing-setup ↔ journal/playbook-journal-003-drift-silent-bugs
- journal/playbook-journal-003-drift-silent-bugs ↔ journal/playbook-journal-004-drift-half-working
- journal/playbook-journal-006-next-js-16-src-app-instrumentation-ts-silent-sentr ↔ journal/playbook-journal-007-sentry-sensitive-fields-beforesend
