---
name: concurrent-session-safety
description: 허브(playbook)에서 워커 memory/ 디렉토리를 수정하기 전, 활성 Claude 세션이 해당 워커에 붙어있지 않은지 확인. 활성 중이면 race 위험 있으니 사용자에게 먼저 묻기
type: feedback
---
허브 세션에서 워커의 `~/.claude/projects/-Users-.../memory/` 를 건드리는 작업(심볼릭 링크 설치, `.bak` 정리, MEMORY.md 수정 등) 직전, 해당 워커에 **다른 Claude 세션이 활성 중인지 확인**한다. 활성 중이면 사용자에게 먼저 확인하고 진행.

**Why:** 2026-04-17 세션에서 머니볼 터미널 활성 중 허브에서 `hub-sync-rules` 실행 → 머니볼 memory 에 실시간으로 심볼릭 링크 6개 설치됨. 우연히 충돌 없이 통과했지만, 머니볼 세션이 같은 파일을 읽는 중이었다면 Claude Code linter 의 `originSessionId` 메타데이터 자동 주입과 겹쳐 내용 꼬일 위험 있었음.

**How to apply:**

**Trigger (이것만 적용)**:
- `hub-sync-rules` / `/sync-rules` 실행 (심볼릭 링크 재설치)
- 워커 memory 에 직접 파일 쓰기·삭제·수정
- 여러 워커 memory 동시 수정 (예: `.bak` 일괄 정리)

**체크 순서**:
1. 대상 워커 memory 디렉토리 mtime 확인: `stat -f "%Sm" ~/.claude/projects/-Users-.../memory/`
2. 최근 **5분 이내** 변동 있으면 활성 세션 의심 → 사용자에게 "{워커명} 세션 열려있어?" 확인
3. 명시적 "닫혀있다" 답변 받기 전까지는 **수정 보류**. 읽기는 허용
4. 사용자가 "열려있다" 답하면: 해당 세션에서 먼저 `/handoff save` 또는 `/checkpoint save` 유도 후 진행

**예외 (확인 생략 가능)**:
- 읽기 전용 작업 (`ls`, `cat`, diff)
- 허브 자체 memory (`-Users-kyusikkim-projects-playbook/memory/`) — 이 세션이 곧 허브 세션이라 자기 자신
- 사용자가 세션 시작 시 미리 "다른 세션 전부 닫았다" 선언한 경우

**Lock 메커니즘 (선택)**:
현재는 수동 확인. 반복되면 `.active` mtime 마커 + `hub-sync-rules` 자동 skip/경고 로직 도입 검토 (체크포인트 `20260417-112734` Remaining Work #6 참조).
