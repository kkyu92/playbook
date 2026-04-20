# Playbook Wiki Index
Updated: 2026-04-20T07:59:19.326Z

## 엔트리 (16개)

### Prompt Engineering
- [Prompt Engineering을 위한 견고한 프롬프트 버전 관리 및 테스트 전략](wiki/prompt-engineering/prompt-versioning-and-testing) — confidence: 1, status: draft

### Context Engineering
- [Ambient Knowledge Injection via Symlink](wiki/context-engineering/ambient-knowledge-injection) — confidence: 3, status: complete
- [Next.js 16 instrumentation.ts 위치 — 프레임워크 컨벤션 silent 실패](wiki/context-engineering/nextjs-instrumentation-location) — confidence: 3, status: complete

### Harness Engineering
- [Drift Detection Methodology — 가정과 현실 사이 4종 괴리](wiki/harness-engineering/drift-detection-methodology) — confidence: 4, status: complete
- [Guard Test Pattern — 의도적 검증 테스트가 N건 근본 버그 동시 폭로](wiki/harness-engineering/guard-test-pattern) — confidence: 3, status: complete
- [Hub-Worker Compounding Pattern — 양방향 자동 지식 흐름](wiki/harness-engineering/hub-worker-compounding-pattern) — confidence: 3, status: complete
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
- harness-engineering/guard-test-pattern ↔ harness-engineering/hub-worker-compounding-pattern
- harness-engineering/guard-test-pattern ↔ infrastructure/sentry-pii-scrubbing-beforesend
- harness-engineering/guard-test-pattern ↔ infrastructure/sentry-serverless-flush
- harness-engineering/guard-test-pattern ↔ journal/playbook-journal-003-drift-silent-bugs
- harness-engineering/guard-test-pattern ↔ journal/playbook-journal-006-next-js-16-src-app-instrumentation-ts-silent-sentr
- harness-engineering/guard-test-pattern ↔ journal/playbook-journal-007-sentry-sensitive-fields-beforesend
- harness-engineering/guard-test-pattern ↔ prompt-engineering/prompt-versioning-and-testing
- harness-engineering/hub-worker-compounding-pattern ↔ journal/playbook-journal-005-moneyballscore-playbook-e2e
- harness-engineering/hub-worker-compounding-pattern ↔ journal/playbook-journal-000-bootstrap
- harness-engineering/hub-worker-compounding-pattern ↔ journal/playbook-journal-001-drift-greenfield
- harness-engineering/hub-worker-compounding-pattern ↔ infrastructure/sentry-pii-scrubbing-beforesend
- harness-engineering/hub-worker-compounding-pattern ↔ infrastructure/sentry-serverless-flush
- harness-engineering/hub-worker-compounding-pattern ↔ journal/playbook-journal-006-next-js-16-src-app-instrumentation-ts-silent-sentr
- harness-engineering/hub-worker-compounding-pattern ↔ journal/playbook-journal-007-sentry-sensitive-fields-beforesend
- harness-engineering/hub-worker-compounding-pattern ↔ prompt-engineering/prompt-versioning-and-testing
- infrastructure/sentry-pii-scrubbing-beforesend ↔ journal/playbook-journal-003-drift-silent-bugs
- infrastructure/sentry-pii-scrubbing-beforesend ↔ infrastructure/sentry-serverless-flush
- infrastructure/sentry-pii-scrubbing-beforesend ↔ journal/playbook-journal-007-sentry-sensitive-fields-beforesend
- infrastructure/sentry-serverless-flush ↔ journal/playbook-journal-007-sentry-sensitive-fields-beforesend
- journal/playbook-journal-000-bootstrap ↔ journal/playbook-journal-005-moneyballscore-playbook-e2e
- journal/playbook-journal-001-drift-greenfield ↔ journal/playbook-journal-000-bootstrap
- journal/playbook-journal-002-drift-existing-setup ↔ journal/playbook-journal-000-bootstrap
- journal/playbook-journal-002-drift-existing-setup ↔ journal/playbook-journal-001-drift-greenfield
- journal/playbook-journal-003-drift-silent-bugs ↔ journal/playbook-journal-000-bootstrap
- journal/playbook-journal-003-drift-silent-bugs ↔ journal/playbook-journal-001-drift-greenfield
- journal/playbook-journal-003-drift-silent-bugs ↔ journal/playbook-journal-002-drift-existing-setup
- journal/playbook-journal-003-drift-silent-bugs ↔ infrastructure/sentry-serverless-flush
- journal/playbook-journal-004-drift-half-working ↔ journal/playbook-journal-000-bootstrap
- journal/playbook-journal-004-drift-half-working ↔ journal/playbook-journal-003-drift-silent-bugs
- journal/playbook-journal-006-next-js-16-src-app-instrumentation-ts-silent-sentr ↔ journal/playbook-journal-007-sentry-sensitive-fields-beforesend

