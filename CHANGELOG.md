# Changelog

본 허브의 굵직한 변경만 기록. 일별 디테일은 `git log` 또는 `~/.gstack/projects/kkyu92-playbook/` 의 retro / health 히스토리.

형식: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) 기반.

## [0.5.0] — 2026-05-07

### Changed
- `develop-cycle-hub` SKILL.md 열여섯 번째 발화 (N=16) 박제 — Trigger-5 (직전 20 cycle 199-218, 0회 chain 6개: fix-incident/polish-ui/closed-loop-design/dimension-cycle/expand-scope/design-system). dimension-cycle 명단 재진입 관측 (cycle 196-198 window 탈퇴 해소). zero-touch 63+→218+ cycle 검증 (cycle 219)
- TODOS BRANCHED N≥6 정책 박제 — origin/local 재발산 N≥6 연속 감지, [P0] 항목 업데이트 자동화 정착 (cycle 219)
- dashboard `closed-loop-health` cycle 217 → 219 갱신 — retro-only 5%, 0회 chain 6개 유지 (cycle 220)

## [0.4.9] — 2026-05-07

### Added
- `docs/solutions/react/` 카테고리 신규 — NavLinks useEffect 내 setState 직접 호출 ESLint 재발 패턴 (cycle 217, moneyball cycle 227-229 2회 연발)

### Changed
- dashboard `closed-loop-health` cycle 213 → 217 갱신 — worker-incident-triage 2회 발화로 0회 chain 명단 탈퇴, retro-only 10%→5%

## [0.4.8] — 2026-05-07

### Changed
- `develop-cycle-hub` SKILL.md 열다섯 번째 발화 (N=15) 박제 — Trigger-5 (명단 4회 연속 동일 201→212→213→215), cycle 216 retro 재평가: 명단 6→5 축소 (worker-incident-triage cycle 215 자연 발화 탈퇴). zero-touch 63+→215+ cycle 검증.

## [0.4.7] — 2026-05-07

### Changed
- dashboard `closed-loop-health` cycle 211 → 213 갱신 (N=50 batch 213-262 진입 반영)
- lint clean 118 entries

## [0.4.6] — 2026-05-07

### Changed
- `develop-cycle-hub` SKILL.md 열네 번째 발화 (N=14) 박제 — Trigger-5 (0회 chain 6개 명단 3회 연속 동일, dormancy 항구화), N=50 batch (213-262) 개시. zero-touch 63+→212+ cycle 검증.

## [0.4.5] — 2026-05-07

### Added
- **Wiki entries 3건 신규** (116~118번째):
  - `recurring-file-bug-accumulator-pattern` — 같은 파일 같은 버그 3회+ = 구조 부채 신호 (daily.ts)
  - `fail-loud-partial-adoption-escape-hatch-trap` — assertSelectOk 도입 후 try/catch 미제거 함정
  - `stale-temporal-comment-cleanup-policy` — cycle/phase 참조 주석 제거 vs WHY 주석 보존 정책

### Changed
- `robots.ts` BASE_URL 불일치 수정 (5파일 일관성)
- scripts stale 주석 제거 (raw-archive.mjs, dashboard-update.mjs) — 0.4.4 entry dogfood
- dashboard cycle 211 갱신 / N=12 batch (201→212) 완주

## [0.4.4] — 2026-05-07

### Added
- **Wiki entries 2건 신규** (118·119번째 예정):
  - `stale-temporal-comment-cleanup-policy` — LLM 코드의 cycle/phase/spec 참조 주석 제거 vs WHY 주석 보존 정책 (moneyball cycles 220/224)

### Changed
- `robots.ts` BASE_URL fallback 불일치 수정 (playbook-hub → playbook-virid-xi, 5파일 통일)
- raw-sources cycles 222-224 archive 정리
- dashboard cycle 209 갱신

## [0.4.3] — 2026-05-07

### Added
- **Wiki entries 2건 신규** (116·117번째):
  - `recurring-file-bug-accumulator-pattern` — 같은 파일에 같은 버그 유형이 3회+ 반복 = 구조 부채 신호. wrapper/guard 부재가 root cause (moneyball daily.ts .error 3rd instance)
  - `fail-loud-partial-adoption-escape-hatch-trap` — fail-loud 패턴(assertSelectOk) 도입 후 기존 try/catch 미제거 → 보호막 부분 적용 함정 (moneyball cycle 211 4 사이클 방치)

### Changed
- raw-sources 43건 → `_archive/` 이동 (cycles 152-221 처리 완료분)

## [0.4.2] — 2026-05-07

### Changed
- **Cycle 201 skill-evolution** — Trigger-3 N=13 dogfood (cycle 200 milestone). SKILL.md stage 3 evidence 13회 박제, zero-touch 63+→200+ 갱신. 마커 삭제.
- **Memory rot 2건 수정**: `project_develop_cycle_skill_family` cycle 191→201 갱신 / `project_bidirectional_compound_growth_goal` zero-touch 200+ 로그 추가
- **Cycle 202 curate** — lint clean (0 issues), memory rot 수정 완료

