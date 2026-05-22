---
date: "2026-05-21"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
fingerprint: "fd64cc6059a6beb92c747afedc15553c5e8a1d86"
---


subtype: lesson
cycle_n: 835
chain: operational-analysis (lite, 14d gap + alternation lock break)
outcome: success

## 발견

TODOS.md '🎯 모델 v2.0 업그레이드 트래킹' 섹션 = cycle 387 (2026-05-14) 갱신 후 정지 → 448 cycle / 7일 미갱신 stale.
CLAUDE.md '예측 엔진 가중치' 섹션 = cycle 775 (2026-05-19) 갱신 권위.

### 권위 mismatch
- 검증 건수: TODOS 99 vs CLAUDE 124 (real n=94)
- 임계: TODOS 100건 vs CLAUDE 150건
- v1.8 라벨: TODOS 5건 (60%, quant-only fallback) vs CLAUDE 30건 (43.3%, credit-fail 22 + real-debate 8)
- 전체 적중률: TODOS 49.5% vs CLAUDE 47.6% / real 48.9%
- Brier: TODOS 0.2587 vs CLAUDE v1.8 0.2241

## 원인

TODOS.md 갱신 책임자 부재 — cycle-retro dispatch 자체는 commit history 박제 BUT TODOS.md '🎯 트래킹' 섹션 단일 metric 자동 sync 채널 X. CLAUDE.md 는 policy: retro commit + sweep N 통해 자연 갱신.

## 대응

1. 본 cycle = lesson 박제만 (lite scope)
2. 다음 cycle = review-code (heavy) sweep TODOS.md sync
3. n=150 도달 후 (예상 cycle 840~850) op-analysis (heavy) backtest harness 실행

## silent drift family 신규 layer 박제

기존 family (CLAUDE.md 사례 3/4/6/7/11 운영 코드 silent / 사례 8/9 인프라 silent / 사례 10 빌드 silent) 외 신규:
**Layer 12 = 운영 문서 silent stale drift** — cycle-retro 자동 sync 채널 부재 = 구조적 약점.

상세: docs/lessons/2026-05-21-cycle-835-todos-stale-vs-claudemd-drift.md

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
