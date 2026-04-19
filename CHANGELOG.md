# Changelog

본 허브의 굵직한 변경만 기록. 일별 디테일은 `git log` 또는 `~/.gstack/projects/kkyu92-playbook/` 의 retro / health 히스토리.

형식: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) 기반.

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
