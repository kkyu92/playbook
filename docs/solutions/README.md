# docs/solutions/ — 재발 패턴 기록소

같은 버그/증상이 **2번 이상 발생** 했을 때 기록하는 곳. Journal (append-only 사건 기록) 과 Wiki entry (정제된 방법론) 사이의 **중간 layer**.

원본: [Mino777/ai-study](https://github.com/Mino777/ai-study) `docs/solutions/` 패턴. 우리 playbook 이 2026-04-20 세션에 이식 (Phase 2 of ai-study gap roadmap).

## 목적

- **N회 재발 시 자동 승격 트리거**: `scripts/scan-promotions.mjs` (Phase 3 — 예정) 가 카테고리별 solution 수 N≥3 이면 승격 후보 Issue 생성. 패턴 → hook/command/lib 로 올라감.
- **사실 고립 방지**: Journal 은 "당시 일어난 일" 을 박제. Solution 은 "같은 일이 또 일어났을 때 재빠르게 대처" 을 박제. 둘의 역할 구분.
- **LLM + 사람 양쪽 참조**: Claude Code 가 버그 수사 시 `docs/solutions/<category>/` 먼저 스캔 후 대응 — retrieval-less guidance.

## 파일 구조

```
docs/solutions/
├── README.md                                     (이 파일 — 스키마)
├── <category>/
│   ├── _compiled-truth.md                        (카테고리별 종합 — 재발 N, 메타 패턴, 승격 상태)
│   ├── YYYY-MM-DD-<slug>.md                      (개별 solution)
│   └── YYYY-MM-DD-<slug>.md
└── <another-category>/
    └── ...
```

### 카테고리 네이밍

같은 **근본 sub-system** 또는 **실패 모드** 기준. 예:
- `mdx/` — MDX 컴파일 / JSX 파싱 / Mermaid 렌더 관련
- `llm-generation/` — Gemini/Claude 출력 검증 / 재생성 / 모델 폴백
- `ci-github-actions/` — workflow race condition / trigger 변형 / secret 누락
- `data-pipeline/` — ingest / dispatch / dedup / schema drift

카테고리 3 solution 누적 시 승격 후보 감지 임계. 임계 넘으면 `.claude/commands/` 또는 `scripts/lib/` 로 올라감.

## Solution entry schema

```markdown
# [category] title

**날짜**: YYYY-MM-DD
**발생 파일**: `path/to/file` 또는 워크플로/시스템
**관련 PR/커밋**: #N, SHA, 워커플로 run ID
**재발 여부**: 단발 / Nth 재발 / 동 카테고리 합계 N건

## 문제

(에러 증상 + 실제 출력/로그)

## 원인

(근본 원인 — N가지면 N가지 분리)

## 해결

(Before / After 코드 또는 설정 diff)

## 사전 탐지 방법

(grep / lint / script / test — 재발 전에 잡는 법)

## 체크리스트

(재발 방지 항목 — PR 리뷰 시 확인할 것)

## 관련

- 메모리: `feedback_...md` / `project_...md`
- Wiki entry: `content/<cat>/<slug>`
- 다른 solution: `docs/solutions/<other>/...`
- 원본 커밋/PR/Issue
```

## `_compiled-truth.md` schema

```markdown
# [<category>] Compiled Truth

## 종합 (N건, 최종 갱신 YYYY-MM-DD)

- **재발 횟수**: <분석>
- **현재 최선 해결책**: `path/to/lib` 또는 `prompt constraint` 등
- **코드 게이트 승격**: 완료 / 진행 중 / 미착수
- **마지막 발생**: YYYY-MM-DD

### 주요 교훈 요약

| # | 문제 | 핵심 해결 | 반복? |
|---|------|-----------|-------|
| 1 | ... | ... | 단발 / Nth |

### 메타 패턴

- (카테고리 안에서 반복 관찰되는 더 상위 패턴)

## 개별 솔루션 목록

1. [slug-1](YYYY-MM-DD-slug-1.md)
2. [slug-2](YYYY-MM-DD-slug-2.md)
```

## 원칙

1. **2회+ 재발 시 기록 의무** — 단발 버그는 journal/ 으로 충분. 솔루션은 "곧 또 일어날 것" 의 방어막.
2. **카테고리 임의 신설 금지** — 명확한 sub-system 경계가 있을 때만. 아니면 기존 카테고리에 편입.
3. **`_compiled-truth.md` 는 최소 3건 부터** — 2건 까진 개별 entry 만. 3건 시 compiled-truth 작성 + 승격 검토.
4. **Wiki entry 와 중복 금지** — Solution 은 "재발 시 응급 처치", Wiki 는 "일반화된 방법론". 내용 겹치면 하나로 합쳐 cross-link.
5. **승격 후 archive 금지** — command/lib 로 올라가도 원본 solution 은 남겨둠 (pattern 추적 용).

## 관련

- Phase 3: `scripts/scan-promotions.mjs` 이식 — solution 수 스캔 + 승격 후보 Issue 자동화
- 원본: ai-study `docs/solutions/` (6 카테고리, 20+ solution, 여러 승격 완료 — /validate-mdx 등)
- Wiki: `content/harness-engineering/guard-test-pattern.mdx` (패턴 축적의 메타 원리)
- Plan: `~/.gstack/projects/kkyu92-playbook/plans/2026-04-20-ai-study-gap-roadmap.md`
