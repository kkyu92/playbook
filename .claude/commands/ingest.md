# /ingest — 원천 자료 → 위키 엔트리 + Cross-Update 지식 그래프 확장

## 철학

이 커맨드는 **"엔트리 1개 생성"이 아니라 "지식 그래프 전체를 한 번에 업데이트"**하는 게 목적이다. Karpathy LLM Wiki 의 *compilation over retrieval* 원칙을 따라, 검색 시점이 아닌 **입력 시점에 지식을 미리 연결**한다.

`/ingest` 1회 실행 = 새 엔트리 1개 + 관련 기존 엔트리 **5~15개 cross-update** + 양방향 connections 보강. 이게 복리 계수의 원천이다. ai-study 자기 SWOT 에서 "cross-update ingestion 이 단일 엔트리 범위에 머물러 있음"을 최대 약점으로 명시했다. 우리 Playbook 은 이걸 정면 돌파한다.

## 사용법

```
/ingest                                                  # 자동 스캔 모드 (raw-sources/ 미처리 자동 감지)
/ingest <URL | 텍스트 | 에러 로그 | raw-sources/<파일> 경로>
```

## 자동 스캔 모드 (인자 생략 시)

`/ingest` 를 인자 없이 호출하면 **`raw-sources/` 미처리 raw 자동 감지** 후 처리한다. 워커 dispatch 빈도(주 5~10회)를 고려하면 인자 타이핑이 큰 마찰이라 도입.

### 스캔 절차

1. `raw-sources/*.md` 전체 나열
2. 각 파일에서 slug 추출 (파일명 `YYYYMMDD-<slug>.md` → `<slug>`)
3. `content/**/*.mdx` 에서 해당 slug 참조 grep
4. 참조 0건인 raw 만 **미처리 후보** 로 분류
5. 분기:
   - **0건**: "✅ 미처리 raw 0건. 모든 dispatch 가 cross-update 완료 상태" 알림 후 종료
   - **1건**: 사용자 확인 없이 즉시 Step 1-6 실행 (가장 흔한 케이스 — 머지 직후)
   - **N건 (≥2)**: 후보 리스트 제시 후 사용자 선택 대기:
     - `all` — 전부 순차 처리
     - `1` 또는 `1,3` — 번호 선택
     - `skip` — 종료

### 예시

```
$ /ingest
미처리 raw 3건 발견:
  1. 20260419-moneyballscore-playbook-e2e.md (E2E 테스트 연동)
  2. 20260420-cron-failure.md (daily-pipeline 실패)
  3. 20260421-pnpm-audit-fix.md (lesson: pnpm audit 마이그레이션)

선택: all / 1 / 1,3 / skip
```

### 트리거 패턴

자동 스캔 모드는 다음 상황에서 호출:
- 사용자가 PR 머지 직후 "머지" / "머지했어" / "pull 해" 같은 신호 → `git pull` + `/ingest` 자동 연결
- 세션 시작 시 hub-start 가 "미처리 N건" 알리면 → `/ingest` 로 일괄 처리
- Weekly Triage Issue 받고 일괄 소화

## 프로세스

### Step 1 — Raw Source 저장 (없으면)

- `raw-sources/YYYYMMDD-<slug>.md` 에 원본 저장
- frontmatter: `date`, `source`, `type`(url / error-log / note / conversation / worker-dispatch)
- `auto-ingest.yml` 이 이미 저장한 파일 대상이면 skip (raw 재생성 금지)

### Step 2 — 관련 엔트리 **5~15개** 발굴 (필수)

단일 엔트리 생성 전에 반드시 실행. 관련 엔트리 못 찾으면 검색 범위를 넓혀 재시도.

발굴 방법:
- `INDEX.md` 및 `src/generated/content-manifest.json` 읽어 전체 맥락 파악
- 새 주제의 **핵심 키워드 3~5개** 추출
- 각 키워드로 `grep -l -r` 으로 `content/**/*.mdx` 스캔
- 같은 카테고리 엔트리 전수 스캔
- tags 교집합 있는 엔트리 수집
- series 공유 엔트리 (예: 같은 harness-journal 시리즈)

목표: **평균 10개 엔트리 목록 확보**. 너무 적으면 추상화 수준 올려 재검색, 너무 많으면 top-N 선택.

### Step 3 — 경로 분기

**Step 3a — 새 주제 → 새 엔트리 생성**

