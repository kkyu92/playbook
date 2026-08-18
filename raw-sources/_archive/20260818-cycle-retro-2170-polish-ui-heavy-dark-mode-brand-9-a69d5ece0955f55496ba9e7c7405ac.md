---
date: "2026-08-18"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "a69d5ece0955f55496ba9e7c7405ac66a5ea7f3e"
---


subtype: cycle-retro
cycle_n: 2170
chain_selected: polish-ui (heavy)
outcome: success
summary: cycle 2169 retro free judgment(review-code 또는 polish-ui) 로 polish-ui 선택 — review-code heavy 3연속 partial diminishing return 회피 + 신규 MlbRivalryMemorySurface 디자인 미검토 상태 해소 목적. 실측 결과 rivalry-memory 자체는 agent_memories MLB row 0건이라 렌더 검증 불가(문서화된 한계)였으나, 다크모드 스크린샷 비교 중 인접 HistoricalAnalogMatchup 카드가 흰 배경으로 남는 실제 회귀 발견. 원인 = dark:bg-brand-950 (globals.css 에 정의된 적 없는 토큰, brand 스케일은 50~900 까지만 존재) — 11 파일 23곳 확산. DESIGN.md 실제 토큰(--color-surface-card)으로 일괄 치환. type-check/lint clean, 3879 tests 전체 통과, 다크모드 전/후 실측 스크린샷 확인. PR #2960 squash 머지(eb675e1b). review-code(heavy) grep 기반 감사로는 못 잡는 버그 클래스(문법상 유효한 미정의 CSS 토큰) — 실측 스크린샷 채널의 고유 가치 재확인.
next_recommended_chain: review-code 또는 explore-idea (free judgment)
next_recommended_reason: 강한 trigger 없음. review-code 로 이번에 발견한 미정의 토큰 패턴(brand 스케일 900 초과 grep 전수 재검사) 이어가거나, explore-idea 로 Feature-Drift Cycle 신규 기능 계속 가능.
