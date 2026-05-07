# [ci-github-actions] Compiled Truth

코드 게이트 승격: ✅ 완료 — `.claude/commands/ci-github-actions-guard.md` (2026-05-07, cycle 141)

## 종합 (3건, 최종 갱신 2026-05-07)

- **재발 횟수**: 7건+ (notify-workers 계열 4건 + billing-block 3 레포)
- **현재 최선 해결책**: `docs/solutions/ci-github-actions/` 개별 solution 참조
- **코드 게이트 승격**: ✅ 완료 — `.claude/commands/ci-github-actions-guard.md` (2026-05-07)
- **마지막 발생**: 2026-05-07 (billing block 3 레포 동시 차단)

### 주요 교훈 요약

| # | 문제 | 핵심 해결 | 반복? |
|---|------|-----------|-------|
| 1 | heredoc EOF yaml indent 충돌 — bash heredoc 종료 토큰 미인식 | heredoc 폐기 → multi-line string 대체 | 3회 재발 |
| 2 | guard skip cascade 갭 — 후속 step 이 guard output 체크 누락 | 모든 후속 step if 조건에 guard chain 명시 | 2회 재발 |
| 3 | Billing block — LLM 에이전트 자동화로 Private repo 2,000 min/월 소진 | Public 전환 (즉시) 또는 spending limit 상향 | 1회 (3 레포 동시) |

### 메타 패턴

1. **yaml + bash 이중 환경 충돌**: yaml 은 indent 기반 파싱, bash heredoc 는 column-1 토큰 인식. 두 파서가 공존하는 yaml `run:` 블록에서 표면 에러가 실제 원인을 숨기는 패턴 반복.

2. **Guard skip cascade 갭**: 다단계 conditional step chain 에서 "마지막 step 만 if 체크" 패턴. step A skip → step B skip → step C 는 A 결과 없이 실행. notify-workers 계열에서 4건 동일 구조.

3. **LLM 에이전트 자동화 환경 인프라 한도**: 일반 개발 팀 대비 PR/CI 회전 속도 10~50x. Free tier 한도 (GH Actions 2,000 min/월, Vercel 100회/일) 1~2주 소진. **Private repo + LLM 자동화 = 조합 위험.**

## 개별 솔루션 목록

1. [2026-05-01 — notify-workers heredoc EOF gap](2026-05-01-notify-workers-heredoc-eof-gap.md) — heredoc 3회 재발
2. [2026-05-02 — notify-workers guard skip cascade](2026-05-02-notify-workers-guard-skip-cascade-gap.md) — guard chain 2회 재발
3. [2026-05-07 — billing block all workflows](2026-05-07-billing-block-all-workflows-blocked.md) — 3 레포 동시 차단

## 승격 후보 분석

임계 충족 (3건). 승격 방향:

- **자동 탐지 hook** (`no-heredoc-in-yaml.sh`): yaml `run:` 블록 heredoc 패턴 pre-commit 차단
- **guard chain validator** (`scripts/lib/validate-workflow-guards.mjs`): step 간 if 조건 chain 검증
- **billing monitor script** (`scripts/lib/check-gh-billing.sh`): 월간 GH Actions 분 소진률 체크

우선순위: billing monitor (재발 비용 가장 큼) > guard chain validator (notify-workers 계열 반복) > heredoc hook (이미 행동 패턴 교정됨).
