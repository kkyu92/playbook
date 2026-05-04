# TODOS

## [P2] drift detection 자동화 (sessionstart hook 강화)

**What**: 매 사이클 시작 시 git fetch + status 자동. local stale 자동 감지
**Why**: cycle 11 incident — git status="up to date" 거짓말 (직전 fetch 안 함, 6 commits behind 미감지) → PR #143 변경 사라짐 잘못된 결론. 본 SKILL.md 진단 단계 첫 step 에 git fetch 명시 필요
**Trigger**: cycle 11 lesson 박제 1회. N≥2 재발 시 SKILL.md 갱신 trigger
**Effort**: S — develop-cycle-hub SKILL.md 진단 첫 step 에 `git fetch` 추가 1줄
**Reference**: cycle 11 lesson commit + memory `feedback_drift_detection_protocol`

## [P2] raw-sources auto-archive 자동화

**What**: auto-ingest 후 처리 완료된 raw-sources/*.md 를 자동으로 `_archive/` 로 이동
**Why**: cycle 7 worker-incident-triage 진단 결과 — raw-sources 누적 48건, archive 율 12% (6/48). ci-main-* (워커 incident) 11건 누적. auto-ingest 가 entry 변환 후 raw 파일 archive 단계 부재 또는 silent skip
**Trigger**: cycle 7 진단 직접 follow-up. 누적 비율 ↑ 시 신호 (50% archive 율 도달 목표)
**Effort**: M — auto-ingest workflow 끝 step 에 archive 분기 추가 (entry 생성 success 시 raw → _archive mv) + git mv tracking
**Reference**: cycle 7 retro / `feedback_auto_ingest_after_merge.md`

## [P2] auto-ingest connections 자동 결손 root cause

**What**: 12 journals isolated (connections [] 박제) — auto-ingest workflow 가 entry 생성 시 connections 5~15 cross-update 단계 누락
**Why**: `/ingest` 명령은 spec 정합 (connections 5~15 + 양방향 cross-update), 단 auto-ingest workflow (LLM 자동 호출) 흐름은 이 단계 누락 가능. 12 journals 누적 = 자동화 process 결손
**Trigger**: cycle 1+3 lazy 박제 (단발 → N=2 누적). N≥3 재발 시 closed-loop-design chain 자동 trigger 또는 fix-incident
**Effort**: M~L — auto-ingest.yml 분석 + LLM prompt 변경 + cross-update 단계 통합
**Reference**: cycle 1 lazy / cycle 3 retro carry-over

## [P2] eslint config `_` prefix convention

**What**: `@typescript-eslint/no-unused-vars` rule 에 `argsIgnorePattern: "^_"`, `varsIgnorePattern: "^_"` 추가
**Why**: `_` underscore prefix = 의도된 unused convention. 현재 lint 에서 경고 → 9 warnings 잔여 중 `_` prefix 류 다수
**Trigger**: cycle 2 lazy carry-over. eslint config 변경 = 모든 unused vars 영향 (사용자 결정 후보)
**Effort**: S (CC ~5분) — eslint.config.mjs rules 추가
**Reference**: cycle 2 carry-over

## [P3] cron silent skip — 외부 scheduler 이관 평가

**What**: 9개 cron-trigger 워크플로 중 schedule 의존 vs 외부 dispatch 분류 진단 + Cloudflare Workers Cron Triggers 이관 평가
**Why**: 7일치 schedule fire 측정 — weekly-triage / pat-expiry-check / silent-skip-tracker / smoke-test-gemini-keys / promotion-scan / vercel-retry / incident-followup = 0건. gemini-key-health / daily-ingest-geeknews = 1건. silent skip evidence 명확
**Trigger**: cycle 3 retro carry-over. 사용자 결정 영역 (메모리 `feedback_gh_actions_cron_unreliable` 권장 = Cloudflare Workers Cron Triggers Free 5 cron/account, 머니볼+허브 검증)
**Effort**: L — 진단 깊이 + 사용자 결정 + 이관 구현
**Reference**: cycle 3 retro carry-over + `feedback_gh_actions_cron_unreliable.md`

## [DONE] develop-cycle-hub N=20 milestone — Phase 2 진입 trigger 5 충족

**Shipped**: 2026-05-04 (cycle 11~20, 한 세션 안에 N=20 milestone)

**chain pool 11 발화 통계 (N=20 누적)**:
- 발화 8/11: curate (6회) / review-code (3회) / dimension-cycle (3회) / closed-loop-design (2회) / worker-incident-triage (2회) / explore-idea (2회) / fix-incident (1회) / expand-scope (1회)
- 미발화 3/11: **polish-ui / design-system / skill-evolution** — 직전 20 사이클 0회 = **trigger 5 충족** (Phase 2 진입)
- retro-only 비율 = 7/20 (35%) — chain 시퀀스 PR X 패턴 누적

**ship PR list (cycle 11~20)**:
- PR #148 (cycle 11) — Cloudflare worker named const (lint 2 → 1)
- PR #149 (cycle 12) — journal 010 connections (isolated 11 → 10)
- PR #150 (cycle 13) — TODOS drift detection 자동화 idea
- PR #151 (cycle 14) — journal 013 connections
- PR #152 (cycle 15) — journal 014 connections
- PR #153 (cycle 19) — journal 015 connections

**Phase 2 진입 결과**:
- ✅ trigger 5 (chain 0회 발화 in 20 사이클) = **첫 충족 evidence**
- → cycle 21 진단 단계 첫 step 에서 마커 발견 시 `skill-evolution` chain 강제 발화
- 갱신 영역 = 미발화 chain 3개 trigger 명확화 또는 chain pool 줄이기

**Reference**: `~/.develop-cycle-hub/cycles/11~20.json`

## [DONE] develop-cycle-hub N=10 dogfood 검증 (cycle 1~10)

**Shipped**: 2026-05-04 (cycle 1~10 한 세션 안에 N=10 milestone)

**chain pool 11 발화 통계 (N=10)**:
- ✅ 7 발화: curate (2회) / review-code (2회) / closed-loop-design / dimension-cycle (2회) / expand-scope / worker-incident-triage / explore-idea
- ❌ 4 미발화: fix-incident / polish-ui / design-system / skill-evolution
- retro-only 비율 = 3/10 (30%) — chain 시퀀스 PR X 자연 패턴 (cycle 3 closed-loop / cycle 5 expand-scope partial / cycle 7 worker-incident-triage)
- partial outcome = 1/10 (cycle 5 expand-scope spec only)

**ship PR list**:
- PR #133 (cycle 1) — weekly reports connections (isolated 14 → 12)
- PR #134 (cycle 2) — lint warnings cleanup (11 → 9)
- PR #136 (cycle 4) — TODOS N=3 dogfood 박제
- PR #138 (cycle 6) — eslint config _ prefix (9 → 8)
- PR #139 (cycle 8) — TODOS raw-sources auto-archive idea
- PR #140 (cycle 9) — journal 020 connections (isolated 12 → 11)
- PR #136 본 사이클 (cycle 10) — 본 N=10 milestone 박제

**메타 검증 (dogfood findings 누적)**:
- chain 시퀀스 단순화 정신 = N=2 누적 evidence (cycle 2 + 5)
- retro-only chain 패턴 정상 작동 (cycle 3/5/7)
- 동일 chain 재선택 = 2회 OK (review-code 2회 / curate 2회 / dimension-cycle 2회)
- 메모리 vs SKILL spec 충돌 = 메모리 우선 (issue #110 skip)
- 메모리 datapoint 추가 자가 의심 = lazy + memory not state 정신 (cycle 3)
- TODOS carry-over → 직접 fix loop 검증 (cycle 4 박제 → cycle 6 처리)
- expand-scope trigger (1) "직전 4 사이클 모두 small fix" 자연 충족 (cycle 5)

**Phase 진입 신호**:
- ✅ Phase 0 (chain pool 11 즉시 + cycle-retro 강제) — N=10 검증
- ✅ Phase 1 진입 (N≥5) — meta-pattern / chain-evolution dispatch 가능 (자율 판단, 본 사이클들 sample 부족 박제 X)
- ⏳ Phase 2 (N≥20) — skill-evolution 첫 발화 가능 + zero-touch watch.sh 평가
- ⏳ Phase 3 (N=50) — skill-evolution milestone 자동 발화

**메모리 박제 lazy carry-over**:
- 메모리 우선 규칙 / push 시점 정책 / chain 시퀀스 단순화 정신 — N=3+ 재발 → SKILL.md 갱신 trigger
- 미발화 chain 4개 (fix-incident / polish-ui / design-system / skill-evolution) — N≥20 시 trigger (5) "chain 0회 발화" 명확화
- raw-sources auto-archive (cycle 8 idea) + auto-ingest connections root cause (cycle 1+3 lazy) = 자동화 process 결손 패턴 누적

**Reference**: `~/.develop-cycle-hub/cycles/1~10.json` + `~/.claude/skills/develop-cycle-hub/SKILL.md`

## [DONE] develop-cycle-hub 첫 dogfood — N=3 사이클 검증

**Shipped**: 2026-05-04 (cycle 1+2+3)

**검증 결과**:
- ✅ chain pool 다양성 보강 (curate / review-code / closed-loop-design 3개 발화)
- ✅ chain 시퀀스 가벼운 step 직접 진행 (4 sub-skills 강제 X) — review-code 경험
- ✅ cycle_state JSON 외부 박제 + commit body subtype dispatch 흐름 (`~/.develop-cycle-hub/cycles/<n>.json`)
- ✅ retro-only outcome 패턴 (cycle 3 closed-loop-design)
- ✅ 메모리 vs SKILL spec 충돌 시 메모리 우선 (issue #110 skip)
- ✅ skill-evolution trigger 5종 자가 평가 정상

**ship PR**:
- **PR #133** (cycle 1 curate) — weekly reports connections 보강 (isolated 14 → 12)
- **PR #134** (cycle 2 review-code) — lint warnings cleanup (11 → 9)
- cycle 3 = retro-only (외부 scheduler 이관 = 사용자 GO 영역)

**메모리 박제 lazy carry-over**:
- chain pool 11개 적정성 (N=4 sample) — N≥20 후 trigger 5 (chain 0회 발화) 명확화
- 메모리 우선 규칙 / push 시점 정책 — N=3+ 재발 시 SKILL.md 갱신 trigger
- skill-evolution chain 첫 발화는 N≥20 + 5 trigger 충족 시점 (현재 0 evidence)

**Reference**: `~/.claude/skills/develop-cycle-hub/SKILL.md` + cycle_state 1/2/3.json + commits aba5f2f / 9291580 / e5cd796

## [P3] embed-on-push incremental embedding

**What**: 변경된 entry 만 embed, 기존 embeddings.json 재사용
**Why**: 현재 매 push 마다 전체 재생성. 연 1440 entry 도달 시 ~15분 빌드 예상. GitHub Actions 타임아웃 리스크.
**Trigger**: 6개월 경과 또는 entry 500개 초과 시 전환
**Effort**: M (CC ~30분) — embed-content.mjs 를 sha hash 기반 cache 로 변경
**Depends on**: 본 pivot 1단계 배포 후 월간 entry 증가 관찰 (월 120 예상)
**Context**: 2026-04-21 eng review 에서 Section 4.2 에 flagged. 현재는 문제 없음 (연 9MB 증가율).

## [DONE] Phase 4-pre — Prerequisite (inventory + schema 정정)

**Shipped**: 2026-04-29 PR #60
- README "Actions × 8" → 14 정정
- ARCHITECTURE drift (`daily-lesson.yml` / `generate-on-pick.yml` 미존재) 박제
- `auto-ingest.yml` lesson 도 fingerprint 권장
- `docs/setup-worker-integration.md` subtype self-policy 예시 추가

**Reference**: eng plan v2 `~/.gstack/projects/kkyu92-playbook/eng-plans/2026-04-29-phase4-implementation.md`

## [DONE] Phase 4a — D4 + D5 + D4 dual

**Shipped**: 2026-04-29
- **PR #61** (kkyu92/playbook): D4 lib + auto-ingest subtype 분기 + D5 incident-followup workflow + lib + Vitest 16 tests + Cloudflare worker.ts 매핑 + inventory bump 14→15
- **PR #62** (kkyu92/playbook): D4 dual hub SessionStart auto-pull hook (main 만 fire) + jominho stale paths cleanup
- **PR #14** (kkyu92/moneyballscore): submit-lesson `lesson:`+`policy:`+`feedback:`+`memory:` prefix 확장 + subtype/fingerprint dispatch + D4 dual SessionStart hub-sync hook
- **PR #41** (kkyu92/blog-autopilot): 같은 워커 변경
- Cloudflare worker 재배포 (incident-followup KST 06:00 매핑)

**D5 즉시 가치 검증**: smoke test 1 reminder 자동 생성 — `vercel-deploy-1e80b78` (moneyballscore Issue #15, 4-26 incident 3+일 미해결).

**E1 폐기**: codex finding #4 정합. D5 follow-up pressure 흡수.

**Memory 갱신**: `project_phase4_closed_loop_scope.md` — 4a ship 결과 + codex 7 findings 정합 + 4b 진입 조건.

## [DONE] Phase 5 — 워커 self-develop closed loop + 양방향 무한성장 자동화 완성

**Shipped**: 2026-04-29~30 (사용자 결정으로 5/13 측정 게이트 폐기, 즉시 진입)

**비전 1+2+3 모두 검증**:
- ✅ **비전 1 (워커 자동성장)** — Cloudflare cron (KST 09:00) → claude-code-action OAuth → 자율 LLM 결정 → carry-over chain (10 fire/cycle) + 메타 회고
- ✅ **비전 2 (양방향 흡수)** — submit-lesson run 25097914714 success → 허브 auto-ingest PR #76 자동 생성 e2e 검증
- ✅ **비전 3 (전파 시점)** — 시작=SessionStart hook, 종료=cycle 10 fire (carry-over Issue close), 워커→허브=세션별 commit-driven

**Ship PR list**:
- **playbook PR #70** — auto-workers-tag.yml (5d) + SessionStart hook 강화 (hub-sync-rules 자동)
- **moneyball PR #16** — Phase 4a D4 + 5a self-develop closed loop (daily cron + claude-code-action)
- **moneyball PR #19** — agent-loop namespace 분리 (`self-dev` → `agent-loop`) + carry-over chain (label `agent-loop,handoff`) + 6 cycles 디버그 lesson 박제 (drift case)
- **moneyball PR #14** (이미 ship, 4-29) — 4 prefix dispatch (재사용)
- **moneyball commit b406eb9** — lesson commit (carry-over 부재 → 6 cycles main push) → 허브 PR #76 (Journal 012) 자동 생성 ⇒ **양방향 e2e 첫 성공**

**입증 패턴 (메모리 박제)**: `feedback_proven_worker_automation_pattern.md`
- self-hosted [home] runner + claude-code-action + 워커 자체 Cloudflare cron
- ANTHROPIC_API_KEY 직접 호출 default 금지

**누적 비용**: 머니볼 6 cycles 디버그 cost 표시 ~$4.65 — 실제 청구 0 (구독 OAuth quota 안)

**carry-over smoke v1+v2 검증 (4-30)**: 100% 자율 자동화 — 사용자 직접 작업 0건
- v1: 머니볼 PR #21 (fire 1) sync-batter-stats Cloudflare 이관 OPEN
- v1: 머니볼 PR #23 (fire 2 carry) pitcher-snapshot 이관 → cron 5/5 우려로 close
- v2: handoff #24 → fire 5 = PR #25 분기 통합 재구현 (03a4867 정신 자율 보존, cron 4/5 유지) OPEN
- 머니볼 Issue #15/#17/#20/#22 자동 close (lesson-pending 처리 + Self-report relabel + 토큰 회전 + handoff smoke)
- 머니볼 cron 4→1 압축 (사용자 진행 중) — Cloudflare account cron 5/5 → 2/5 여유 회복

**핵심 자율 학습 증거**: 사용자 (b) 결정 (PR #23 close + handoff #24 박제) → fire 5 가 분기 통합 패턴 자율 재구현. 의도/제약 자율 학습 + agent-loop 자율 commit 분리 (`feat:` + `lesson:` 분리 → submit-lesson trigger 보존)

**4-30 발견 — OAuth 토큰 회전 risk**: 어제 (4-29) 박은 `CLAUDE_CODE_OAUTH_TOKEN` 이 오늘 401. 메모리 `feedback_oauth_token_rotation_risk.md` 박제. 향후 backlog (fine-grained PAT-style long-lived 또는 refresh token 자동 갱신).

**잔여 (사용자 결정 / 자연 운영)**:
- ✅ 허브 PR #76 머지 (`de40edb`, journal 012 보강 — 분석/교훈/적용 + connections 3건 + workers tag)
- ✅ 머니볼 PR #18 close
- ✅ 머니볼 PR #21 머지 + #25 close (분기 통합 직접 push)
- ⏸ pat-expiry-check 처리 (사용자 결정 α/β/γ)
- ⏸ fine-grained PAT (`workflows:write`) 발급 — OAuth 회전 + workflows 차단 동시 mitigation
- ⏸ 5/13 routine 영구 삭제 (web UI: https://claude.ai/code/routines/trig_01RAZ2ADaGQoTXt1aXZEf6Se)
- ⏸ 5-1 KST **09:17** 자연 fire 검증 (`9e9e97f` 시점 변경 반영, daily-pipeline announce 와 동시)

**다음 head**: blog-autopilot (머니볼 완전 종료 후) — 같은 패턴 + OAuth 회전 risk 사전 mitigation

## [P3 → 흡수] Phase 4b — E2 measurement + E3 CLI

**4-30 결정**: Phase 5 ship으로 비전 완성 — Phase 4b 측정 게이트 자체가 의미 상실. E2 (vector 측정) + E3 (hub-bootstrap CLI) 는 운영 데이터 누적되면 자연 진행 또는 deferred.

## [P2] Phase 4c — Gemini 진단 + workflow test infra (deferred)

**What**: E2 의 Gemini 진단 layer + workflow test infra (Bats 또는 GH actions test harness) + E4 + D7

**Trigger**: 4b vector 안정화 후 / N≥3 lesson 재발 패턴 누적 후

**Effort**: E2 Gemini ~30분, workflow test infra ~1h, E4 XL ~3h, D7 M ~30분

**Reference**:
- eng plan v2 동일
- CEO plan: `~/.gstack/projects/kkyu92-playbook/ceo-plans/2026-04-28-mid-review-phase4-closed-loop.md`

