# /search — JIT 의미 검색 (위키 + solutions)

`public/embeddings.json` (로컬 임베딩 인덱스) 에 대해 cosine 유사도로 Top-K 청크 반환. MDX 전체 읽기 회피 → context 절감.

## 사용

```
/search <질문>              # Top 5 검색, inject 모드 (컨텍스트 주입)
/search <질문> 3            # Top 3 로 제한
/search <질문> 3 --force    # 쿼리 라우터 skip 강제 (짧은 쿼리여도 실행)
```

## 동작

실제로는 Bash 로 `pnpm search "<query>" <topK> --inject` 실행.

### 쿼리 라우터 (자동 판단)

| 쿼리 패턴 | 동작 |
|-----------|------|
| `/search ...` 명시 트리거 | 검색 실행 |
| "error", "실패", "TypeError" 등 에러 키워드 | 검색 실행 (high confidence) |
| "mermaid", "prompt", "RAG" 등 기술 용어 | 검색 실행 |
| "안녕", 5자 이하 | skip |
| 20자+ 긴 쿼리 | 검색 실행 (low confidence) |

### 결과 형식 (inject 모드)

```markdown
<!-- JIT: N entries, M chunks, Xms -->

## <title> (/wiki/<slug> 또는 /solutions/<slug>)

### <h2_title>

<chunk_text>
```

이 형식은 바로 읽기 가능 + context 에 주입 용이.

## 인덱스 최신화

content/ 또는 docs/solutions/ 변경 후:

```bash
pnpm embed-content   # ~5~7초 on 20 entries. 첫 실행만 모델 다운로드 (~120MB)
```

CI 자동화: `.github/workflows/embed-on-push.yml` 이 main push 시 자동 실행. 하지만 인덱스는 artifact 로만 저장 (로컬 재생성이 1차 경로).

## 안티패턴

- ❌ `/search 안녕` — 라우터 skip. 일반 대화 X
- ❌ `/search xx` — 5자 이하 skip
- ❌ 검색 결과 확인 없이 답변 (검증 필요) — hit tracking 에 반영됨

## 히트 추적

`data/search-hits.json` 에 slug 별 누적. lint-content (향후) 가 hit=0 + 30일 경과 = stale 후보 플래그.

## 관련

- 스크립트: `scripts/search.mjs`, `scripts/embed-content.mjs`, `scripts/lib/query-router.mjs`
- 계약: `CLAUDE.md` "JIT 검색 먼저 계약" 섹션
