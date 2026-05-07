# Changelog

본 허브의 굵직한 변경만 기록. 일별 디테일은 `git log` 또는 `~/.gstack/projects/kkyu92-playbook/` 의 retro / health 히스토리.

형식: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) 기반.

## [0.3.1] — 2026-05-07

### Added
- **Wiki entries 2건 신규**: `llm-agent-artifact-first-diagnosis` (표면 로그 vs artifact 실파일 진단 패턴) + `vercel-ignore-command-preview-skip` (100회/일 배포 한도 보호)
- **Wiki entries 총 104건** (102→104)
- **GH Actions billing 완전 해소** (2026-05-07): playbook/moneyball/blog-autopilot 퍼블릭 전환 + 초과분 결제. run #25471190398 success 확인

### Changed
- `hub-worker-compounding-pattern` confidence 3→4: zero-touch 63+ cycle 자율 회전 + 3 fork 운영 + worker-lesson 자동 ingest 운영 증거 추가
- develop-cycle-hub SKILL.md: Trigger-5 N=6 dogfood 박제 (동일 0회 chain 명단 4회 연속 = dormancy 완전 항구화). zero-touch 59+→63+ 갱신
- TODOS.md: `[P0] GitHub Actions billing 차단` → `[DONE]` 해소 처리

### Fixed
- SKILL.md 0-byte 복원: 직전 세션 sed 오동작으로 비워진 파일을 JSONL 트랜스크립트에서 복원

## [0.3.0] — 2026-05-06

### Added
- **Phase 4+5 closed-loop (양방향 복리성장 비전 완전 검증)**: D4 dual SessionStart hook (워커 auto-sync) + D5 incident-followup pressure + Phase 5 워커 self-develop (Cloudflare + claude-code-action OAuth). 비전 1+2+3 모두 smoke 검증 완료 (2026-04-29/30)
- **Cloudflare Workers scheduler** (T9): GH Actions cron 8개 → Cloudflare `playbook-cron` worker 이관. silent drop 근본 원인 해소. 분 정밀도 손실만 (무관)
- **develop-cycle-hub zero-touch infrastructure** (cycle 48): `watch.sh` + `launchd com.kkyu.dch-watch` + `plist` + `install.sh` ship. 1 세션 = 1 사이클 자동 회전 활성
- **blog-autopilot 3rd fork** (develop-cycle-blog skill, PR #66 머지 5-4): develop-cycle 3 fork 운영 체제 확립 (머니볼 + 허브 + blog-autopilot)
- `curate-routine.yml` + Cloudflare UTC 00:00 매핑: daily raw-sources auto-archive (KST 09:00). 자가 organism 휴면 → 활성
- `notify-workers.yml` (PR #88): 허브 content 머지 → 영향 워커 레포 hub-update Issue 자동 생성 (push channel GA)
- `incident-followup.yml` (Phase 4 D5): Vercel/CI incident 3+ 일 미해결 자동 follow-up pressure
- `silent-skip-tracker.yml`: CI cron silent skip 자동 감지 + visibility
- Fine-grained PAT (T5, PR #44~48): Classic → Fine-grained PAT 전환. 만료 2027-04-27. `pat-expiry-check.yml` 신규
- `docs/solutions/` 7건 축적: llm-generation 4건 (`_compiled-truth.md` 코드 게이트 승격), ci-github-actions 2건, mdx 1건
- Wiki entries: `silent-drift-family-pattern` 9→13 fork 진화 (review-code chain dominance dogfood). Journal 026편까지 append
- `category-rebalance.yml` + `scripts/category-rebalance.mjs`: monthly self-gating 클러스터링 (N_total < 30 시 silent-skip)
- `src/config/projects.ts` PROJECTS: 워커 UI 대시보드 표시 (PR #43 gap 보강)

### Changed
- GH Actions cron `on.schedule` 8개 제거, `workflow_dispatch:` 만 유지 (T9)
- develop-cycle-hub SKILL.md: zero-touch 룰 강화 (1 세션 1 사이클), chain pool 고도화
- `auto-ingest.yml` push fail hardening: self-policy/incident/lesson 3분기 explicit exit + lesson branch retry
- `embed-on-push.yml`: 워커 inbound content 포함 임베딩 자동 갱신

### Fixed
- Mermaid AUTO-FIX #2b: subgraph invalid-id + bracket-label normalize (PR #39, 6회 재발 패치)
- `notify-workers.yml` HEREDOC EOF gap (ci-github-actions solution #1)
- `notify-workers.yml` guard-skip cascade gap (ci-github-actions solution #2)
- blog-autopilot Pull 축 e2e 검증: lesson commit → 허브 auto-ingest PR 자동 생성 완전 동작
- PLAYBOOK_PAT `GH_PAT || GITHUB_TOKEN` fallback: cross-repo dispatch silent fail 방어

## [0.2.0] — 2026-04-19

### Added
- Wiki entries 9개 (drift-detection-methodology, hub-worker-compounding-pattern, ambient-knowledge-injection, harness 시리즈 등)
- 허브-워커 복리 엔진 Phase 1: auto-ingest 하이브리드 + repository_dispatch + cross-update
- Reviews 게이트 5종 (codex / cso / health / design / devex) 운영 모드
- DX Quick Wins: `.env.example`, README Quickstart 95줄, `ARCHITECTURE.md` (mermaid 6종)
- `workers.config.json` — 레포 진실 소스, 머신 무관
- GitHub Actions cron 3종: auto-ingest, weekly-triage, daily-lesson
- Self-check 퀴즈 + Knowledge graph 시각화 + Cmd+K 검색
- `/ingest`, `/lint`, `/handoff` 슬래시 커맨드
- 드리프트 감지 프로토콜 박제 (CLAUDE.md Level 0~3)

### Changed
- `rate-limit`: in-memory → Upstash Redis (Vercel Marketplace) + fallback
- `lint-content.mjs`: 결정론 검사 ↔ 의미 판단 분리, workers.config 기반 noise 제외
- 워커 태그 `[moneyballscore]` → `[moneyball]` 정규화

### Fixed
- `js-yaml` 누락 직접 의존성 — daily-lesson cron 작동 드리프트
- `.gitignore` `.env` 가족 누락 (cso HIGH)
- `pnpm/action-setup` SHA 미고정 (cso HIGH supply-chain)
- `weekly-triage` raw_id false-negative
- `magnetic-mode.tsx` dead code + TDZ bug 동시 제거
- React 19 `set-state-in-effect` 6건 — case-by-case justify

## [0.1.0] — 2026-04-15

### Added
- Initial bootstrap
- Core infrastructure: Next.js 16, MDX, Tailwind CSS 4
- HMAC cookie authentication
- Content pipeline scripts
- GitHub Actions workflows (Gemini pipelines)
- Hub-worker slash commands (`.claude/commands/`)
- Sample journal entry (playbook-journal-000-bootstrap)