`content/<category>/<slug>.mdx` 생성:
- frontmatter:
  - `connections`: Step 2 에서 발굴한 관련 엔트리 slug **5~15개** 배열
  - `workers`: 사용자에게 질문 → `[]` (배포 안 함) / `[all]` / `[moneyball]` 등 결정
  - `confidence: 2` (초기, 실전 검증 전)
  - `status: in-progress`
  - 기타 schema.ts zod 준수
- 본문: 문제 → 분석 → 해결 → 일반화 → Related 섹션 (Step 2 엔트리 링크)

**Step 3b — 기존 주제 → 기존 엔트리 보강**

해당 엔트리에:
- 새 정보 append (Journal 은 예외: append-only 원칙. 기존 섹션 수정 금지, 새 섹션만 추가 가능)
- `connections` 에 새로 발견된 관계 slug 추가
- `confidence` +1 (실전 누적 반영, 최대 5)

### Step 3c — **Cross-Update** (핵심 차별 포인트, 필수)

Step 2 에서 식별한 관련 엔트리 **전부**에 대해 반복:

1. 해당 엔트리 파일 Read
2. `connections` 배열에 **신규 slug 양방향 추가** (이미 있으면 skip)
3. 본문 끝에 `## Related` 섹션 있으면 신규 링크 append. 없으면 신규 섹션 추가 선택 가능 (문서 스타일 맞춰서)
4. 변경 저장

**여기서 1회 /ingest 실행 = 1개 + N개 파일 수정** 이 된다. N=5~15 가 정상.

Journal 엔트리 수정 시 예외 처리: 본문 수정 금지, `connections` frontmatter 갱신만 허용. 이건 append-only 정신과 모순되지 않음 (메타데이터만 업데이트).

### Step 4 — INDEX.md 업데이트

- 새 엔트리 인덱스 추가
- 수정된 관련 엔트리 요약 갱신 (필요 시)

### Step 5 — manifest 재생성

```bash
node scripts/generate-content-manifest.mjs
```

### Step 6 — 커밋 (1 커밋에 전부)

모든 변경 (신규 엔트리 + cross-updated N개 + INDEX.md + manifest) 을 **단일 커밋**에 포함:

```
content: ingest <slug> + <N> cross-updates

- 신규: content/<cat>/<slug>.mdx
- 보강: <list of updated entries>
- workers: <workers value>
```

N 이 명시되어야 cross-update 검증 가능.

## 입력 타입별 처리

- **URL**: WebFetch → 요약 + 핵심 추출 → 엔트리
- **에러 로그**: 에러 분석 → Journal 엔트리 (series: playbook-journal)
- **raw-sources/ 경로**: 이미 저장된 raw 를 읽어 Step 2 부터 시작
- **텍스트/노트**: 주제 분류 → 적절한 카테고리 엔트리
- **대화 내용**: 핵심 결정/교훈 추출 → Journal 또는 Wiki

## 규칙

1. `raw-sources/` 는 **불변**. 한번 저장하면 수정 금지
2. 엔트리 생성 시 `connections` **최소 1개, 권장 5~15개**
3. Journal 은 **append-only**. Step 3b 에서 기존 내용 수정 금지, 새 섹션만 추가 가능. Step 3c 에서 connections frontmatter 갱신은 허용
4. 모든 생성/수정 후 INDEX.md + manifest 재생성 필수
5. **Cross-update 는 선택이 아닌 필수**. Step 2 에서 관련 엔트리 못 찾으면 검색 범위 확장 후 재시도. 0개로 진행 금지

## KPI

매 /ingest 실행 시 "cross-updated 엔트리 수" 측정. 평균 **5 이상** 유지 목표. 1~2 개밖에 안 되면:
- 관련성 발굴 부족 (Step 2 강화 필요)
- 또는 wiki 자체가 고립 노드 많음 (별도 `/lint` 로 건강도 점검)

## 관련

- `src/lib/schema.ts` — frontmatter zod schema (workers 필드 포함)
- `scripts/generate-content-manifest.mjs` — 매니페스트 생성
- `.github/workflows/auto-ingest.yml` — 워커 dispatch 로 raw 자동 저장 (수동 `/ingest` 의 사전 단계)
- `/lint` — 위키 건강도 + 고립 노드 감지
- `/compound` — 복리 축적 기록
- `content/` frontmatter `workers:` 필드 → `hub-sync-rules` 가 매칭 워커 memory 에 symlink 자동 배포
