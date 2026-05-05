---
date: "2026-04-30"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "76552a658d783443e3413261ada314d74edebc70"
---


기존 워커 SessionStart hook 은 허브 git HEAD 변경 알림만. memory symlink 자동 sync 는 OK 지만 hub-update issue (정책/CLAUDE.md edit/commit 차원 변경) 는 develop-cycle Step 0 호출 의존 → 사용자가 오래 호출 안 하면 누적 stale.

해결: SessionStart hooks 배열에 hub-update issue list 알림 추가. 사용자가 워커 일반 세션 (debug, 코딩, etc) 진입 시에도 누적 issue 강제 visibility + AI 컨텍스트 자동 주입.

흐름:
  세션 진입
    ↓
  Hook 1: 허브 git HEAD 변경 알림 (현행)
  Hook 2: hub-update open issues list 표시 (NEW)
    📬 hub-update open issues (N건) — /develop-cycle Step 0 또는 manual 흡수
      #87 hub-update — 3 entries 흡수 대기 (4-30)
      ...
    ↓
  사용자 인지 + AI 컨텍스트 자동 주입
    ↓
  처리 결정: /develop-cycle 호출 OR manual 흡수 OR 다음 세션 미루기 (사용자 결정)

효과:
  - ✅ Visibility 강제: 워커 디렉토리 진입 = 무조건 인지 (develop-cycle 호출 의존 X)
  - ✅ AI stale 컨텍스트 차단: 일반 세션에서도 새 정책 인지 → 잘못된 결정 방지
  - ✅ 자연 trigger: 누적 N 건 표시 = 사용자 능동 처리 결정 자연 발생
  - ⚠️ 한계: AI 자율 처리 X (R6 차단 영역, 사용자 결정)
  - ⚠️ 한계: 사용자가 워커 디렉토리 자체 X 면 무관 (그 경우 sync 필요도 X)

검증: 다음 세션 진입 시 본 hook fire 자연 검증. hub-update issue 0건이면 출력 X (조용함).

적용 범위: 머니볼 즉시 + blog-autopilot Phase 5 진입 시 동일 hook template 적용.

Refs: kkyu92/playbook#88 (notify-workers.yml Push channel)

Co-authored-by: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
