# /lint — 위키 일관성 및 품질 검사

## 사용법
/lint

## 검사 항목

### 1. Orphan Links
- connections 배열에 참조된 slug가 실제로 존재하는지
- 없으면: "⚠ ORPHAN: {slug} 참조하지만 엔트리 없음. 생성 필요?"

### 2. 고립 노드
- connections이 빈 배열([])인 엔트리
- "⚠ ISOLATED: {slug}에 연결이 없음. 관련 엔트리 제안?"

### 3. Stale 엔트리
- confidence < 3이고 30일 이상 된 엔트리
- "⚠ STALE: {slug} confidence {n}, {days}일 전. 보강 또는 아카이브?"

### 4. Frontmatter 검증
- schema.ts의 필수 필드 누락
- category가 CATEGORIES enum에 없음
- confidence 범위 (1-5) 벗어남
- date 형식 불일치

### 5. 중복 감지
- 제목이 80% 이상 유사한 엔트리 쌍
- "⚠ DUPLICATE?: {slug1} ↔ {slug2} 유사도 높음. 병합?"

### 6. INDEX.md 동기화
- INDEX.md와 실제 content/ 파일 비교
- 누락된 엔트리, 삭제된 엔트리

### 7. 패턴 반복 감지
- 같은 태그가 Journal에 3회 이상 등장
- "💡 PATTERN: '{tag}' 태그가 Journal {n}건에 등장. Wiki 엔트리로 승격?"

## 출력 형식
```
LINT REPORT — {date}
═══════════════════
✓ Frontmatter: 전체 통과
⚠ Orphan Links: 2건
⚠ Isolated Nodes: 1건
⚠ Stale: 0건
⚠ Duplicates: 0건
✓ INDEX.md: 동기화 완료
💡 Patterns: 1건 (승격 후보)

상세:
  [ORPHAN] journal-001 → "project-ops/vercel-deploy" (미존재)
  [ISOLATED] project-ops/supabase-pool (connections 없음)
  [PATTERN] 'supabase' 태그 → Journal 003, 005, 006. Wiki 승격?
```

## 자동 수정 옵션
- /lint --fix: 자동 수정 가능한 것만 수정 (INDEX.md 동기화, frontmatter 기본값)
- /lint --report: 리포트만 출력 (수정 안 함)
