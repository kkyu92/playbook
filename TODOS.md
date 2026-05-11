# TODOS

## [P0] R6 대기 — git 병합 필요 (BRANCHED 재발, cycle 259-294 감지)

origin/main 과 local main 이 양방향 diverged. force-push / merge / rebase 중 선택 필요.
현재 상태: local **106개** ahead, origin **62개** ahead. _(cycle 294 갱신)_

origin 최근 커밋 (자동화 push, 최신 순):
- `4fbf77a` data: auto-ingest self-policy from moneyball — cycle 281 retro (operational-analysis lite)
- `81a16b5` data: auto-ingest self-policy from moneyball — cycle 280 retro (review-code heavy)
- `db164a6` data: auto-ingest self-policy from moneyball — cycle 279 retro (info-architecture-review)
- 그 외 moneyball cycle 272-281 retro 자동 push 계열 (CI 모두 SUCCESS)

**원인**: zero-touch push 정책 (local commit 누적) + 워커 자동 push (auto-ingest) 동시 진행 → 필연적 재발산. 권장: `git merge origin/main` (충돌 가능성 낮음 — 모두 data:/chore: 계열).
**주의 해소**: moneyball CI cycle 272 이후 연속 PASS — incident auto-ingest 신규 push 없음.

## [P1] auto-ingest.yml push race retry 강화 (cycle 29 fix-incident carry-over, R6 사용자 영역)

