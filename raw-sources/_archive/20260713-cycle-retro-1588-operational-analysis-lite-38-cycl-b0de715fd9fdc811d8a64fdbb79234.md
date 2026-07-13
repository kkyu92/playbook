---
date: "2026-07-13"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "b0de715fd9fdc811d8a64fdbb79234084abcf66b"
---


subtype: cycle-retro
cycle: 1588
chain: operational-analysis (lite)
outcome: success

## trigger
- op-analysis last fire cycle 1550 → cycle 1588 = 38 cycle > 25 (trigger 7)
- 직전 20 사이클 op-analysis 0회 발화 (0회 chain 우선 검토 룰, cycle 49)
- cohort md 마지막 박제 cycle 1447 = 141 cycle stale

## 측정 결과
- 총 n=365 / acc 56.2%
- v1.8: n=187 / acc 59.9% / Brier 0.3095 (cycle 1549 → 1588 = 40 cycle flatline)
- v1.8-credit-fail: n=25 / acc 60.0% / Brier 0.2304
- v2.1-B-shadow: n=52 / acc 51.9% / Brier 0.4635 (reject 유지)
- v2.0-shadow: n=5 / Brier 0.5616 (표본 소진)

## 결정 재확인
- v1.8 유지 확정 (cycle 1460 정합)
- Platt scaling 불필요
- v2.1-B rejected

## 다음 recommended
- review-code (heavy) — silent drift family sweep wave 277+ 자연 후속

## PR
- #2653 (data(op-analysis): cohort cycle 1588) auto-merge 완료

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
