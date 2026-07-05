# 2026-07-06 — incident-auto-close.yml 헤레독 column-0 회귀 (20+ 연속 실패)

## 발생 컨텍스트

`incident-auto-close.yml` 2026-07-03T07:52:54Z 부터 모든 push 이벤트에서 0s "workflow file issue" 실패. 20+ 연속.

## 근본 원인

`f433298e fix(workflow): incident-auto-close 3 bugs (#2126)` 가 control chars 수정 시 `python3 - <<'PYEOF'` heredoc 도입. `PYEOF` 종료 토큰이 **column 0** → GitHub Actions YAML 파서 실패.

이 패턴은 이전 `notify-workers.yml` 에서도 3회 재발 (→ `2026-05-01-notify-workers-heredoc-eof-gap.md`).
로컬 fix `79b131a6` (python3 -c 전환) 존재했으나 BRANCHED 상태로 origin/main 미반영.

## 실패 패턴

```yaml
# BROKEN — PYEOF 가 column 0 에 있음
run: |
  python3 - <<'PYEOF'
import json, re
...
PYEOF
```

GitHub Actions YAML parser: column-0 `PYEOF` 를 YAML block scalar 종료로 인식 → workflow file issue.

## 수정 패턴

```bash
# FIXED — heredoc 없이 single-line python3 -c
python3 -c "import json,re;f='/tmp/file.json';d=json.loads(open(f).read(),strict=False);[x.update({'body':re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f]','',x.get('body')or'')})for x in d];json.dump(d,open(f,'w'))"
```

또는 jq 사용 (Python 불필요):
```bash
jq '[.[] | .body = (.body // "" | gsub("[\\u0000-\\u0008\\u000b\\u000c\\u000e-\\u001f]"; ""))]' in.json > out.json && mv out.json in.json
```

## 재발 방지

1. `actions/checkout@v5` → `v4` (v5 미존재 = 런타임 실패 위험)
2. YAML `run: |` 블록 안에서 heredoc 사용 금지. 대신:
   - single-line `python3 -c "..."` (줄바꿈 없는 한 줄)
   - jq (이미 사용 중이면 jq 로 통합)
   - `python3 script.py` (별도 파일로 분리)
3. local fix 가 origin/main 에 반영됐는지 BRANCHED 상태 때 특별 주의

## 관련

- PR #2240 (fix)
- `f433298e` (regression commit)
- `79b131a6` (local fix, 미반영)
- `2026-05-01-notify-workers-heredoc-eof-gap.md` (동일 패턴 선례)
