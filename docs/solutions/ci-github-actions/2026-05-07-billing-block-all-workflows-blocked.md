# [ci-github-actions] Billing Block — 모든 워크플로 동시 차단 패턴

**날짜**: 2026-05-07
**발생 파일**: 허브 + moneyball + blog-autopilot 전체 레포 GH Actions
**관련 PR/커밋**: run #25471190398 (복구 후 success — 01:42 KST)
**재발 여부**: 동 카테고리 3번째 (ci-github-actions 누적 3건 → `_compiled-truth.md` 작성 임계)

## 문제

모든 워크플로 (cron/CI/workflow_dispatch) 동시 fail:

```
The job was not started because recent account payments have failed or your 
spending limit needs to be increased.
```

증상 특징:
- **선택적 차단 아님** — CI, cron, manual dispatch 모두 동시 차단
- 허브 + 워커 3 레포 동시 차단 (Private repo 공유 계정 한도)
- `Deployment failed: Resource is limited` Vercel 병행 실패

## 원인

| 원인 | 이번 케이스 |
|---|---|
| **Free tier 한도 초과** | Private repo 2,000 min/월 소진. LLM 에이전트 자동화 PR 반복 생성/머지로 빠른 소진 |
| 결제 수단 만료 | 해당 없음 |
| Spending limit 0 | 해당 없음 (한도 소진이 근본 원인) |

LLM 에이전트 자동화 환경 (cycle 반복, PR 자동 생성/머지) 에서 Private repo Free tier 2,000 min/월은 1~2주 안에 소진 가능.

## 해결

### 빠른 복구: Private → Public 전환

```bash
# GitHub Settings → Repository → Change repository visibility → Public
# 대상: 차단된 모든 Private repo
```

**트레이드오프**: 코드 공개. GH Secrets 는 공개 X.

효과: Public repo 는 GH Actions 분 무제한 → 즉시 복구.

### 결제 복구 (코드 공개 불가 시)

```bash
# GitHub Settings → Billing & plans → Actions → Spending limit 상향 또는 결제 수단 갱신
```

## 사전 탐지 방법

```bash
# 1. 최근 run 상태 확인
gh run list --limit 10 --repo <owner>/<repo>

# 2. billing 에러 메시지 확인
gh run view <run-id> --repo <owner>/<repo>
# "account payments have failed" 또는 "spending limit" 텍스트 감지

# 3. silent-skip-tracker 워크플로 확인
gh run list --workflow silent-skip-tracker.yml --limit 5
# status=skipped 또는 failure 축적 = 조기 신호
```

## 체크리스트

재발 방지:

```
[ ] LLM 에이전트 자동화 환경 → Private repo GH Actions 분 소진 속도 예측
[ ] 예상 소진 시점 ≤ 1주 → Public 전환 선제 검토
[ ] PR preview 배포 비활성화 (vercel.json ignoreCommand) → Vercel 한도 보호
[ ] silent-skip-tracker 워크플로 정기 모니터링
[ ] 복구 후 workflow_dispatch 로 파이프라인 재가동 확인
```

## 관련

- Wiki: `content/infrastructure/github-actions-billing-block-diagnosis-recovery.mdx`
- Solution: `docs/solutions/ci-github-actions/2026-05-01-notify-workers-heredoc-eof-gap.md`
- Solution: `docs/solutions/ci-github-actions/2026-05-02-notify-workers-guard-skip-cascade-gap.md`
