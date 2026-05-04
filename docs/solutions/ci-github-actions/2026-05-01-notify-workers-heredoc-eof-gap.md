# [ci-github-actions] notify-workers heredoc EOF 종료 토큰 yaml indent 갭

**날짜**: 2026-05-01 ~ 2026-05-02
**발생 파일**: `.github/workflows/notify-workers.yml`
**관련 PR/커밋**: PR #99 (initial fix), PR #101/#102 (heredoc body indent 1차 fix), PR #109 c6dfc38 (heredoc 자체 폐기 2차 fix)
**재발 여부**: 3회 재발 (#99 → #101/#102 → #109). 같은 yaml + bash heredoc 갭 패턴 반복.

## 문제

`notify-workers.yml` 머지 후 영향 워커 매칭 path 진입 시 fail:

```
here-document at line 31 delimited by end-of-file (wanted EOF)
unexpected EOF while looking for matching `)`
##[error]Process completed with exit code 2.
```

5/2 PR #107 (geeknews) 머지 후 첫 자연 fire 시 노출. **PR #105 (Journal 019) fire 는 buckets `{}` skip path 로 통과** — 영향 워커 매칭 path 미진입 = 갭 미노출. PR #107 는 영향 매칭 path 진입 → 첫 e2e 검증 = 갭 노출.

## 원인

### 본질 = bash heredoc + yaml indent 충돌

bash heredoc `<<EOF` 의 **종료 토큰 EOF 는 줄 시작 (column 1)** 이어야 bash 가 인식. yaml workflow 안에서 step `run:` 블록 12 space indent → EOF 도 같은 indent 들어감 → bash 미인식 → end-of-file 에러.

### 3회 재발 진화 history

1. **PR #99 (initial)**: `BODY=$(cat <<EOF) ... EOF`. 첫 시도 — yaml parse 통과, bash 도 부분 동작. issue 제목/본문은 출력됐지만 escape 갭 (한국어 + jq 변수 보간) 발견
2. **PR #101/#102 (1차 fix)**: heredoc body 의 **각 line indent 일관성** 처리. yaml parse 갭 (heredoc 안 `- ` 가 yaml list 오인식) 으로 PR #101 (사용자) → PR #102 (auto-bot) 같은 fix 두 번 PR
3. **PR #109 (2차 fix, 본 박제 대상)**: heredoc 자체 폐기. `BODY="..."` multi-line string 대체. line 202-204 의 Self-report on failure 가 이미 multi-line string 패턴 사용 중 = 동일 파일 안 작동 패턴 채택

= **heredoc 자체가 yaml + bash 이중 환경에서 재발 위험 패턴**. 단순 string 으로 회피.

## 해결

### Before (PR #109 머지 전)

```yaml
- name: Notify worker repos
  run: |
    BODY=$(cat <<EOF
    허브 (\`${HUB_REPO}\`) content/ 에서 본 워커 (\`${worker}\`) 영향 변경 ${COUNT}건.

    ## 변경 Entries

    ${ENTRIES_MD}
    ...
    EOF
    )
```

### After (PR #109 c6dfc38)

```yaml
- name: Notify worker repos
  run: |
    BODY="허브 (\`${HUB_REPO}\`) content/ 에서 본 워커 (\`${worker}\`) 영향 변경 ${COUNT}건.

    ## 변경 Entries

    ${ENTRIES_MD}
    ..."
```

= heredoc 폐기, multi-line string 채택. yaml indent 자유, bash 종료 토큰 불필요, escape 단순화.

### 동일 파일 self-report 참조

같은 워크플로 line 199~201 (Self-report on failure) 가 이미 multi-line string 패턴:

```yaml
BODY="🚨 notify-workers.yml run #${GITHUB_RUN_NUMBER} 실패 — Push channel 차질.

Run: ${RUN_URL}"
```

이 패턴이 작동 중이었으므로 PR #109 = "동일 파일 안 작동 패턴 carry over" = 자가 일관성 회복 fix.

## 사전 탐지 방법

### 패턴 1: yaml + heredoc 검색

```bash
# yaml workflow 안 heredoc 사용 검색
grep -n "<<EOF" .github/workflows/*.yml
# 매치 발견 시 multi-line string 대체 검토
```

### 패턴 2: yaml syntax validation

```bash
python3 -c "import yaml; yaml.safe_load(open('.github/workflows/notify-workers.yml').read())"
# heredoc 안 yaml 특수문자 (`- ` 리스트 오인식) 가 trigger 되는 경우 fail
```

### 패턴 3: bash syntax 사전 validation

```bash
# yaml run 블록 추출 후 bash -n 으로 syntax check
# (자동화는 어렵지만 PR 단계 manual 검증 가치)
bash -n <(extract_run_block .github/workflows/notify-workers.yml)
```

### 패턴 4: e2e fire 가 영향 매칭 path 까지 가는지 강제 검증

PR #105 fire = skip path SUCCESS = false positive. PR #107 fire = 영향 매칭 path entry = 진짜 e2e. **dispatch 시 mock entry 또는 영향 매칭 trigger** 추가하면 미리 노출 가능.

## 체크리스트

PR 리뷰 시 yaml workflow heredoc 수정 시 확인:

- [ ] yaml workflow 안 새 heredoc (`<<EOF`) 추가 시 → multi-line string (`VAR="..."`) 대체 검토
- [ ] 같은 파일 안 이미 multi-line string 패턴 있으면 → carry over (자가 일관성)
- [ ] heredoc 불가피 시 → 종료 토큰 column 1 강제 (yaml `|-` block scalar + 명시 indent)
- [ ] yaml parse + bash -n 양쪽 validation
- [ ] e2e fire 가 skip path 만 통과 시 false positive — 영향 매칭 path 강제 검증

## 관련

- 메모리: `feedback_question_own_defaults` (heredoc 같은 default 패턴 자가 의심), `feedback_proven_worker_automation_pattern`
- Solution: `docs/solutions/ci-github-actions/2026-05-02-notify-workers-guard-skip-cascade-gap.md` (notify-workers 계열 다른 fail mode — 5/2)
- Wiki: `content/harness-engineering/drift-detection-methodology.mdx` Level 2 (머지 후 CI 결과 확인 — false positive skip path 함정)
- 원본: PR #99, #101, #102, #109 c6dfc38, run 25238064779
- 박제 trigger: 2026-05-04 /handoff load 후 retroactive 의무 박제 (5/1~5/2 시점 누락)
