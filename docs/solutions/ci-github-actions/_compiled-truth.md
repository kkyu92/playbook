# [ci-github-actions] Compiled Truth

코드 게이트 승격: ✅ 완료 — `.claude/commands/ci-github-actions-guard.md` (2026-05-07, cycle 141)

## 종합 (9건, 최종 갱신 2026-05-21)

- **재발 횟수**: 24건+ (notify-workers 계열 4건 + billing-block 3 레포 + MockResult<T> type 재발 6건 + PR branch old-base audit 1건 + push race BRANCHED block 5건 + compareModels-shadow test sync gap 1건 + knip cleanup lockfile drift 1건 + worker unconditional inject test mismatch 4건)
- **현재 최선 해결책**: `docs/solutions/ci-github-actions/` 개별 solution 참조
- **코드 게이트 승격**: ✅ 완료 — `.claude/commands/ci-github-actions-guard.md` (2026-05-07)
- **마지막 발생**: 2026-05-21 (blog-autopilot d4418db health-signal/apt-signal author box 무조건부 주입 → editor.test.ts assertion fail, hub issue #1053, hub cycle 962)

### 주요 교훈 요약

| # | 문제 | 핵심 해결 | 반복? |
|---|------|-----------|-------|
| 1 | heredoc EOF yaml indent 충돌 — bash heredoc 종료 토큰 미인식 | heredoc 폐기 → multi-line string 대체 | 3회 재발 |
| 2 | guard skip cascade 갭 — 후속 step 이 guard output 체크 누락 | 모든 후속 step if 조건에 guard chain 명시 | 2회 재발 |
| 3 | Billing block — LLM 에이전트 자동화로 Private repo 2,000 min/월 소진 | Public 전환 (즉시) 또는 spending limit 상향 | 1회 (3 레포 동시) |
| 4 | moneyball silent-drift.test.ts MockResult<T> type — discriminated union 강화로 `{ value }` 형식 무효화 | `type: 'return'` 필드 추가. 워커 PR fix 필요 (R6 외부 레포) | 6회 재발 (2026-05-08 단일 세션 4건) |
| 5 | PR branch old-base audit failure — BRANCHED 상태에서 security patch 미push, PR branch 가 구버전 가져감 | local main 즉시 push (R6). 장기: security patch 후 즉시 batch push 권장 | 1회 (PR #418/#421, 2026-05-12) |
| 6 | push_main_with_retry 레이스 — BRANCHED로 수정 origin 미배포 → 재발 루프 | origin 즉시 push (R6). CI-critical workflow 수정 시 batch push 즉시 실행 | 5회 (cycle 29→47→354→357→359) |
| 7 | compareModels-shadow test sync gap — 리팩터 상수 rename 후 테스트 기댓값 미동기 (string literal mismatch) | 리팩터 커밋 시 테스트 파일 동시 grep 후 동기화. workaround: TypeScript 타입이 잡지 못하는 경우 수동 확인 필수 | 1회 (hub issue #548, moneyball cycle 349 fix, 2026-05-13) |
| 8 | knip cleanup 후 pnpm-lock.yaml 미갱신 — dependency 제거 후 lockfile stale → `ERR_PNPM_OUTDATED_LOCKFILE` | knip 실행 후 반드시 `pnpm install` + lockfile diff 확인 + 함께 커밋. LLM이 typecheck/test 통과해도 lockfile 별도 확인 의무 | 1회 (hub issues #552/#553/#555, moneyball cycle 353, 2026-05-13) |
| 9 | 워커 신규 inject 기능 무조건부 활성 → 기존 `undefined` 기대 테스트 assertion fail | 신규 inject 추가 시 관련 테스트 toBeUndefined 케이스 동시 grep + 조건부 주입 또는 테스트 갱신. 워커 자체 fix 필요 (R6) | 4회 재발 (blog-autopilot hub issues #1045/#1046/#1049/#1053, cycles 952/953/955/962, 2026-05-21) |

### 메타 패턴

1. **yaml + bash 이중 환경 충돌**: yaml 은 indent 기반 파싱, bash heredoc 는 column-1 토큰 인식. 두 파서가 공존하는 yaml `run:` 블록에서 표면 에러가 실제 원인을 숨기는 패턴 반복.

2. **Guard skip cascade 갭**: 다단계 conditional step chain 에서 "마지막 step 만 if 체크" 패턴. step A skip → step B skip → step C 는 A 결과 없이 실행. notify-workers 계열에서 4건 동일 구조.

3. **LLM 에이전트 자동화 환경 인프라 한도**: 일반 개발 팀 대비 PR/CI 회전 속도 10~50x. Free tier 한도 (GH Actions 2,000 min/월, Vercel 100회/일) 1~2주 소진. **Private repo + LLM 자동화 = 조합 위험.**

4. **BRANCHED 차단 재발 루프**: CI-critical 수정이 local commit으로만 존재하고 BRANCHED 상태에서 push 지연 시 — origin은 구버전 실행 → 동일 버그 재발 무한루프. solution #5(security patch)와 #6(push race) 모두 동일 구조. **CI-critical workflow 수정 = 즉시 batch push 트리거.**

## 개별 솔루션 목록

1. [2026-05-01 — notify-workers heredoc EOF gap](2026-05-01-notify-workers-heredoc-eof-gap.md) — heredoc 3회 재발
2. [2026-05-02 — notify-workers guard skip cascade](2026-05-02-notify-workers-guard-skip-cascade-gap.md) — guard chain 2회 재발
3. [2026-05-07 — billing block all workflows](2026-05-07-billing-block-all-workflows-blocked.md) — 3 레포 동시 차단
4. [2026-05-08 — moneyball silent-drift MockResult<T> type](2026-05-08-moneyball-silent-drift-mockresult-type.md) — 6건 재발 (cycle 266/268)
5. [2026-05-12 — PR branch old-base audit failure](2026-05-12-pr-branch-old-base-audit-failure.md) — BRANCHED + security patch 미push 조합 (cycle 303)
6. [2026-05-12 — push race BRANCHED fix blocked](2026-05-12-push-race-branched-fix-blocked.md) — push_main_with_retry 레이스 5회 재발, BRANCHED 차단 구조 (cycle 359)
7. [2026-05-13 — compareModels-shadow test sync gap](2026-05-13-refactor-const-rename-test-sync-gap.md) — 리팩터 상수 rename → 테스트 기댓값 미동기 (cycle 447, hub issue #548)
8. [2026-05-13 — knip cleanup lockfile drift](2026-05-13-knip-cleanup-lockfile-drift.md) — knip 후 pnpm-lock.yaml 미갱신 → ERR_PNPM_OUTDATED_LOCKFILE (cycle 353, hub issues #552/#553/#555)
9. [2026-05-21 — worker unconditional inject test mismatch](2026-05-21-worker-unconditional-inject-test-mismatch.md) — blog-autopilot adsense author box 무조건부 주입 → editor.test.ts 4건 fail (hub issues #1045/#1046/#1049, cycles 952/953/955)

## 승격 후보 분석

임계 충족 (3건). 승격 방향:

- **자동 탐지 hook** (`no-heredoc-in-yaml.sh`): yaml `run:` 블록 heredoc 패턴 pre-commit 차단
- **guard chain validator** (`scripts/lib/validate-workflow-guards.mjs`): step 간 if 조건 chain 검증
- **billing monitor script** (`scripts/lib/check-gh-billing.sh`): 월간 GH Actions 분 소진률 체크

우선순위: billing monitor (재발 비용 가장 큼) > guard chain validator (notify-workers 계열 반복) > heredoc hook (이미 행동 패턴 교정됨).
