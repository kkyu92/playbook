---
date: "2026-05-06"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "c1fe0c1cccc114559e36e2a9e5722a49860e3a55"
---


subtype: meta-pattern
pattern: 박제된 carry-over evidence 가 N+ cycle 후 검증 없이 stale 누적. 일부는 이미 처리됐는데 carry-over 박제만 잔존, 일부는 박제 자체가 잘못된 가정.
evidence:
  - cycle 81 R5 carry-over "shared @types/node devDep 누락" → 본 cycle 검증: shared/src 안 node:/fs/path/crypto 등 grep 0건. 즉 @types/node 추가 필요 X. 박제 자체가 잘못된 carry-over.
  - cycle 83 carry-over "postview LLM 모킹 통합 테스트 부재" → 본 cycle 검증: agents-postview.test.ts 이미 존재 (140 → 187 줄). 이미 처리됐는데 carry-over 박제만 잔존.
  - cycle 83 carry-over "ZERO_WEIGHT_FACTOR_LIST_PROMPT 빈 문자열 prompt 어색 측정" → 본 cycle 검증: DEFAULT_WEIGHTS 안 weight=0 factor 0건 → 함수 빈 문자열 반환 → 3 prompt 안 빈 괄호 () 출력 (cycle 17 주석 박제 vacuous prompt 만 있고 fix 부재). 본 cycle 126 fix.
recommendation:
  - cycle_state.retro.todos_added 박제 후 N cycle 경과 시 다음 cycle 진단 단계서 재검증 룰 추가 (carry-over evidence verify rule)
  - 룰 sketch: "TODOS_AGE_THRESHOLD = 7 cycle. 박제 후 7+ cycle 경과 시 다음 cycle 진단에서 자동 verify (file/grep) → stale 시 carry-over 제거 + meta-pattern 박제"
  - 본 룰이 cycle 49 룰 (0회 발화 chain trigger 우선) 의 보완. carry-over 가 진단 input 인 한 stale carry-over = 진단 noise.
related:
  - cycle 49 룰 PASS_eval / PASS_ship 분리 (cycle 124 skill-evolution 8 박제) — PASS_ship 가치 ↑
  - cycle 122 carry-over fatigue 누적 박제 (직전 batch 위반 시점)
  - cycle 17 주석 vacuous prompt 박제 후 cycle 126 까지 109 cycle 동안 fix 부재 = 주석만 박제 + fix dispatch 부재 패턴

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
