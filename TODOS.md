# TODOS

## [P0] R6 대기 — git BRANCHED 재발 (cycle 725 진단, local 3 / origin 2)
origin/main 과 local 양방향 diverged. force-push / merge / rebase 중 선택 필요.
현재 상태: local 3개 ahead, origin 2개 ahead.
```bash
git pull origin main --no-rebase && git push origin main
```

## [DONE 2026-05-18] R6 대기 — git BRANCHED 재발 N=203 (cycle 722 진단) → cycle 723 RESOLVED

**상태**: ✅ DONE — cycle 723 진단 시 `git rev-list --left-right --count origin/main...main` = `0 0`. merge commit `53fd280 Merge remote-tracking branch 'origin/main'` 가 diverged 완전 해소.
**총 재발 횟수**: N=203 (cycle 371~722). 마지막 해소 path = 사용자 수동 merge.
**근본 패턴 메모**: matrix push race + moneyball auto-ingest 동시 ingest → 재발 구조 동일. solution `ci-github-actions/2026-05-12-push-race-branched-fix-blocked` 박제. 자동 batch push hook 또는 pull rebase 자동화 = R6 영역 (사용자 결정 시점에 재검토).
재발 evidence: cycle 371~722 (N=203). batch 직후 반복 패턴.

## [DONE 2026-05-13] worker-incident-triage — moneyball inbound 10건 CLOSED + [P1] RESOLVED (cycle 480)

**상태**: ✅ DONE — 10건 CLOSED (cycle 480 worker-incident-triage)
**내역**: CI 실패 8건 + Vercel 실패 2건 (moneyball cycles 354-358 진행 중 발생)
**결론**: [P1] pnpm-lock.yaml RESOLVED — moneyball cycle 358 commit 55ecd62 lockfile sync 완료. 06:21 KST CI success 확인 (CI Failure Dispatch skipped = 정상). 총 누적 23건 전체 CLOSED.

## [DONE 2026-05-13] worker-incident-triage — moneyball inbound incidents 2건 (cycle 473)

**상태**: ✅ DONE — 2건 모두 CLOSED (cycle 473 worker-incident-triage)
**이슈**: #568/#569 — root cause = pnpm-lock.yaml lockfile drift (TODOS [P1])
**결론**: 신규 이슈 아님. [P1] 미해결 상태에서 moneyball CI 계속 실패 중. moneyball fix 필요

## [DONE 2026-05-13] worker-incident-triage — moneyball inbound incidents 3건 (cycle 472)

**상태**: ✅ DONE — 3건 모두 CLOSED (cycle 472 worker-incident-triage)
**이슈**: #564/#565/#567 — root cause = pnpm-lock.yaml lockfile drift (TODOS [P1])
**결론**: 신규 이슈 아님. [P1] 미해결 상태에서 moneyball CI 계속 실패 중. moneyball fix 필요

## [DONE 2026-05-13] worker-incident-triage — moneyball inbound incidents 5건 (cycle 470)

**상태**: ✅ DONE — 5건 모두 CLOSED (cycle 470 worker-incident-triage)
**이슈**: #557/#558/#559/#560/#562 — root cause = pnpm-lock.yaml lockfile drift (TODOS [P1])
**결론**: 신규 이슈 아님. [P1] 미해결 상태에서 moneyball CI 계속 실패 중. moneyball fix 필요

## [DONE 2026-05-14] R6 대기 — git BRANCHED 재발 (cycle 494 진단, local 1 / origin 15)

**상태**: ✅ DONE — cycle 501 curate 시점 0/0 완전 동기 확인. fake batch 87 fake commits revert + 정상 batch 복귀 후 자연 해소. cycle 494 entry stale 박제.
**해소 path**: cycle 495 lesson commit (65aec3f) revert + main 정상 commit 복귀 + watch.sh fresh fire 회복 (한도 회복 대기 중)

## [DONE 2026-05-14] R6 대기 — git BRANCHED 재발 (cycle 493 진단, local 53 / origin 18)

