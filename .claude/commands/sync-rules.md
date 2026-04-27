# /sync-rules — 허브 shared-rules/ 를 모든 워커 memory 에 동기화

playbook 의 `shared-rules/` 에 담긴 feedback·규칙 파일들을 모든 워커 프로젝트의 Claude memory 디렉토리에 **심볼릭 링크**로 연결. 원본 한 번 수정 → 모든 워커에 즉시 반영되는 양방향 복리 성장 모델의 **Push 방향** 인프라.

## 언제 호출

- `shared-rules/common/` 에 새 feedback 추가한 직후
- `shared-rules/{project}/` 에 프로젝트 전용 규칙 추가한 직후
- 원본 파일 삭제 후 dangling link 정리 필요할 때
- `projects.conf` 에 새 워커 추가한 직후 (hub-start 가 자동 호출하지만 세션 중 추가 시 수동 실행)

## 동작

```bash
bash ~/bin/hub-sync-rules
```

내부적으로:
1. `~/.config/claude-hub/projects.conf` 에서 워커 목록 파싱
2. 각 워커의 Claude memory 디렉토리 (`~/.claude/projects/-Users-.../memory/`) 에:
   - `shared-rules/common/*.md` → 모든 워커에 링크
   - `shared-rules/{name}/*.md` → 해당 워커에만 링크
3. Dangling symlink 정리 (원본 사라진 것)
4. 같은 이름의 실제 파일 있으면 `.bak` 백업 후 링크로 대체

## 디렉토리 규칙

```
playbook/shared-rules/
├── common/             # 모든 워커 공통 — Vercel 제한, 세션 전환 기준 등
├── playbook/           # playbook 전용 — MDX 파이프라인, 비공개 인증 등
├── moneyball/          # moneyball 전용 — 스크래핑 제약, scoring 로직 등
└── blog-autopilot/     # blog-autopilot 전용 — (워커 작업 진행 시 채워짐)
```

디렉토리 이름은 `projects.conf` 의 `name:` 필드와 정확히 일치해야 함.

## MEMORY.md 는 수동 관리

각 워커의 `memory/MEMORY.md` 인덱스는 이 스크립트가 건드리지 않음. 프로젝트별로 어떤 규칙을 노출할지 다를 수 있어서. 링크 후 필요 시 각 워커의 `MEMORY.md` 에 새 엔트리를 수동 추가.

## Pull 방향과의 관계

`/sync-rules` 는 **Push** (허브 → 워커). 반대 방향 (**Pull**: 워커 → 허브) 은:
- 자동: 내가 대화 중 반복 패턴 감지 → 승격 제안
- 수동: `/curate-inbound` — 워커 inbound 분류 + 하네스 박제

양방향을 함께 돌려야 **카파시 위키론의 복리 성장** 이 완성됨.
