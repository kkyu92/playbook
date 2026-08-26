---
date: "2026-08-26"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "da32026a92f8cab6569fe428aae053c971c7c3ea"
---


subtype: cycle-retro
cycle_n: 2629
chain_selected: review-code (heavy)
outcome: retro-only
next_recommended_chain: polish-ui 또는 info-architecture-review

packages/shared/src/index.ts(3448줄, 최대·최고령 파일) dead-code 축 전수 조사. Explore agent grep 감사가 7건 zero-reference + 22건 test-only 후보 제출했으나 직접 재검증 결과 전부 false positive — 7건은 함수 반환 타입 구조적 소비(TS structural typing, named import 불필요), 22건은 의도된 ISR HOURS->SECONDS 파생 상수 패턴(silent-drift-family wave 121/122/123/291 기존 박제). 실제 dead code 0건, 코드 변경 없음. color-token(cycle 2627)에 이어 dead-code 축도 이 파일 기준 소진 확인 — review-code(heavy) 재발화하려면 다른 대형 파일 재조준 필요.