## [0.4.1] — 2026-05-07

### Changed
- **Cycle 200 milestone** (200 % 50 == 0) — Trigger-3 skill-evolution-pending 마커 박제. 다음 사이클 skill-evolution 강제 발화.
- `closed-loop-health` 대시보드 cycle 199→200 갱신

## [0.4.0] — 2026-05-07

### Added
- **Wiki entries 2건 신규** (114·115번째):
  - `debug-page-silent-drift-trap` — 인시던트 조사 시 debug 페이지 자체 silent query 실패로 오진 발생 패턴 (moneyball cycle 212 기반, 진단 도구 신뢰성 메타 원칙)
  - `ml-pipeline-normalization-range-assumption` — 피처 확장 시 정규화 함수 입력 범위 가정 위반 (moneyball SFR cycle 208 normalize 음수 버그 일반화)

### Changed
- `silent-drift-family-pattern` connections 8 fork 진화 (debug-page backlink)
- `prediction-model-calibration-inversion-detection` connections 갱신 (normalization backlink)
- cycle_state JSON 버그 2건 수정 (186/187 literal newline), dashboard cycle 192 갱신
- memory rot 2건 갱신 (skill-family cycle 174→191 / bidirectional-growth 로그 갱신)
- SKILL.md Trigger-5 N=12 dogfood (cycle 191, zero-touch 63+→190+ 갱신)

## [0.3.9] — 2026-05-07

### Added
- **Wiki entry 1건 신규** (114번째): `debug-page-silent-drift-trap` — 인시던트 조사 시 debug 페이지 자체 silent query 실패로 오진 발생 패턴 (moneyball cycle 212 기반, 진단 도구 신뢰성 메타 원칙)

### Changed
- `silent-drift-family-pattern` connections 갱신 (debug-page-silent-drift-trap backlink — 8 fork 진화)
- `llm-agent-artifact-first-diagnosis` connections 갱신 (debug-page-silent-drift-trap backlink)
- `closed-loop-health` 대시보드 cycle 185→192 갱신 (curate=9/explore=4/dim=3/review=2)
- memory rot 2건 갱신 (develop-cycle-skill-family cycle 174→191 / bidirectional-growth 진행 로그 cycle 191)

### Fixed
- cycle_state JSON 2건 (186, 187): `chain_selected` literal newline → JSON.parse 실패 수정

## [0.3.8] — 2026-05-07

### Changed
- `closed-loop-health` 대시보드 cycle 185→192 갱신 (curate=9/explore=4/dim=3/review=2 chain 분포, retro-only 10%)
- memory rot 2건 갱신 (develop-cycle-skill-family cycle 174→191 / bidirectional-growth 진행 로그 cycle 191 추가)
- SKILL.md Trigger-5 N=12 dogfood 박제 (cycle 191: 직전 20 cycle 171-190, 0회 chain 7개, zero-touch 63+→190+ 갱신)

### Fixed
- cycle_state JSON 2건 (186, 187): `chain_selected` 필드에 literal newline 삽입 → JSON.parse 오류. heredoc 이스케이프 실패 원인. 유효한 JSON 으로 수정 (curate 대체)

## [0.3.7] — 2026-05-07

### Added
- **Wiki entry 1건 신규** (113번째): `llm-prompt-validator-symmetry-drift` — LLM 구조화 출력 prompt/validator 대칭성 드리프트 (false positive/negative 갭, moneyball cycle 179 validator.ts/team-agent.ts 3건)

### Changed
- `db-query-type-safety-assert-select-ok-pattern` 보강: `.error` 미체크 섹션 추가 (moneyball cycle 216 daily.ts 사례)
- `silent-drift-family-pattern` connections 갱신 (llm-prompt-validator backlink)
- `closed-loop-health` 대시보드 cycle 174→185 갱신 (curate=10/explore=4/review=3/dim=3, retro-only 5%)

### Fixed
- search index (embed-content): 746 chunks — 113 entries 포함 (cycle 185)

## [0.3.6] — 2026-05-07

### Added
- **Wiki entries 2건 신규** (111·112번째):
  - `agentic-chain-saturation-detection` — chain pool 포화 감지: consecutive streak vs distributed dominance 구분 (moneyball cycle 210 skill-evolution 패턴 추출)
  - `agentic-loop-analytical-chain-lite-mode` — 코드 변경 없는 측정 전용 chain: execution chain / analytical chain 구분 (moneyball operational-analysis 패턴 일반화)

### Changed
- `develop-cycle-positive-streak-recognition` connections 갱신 (saturation-detection backlink)
- `agentic-chain-saturation-detection` connections 갱신 (analytical-chain backlink)
- `closed-loop-health` 대시보드 cycle 161→174 갱신 (curate=11/dim=4/review=3/explore=2 chain 분포)
- memory rot 2건 갱신 (project_develop_cycle_skill_family cycle 151→174 / bidirectional_growth 150+→174+)

### Fixed
- search index (embed-content): 740 chunks — 112 entries 포함 (cycle 178)

