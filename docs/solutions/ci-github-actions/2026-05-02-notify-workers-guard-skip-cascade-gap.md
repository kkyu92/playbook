# [ci-github-actions] notify-workers guard skip cascade — 후속 step 의 guard output 미체크

**날짜**: 2026-05-02
**발생 파일**: `.github/workflows/notify-workers.yml`
**관련 PR/커밋**: run 25213297812 (5/1 11:51), run 25238523522 (5/2 00:05) — 둘 다 fail
**재발 여부**: 2회 재발 (workflow_dispatch path 양쪽). 동 카테고리 합계 4건+ (notify-workers 계열 만 — heredoc EOF #109, permissions #99, 본 건, dispatch base_sha 등)

## 문제

`notify-workers.yml` workflow_dispatch 시 항상 fail. 에러:

```
/tmp/changed-entries.txt: No such file or directory
##[error]Process completed with exit code 1.
```

표면 증상은 dispatch path bug 처럼 보이지만 진짜 원인은 `Self-loop guard` step 의 skip 결정이 후속 step 으로 cascade 되지 않아 `Build worker buckets` step 이 detect step 출력 없이 실행되는 패턴.

## 원인

### Root cause = guard skip cascade 갭

```yaml
- name: Self-loop guard
  id: guard
  run: |
    if [ "$AUTHOR" = "github-actions[bot]" ] || [[ "$MSG" == *"notify-workers"* ]]; then
      echo "skip=true" >> "$GITHUB_OUTPUT"
      exit 0
    fi
    echo "skip=false" >> "$GITHUB_OUTPUT"

- name: Detect changed entries
  if: steps.guard.outputs.skip != 'true'   # ✅ guard 체크
  id: detect
  ...

- name: Build worker buckets
  if: steps.detect.outputs.skip != 'true'  # ❌ detect 만 체크, guard 안 봄
  ...
```

**Cascade 메커니즘**:
1. guard 가 skip=true → detect step skip
2. detect 가 skip 됐으므로 `steps.detect.outputs.skip` = `''` (빈 문자열)
3. `'' != 'true'` = **TRUE** → buckets step 실행
4. buckets step 이 `/tmp/changed-entries.txt` 읽으려 하지만 detect 가 만든 적 없음 → fail

후속 step 4개 (pnpm setup / node setup / pnpm install / buckets) 모두 같은 갭. detect 한 단계만 if 가 guard 를 chain.

### 보조 의문 (미해결)

5/2 00:05 dispatch 시점 HEAD = `707efe9` (PR #111 squash merge), author = `김규식 Kim Kyu Sik`, msg = `fix(category): reports 카테고리 정식 추가 — content/reports/ drift 해소 (#106) (#111)`. guard 조건 (`github-actions[bot]` 또는 `notify-workers` 포함) 어느쪽도 매칭 X 인데 `🛡️ self-loop guard — skip` 출력. AUTHOR/MSG 변수 echo 가 코드에 없어서 실제 값 확인 불가. **debug echo 추가 필요** (이번 fix 에 포함).

## 해결

### Before

```yaml
- name: Build worker buckets
  if: steps.detect.outputs.skip != 'true'
```

### After

```yaml
- name: Build worker buckets
  if: steps.guard.outputs.skip != 'true' && steps.detect.outputs.skip != 'true'
```

= **모든 후속 step 의 if 에 `steps.guard.outputs.skip != 'true'` 추가**.

### Debug echo (root cause 미해결 부분 진단)

```yaml
- name: Self-loop guard
  id: guard
  run: |
    set -euo pipefail
    AUTHOR=$(git log -1 --format='%an' HEAD)
    MSG=$(git log -1 --format='%s' HEAD)
    echo "🔍 AUTHOR=$AUTHOR"
    echo "🔍 MSG=$MSG"
    if [ "$AUTHOR" = "github-actions[bot]" ] || [[ "$MSG" == *"notify-workers"* ]]; then
      ...
```

다음 fail 시 실제 AUTHOR/MSG 값 확인 → 진짜 매칭 조건 파악.

## 사전 탐지 방법

### 패턴 1: step output cascade 검증

```bash
# workflow yaml 안 if 조건들이 모두 같은 step output 만 의존하는지 검사
grep -E "if:.*steps\.[a-z_]+\.outputs\." .github/workflows/*.yml
# 한 step 의 output 만 의존하는 if 가 N개 이상이면 cascade 갭 의심
```

### 패턴 2: skip 정합 dry-run

```bash
# guard step 만 강제 skip 한 dry-run (workflow_dispatch + commit msg "notify-workers" 포함)
gh workflow run notify-workers.yml --ref main
# 실패 시 첫 fail step 위치 확인
```

### 패턴 3: 빈 output 처리 명시

GitHub Actions 의 `steps.X.outputs.Y` 는 X 가 skip 시 `''` 반환. `!= 'true'` 같은 negation 조건은 빈 값 = TRUE 처리. **default 가 "실행" 인 cascade 위험**. 모든 chain step 에 root guard 명시 필요.

## 체크리스트

PR 리뷰 시 워크플로 yaml 수정 시 확인:

- [ ] guard / detect / 같은 early-skip step 이 있으면 후속 step 의 if 에 **모든 ancestor skip output** 명시?
- [ ] `steps.X.outputs.Y != 'true'` 패턴이면 X 가 skip 됐을 때 빈 output 도 통과시킴 — 의도한 동작인지?
- [ ] guard 같은 진단 step 이면 변수 값 echo 포함 (root cause 진단 가능 여부)
- [ ] 새 step 추가 시 같은 if cascade 패턴 일관성 (한 step 만 다른 chain 이면 의도?)

## 관련

- 메모리: `feedback_question_own_defaults` (cascade 패턴 자가 의심), `feedback_proven_worker_automation_pattern`
- Solution: `docs/solutions/ci-github-actions/2026-05-01-notify-workers-heredoc-eof-gap.md` (notify-workers 계열 다른 fail mode — PR #109 fix)
- Wiki: `content/harness-engineering/drift-detection-methodology.mdx` Level 2 (머지 후 CI 결과 확인)
- 원본: run 25213297812, 25238523522, PR (이번)
- 박제 trigger: 2026-05-02 /handoff load 후 자율 점검 시 dispatch fail 발견
