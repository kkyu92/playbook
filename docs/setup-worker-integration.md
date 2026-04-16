# Worker Integration Setup Guide

playbook의 auto-ingest 워크플로우와 워커 레포(moneyball 등)를 연결하는 방법.

## 개요

워커 레포에서 에러 발생 시 `repository_dispatch`를 통해 playbook에 자동으로 Journal PR이 생성된다.

```
[moneyball workflow 실패] → repository_dispatch → [playbook auto-ingest] → Journal PR 생성
```

## 사전 준비: PAT 생성

워커 레포의 `GITHUB_TOKEN`은 자기 레포만 접근 가능하므로, playbook 레포에 `repository_dispatch`를 보내려면 별도 PAT가 필요하다.

### 1. Personal Access Token 생성

1. GitHub > Settings > Developer settings > Personal access tokens > Fine-grained tokens
2. "Generate new token" 클릭
3. 설정:
   - **Token name**: `playbook-dispatch`
   - **Expiration**: 90일 (이후 갱신)
   - **Repository access**: "Only select repositories" → `kkyu92/playbook` 선택
   - **Permissions**: Contents (Read and write) 필수
4. "Generate token" 클릭 후 토큰 값 복사

### 2. moneyball-ecosystem 레포에 시크릿 추가

1. moneyball-ecosystem 레포 > Settings > Secrets and variables > Actions
2. "New repository secret" 클릭
3. **Name**: `PLAYBOOK_PAT`
4. **Value**: 위에서 복사한 토큰

## moneyball-ecosystem 워크플로우 수정

### daily-pipeline.yml

기존 job의 steps 마지막에 다음 step을 추가한다:

```yaml
      - name: Notify playbook on failure
        if: failure()
        env:
          GH_TOKEN: ${{ secrets.PLAYBOOK_PAT }}
        run: |
          gh api repos/kkyu92/playbook/dispatches \
            -f event_type=worker-error \
            -f 'client_payload[source_repo]=kkyu92/moneyball-ecosystem' \
            -f 'client_payload[title]=daily-pipeline 실패: ${{ github.workflow }}' \
            -f "client_payload[body]=Workflow: ${{ github.workflow }}\nRun: ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}\nBranch: ${{ github.ref_name }}\nCommit: ${{ github.sha }}" \
            -f 'client_payload[type]=error-log'
```

### live-update.yml

동일한 패턴으로 steps 마지막에 추가:

```yaml
      - name: Notify playbook on failure
        if: failure()
        env:
          GH_TOKEN: ${{ secrets.PLAYBOOK_PAT }}
        run: |
          gh api repos/kkyu92/playbook/dispatches \
            -f event_type=worker-error \
            -f 'client_payload[source_repo]=kkyu92/moneyball-ecosystem' \
            -f 'client_payload[title]=live-update 실패: ${{ github.workflow }}' \
            -f "client_payload[body]=Workflow: ${{ github.workflow }}\nRun: ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}\nBranch: ${{ github.ref_name }}\nCommit: ${{ github.sha }}" \
            -f 'client_payload[type]=error-log'
```

## 수동 테스트

playbook 쪽 auto-ingest 워크플로우를 `workflow_dispatch`로 수동 테스트할 수 있다:

```bash
gh workflow run auto-ingest.yml \
  --repo kkyu92/playbook \
  -f source_repo=kkyu92/moneyball-ecosystem \
  -f error_title="테스트: 수동 트리거" \
  -f error_body="수동 테스트 내용입니다." \
  -f error_type=error-log
```

또는 `repository_dispatch`를 직접 보내서 테스트:

```bash
gh api repos/kkyu92/playbook/dispatches \
  -f event_type=worker-error \
  -f 'client_payload[source_repo]=kkyu92/moneyball-ecosystem' \
  -f 'client_payload[title]=테스트: repository_dispatch' \
  -f 'client_payload[body]=테스트 본문' \
  -f 'client_payload[type]=error-log'
```

## 다른 워커 레포 추가

같은 패턴으로 어떤 워커 레포든 연결 가능하다:

1. 해당 워커 레포에 `PLAYBOOK_PAT` 시크릿 추가
2. 워크플로우에 `if: failure()` step 추가 (위 예시 참고, `source_repo`와 `title` 수정)
3. playbook의 auto-ingest 워크플로우가 `repository_dispatch`를 받아 자동 처리

## 트러블슈팅

| 증상 | 원인 | 해결 |
|------|------|------|
| dispatch 실패 (403) | PAT 권한 부족 | PAT에 playbook 레포 Contents write 권한 확인 |
| dispatch 실패 (404) | 레포 이름 오타 | `repos/kkyu92/playbook/dispatches` 확인 |
| 워크플로우 트리거 안 됨 | event_type 불일치 | `worker-error` 또는 `worker-lesson` 정확히 사용 |
| PAT 만료 | 90일 경과 | GitHub에서 토큰 갱신 후 시크릿 업데이트 |
