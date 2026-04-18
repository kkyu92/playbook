# Hub 운영 스크립트

허브(playbook) ↔ 워커 프로젝트 간 **양방향 복리 성장** 자동화 스크립트.

스크립트 실체는 `~/bin/` 에 있어 git 추적 대상이 아니다 — 이 문서는 사용법·설계 의도를 레포에 박제해 재구축 가능성을 확보한다.

## 양방향 모델

```
[Push 축]  shared-rules/common/*.md  ─symlink─▶  각 워커 memory/
[Pull 축]  2개+ 워커의 공통 feedback  ─승격──▶  shared-rules/common/
```

두 축 모두 자동화되어야 Karpathy LLM Wiki 의 복리 성장 모델이 완성된다.

## 스크립트 3종

### `hub-sync-rules` — Push

**역할**: `shared-rules/common/*.md` 을 모든 워커 `memory/` 에 심볼릭 링크로 배포. `shared-rules/{worker}/*.md` 는 해당 워커에만.

**호출 시점**:
- `hub-start` 실행 시 자동 (세션 시작마다 동기화)
- `shared-rules/` 내용 변경 후 수동 (`/sync-rules` 슬래시 커맨드 또는 직접)

**동작**:
- 이미 올바른 symlink → skip
- 같은 이름의 실제 파일 → `.bak` 백업 후 symlink 로 대체
- 원본 사라진 dangling symlink → 정리

### `hub-scan-promotions` — Pull 탐지

**역할**: 2개+ 워커 `memory/` 에 같은 파일명으로 실제 파일(심볼릭 링크 아님)이 존재하면 `common/` 승격 후보로 기록.

**호출 시점**:
- `hub-start` 실행 시 자동 (sync-rules 직후)
- 수동 실행 가능

**출력**:
- `/tmp/hub-promote-candidates.txt` — 사람 읽기용 후보 목록
- stdout — 후보 개수 (`hub-start` 가 1개+ 일 때만 한 줄 요약 출력)

**제외 규칙**: `MEMORY.md`, `*.bak`, 숨김파일, `common/` 에 이미 존재하는 이름.

### `hub-promote` — Pull 승격 실행

**역할**: 후보 파일을 `common/` 으로 승격하고 `hub-sync-rules` 를 자동 호출해 모든 워커에 symlink 전환.

**사용법**:
```bash
hub-promote <파일명>           # 안전 모드 — 워커 간 내용 다르면 abort
hub-promote <파일명> --force   # 첫 워커 기준 강제 승격
```

**동작**:
1. `common/` 에 동명 파일 있으면 중단
2. 2개 미만 워커에만 있으면 중단
3. 워커 간 diff → 동일하면 복사, 다르면 diff 표시 후 abort (또는 `--force`)
4. 성공 시 `hub-sync-rules` 자동 호출 → 원본 `.bak` 백업 + symlink 전환

## 운영 루프

```
매 세션 시작 (hub-start)
  ├─ hub-sync-rules   (Push — 허브 최신 → 모든 워커)
  └─ hub-scan-promotions   (Pull 탐지 — 승격 후보 1개+ 이면 알림)

주기적 (승격 후보 있을 때)
  └─ hub-promote <파일명>   (Pull 실행 — common/ 승격)

공통 규칙 수정 시
  ├─ shared-rules/common/*.md 직접 편집
  └─ /sync-rules   (수동 전파)
```

## 관련 자원

- `shared-rules/common/` — 모든 워커 공통 규칙 원본 (이 레포 내부)
- `shared-rules/{name}/` — 프로젝트 전용 규칙
- `~/.config/claude-hub/projects.conf` — 워커 목록 (`name:path` 형식)
- `.claude/commands/sync-rules.md` — `/sync-rules` 슬래시 커맨드 명세

## 문제 해결

| 증상 | 확인 |
|---|---|
| 규칙이 워커에 반영 안 됨 | `/tmp/hub-sync-rules.log` — 권한/경로 실패 |
| scan 결과가 예상과 다름 | `/tmp/hub-promote-candidates.txt` 직접 확인. 기준 = 2개+ 워커에 실제 파일 존재 + `common/` 에 미존재 |
| promote 시 내용 불일치 | 수동으로 `common/` 에 통합 버전 작성 후 `hub-sync-rules`, 또는 `--force` |
| 동시 세션 race 걱정 | `shared-rules/common/feedback_concurrent_session_safety.md` 참고 |
