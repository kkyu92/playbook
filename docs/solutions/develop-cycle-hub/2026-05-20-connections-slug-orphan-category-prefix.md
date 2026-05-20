# MDX connections 필드 slug 형식 오류 — category prefix 누락

**카테고리**: develop-cycle-hub  
**날짜**: 2026-05-20  
**재발 가능성**: 높음 (entry 작성 시 자연스럽게 발생)

## 문제

MDX 엔트리 frontmatter `connections` 필드에 같은 카테고리 slug를 **단순 slug** (category prefix 없이) 사용 시 `lint-content.mjs`가 "Orphan Links"로 보고.

## 증상

```
⚠ Orphan Links:        2건
=== Orphans (참조하지만 엔트리 없음) ===
  harness-engineering/entry-A → target-slug-without-prefix
  harness-engineering/entry-A → another-slug-without-prefix
```

파일 자체는 존재 (`content/harness-engineering/target-slug-without-prefix.mdx`) — lint만 오탐.

## 해결

**Before:**
```yaml
connections:
  - worker-lesson-velocity-signal
  - zero-touch-develop-cycle-session-management
```

**After:**
```yaml
connections:
  - harness-engineering/worker-lesson-velocity-signal
  - harness-engineering/zero-touch-develop-cycle-session-management
```

## 근본 원인

`lint-content.mjs`의 `checkOrphans()` 함수가 entry slug를 `path.relative(CONTENT_DIR, filePath).replace(/\.mdx$/, "")` 로 구성 — 결과는 `harness-engineering/slug` 형식 (full path slug). 

connections 필드에 `slug` 만 적으면 `slugs.has("slug")` 실패 → orphan 판정. 같은 카테고리라도 **전체 경로** 필요.

## 체크리스트

- [ ] connections 항목 작성 시 `category/slug` 전체 경로 형식 사용
- [ ] 다른 entry에서 어떻게 참조하는지 grep 확인: `grep "target-slug" content/**/*.mdx`
- [ ] `node scripts/lint-content.mjs` 실행 후 orphan 0건 확인

## 사례

- cycle 931: entry #247 `agentic-parallel-ecosystem-integration-lag-commit-density-asymmetry` — connections에 `worker-lesson-velocity-signal`, `zero-touch-develop-cycle-session-management` 단순 slug 사용 → cycle 933 curate lint 2건 orphan 감지 → prefix 추가로 해소.
