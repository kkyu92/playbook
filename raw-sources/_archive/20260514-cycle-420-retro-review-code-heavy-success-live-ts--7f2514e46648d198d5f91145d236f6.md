---
date: "2026-05-14"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "7f2514e46648d198d5f91145d236f6a8a784395e"
---


subtype: cycle-retro
cycle_n: 420
chain_selected: review-code (heavy)
outcome: success
pr: #443 (63c7d71 squash merged)

summary:
  review-code (heavy) 첫 발화 (직전 20 안 0회 발화 chain). 메인 직접
  packages/kbo-data/agents/ + pipeline/ read + grep "v1\\.7" stale literal
  검출. live.ts:177 'v1.7-revert-live' = cycle 335 (2026-05-12) pre_game
  path v1.7-revert → v1.8 전환할 때 live path 누락 → cycle 335~419 약 85
  cycle 동안 in_game live row 모두 stale 라벨 박제 → /accuracy mv 별 Brier
  분석 stale 분류 silent drift.

  silent drift family pattern (cycle 60 predictor.ts 주석 / cycle 131 prefix
  factor key / cycle 384 postview mv 동일): live.test.ts 가 formula 만 cover
  하고 upsert literal 안 cover 해서 CI green 유지. dominance-positive streak
  (cycle 135 박제) 인정.

fix:
  - live.ts:177 'v1.7-revert-live' → 'v1.8-live' + cycle 335/420 주석
  - model-version.ts ModelVersion union 'v1.8-live' + 'v1.7-revert-live'
    (DB legacy 호환) 추가

tests:
  - pnpm --filter=@moneyball/kbo-data test → 600 PASS
  - pnpm type-check → 3/3 PASS
  - kbo-data live.test.ts 가 upsert literal 미커버 = 이번 fix 후속 회귀 X 보장

next_recommended_chain: explore-idea (lite) 또는 polish-ui
next_recommended_reason:
  직전 20 안 explore-idea 1회 + polish-ui 0회 — trigger 5 skill-evolution
  자동 발화 가능성. 사이클 421 진단 시 skill-evolution-pending marker
  check 우선.

skill-evolution trigger eval:
  - trigger 1 (chain-evolution 5건): N/A
  - trigger 2 (같은 chain 5 연속 fail): N/A (success)
  - trigger 3 (cycle_n % 50): 420 % 50 = 20, X
  - trigger 4 (SKILL 갱신 필요): X
  - trigger 5 (직전 20 안 chain pool 0회): polish-ui 0회 + explore-idea
    0회 (영구 opt-out 6개 제외 후) 충족. 그러나 cycle 402~416 = lotto x15
    dominated window → 실질 chain-pool 사이클 5건 (401 skill-evol + 417
    op + 418/419 fix + 420 review). lotto 영향 false positive 가능성
    높음. cooldown 룰 (cycle 68 박제) 따라 cycle 421 진단 시 메인 재평가
    위임 — marker 박제 X.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
