---
date: "2026-07-16"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "9db6d62e4c820b1fae1df16f3165d4e9dd52549b"
---


subtype: cycle-retro
cycle_n: 1715
chain_selected: review-code (heavy)
outcome: success
next_recommended_chain: explore-idea (heavy)

diagnosis:
  - Feature-Drift Cycle 정상: cycle 1714 explore-idea(wave-373) → review-code(heavy) 자연 선택
  - 직전 8 사이클 distinct=3 — no 2-chain lock
  - wave-373 analysis/page.tsx 코드 clean (RECENT_FORM_DUEL_MIN 상수 사용)
  - debate.ts:77 confidence: 0.3 인라인 발견 (silent drift wave-374)
  - shared/index.ts 주석 stale (judge-agent.ts 이미 상수 사용 중이나 hardcoded callsite로 기재)

execution:
  - debate.ts: LLM_FALLBACK_CONFIDENCE import 추가 + confidence: 0.3 → LLM_FALLBACK_CONFIDENCE
  - shared/index.ts: 주석 정정 (hardcoded 0.3 callsite 전체 소거 반영)
  - 264 test files / 2293 tests PASS + pnpm build PASS

retro:
  - hardcoded 0.3 callsite: judge-agent.ts(이미 wave-372 Fix) + debate.ts(본 사이클 Fix) → 전체 소거
  - Feature-Drift Cycle: wave-373 신규 → wave-374 fix → wave-375 explore-idea 예정
  - 직전 10 사이클: 9 success + 1 retro-only (no emergency stop)
  - skill-evolution trigger: 없음 (chain-evolution 4건, 1715%50=15, review-code 8/20)