**What**: `.github/workflows/auto-ingest.yml` 의 self-policy/incident/lesson 분기에서 `push_main_with_retry` 함수 fail 시 issue close 단계 도달 보장
**Why**: cycle 29 진단 — issue #179 (5-4 14:01:08Z) 가 OPEN 으로 stuck. run #25323381271 이 self-policy 분기에서 첫 `git push origin main` fail (race: run #25323359857 이 0.5s 먼저 push 성공) 직후 step exit 1 — `set -euo pipefail` + bash `bash -e` 영향으로 함수 retry 진입 전 caller 종료. 결과: raw 파일 push 실패 + issue close 단계 도달 못 함 → audit trail 결손
**Fix 영역**: workflow yaml = R6 사용자 영역 (메모리 `feedback_claude_code_action_workflows_write_block`). 자율 PR X
**Sub-deps**:
- 함수 호출 site (line 277/372/416) `|| PUSH_FAILED=1` 가드 추가
- issue close 단계 (line 422-426) 를 push 결과와 분리, push 실패 시 close body 에 ⚠ 명시
- push 함수 내부 `set +e` 격리 (함수 진입 시 명시적 비활성)
**완료 신호**: 다음 동시 dispatch 자연 재현 시 push fail 발생해도 issue close 도달 + raw 파일 backfill log
**자율 처리 한계**: cycle 29 partial — raw 파일 backfill (#179) + close 만 자율, code fix 사용자 PR 후속
**Reference**: cycle 29 cycle_state + run #25323381271 fail log

## [P1] 워커 trends.ts pickQueue test fix (cycle 26 worker-incident-triage carry-over)

**What**: `src/lib/trends.ts:361` `JSON.parse(raw)` undefined guard + `src/lib/__tests__/trends.test.ts` pickQueue 2 test 5000ms timeout 원인 fix
**Why**: cycle 26 진단 — issue #171 (main CI fail 9baae1a) root cause 가 본 fix. SKILL.md 머지가 노출 trigger 일 뿐, pre-existing main CI broken 상태. 워커 local 339 test vs main 358 test = local stale 상태 (PR #66 self-verify 시 main pull 안 함)
**Fix 영역**: 워커 (blog-autopilot), 다음 워커 세션
**Sub-deps**:
- trends.ts:361 — JSON.parse(raw) raw undefined → SyntaxError. guard 추가 또는 LLM mock 시 raw 보장
- trends.test.ts pickQueue 2 test — "count defaults to 5" / "count override: opts.count=3" timeout 5000ms. 원인 분석 (LLM mock 의존?)
**완료 신호**: 워커 PR fix 머지 → main CI 재실행 PASS → issue #171 같은 inbound 자연 회피
**Reference**: cycle 26 cycle_state JSON + lesson commit (5-4)

## [PARTIAL] drift detection 자동화 — develop-cycle-hub SKILL.md 부분 처리 (잔여 = sessionstart hook 사용자 결정)

**Partial shipped**: cycle 74 closed-loop-design SUCCESS (2026-05-06, commit `5aaca40`) — develop-cycle-hub SKILL.md 진단 단계 첫 step 에 `git fetch origin --quiet` + `git rev-list --left-right --count origin/main...main` diverged 감지 line 박제. cycle 75 dogfood PASS.
**What** (잔여): sessionstart hook (settings.json) 영역 — 매 새 세션 시작 시 git fetch 자동 수행
**Why**: 일반 세션 시작 시 git pull 실패 silent surface → sessionstart hook 갱신 필요 (R6 사용자 결정 영역)
**Trigger**: cycle 11 lesson + cycle 74 N=2 재발 → SKILL.md 부분 처리. **N=3 재발 시** settings.json 갱신 사용자 결정
**Effort**: S — settings.json `SessionStart` hook 1줄 추가

## [P2] raw-sources auto-archive 자동화

**What**: auto-ingest 후 처리 완료된 raw-sources/*.md 를 자동으로 `_archive/` 로 이동
**Why**: cycle 7 — raw-sources 누적 누적, archive 율 저조. entry 변환 후 raw 파일 archive 단계 부재
**Trigger**: N≥3 재발 또는 raw-sources/ 50건 초과 시
**Effort**: M — auto-ingest workflow 끝 step 에 archive 분기 추가

## [P2] auto-ingest connections 자동 결손 root cause

**What**: journals isolated (connections [] 박제) — auto-ingest workflow 가 entry 생성 시 connections cross-update 단계 누락
**Why**: `/ingest` 명령은 connections 5~15 + 양방향 cross-update 정합. auto-ingest workflow LLM 자동 호출 흐름은 이 단계 누락
**Trigger**: N≥3 재발 시 closed-loop-design chain trigger
**Effort**: M~L — auto-ingest.yml 분석 + LLM prompt + cross-update 통합

## [P3] embed-on-push incremental embedding

**What**: 변경된 entry 만 embed, 기존 embeddings.json 재사용
**Why**: 현재 매 push 마다 전체 재생성. entry 500개 초과 시 빌드 타임아웃 리스크
**Trigger**: 6개월 경과 또는 entry 500개 초과
**Effort**: M — embed-content.mjs sha hash 기반 cache 전환

## [P2] Phase 4c — Gemini 진단 + workflow test infra (deferred)

**What**: E2 Gemini 진단 layer + workflow test infra (Bats/GH actions harness) + E4 + D7
**Trigger**: 4b vector 안정화 후 / N≥3 lesson 재발 패턴 누적 후
**Effort**: E2 ~30분, workflow test infra ~1h, E4 XL ~3h

## [P3 → 흡수] Phase 4b — E2 measurement + E3 CLI

Phase 5 ship 으로 비전 완성 — 4b 측정 게이트 의미 상실. E2/E3 는 운영 데이터 누적 후 자연 진행 또는 deferred.

---

## DONE History (compressed)

- **[DONE 2026-05-08]** moneyball MockResult<T> + PitcherFipTrend.tsx:40 TypeCheck fix → commit `1775b56` (cycle 272 fix-incident), CI 연속 PASS 확인 (cycle 289 worker-incident-triage)
- **[DONE 2026-05-08]** BRANCHED N=22 해소 (cycle 257) → `git merge origin/main` (merge 65fbd78, INDEX.md 123개 정정)
- **[DONE 2026-05-07]** BRANCHED 해소 (cycle 221→222) → `git merge + push origin main` (bd821ec)
- **[DONE 2026-05-07]** GH Actions billing 전체 차단 해소 → 퍼블릭 레포 전환 + 결제 처리 (run #25471190398)
- **[DONE 2026-05-07]** moneyball NavLinks.tsx lint fix → PR #212 (cycle 229, PASS_ship 100)
- **[DONE 2026-05-04]** develop-cycle-blog skill fork → blog-autopilot PR #66 (9baae1a, chain pool 10)
- **[DONE 2026-05-06]** eslint config `_` prefix → already 박제 (cycle 52 발견, pnpm lint exit 0)
- **[DONE 2026-05-06]** 외부 scheduler 이관 → Cloudflare worker T9 PR #51 완료 (T7 폐기)
- **[DONE 2026-05-06]** develop-cycle-hub N=20 milestone → Phase 2 진입, trigger 5 첫 충족 (0회 chain: polish-ui/dimension-cycle/design-system)
- **[DONE 2026-05-04]** develop-cycle-hub N=10 dogfood → chain 7/11 발화, ship PR #133~153
- **[DONE 2026-05-04]** develop-cycle-hub N=3 첫 dogfood → PR #133 (curate) / #134 (review-code)
- **[DONE 2026-04-30]** Phase 5 — 양방향 무한성장 자동화 완성 (비전 1+2+3 검증, moneyball PR #16+19)
- **[DONE 2026-04-29]** Phase 4a — D4+D5+D4 dual ship (playbook PR #61+62, moneyball PR #14+16)
- **[DONE 2026-04-29]** Phase 4-pre — inventory+schema 정정 (PR #60, Actions×8→14 정정)
- **[DONE 2026-04-28]** T5 Fine-grained PAT 전환 → GH_PAT 만료 2027-04-27, T5.1 PLAYBOOK_PAT 추적 미완
- **[DONE 2026-04-28]** T9 GH Actions cron → Cloudflare Workers 이관 (PR #51, wrangler.toml 8 workflow dispatch)
- **[DONE 2026-04-27]** T8 Pull 축 ✅ (blog-autopilot lesson → auto-ingest PR #42 → squash 11251f2) / Push 축 ⏸ billing 해소 후 재검증
- **[DONE 2026-04-27]** T6 운영 noise 재평가 → 4 채널 정상 운영 확인
- **[DONE 2026-04-23]** Pull (b) Level 3 에러 → Journal 자동화 채널 GA (auto-ingest e2e 검증)
- **[DONE 2026-04-22]** T5 품질 검증 → PR #27 (자기 점검 제거 + query-router 14 키워드 + agents 2 entries)
