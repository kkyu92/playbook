# Worker Integration Setup Guide

playbook 허브의 auto-ingest 시스템에 워커 레포(moneyballscore 등)를 연결하는 가이드.

## 개요 (Hybrid 3 경로)

워커 → 허브 자동 dispatch 는 세 경로로 분기된다:

| 경로 | 트리거 | 허브 처리 | 용도 |
|---|---|---|---|
| **Error** (`worker-error`) | cron workflow `if: failure()` | raw 저장 + Issue 알림 (Journal 자동 X) | 실패 회수 + 미래 회고 |
| **Incident** (`worker-incident`) | 워커 명시적 dispatch (Sentry first new issue, deploy fail 등) | raw 저장 + Issue 알림. Journal 승격은 hub 측 LLM 의미 판단 (A2 자동화 후) | 자연 발생 사고 누적 |
| **Lesson** (`worker-lesson`) | `lesson:` 접두사 commit | raw + Journal draft PR 자동 생성 | 의도적 교훈만 wiki 화 |

```
[워커 cron 실패]      → repository_dispatch (worker-error)   → [auto-ingest] → raw + Issue
[워커 사고 dispatch]  → repository_dispatch (worker-incident) → [auto-ingest] → raw + Issue (LLM 승격 대기)
[워커 lesson: 커밋]   → repository_dispatch (worker-lesson)  → [auto-ingest] → raw + Journal PR
```

분기 이유: error 와 incident 의 차이 — incident 는 워커가 "분석 가치 있음" 명시. lesson 은 워커가 wiki 본문까지 작성. heuristic promotion (severity / persistence / keyword) 은 모두 노이즈 또는 critical 같이 필터하므로 사용 X. Journal 승격은 LLM 의미 판단 (Phase A2) 으로 위임.

## Client Payload Schema

모든 dispatch 의 `client_payload` 표준 schema. hub auto-ingest workflow 가 검증.