**상태**: ✅ DONE — `git pull` fast-forward 성공. local 0 / origin 0 완전 동기. 실제 diverge는 0/1이었고 pull로 해소.
이전 상태: cycle 493 진단 기준 local 53 / origin 18 (이미 이전 merge로 대부분 해소된 상태였음)

## [DONE 2026-05-13] R6 대기 — git 병합 필요 (BRANCHED 재발 cycle 371)

**상태**: ✅ DONE — commit `23f76f3` (fix: merge origin/main — BRANCHED 해소 local 168 / origin 23 ahead). cycle 464 진단 기준 `0 0` 완전 동기 확인.
이전 상태: local 166개 ahead, origin 22개 ahead (cycle 463 기준)

## [DONE 2026-05-13] moneyball CI fix — pnpm-lock.yaml lockfile drift (cycle 353-358 arc)

**상태**: ✅ DONE — moneyball cycle 358 commit 55ecd62 lockfile sync 완료. moneyball CI 06:21 KST success. CI Failure Dispatch skipped = 정상.
**What**: `apps/moneyball/pnpm-lock.yaml` 재생성 + 커밋
**Why**: cycle 353 knip cleanup에서 `@testing-library/user-event` package.json 제거 후 lockfile 미갱신 → CI `ERR_PNPM_OUTDATED_LOCKFILE` 실패
**누적 이슈**: #552/#553/#555 (cycle 464 close) + #557/#558/#559/#560/#562 (cycle 470 close) + #564/#565/#567 (cycle 472 close) + #568/#569 (cycle 473 close) + cycle 480 10건 — **총 23건** / 전체 CLOSED
**Solution**: `docs/solutions/ci-github-actions/2026-05-13-knip-cleanup-lockfile-drift.md`

## [DONE 2026-05-12] moneyball use-leaderboard.ts lazy init 패치 반영 — 모니터링 완료 (cycle 359)

**상태**: ✅ DONE — cycle 359 진단 기준 moneyball CI 지속 PASS (cycles 323-326 CI PASS 확인).
CI Failure Dispatch = skipped (실패 없음). 해소 조건 충족 (cycle 356 이후 4회+ CI PASS).
**이력**: 7차 (cycle 350) → 8차 (cycle 353, close+fix 동시, commit `44947fd`) → 이후 신규 실패 없음
**Solution**: `docs/solutions/react/2026-05-07-navlinks-setstate-in-useeffect-eslint.md`

## [DONE 2026-05-12] git BRANCHED — local/origin diverge 해소 (cycle 364 확인)

**상태**: ✅ DONE — cycle 364 진단 (`git rev-list --left-right --count origin/main...main` = `0	0`). 완전 동기.
**해소**: merge commit `2808ce6` (2026-05-12 21:31 KST) — moneyball auto-ingest(10:00~10:18) + hub cycles 361-363(18:46~19:00) 양방향 통합 완료
**이전 상태**: cycle 363 진단 시 local 41ahead / origin 33ahead (push race fix 미push 재발)
**Solution**: `docs/solutions/ci-github-actions/2026-05-12-push-race-branched-fix-blocked.md`

## [DONE 2026-05-12] moneyball CI lint 수정 (cycle 307 moneyball 세션 처리 — issue #298 CLOSED)