## [0.3.5] — 2026-05-07

### Added
- **Wiki entry 1건 신규** (110번째): `feature-flag-dead-code-cleanup-timing` — Feature flag 수명 주기: 비활성 플래그 dead code 111 cycle 지연 사례 + 확증 체크리스트 (moneyball cycle 206 기반)
- SKILL.md Trigger-3 milestone 갱신 (cycle 150): N=11, zero-touch 150+

### Changed
- `silent-drift-family-pattern` connections 갱신 (feature-flag-dead-code-cleanup-timing backlink)
- `question-own-defaults` connections 갱신 (feature-flag-dead-code-cleanup-timing backlink)
- `assertSelectOk` entry 보강: try/catch bypass 패턴 + daily.ts cycle 211 사례 추가
- `agentic-cycle-state-json-carry-over-design` evidence 63+→150+ 갱신
- `closed-loop-health` 대시보드 cycle 133→161 gap 해소 (N=28)
- memory rot 2건 갱신 (project_develop_cycle_skill_family cycle 138→151 / bidirectional_growth 112+→151+)

### Fixed
- search index (embed-content): 728 chunks — 110 entries 포함 (cycle 172, feature-flag-dead-code-cleanup-timing 반영)

## [0.3.4] — 2026-05-07

### Added
- **Wiki entries 2건 신규** (108·109번째):
  - `prediction-model-calibration-inversion-detection` — confidence bucket vs 실제 적중률 역전 감지 패턴 (moneyball cycle 207 기반)
  - `db-query-type-safety-assert-select-ok-pattern` — Server Component DB select silent drift 방지 (moneyball cycle 155 기반)
- **`/ci-github-actions-guard` slash command 승격** (cycle 141): ci-github-actions 3건 임계 충족, 3대 패턴 가드 (heredoc/guard-cascade/billing-block)
- **`_compiled-truth.md` 코드 게이트 승격 완료** (ci-github-actions 카테고리)

### Changed
- `silent-drift-family-pattern` connections 갱신 (calibration-inversion + assertSelectOk backlink)
- `nextjs-instrumentation-location` connections 갱신 (assertSelectOk backlink)
- `llm-response-quality-automated-evaluation-metrics-design-str` connections 갱신
- SKILL.md Trigger-5 N=10 dogfood (cycles 122-141, 0회 chain 4개 = 명단 축소) + zero-touch 141+ 갱신

### Fixed
- search index (embed-content): 720 chunks — 109 entries 포함 (cycle 150, assertSelectOk 반영)

## [0.3.3] — 2026-05-07

### Added
- **Wiki entry 1건 신규** (107→108 예정): `github-actions-billing-block-diagnosis-recovery` — GH Actions billing block 진단·복구·재발 방지 패턴 (2026-05-07 실 사례: 3 레포 41분 복구)
- **ci-github-actions `_compiled-truth.md` 신규** (cycle 138): solution 3건 임계 충족 → 메타 패턴 3개 압축 (yaml+bash 이중환경 / guard cascade / LLM 자동화 인프라 한도). 승격 후보 탐지

### Changed
- `drift-detection-methodology` + `vercel-ignore-command-preview-skip` connections 갱신 (billing-block backlink — cycle 137)
- MEMORY.md rot 2건 갱신: develop-cycle-family cycle 112→138 / bidirectional-growth zero-touch 63+→133+ (cycle 139)
- `project_develop_cycle_skill_family.md` 운영 상태 갱신: cycle 112→138, skill-evolution 9회 박제

### Fixed
- ci-github-actions solution #3 추가 → scan-promotions 임계 충족 자동 탐지 (billing-block → yaml+bash+guard cascade 메타 패턴 완성)

## [0.3.2] — 2026-05-07

### Added
- **Wiki entries 4건 신규** (104→106→108 예정):
  - `develop-cycle-positive-streak-recognition` — 성공 streak vs stuck streak 구분 패턴
  - `agentic-cycle-state-json-carry-over-design` — 멀티세션 연속성 cycle_state JSON 설계
  - CHANGELOG 0.3.1 (cycle 122), 0.3.2 (cycle 135)
- **develop-cycle-hub SKILL.md Trigger-5 N=7 dogfood** (cycle 133): 0회 chain 7→5 축소 (explore-idea/fix-incident batch session 발화). zero-touch 63+→133+ 갱신
- **Closed-Loop Health Dashboard 갱신** (cycle 134): cycle 42→133 (91 cycle gap 해소)

### Changed
- `hub-worker-compounding-pattern` connections 갱신 (positive-streak + agentic-cycle-state backlink)
- `question-own-defaults` connections 갱신 (positive-streak backlink)
- `ambient-knowledge-injection` connections 갱신 (agentic-cycle-state backlink)
- MEMORY.md: cycle 128→133, pivot T8 billing 해소 상태 갱신

### Fixed
- search index (embed-content): 690 chunks — 신규 2 entries 포함 (cycle 131)
- INDEX.md + data/search-hits.json 2회 갱신 (cycles 123, 131)

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
