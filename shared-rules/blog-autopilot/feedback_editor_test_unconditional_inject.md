---
name: editor-test-unconditional-inject
description: 신규 HTML 주입 기능 추가 시 editor.test.ts assertion 실패 — 6회 재발 패턴. 새 inject 추가 전 테스트 수정 의무.
metadata:
  type: feedback
---

신규 HTML 요소(author box, health-signal, apt-signal 등)를 `editor.ts`에 무조건부(unconditional) 주입하면 `editor.test.ts`의 `toBeUndefined()` 케이스들이 실패한다.

**Why:** 6회 재발 evidence (issues #1045, #1046, #1049, #1053, #1056, #1153). 매번 동일 메커니즘: 신규 inject 추가 → 기존 "modified_html === undefined" 기대 케이스 → assertion fail.

**How to apply:** `editor.ts`에 HTML 주입 코드 추가 시 반드시:
1. `editor.test.ts`에서 "author box 없음" / "undefined" 기대 케이스 검색
2. 새 inject가 해당 케이스에 영향 주는지 확인
3. 조건부 주입(conditional inject) 또는 테스트 mock 추가 후 커밋

**절대 하지 말 것:** 테스트 미수정 상태로 신규 inject 커밋 → CI 실패 → hub dispatch → 허브 부담.
