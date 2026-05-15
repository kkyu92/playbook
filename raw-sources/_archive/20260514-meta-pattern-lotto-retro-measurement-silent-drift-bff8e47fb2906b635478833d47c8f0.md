---
date: "2026-05-14"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "bff8e47fb2906b635478833d47c8f003c645abed"
---


subtype: meta-pattern
cycle_n: 431
pattern: lotto cycle retro 가 cycle 428/429 부터 count_smoke 측정 dropped → sample cap (50000) 기반 잘못된 metric 으로 outcome=success 박제. 5 cycle 연속 silent drift 누적 후 cycle 431 정정.

evidence:
  - cycle 427 JSON results.count_smoke: "8,145,060 전체 → 7,708,692 유효 (5.36% 제거)" ✅
  - cycle 428 JSON results: count_smoke 부재. candidate_pool_before=50000, candidate_pool_after=50000, removed_combinations=0, removed_ratio="0% (cap 50000 도달, trivially PASS family expansion 자연 결과)" ❌
  - cycle 429 JSON results: 동일 ❌
  - cycle 431 실측: pnpm tsx scripts/lotto.ts count → 256 rules valid 7,700,649 (cycle 427 246 rules 7,708,692 대비 -8,043 조합 추가 제거)

root cause:
  retro 박제 시 측정 명령 (count mode) 100s 소요 → 짧은 cycle 진행 압력으로 dropped.
  대체 metric (sample cap) 가 quality 측정처럼 보였으나 실은 random sample 효율 지표.

recommendation:
  1. lotto retro JSON 의 count_smoke 필드 필수 (cycle 431 박제 룰 박제)
  2. count_smoke 측정 부재 시 outcome=success 박제 X — partial 강제
  3. lotto cooldown trigger metric 정정 — valid_delta 기준 (sample cap X)
  4. retro 박제 전 100s 측정 비용 인정 (silent drift 차단 가치 > 시간 cost)

decision_required:
  사용자 결정 필요:
  - 옵션 1: lotto rule pool 확장 (256 → 추가 family 발굴)
  - 옵션 2: out-of-sample validation 도입 (실제 당첨 번호 backtest)
  - 옵션 3: lotto archive (dual-cycle policy 폐기, moneyball single 전환)
  - 옵션 4: 현 256 rules cooldown 만료 후 자연 재진단 (default)
