# /lint — 위키 일관성 및 품질 검사

## 사용법

```
/lint              # 결정론적 검사 + Claude 의미 판단
/lint --fix        # 자동 수정 (manifest 재생성, INDEX 동기화)
```

## 두 단계

### Step 1 — 결정론적 검사 (스크립트)

`pnpm lint:wiki` (= `node scripts/lint-content.mjs`) 가 다음 항목 검사:

| 항목 | 기준 | 출력 |
|---|---|---|
| Orphan Links | connections 의 target 이 실제 entry 아님 | `from → to` |
| Isolated Nodes | connections 가 빈 배열 | slug 목록 |
| Stale | confidence < 3 + 30일+ 경과 | `slug — confidence N, M일 전` |
| Long In-Progress | status: in-progress + 30일+ | `slug — N일 전` |
| Pattern Candidates | journal 시리즈 내 동일 태그 3회+ | `'태그' → Journal N건. Wiki 승격?` |

각 항목 0건이면 ✓, 1건+ 이면 ⚠ (또는 💡 for patterns).

**Exit code 항상 0** — 정보성 보고. 하드 검증 (빌드 실패 트리거) 은 `generate-content-manifest.mjs` 가 담당 (frontmatter / category / workers 이름 / dangling connections).

### Step 2 — Claude 의미 판단 (스크립트 후 추가)

스크립트 결과 받은 후 Claude 가 다음 항목 추가 분석:

1. **중복 감지**: 제목 / description / 본문 키워드 유사도 80%+ 인 entry 쌍 — 병합 후보 제안
2. **Pattern → Wiki 승격 결정**: Step 1 의 pattern candidate 가 진짜 wiki entry 가치 있는가? journal 4회 등장이 우연일 수도 있음 — 의미 검토 후 승격 권장 / 보류
3. **Isolated 노드 연결 제안**: 고립된 entry 의 본문 읽고 기존 entry 와 의미 매핑 후 connections 추가 제안
4. **Stale entry 처리 권장**: 보강 / 아카이브 / status 변경 중 어느 게 적절한가

이 4개는 deterministic 으로 안 풀림 — Claude 가 본문 읽고 판단.

## --fix 모드 (자동 수정)

자동 수정 가능한 것만:
- INDEX.md 와 실제 content 비교 후 동기화 → `node scripts/generate-content-manifest.mjs`
- frontmatter 기본값 채우기 (예: confidence 미지정 → 1) → manifest gen 이 처리

수동 수정만 가능 (Claude 판단 필요):
- Orphan target 이 미작성 entry 면 → 작성? 또는 connections 에서 제거?
- Isolated 의 connections 후보는? → Claude 가 본문 읽고 결정

## 운영 권장

- **매주 월** (weekly-triage 와 같은 주기): `/lint` 실행 → 리포트 검토
- **새 entry 작성 후**: 자동으로 `/ingest` 가 cross-update 까지 처리. `/lint` 별도 호출 불필요
- **wiki 30+ entries 도달 시**: pattern candidate 빈도 ↑ → 승격 의사결정 자주 발생

## 관련

- `scripts/lint-content.mjs` — Step 1 결정론적 검사
- `scripts/generate-content-manifest.mjs` — frontmatter / workers / orphan 하드 검증 + INDEX 자동 동기화
- `scripts/validate-content.mjs` — MDX JSX / Mermaid syntax 검증 (별 concern)
- `.claude/commands/ingest.md` — 새 entry 추가 시 자동 cross-update
- `CLAUDE.md` "운영 루프" — 매주 lint 권장