**What**: `apps/moneyball/src/app/accuracy/page.tsx` 미사용 imports 3줄 삭제
**Why**: ESLint `no-unused-vars` — `Metadata`(line 1), `DayBucket/WeekBucket/RecentForm`(lines 11-13), `SITE_URL`(line 24) 미사용. cycle 296 리팩터(PR #285) 후 잔존. PR #287 머지 후 main CI 차단 (issues #441/#442/#443 → 트리아지 close 5-12) + moneyball cycle 299 picks-polish PR #288 머지 후 재발 (issues #445/#446/#447 → 트리아지 close 5-12) + 추가 13건 (issues #448-#464 → 트리아지 close 5-12 cycle 322) + picks-polish-ui 3건 (issues #466/#467/#468 → 트리아지 close 5-12 cycle 326, transient retry 성공)
**Fix**: 다음 moneyball 세션에서 3줄 삭제 → CI 자동 회복
**Effort**: XS (5분)

- **[DONE 2026-05-12]** BRANCHED 해소 (cycle 333) → `git merge origin/main` + `git push origin main` (INDEX.md 141개 유지, 173 commits 배포, 0/0 동기화)

## [DONE 2026-05-12] auto-ingest.yml push race retry 강화 (cycle 29 fix-incident carry-over, R6 사용자 영역)

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

## [DONE 2026-05-12] 워커 trends.ts pickQueue test fix — PR #87 생성 (blog-autopilot)

**What**: `src/lib/trends.ts:361` `JSON.parse(raw)` undefined guard + `src/lib/__tests__/trends.test.ts` pickQueue 2 test 5000ms timeout 원인 fix
**Why**: cycle 26 진단 — issue #171 (main CI fail 9baae1a) root cause 가 본 fix. SKILL.md 머지가 노출 trigger 일 뿐, pre-existing main CI broken 상태. 워커 local 339 test vs main 358 test = local stale 상태 (PR #66 self-verify 시 main pull 안 함)
**Fix 영역**: 워커 (blog-autopilot), 다음 워커 세션
**Sub-deps**:
- trends.ts:361 — JSON.parse(raw) raw undefined → SyntaxError. guard 추가 또는 LLM mock 시 raw 보장
- trends.test.ts pickQueue 2 test — "count defaults to 5" / "count override: opts.count=3" timeout 5000ms. 원인 분석 (LLM mock 의존?)
**완료 신호**: 워커 PR fix 머지 → main CI 재실행 PASS → issue #171 같은 inbound 자연 회피
**Reference**: cycle 26 cycle_state JSON + lesson commit (5-4)

## [DONE 2026-05-12] drift detection 자동화 — sessionstart hook 포함 완전 처리

**Partial shipped**: cycle 74 closed-loop-design SUCCESS (2026-05-06, commit `5aaca40`) — develop-cycle-hub SKILL.md 진단 단계 첫 step 에 `git fetch origin --quiet` + `git rev-list --left-right --count origin/main...main` diverged 감지 line 박제. cycle 75 dogfood PASS.
**What** (잔여): sessionstart hook (settings.json) 영역 — 매 새 세션 시작 시 git fetch 자동 수행
**Why**: 일반 세션 시작 시 git pull 실패 silent surface → sessionstart hook 갱신 필요 (R6 사용자 결정 영역)
**Trigger**: cycle 11 lesson + cycle 74 N=2 재발 → SKILL.md 부분 처리. **N=3 재발 시** settings.json 갱신 사용자 결정
**Effort**: S — settings.json `SessionStart` hook 1줄 추가

## [DONE 2026-05-12] GH Actions Node.js 20 → 24 마이그레이션

**What**: `.github/workflows/` 전체 — `actions/checkout@v4`, `actions/setup-node@v4` 등 Node.js 20 기반 actions 를 Node.js 24 지원 버전으로 업그레이드
**Why**: cycle 310 worker-lesson CI 경고 — "Node.js 20 actions are deprecated. forced to Node.js 24 starting June 2nd, 2026". 현재: deprecated warning. 2026-06-02 이후: 강제 실행 + 예상치 못한 동작 가능
**Fix 영역**: workflow yaml = R6 사용자 영역 (20개+ 워크플로 일괄 업데이트)
**Recommended fix**: `actions/checkout@v4` → `actions/checkout@v5` (Node.js 24 지원), `actions/setup-node@v4` → `actions/setup-node@v5` (또는 `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24=true` env 추가로 임시 opt-in)
**Effort**: S — sed 일괄 치환 가능
**Deadline**: 2026-06-02 (3주 남음)

## [DONE 2026-05-12] weekly-triage.yml — CI 알림 스텁 필터링

**What**: `payload_type: incident` 유형 raw-source 파일을 weekly-triage issue 에서 제외 (또는 별도 섹션으로 분리)
**Why**: cycle 297 Issue #419 분석 — 33건 전부 CI 실패 알림 스텁 (commit hash + run URL 만, 학습 내용 없음). `/ingest` 대상이 아님. 매주 triage issue 에 포함되어 불필요한 manual review 비용 발생
**Fix 영역**: `.github/workflows/weekly-triage.yml` = R6 사용자 영역 (yaml 수정)
**Recommended fix**: frontmatter `payload_type: incident` 파일은 triage 체크리스트 제외 → 자동 archive (`_archive/` 이동) 또는 별도 🔕 섹션
**Effort**: S — weekly-triage.yml raw-sources 스캔 로직 1 조건 추가

## [DONE 2026-05-12] raw-sources auto-archive 자동화

**What**: auto-ingest 후 처리 완료된 raw-sources/*.md 를 자동으로 `_archive/` 로 이동
**Why**: cycle 7 — raw-sources 누적 누적, archive 율 저조. entry 변환 후 raw 파일 archive 단계 부재
**Trigger**: N≥3 재발 또는 raw-sources/ 50건 초과 시
**Effort**: M — auto-ingest workflow 끝 step 에 archive 분기 추가

## [DONE 2026-05-12] auto-ingest connections 자동 결손 root cause

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

- **[DONE 2026-05-13]** cycle 475 skill-evolution SE #116 — stage 3 evidence 갱신 (명단 동일 7개, SE 35% 연속, 자기조정 불가 마커 유지 cycle 476, N=380 batch 394-773, zero-touch 64+→474+)
- **[DONE 2026-05-12]** cycle 372 skill-evolution SE #77 — stage 3 evidence 갱신 (명단 동일 7개, SE 35% 연속, 자기조정 불가 마커 유지 cycle 373, N=30 batch 364-393, zero-touch 64+→371+)
- **[DONE 2026-05-12]** cycle 367 skill-evolution SE #76 — stage 3 evidence 갱신 (명단 동일 7개, SE 35% → retro 348-367 40% 마커 skip 자기조정 성공, N=30 batch 364-393, zero-touch 64+→366+)
- **[DONE 2026-05-12]** cycle 366 skill-evolution SE #75 — stage 3 evidence 갱신 (명단 동일 7개, SE 35% 연속, 자기조정 불가 마커 유지 cycle 367, N=30 batch 364-393, zero-touch 64+→365+)
- **[DONE 2026-05-12]** cycle 365 skill-evolution SE #74 — stage 3 evidence 갱신 (명단 동일 7개, SE 35% 연속, 자기조정 불가 마커 유지 cycle 366, N=30 batch 364-393, zero-touch 64+→364+)
- **[DONE 2026-05-12]** cycle 345 skill-evolution SE #67 — stage 3 evidence 갱신 (명단 동일 7개, SE 35% 연속, 마커 유지 cycle 346, N=28 batch 336-363, zero-touch 64+→344+)
- **[DONE 2026-05-12]** cycle 344 skill-evolution SE #66 — stage 3 evidence 갱신 (명단 동일 7개, SE 35% 연속, 마커 유지 cycle 345, N=28 batch 336-363, zero-touch 64+→343+)
- **[DONE 2026-05-12]** cycle 339 skill-evolution SE #65 — stage 3 evidence 갱신 (명단 동일 7개, SE 35% 연속 후 retro 320-339 40% 마커 skip, N=28 batch 336-363, zero-touch 64+→338+)
- **[DONE 2026-05-12]** cycle 337 skill-evolution SE #64 — stage 3 evidence 갱신 (명단 동일 7개, SE 35% 연속, 마커 유지 cycle 338, N=28 batch 336-363, zero-touch 64+→336+)
- **[DONE 2026-05-12]** cycle 336 skill-evolution SE #63 — stage 3 evidence 갱신 (명단 변화 8→7: fix-incident 탈퇴 activation, N=28 batch 시작 336-363, zero-touch 63+→335+)
- **[DONE 2026-05-12]** cycle 335 worker-incident-triage — moneyball CI stubs 9건 batch close (#477/#479/#480/#481/#482/#484/#485/#487/#488) — develop-cycle 311-314 PR 머지 완료 확인 + transient main CI 해소 확인
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
