---
date: "2026-05-12"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "7639f2c7cd182b4a935f468e94f3800dca2a8b06"
---


subtype: cycle-retro
cycle_n: 305
chain_selected: fix-incident
chain_mode: heavy
outcome: SUCCESS
pr: 295
version: 0.5.45.1 → 0.5.45.2

retro.summary: cycle 302-304 /picks 기능 도입 후 발생한 ESLint CI 위반 2건 수정. localStorage sync-read useEffect(use-user-picks) + async fetch early-return 경로(MyPicksClient) 각각 react-hooks/set-state-in-effect 규칙 충돌. 리팩터링 2회 시도(initialized flag / queueMicrotask) 후 신규 위반 유발 확인 → eslint-disable-next-line 최소 침습 해결.
retro.key_finding: 이 규칙은 async op 없는 직접 setState를 금지하지만 localStorage 동기 읽기 패턴은 유효. 리팩터링 시도가 control flow를 분기해 컴파일러의 async path 감지를 방해했음.
next_recommended_chain: explore-idea or polish-ui
