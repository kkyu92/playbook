---
date: "2026-07-16"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "32595b8acacc06303bee5493f28f569a95fc999d"
---


subtype: cycle-retro
cycle_n: 1718
chain_selected: review-code (heavy)
outcome: success
pr: 2704

retro.summary: >
  Feature-Drift Cycle wave-375(탐색) → wave-376(정제).
  8개 파일 13개 inline 상수 → 단일 source.
  신규 4 상수: ACCURACY_STRONG_RATE(0.7) / ACCURACY_WEAK_RATE(0.4) /
  FACTOR_CORR_POSITIVE_MIN(0.2) / FACTOR_CORR_NEGATIVE_MAX(-0.1).
  기존 교체: NEUTRAL_FACTOR × 7 / PICKS_TREND_THRESHOLD × 1 / ACCURACY_WARN_RATE × 1.
  265 tests PASS, type-check PASS.

next_recommended_chain: explore-idea (heavy)
next_recommended_reason: >
  Feature-Drift Cycle — review-code 직후 explore-idea.
  배지 시리즈 10팩터 커버 완성 이후 새 기능 방향 탐색 자연 타이밍.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
