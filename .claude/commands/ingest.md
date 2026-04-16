# /ingest — 원천 자료 → 위키 엔트리 자동 변환

## 사용법
/ingest <URL 또는 텍스트 또는 에러 로그>

## 프로세스

### Step 1: Raw Source 저장
- raw-sources/ 디렉터리에 원본 저장
- 파일명: YYYY-MM-DD-slugified-title.md
- 메타데이터: 날짜, 출처, 타입(url/error-log/note/conversation)

### Step 2: 기존 위키와 대조
- INDEX.md 읽어서 관련 엔트리 찾기
- 이미 다룬 주제면 기존 엔트리 보강 제안
- 새 주제면 새 엔트리 생성

### Step 3: 엔트리 생성/보강
- 새 엔트리: content/{category}/{slug}.mdx 생성
  - frontmatter 자동 채움 (schema.ts 참조)
  - connections 자동 추론 (INDEX.md 기반)
  - confidence: 2 (초기값, 실전 검증 전)
- 기존 엔트리 보강: 새 정보 추가, connections 업데이트

### Step 4: INDEX.md 업데이트
- 새 엔트리 추가
- 교차 참조 업데이트

### Step 5: manifest 재생성
- node scripts/generate-content-manifest.mjs 실행

## 입력 타입별 처리
- **URL**: WebFetch로 내용 가져오기 → 요약 + 핵심 추출 → 엔트리
- **에러 로그**: 에러 분석 → Journal 엔트리 (series: playbook-journal)
- **텍스트/노트**: 주제 분류 → 적절한 카테고리에 엔트리
- **대화 내용**: 핵심 결정/교훈 추출 → Journal 또는 Wiki

## 규칙
- raw-sources/는 불변. 한번 저장하면 수정하지 않음.
- 엔트리 생성 시 반드시 connections을 1개 이상 추가 (고립 노드 방지)
- Journal은 append-only. 기존 Journal을 수정하지 않음.
- 모든 생성/수정 후 INDEX.md 업데이트 필수.