| Field | Type | Required | 의미 |
|-------|------|----------|------|
| `source_repo` | string | ✓ | `owner/repo` (예: `kkyu92/moneyballscore`) |
| `title` | string | ✓ | 한 줄 제목 (~80자) |
| `body` | string | ✓ | 본문 (markdown 권장) |
| `type` | enum | ✓ | `error-log` / `incident` / `lesson` (event_type 과 매칭) |
| `subtype` | string | optional (lesson) | lesson 의 subtype 메타. 예: `self-policy` (워커 memory/feedback 자가 갱신 commit), `general` (default). hub 측 routing/label 분기 — 새 event_type X (codex 2026-04-29 finding #2 정합) |
| `severity` | enum | incident 권장 | `warning` / `error` / `critical` (alert taxonomy, promotion gate 아님) |
| `fingerprint` | string | incident/lesson 권장 | 안정 식별자 (Sentry issue ID, deploy SHA, lesson commit SHA 등). raw 파일 idempotent key + **incident-lesson correlation key (Phase 4a D5)**. dedup 의 진짜 기준 |
| `first_seen` | ISO8601 | optional | 첫 발생 시각 (예: `2026-04-19T14:43:13Z`) |
| `environment` | string | optional | `production` / `preview` / `development` |
| `run_url` | URL | optional | workflow run URL / Sentry issue URL — 디버깅 진입점 |
| `intent` | enum | optional | `normal` (default) / `test` / `debug` — 가드 테스트는 `test` 명시 (자동 Journal skip) |

### 검증 동작 (hub 측)

- 필수 field 누락 → workflow fail (visible — silent X)
- enum 값 위반 → fallback to `worker-error` + GitHub Actions annotation (visible counter)
- `intent=test` → raw 저장 only, Issue/Journal X (가드 테스트 무시)
- 중복 dispatch (같은 fingerprint, 24h 이내) → 기존 Issue 코멘트만, raw 덮어쓰기 (idempotent)

### 워커 dispatch code 예시 — incident

```bash
gh api repos/kkyu92/playbook/dispatches \
  -f event_type=worker-incident \
  -f "client_payload[source_repo]=${GITHUB_REPOSITORY}" \
  -f "client_payload[title]=Sentry: Database connection timeout" \
  -f "client_payload[body]=$(cat error-context.md)" \
  -f "client_payload[type]=incident" \
  -f "client_payload[severity]=error" \
  -f "client_payload[fingerprint]=sentry-issue-12345" \
  -f "client_payload[first_seen]=$(date -u +%Y-%m-%dT%H:%M:%SZ)" \
  -f "client_payload[environment]=production" \
  -f "client_payload[run_url]=https://sentry.io/issues/12345"
```

### 워커 dispatch code 예시 — guard test (Journal skip)

```bash
gh api repos/kkyu92/playbook/dispatches \
  -f event_type=worker-incident \
  -f "client_payload[type]=incident" \
  -f "client_payload[fingerprint]=guard-b-test-$(date +%s)" \
  -f "client_payload[intent]=test" \
  -f "client_payload[title]=Guard B test event" \
  -f "client_payload[body]=Test payload — verifying chain"
```

`intent=test` → hub 가 raw 만 저장. Issue/Journal 안 생성. 체인 검증용.

---

## 사전 준비

### 1. 워커 이름 등록 (projects.conf)

`~/.config/claude-hub/projects.conf` 에 워커 등록:

```
moneyball:/Users/kyusikkim/projects/moneyballscore
```

**중요**: `name` (좌측, `moneyball`) 이 hub-sync-rules / `workers:` 태그 매칭에 쓰이는 식별자. **path 의 디렉토리명과 다를 수 있음** (예: `moneyball` ↔ `moneyballscore`).

`generate-content-manifest.mjs` 가 매니페스트 생성 시 `workers:` 필드를 이 등록 이름과 비교 — 등록 안 된 이름이면 빌드 실패. 오타 방어.

### 2. Personal Access Token 생성

워커 레포의 기본 `GITHUB_TOKEN` 은 자기 레포만 접근 가능 → 별도 PAT 필요.

1. GitHub > Settings > Developer settings > Personal access tokens > Fine-grained tokens
2. "Generate new token"
3. 설정:
   - **Token name**: `playbook-dispatch-YYYY-MM` (만료일 기준)
   - **Expiration**: 1년 권장 (90일이면 갱신 부담 큼)
   - **Repository access**: "Only select repositories" → `kkyu92/playbook`
   - **Permissions**: Contents (Read and write) **필수**
4. 토큰 값 복사 (이 시점이 유일한 노출)

### 3. 워커 레포 시크릿 추가

워커 레포 (예: moneyballscore) > Settings > Secrets and variables > Actions > "New repository secret":
- **Name**: `PLAYBOOK_PAT`
- **Value**: 위 토큰

### 4. (1회) playbook 레포 Actions 권한

playbook 레포 > Settings > Actions > General:
- **Workflow permissions**: "Read and write permissions"
- **Allow GitHub Actions to create and approve pull requests**: ✅ 체크

이 옵션이 OFF 면 lesson 경로의 자동 PR 생성이 403 으로 실패한다.

---

## 모드 1: Error 경로 — cron 실패 자동 알림

### 대상 workflow 에 step 추가

각 cron workflow (`daily-pipeline.yml`, `live-update.yml`, `sync-batter-stats.yml` 등) 의 **마지막 job 의 steps 맨 끝**에 추가:

```yaml
      - name: Notify playbook on failure
        if: failure()
        env:
          GH_TOKEN: ${{ secrets.PLAYBOOK_PAT }}
          WORKFLOW_NAME: ${{ github.workflow }}
          RUN_URL: ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}
          BRANCH: ${{ github.ref_name }}
          COMMIT_SHA: ${{ github.sha }}
        run: |
          set -e
          TITLE="${WORKFLOW_NAME} 실패"
          BODY="Workflow: ${WORKFLOW_NAME}
          Run: ${RUN_URL}
          Branch: ${BRANCH}
          Commit: ${COMMIT_SHA}"
          gh api repos/kkyu92/playbook/dispatches \
            -f event_type=worker-error \
            -f "client_payload[source_repo]=${GITHUB_REPOSITORY}" \
            -f "client_payload[title]=${TITLE}" \
            -f "client_payload[body]=${BODY}" \
            -f "client_payload[type]=error-log"
```

`if: failure()` — 같은 job 의 이전 step 중 하나라도 실패하면 트리거. step 위치는 무관.

---

## 모드 2: Lesson 경로 — 의도적 교훈 자동 dispatch

### `.github/workflows/submit-lesson.yml` 신규 생성

```yaml
name: "📚 Submit Lesson to Playbook"

on:
  push:
    branches: [main]

jobs:
  submit:
    if: startsWith(github.event.head_commit.message, 'lesson:')
    runs-on: ubuntu-latest
    steps:
      - name: Extract lesson title & body
        id: extract
        env:
          MSG: ${{ github.event.head_commit.message }}
        run: |
          TITLE=$(printf '%s' "$MSG" | head -1 | sed 's/^lesson:[[:space:]]*//')
          echo "title=$TITLE" >> $GITHUB_OUTPUT
          {
            echo "body<<EOF_LESSON"
            printf '%s' "$MSG" | tail -n +2
            echo
            echo "EOF_LESSON"
          } >> $GITHUB_OUTPUT

      - name: Dispatch lesson to playbook
        env:
          GH_TOKEN: ${{ secrets.PLAYBOOK_PAT }}
          TITLE: ${{ steps.extract.outputs.title }}
          BODY: ${{ steps.extract.outputs.body }}
        run: |
          gh api repos/kkyu92/playbook/dispatches \
            -f event_type=worker-lesson \
            -f "client_payload[source_repo]=${GITHUB_REPOSITORY}" \
            -f "client_payload[title]=${TITLE}" \
            -f "client_payload[body]=${BODY}" \
            -f "client_payload[type]=lesson"
```

### 사용법

```bash
git commit -m "lesson: <한 줄 제목>

<본문 — 멀티라인 가능. 그대로 raw + Journal draft 본문에 들어감>"
git push
```

Lesson 접두사 없는 일반 커밋은 무시됨 (job `if` 조건). 작은 노이즈 부담 없음.

### Self-policy variant — `subtype: self-policy` (Phase 4a 예정)

워커 측 자가 정책 갱신 commit (메모리 `feedback_*.md` 추가, 워커 CLAUDE.md 규칙 update, `~/bin/` 스크립트 운영 변경 등 워커 *자체* 운영 변경) 도 lesson 채널 재사용 — `subtype: self-policy` 로 구분. **새 event_type 추가 X** (codex 2026-04-29 finding #2 정합).

**워커 측 trigger**: commit 메시지 prefix `policy:` / `feedback:` / `memory:` (event_type 은 그대로 `worker-lesson`).

**Dispatch 예시**:

```bash
gh api repos/kkyu92/playbook/dispatches \
  -f event_type=worker-lesson \
  -f "client_payload[source_repo]=${GITHUB_REPOSITORY}" \
  -f "client_payload[title]=${TITLE}" \
  -f "client_payload[body]=${BODY}" \
  -f "client_payload[type]=lesson" \
  -f "client_payload[subtype]=self-policy" \
  -f "client_payload[fingerprint]=${GITHUB_SHA}"
```

**Hub 측 처리** (Phase 4a 구현 예정):
- `subtype=self-policy` → label `self-policy` Issue 생성 + Journal PR draft 는 동일 패턴
- 미지정 / `general` → 기존 Journal PR draft 그대로 (변경 없음)

**의도**: 워커 자체 운영 갱신 (정책 / memory feedback) → 허브 가 인지 → 다른 워커 전파 후보 감지 (D4 self-policy → hub dispatch). 본 가이드는 schema 박제 only — 워커 측 workflow 와 허브 측 분기 routing 은 Phase 4a 구현.

---

## 모드 3 (계획): Sentry First Seen webhook — PII Scrubbing 필수

워커 production 사고를 Sentry "First Seen" 이벤트로 자동 inbound 화하는 경로. 외부 시스템 (Sentry) 페이로드를 그대로 raw 에 저장하면 사용자 IP / 이메일 / 요청 쿠키 등 PII 가 위키에 영구 박제되므로, **배선 전 가드 1+2+3 모두 적용 후** 활성화.

### 가드 1 — payload 화이트리스트

Sentry webhook payload 중 raw 에 보존할 필드만 명시. 화이트리스트에 없는 필드는 폐기.

| 보존 OK            | 폐기 대상                              |
|--------------------|----------------------------------------|
| `event.title`      | `event.user.email`, `user.id`          |
| `event.message`    | `user.ip_address`, `geo.*`             |
| `event.exception`  | `request.cookies`, `request.headers.*` |
| `event.level`      | `request.data` (POST body 전체)        |
| `event.environment`| `breadcrumbs[*].data` (raw)            |
| `event.release`    | `tags.user_*`                          |
| `project.slug`     | `contexts.device.*`                    |
| `url` (issue link) |                                        |

구현: dispatch 직전 `pick(payload, ALLOWLIST)` 함수로 명시적 선택. blacklist 방식 X (필드 추가될 때 누락 위험).

### 가드 2 — 정규식 sanitization

화이트리스트 통과 후에도 free-text (message, exception value) 안에 PII 가 끼어들 수 있음. 저장 직전 redact:

| 패턴                                     | 치환            |
|------------------------------------------|-----------------|
| 이메일 `\S+@\S+\.\S+`                   | `[EMAIL]`       |
| IPv4 `\d{1,3}(\.\d{1,3}){3}`            | `[IP]`          |
| JWT `eyJ[\w-]+\.[\w-]+\.[\w-]+`         | `[JWT]`         |
| Bearer 토큰 `Bearer [\w-]{20,}`         | `Bearer [REDACTED]` |
| API key 류 `[A-Za-z0-9]{32,}` (옵션)    | `[KEY]`         |
| 한국 휴대폰 `01\d-?\d{3,4}-?\d{4}`      | `[PHONE]`       |

구현: `scripts/sanitize-pii.mjs` 단일 모듈로 분리. 테스트로 회귀 방어 (현실 페이로드 fixture 5종+).

### 가드 3 — raw 저장 정책

- **위치**: `raw-sources/sentry/{YYYY-MM}/{event_id}.json` — 분리 디렉토리 (auto-ingest 일반 경로와 분리)
- **TTL**: 30일 후 자동 archive (`raw-sources/_archive/sentry/`) — 공개 wiki 화 안 된 raw 는 영구 보존 의미 없음
- **lint 가드**: `lint-content.mjs` 에 "raw-sources/sentry 안의 텍스트는 wiki entry frontmatter 의 description / body 에 그대로 쓰지 말 것" 룰 (휴리스틱: stack trace 패턴 감지)
- **PR 자동 생성 X**: lesson 경로와 달리 Sentry 는 raw 저장 + Issue 알림까지만. wiki 화는 사용자가 의도적으로 `/ingest` 호출 시에만.

### 활성화 체크리스트

P3 배선 PR 머지 전 확인:
- [ ] `sanitize-pii.mjs` 모듈 + vitest 5건+ 통과
- [ ] auto-ingest 워크플로에 `event_type: sentry-first-seen` 분기 추가
- [ ] 화이트리스트 함수 단위 테스트 (필드 누락 시 명시적 fail)
- [ ] `raw-sources/sentry/` `.gitignore` 검토 (보존 vs 즉시 삭제 결정)
- [ ] Sentry 측 webhook URL 등록 (`Settings > Integrations > Webhooks`)
- [ ] Webhook secret HMAC 검증 (워커 PAT 와 별도, Sentry 가 자체 서명)

---

## 운영 메커니즘 (허브 측)

### Dedup (24h, error 경로 한정)

같은 cron 이 반복 실패해도 Issue 가 누적되지 않음:
- 24시간 내 동일 title (앞 30자 매칭) inbound Issue open 상태면 → 새 Issue 생성 X, **기존 Issue 에 재발 코멘트**.
- 24시간 지났거나 Issue 가 close 됐으면 → 신규 Issue.

목적: 알림 피로도 차단 + 재발 빈도 추적 (코멘트 갯수 = 재발 횟수).

### Weekly Triage (망각 방어)

매주 월 09:05 KST `weekly-triage.yml` cron:
- `raw-sources/` 스캔 → `content/` 에 반영 안 된 raw 만 수집
- 1건 이상이면 Issue 생성 (라벨 `triage,weekly`, assignee 본인 → 이메일 알림)
- 0건이면 skip
- 매주 새 Issue 생성 시 기존 triage Issue 자동 close (무한 누적 방지)

목적: 사용자가 한 주 허브 세션 안 열어도 inbound 망각 방지.

처리 방법: Issue 본문의 raw 리스트 보고 허브 세션에서 `/ingest` (인자 없으면 자동 스캔 모드) 로 일괄 소화.

---

## 수동 테스트

playbook 쪽 auto-ingest 를 `workflow_dispatch` 로 직접 트리거:

```bash
# Error 경로
gh workflow run auto-ingest.yml \
  --repo kkyu92/playbook \
  -f source_repo=kkyu92/moneyballscore \
  -f error_title="테스트: 수동 트리거" \
  -f error_body="테스트 본문" \
  -f event_type=worker-error

# Lesson 경로
gh workflow run auto-ingest.yml \
  --repo kkyu92/playbook \
  -f source_repo=kkyu92/moneyballscore \
  -f error_title="테스트 lesson" \
  -f error_body="테스트 lesson 본문" \
  -f event_type=worker-lesson
```

또는 워커 레포에서 `repository_dispatch` 직접 호출 (워커 PAT 인증 검증):

```bash
gh api repos/kkyu92/playbook/dispatches \
  -f event_type=worker-error \
  -f 'client_payload[source_repo]=kkyu92/moneyballscore' \
  -f 'client_payload[title]=테스트' \
  -f 'client_payload[body]=본문' \
  -f 'client_payload[type]=error-log'
```

---

## 다른 워커 레포 추가

새 워커 (예: `kkyu92/foo`) 연동 시:

1. `~/.config/claude-hub/projects.conf` 에 한 줄 추가: `foo:/Users/kyusikkim/projects/foo`
2. 해당 레포 Actions secrets 에 `PLAYBOOK_PAT` 등록 (기존 PAT 재사용 가능 — playbook 한 곳만 권한 필요)
3. cron workflow 에 모드 1 step 추가
4. 필요 시 `submit-lesson.yml` 신규
5. `~/bin/hub-sync-rules` 한 번 실행 → 새 워커 memory/ 디렉토리 인식
6. content frontmatter 에 `workers: [foo]` 또는 `[all]` 지정한 엔트리가 있으면 자동 symlink

---

## 트러블슈팅

| 증상 | 원인 | 해결 |
|------|------|------|
| dispatch 403 | PAT 권한 부족 | PAT 의 Contents write 권한 + Repository access 가 `kkyu92/playbook` 포함하는지 |
| dispatch 404 | 레포 이름 오타 | `repos/kkyu92/playbook/dispatches` 정확히 |
| 워크플로우 트리거 안 됨 | event_type 불일치 | `worker-error` / `worker-lesson` 둘 중 하나 정확히 |
| Lesson PR 생성 실패 (403) | playbook Actions 권한 | playbook 레포 Settings > Actions > "Allow GitHub Actions to create and approve pull requests" 체크 |
| `Invalid worker name "X"` 빌드 에러 | workers 태그 오타 | projects.conf 등록 이름 (path 의 디렉토리명과 다를 수 있음) 확인. 또는 `all` |
| symlink 안 만들어짐 | `~/bin/hub-sync-rules` 미실행 | content frontmatter 갱신 후 한 번 실행 필요 (cron 아님) |
| PAT 만료 알림 | GitHub 7일 전 자동 메일 | 새 PAT 생성 → 워커 레포 secret 갱신 → 구 PAT revoke |
