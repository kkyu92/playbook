---
title: LLM agent-seed 엔트리 connections 경로 중복 (category/category/slug)
category: llm-generation
date: 2026-05-19
tags: [connections, orphan, lint, agent-seed, android-ai]
severity: medium
recurrence: likely
---

## 문제

LLM agent-dispatch로 일괄 생성된 엔트리(예: android-ai 10개)의 `connections` frontmatter에 카테고리가 중복된 경로가 박제됨.

```yaml
# 잘못된 형식 (agent-seed 생성)
connections: [infrastructure/infrastructure/gomodel-llm-gateway-introduction-strategy, harness-engineering/harness-engineering/realtime-ai-model-deployment-monitoring-patterns]

# 올바른 형식
connections: [infrastructure/gomodel-llm-gateway-introduction-strategy, harness-engineering/realtime-ai-model-deployment-monitoring-patterns]
```

## 증상

- `node scripts/lint-content.mjs` → `⚠ Orphan Links: N건`
- 전부 신규 카테고리 엔트리에서 발생 (기존 엔트리는 정상)
- CI 빌드에는 영향 없음 (MDX 컴파일 문제 아님, 링크 graph 문제)

## 근본 원인

LLM agent가 connections 경로를 생성할 때 카테고리명을 두 번 반복하는 패턴 사용:
- `<category>/<category>/<slug>` (잘못됨)
- `<category>/<slug>` (올바름)

solutions 경로도 동일 패턴으로 오염:
- `llm-generation/solutions/llm-generation/<slug>` → `solutions/llm-generation/<slug>`
- `mdx/solutions/mdx/<slug>` → `solutions/mdx/<slug>`

solutions 엔트리는 `.md` 확장자로 `docs/solutions/` 에 있어 `findMdxFiles`가 인덱싱하지 않음 — 정상 경로로 교정해도 lint orphan 지속.

## 해결 (before/after)

**Before**: 80개 orphan link (android-ai 10개 파일 전체)

**After**: 0개 orphan link

**Fix 스크립트** (Python):
```python
import os, re

CONTENT_DIR = "content/android-ai"  # 영향받은 카테고리

replacements = [
    ('agents/agents/', 'agents/'),
    ('context-engineering/context-engineering/', 'context-engineering/'),
    ('evaluation/evaluation/', 'evaluation/'),
    ('frontend-ai/frontend-ai/', 'frontend-ai/'),
    ('harness-engineering/harness-engineering/', 'harness-engineering/'),
    ('infrastructure/infrastructure/', 'infrastructure/'),
    ('journal/journal/', 'journal/'),
    ('llm-generation/solutions/llm-generation/', 'solutions/llm-generation/'),
    ('mdx/solutions/mdx/', 'solutions/mdx/'),
    ('project-ops/project-ops/', 'project-ops/'),
    ('prompt-engineering/prompt-engineering/', 'prompt-engineering/'),
    ('reports/reports/', 'reports/'),
]

for fname in os.listdir(CONTENT_DIR):
    if not fname.endswith('.mdx'): continue
    fpath = os.path.join(CONTENT_DIR, fname)
    content = open(fpath).read()
    new_content = content
    for old, new in replacements:
        new_content = new_content.replace(old, new)
    if new_content != content:
        open(fpath, 'w').write(new_content)
```

solutions 참조는 `.md` 파일로 lint에서 인덱싱 안 됨 → connections에서 제거:
```python
# orphan solutions/retro 참조 제거
for slug in ['solutions/llm-generation/...', 'retro/retros/...']:
    new_content = re.sub(r',\s*' + re.escape(slug), '', new_content)
    new_content = re.sub(re.escape(slug) + r',\s*', '', new_content)
```

## 체크리스트

신규 agent-seed 카테고리 추가 후:
- [ ] `node scripts/lint-content.mjs` 실행
- [ ] `⚠ Orphan Links: 0건` 확인
- [ ] 양수 orphan → connections에서 `category/category/` 중복 grep

```bash
grep -r "connections:" content/<new-category>/ | grep -E "\w+/\1/"
```