## 미작성 주제 (topic-pool 기반, 71개)
- [prompt-engineering] System Prompt Design Patterns
- [prompt-engineering] Few Shot Optimization
- [prompt-engineering] Chain Of Thought Strategies
- [prompt-engineering] Prompt Chaining Pipelines
- [prompt-engineering] Output Format Control
- [prompt-engineering] Prompt Injection Defense
- [prompt-engineering] Multimodal Prompting Patterns
- [context-engineering] Claude Md Structure Design
- [context-engineering] Context Window Management
- [context-engineering] Dynamic Context Injection
- [context-engineering] Context Compression Techniques
- [context-engineering] Multi Turn Context Strategies
- [context-engineering] Token Budget Optimization
- [context-engineering] Rag Context Assembly
- [context-engineering] Context Hierarchy Patterns
- [harness-engineering] Ci Cd Gate Design
- [harness-engineering] Agent Safety Guardrails
- [harness-engineering] Human Ai Collaboration Patterns
- [harness-engineering] Vibe Coding Methodology
- [harness-engineering] Ai Pair Programming Workflow
- [harness-engineering] Code Review Automation
- [harness-engineering] Harness Testing Strategies
- [harness-engineering] Prompt To Product Pipeline
- [agents] Multi Agent Debate Patterns
- [agents] Tool Use Design Patterns
- [agents] Mcp Model Context Protocol
- [agents] Agent Memory Systems
- [agents] Planning And Reasoning Patterns
- [agents] Human In The Loop Design
- [agents] Autonomous Agent Architectures
- [agents] Agent Orchestration Frameworks
- [evaluation] Llm As Judge Patterns
- [evaluation] Output Validation Five Layers
- [evaluation] Hallucination Detection
- [evaluation] Benchmark Design Methodology
- [evaluation] A B Testing For Llm
- [evaluation] Cost Quality Tradeoff Analysis
- [evaluation] User Feedback Loop Design
- [evaluation] Eval Driven Development
- [infrastructure] Error Monitoring Patterns
- [infrastructure] Rate Limiting Strategies
- [infrastructure] Model Routing And Fallback
- [infrastructure] Prompt Caching Optimization
- [infrastructure] Api Gateway Patterns
- [infrastructure] Cost Optimization Strategies
- [infrastructure] Observability For Llm Apps
- [infrastructure] Batch Processing Pipelines
- [frontend-ai] Streaming Ui Patterns
- [frontend-ai] Error Boundary For Ai
- [frontend-ai] Ai Sdk Vercel Integration
- [frontend-ai] Chat Interface Design
- [frontend-ai] Optimistic Ui With Llm
- [frontend-ai] Real Time Translation Ui
- [frontend-ai] Ai Search Autocomplete
- [frontend-ai] Loading State Patterns
- [project-ops] Vercel Deploy Strategies
- [project-ops] Github Actions Cron Ops
- [project-ops] Drift Detection Automation
- [project-ops] Monorepo Management
- [project-ops] Environment Variable Management
- [project-ops] Release Versioning Workflow
- [project-ops] Uptime Monitoring Setup
- [project-ops] Rollback Strategies
- [data-engineering] Web Scraping Patterns
- [data-engineering] Supabase Rls Design
- [data-engineering] Data Pipeline Orchestration
- [data-engineering] Etl For Llm Training Data
- [data-engineering] Structured Data Extraction
- [data-engineering] Database Migration Strategies
- [data-engineering] Data Validation Patterns
- [data-engineering] Incremental Sync Patterns
