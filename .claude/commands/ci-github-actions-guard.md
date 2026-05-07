# /ci-github-actions-guard — GH Actions 워크플로 3대 패턴 가드

`docs/solutions/ci-github-actions/` 3건 누적 + `_compiled-truth.md` 승격 결과물.  
GH Actions workflow yaml 작성·수정 시 반복 발생 패턴을 사전 차단하는 체크리스트.

## 사용법

```
/ci-github-actions-guard                        # 현재 변경된 workflow yml 전체 검토
/ci-github-actions-guard .github/workflows/foo.yml   # 특정 파일 지정
```

## 패턴 1 — yaml + bash heredoc 충돌

**증상**: `here-document delimited by end-of-file` / `unexpected EOF`

```yaml
# ❌ BAD — yaml run: 블록 안 heredoc
- run: |
    BODY=$(cat <<EOF
    내용...
    EOF
    )

# ✅ GOOD — multi-line string 사용
- run: |
    BODY="내용
    두 번째 줄
    세 번째 줄"
```

**체크**: `run:` 블록에 `<<EOF` 또는 `<<'EOF'` 패턴 있으면 즉시 교체 검토.

```bash
grep -n "<<EOF\|<<'EOF'" .github/workflows/*.yml
```

## 패턴 2 — guard skip cascade 갭

**증상**: guard step 이 skip 됐는데 후속 step 이 실행되어 파일/출력 없음 에러

```yaml
# ❌ BAD — 후속 step 이 guard 를 chain 안 함
- name: Guard
  id: guard
  run: echo "skip=true" >> "$GITHUB_OUTPUT"

- name: Detect
  if: steps.guard.outputs.skip != 'true'  # guard 체크 ✅
  id: detect
  ...

- name: Process
  if: steps.detect.outputs.result != ''    # ❌ guard 안 봄
  ...

# ✅ GOOD — 모든 후속 step 이 guard chain
- name: Process
  if: steps.guard.outputs.skip != 'true' && steps.detect.outputs.result != ''
```

**체크**: step `id: guard` 가 있으면 모든 후속 step 의 `if:` 에 `steps.guard.outputs.*` 가 포함되어야 함.

```bash
# guard id 목록
grep -n "^  *id: guard\|^  *id: .*guard" .github/workflows/*.yml

# 후속 step if 조건 검토 (수동 확인)
grep -n "if: steps\." .github/workflows/*.yml
```

## 패턴 3 — LLM 자동화 환경 GH Actions 한도 소진

**증상**: "account payments have failed or spending limit needs to be increased" → 전체 워크플로 차단

**적용 조건**: Private repo + LLM 에이전트 자동화 (PR 반복 생성/머지)

**예방 체크리스트**:

```
[ ] Private repo 여부 확인 → Public 전환 검토 (GH Actions 분 무제한)
[ ] Vercel preview 배포 비활성화 확인 (vercel.json ignoreCommand)
[ ] silent-skip-tracker.yml 워크플로 존재 여부
[ ] 월간 GH Actions 분 소진 속도 예측 (LLM 에이전트 cycle/일 × 평균 분/cycle)
```

**빠른 진단**:

```bash
gh run list --limit 5
# 모두 "The job was not started because recent account payments have failed" → billing block
```

## 실행 순서

1. 검토 대상 workflow yml 파일 특정
2. 패턴 1 grep → heredoc 발견 시 multi-line string 교체 제안
3. 패턴 2 guard chain 검토 → 누락 step 발견 시 `if:` 조건 보강 제안
4. 패턴 3 billing 체크리스트 → Private repo 시 public 전환 권고

## 관련

- `docs/solutions/ci-github-actions/_compiled-truth.md` — 패턴 3건 상세 + 승격 후보 분석
- `docs/solutions/ci-github-actions/` — 개별 solution 3건
- Wiki: `content/infrastructure/github-actions-billing-block-diagnosis-recovery.mdx`
