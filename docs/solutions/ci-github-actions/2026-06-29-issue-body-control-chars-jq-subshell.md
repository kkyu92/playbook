# 2026-06-29 — GH issue body 제어문자 jq 파싱 실패 + pipe subshell 변수 격리

## 발생 컨텍스트

`incident-auto-close.yml` (Phase 4b) 2회 연속 crash (run #18 #19, hub issue #2124).
- run #18: jq parse error → script exit 1 (12s)
- run #19: 즉시 crash (19ms)

## 근본 원인 2개 (동시 발생)

### 원인 A — issue body 제어문자 U+0000-U+001F

`gh issue list --json` 반환 JSON 의 `body` 필드에 unescaped control characters (U+0000-U+001F) 포함 가능.
jq 는 JSON spec 상 U+0000-U+001F 를 string 내에서 반드시 escape 해야 하므로 parse error.

```bash
# 실패 패턴
gh issue list --json number,title,body > /tmp/issues.json
jq -c '.[]' /tmp/issues.json  # ← parse error if body has \x00-\x1f
```

**수정**: Python strict=False 로 읽어서 제어문자 strip 후 재저장.

```python
import json, re
with open('/tmp/issues.json') as f:
    data = json.loads(f.read(), strict=False)  # strict=False = 제어문자 허용
for item in data:
    body = item.get('body') or ''
    item['body'] = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f]', '', body)
with open('/tmp/issues.json', 'w') as f:
    json.dump(data, f)
```

### 원인 B — jq | while pipe subshell 변수 격리

bash `cmd | while read -r row; do ... done` 구조에서 while loop 는 subshell 에서 실행.
loop 안 counter (`CLOSED`, `SKIPPED`) 변경이 outer scope 에 미반영 → 항상 0 출력.

```bash
# 실패 패턴 (pipe subshell)
jq -c '.[]' /tmp/issues.json | while read -r row; do
  CLOSED=$((CLOSED+1))  # subshell 안 — outer 미반영
done
echo "closed: $CLOSED"  # 항상 0

# 수정 (process substitution)
while read -r row; do
  CLOSED=$((CLOSED+1))  # outer scope
done < <(jq -c '.[]' /tmp/issues.json)
echo "closed: $CLOSED"  # 정확한 카운트
```

### 원인 C — set -e + gh issue close 비정상 exit

`set -e` 환경에서 `gh issue close` 가 already-closed issue 에 non-zero exit → script 즉시 종료.

```bash
# 수정
gh issue close "$NUM" --comment "..." || {
  echo "⚠️ close failed #$NUM — skipping"
  SKIPPED=$((SKIPPED+1))
  continue
}
```

## 수정 요약

| # | 문제 | 수정 |
|---|------|------|
| A | issue body 제어문자 | Python strict=False + regex strip (pre-jq 단계) |
| B | pipe subshell 변수 | `while ... done < <(jq ...)` process substitution |
| C | close 실패 set -e | `|| { skip; continue }` 에러 핸들링 |

## 재발 조건

`gh issue list --json` + `jq` 처리 workflow 는 모두 A 패턴 영향권.
bash counter + pipe = 모두 B 패턴 영향권.

## 관련 파일

- `.github/workflows/incident-auto-close.yml` (fix commit: a1f3fbd6, PR #2126, cycle 1230)
- hub issue #2124 (hub-self-report, auto-close 예정)
