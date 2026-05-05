---
date: "2026-04-29"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
fingerprint: "b406eb90ca157fe081c3a85b72bc1a040c4a00f8"
---


## 현상
Phase 5a self-develop 첫 ship 직후 6 cycles 디버그 발생. 각 cycle 의 fix 를
main 직접 push 로 인위 chain. carry-over 메커니즘 부재 증거.

## 원인
1 fire = 1 try 만 가정한 첫 ship spec. 큰 task 자율 분해 + 다음 fire 인계
누락. 결과 = 사용자 (또는 같은 세션) 가 main 직접 push 로 인위 chain.

## 해결 (Phase 5 비전 1 보완, 같은 PR)
1) namespace 분리 — agent-loop label + agent-loop/ branch prefix
2) carry-over chain — 1 cycle = 10 fire, GH Issue 기반 인계
3) 10/10 도달 시 횡단 lesson 박제 → cycle 종료

## 예방
- 새 자율 agent ship 시 단일 fire 가정 X. carry-over 함께 설계.
- namespace 분리 = 자동 결과와 사용자 작업 추적 가능 토대.
- cycle cap (10 fire) 명시 → 무한 chain 방지 + 메타 회고 기점.

Fingerprint: agent-loop-cycle-zero

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
