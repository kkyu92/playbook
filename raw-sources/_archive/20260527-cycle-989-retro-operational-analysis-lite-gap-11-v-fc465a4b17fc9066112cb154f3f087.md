---
date: "2026-05-27"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "fc465a4b17fc9066112cb154f3f0871be9d0cf72"
---


subtype: cycle-retro
cycle_n: 989
chain_selected: operational-analysis (lite, gap=11 v1.8 cohort first measurement window)
outcome: success
plan_n_processed: []
summary: |
  v1.8 cohort 5/28 첫 baseline 측정 박제. cycle 861 stale 정정.

  v1.8 pre_game OOS (real OOS):
    n_verified=27 / correct=13 / wrong=14 / pending=1 (postponed)
    accuracy=48.1%
    velocity 1.8/day (5/13~5/28, 15일 / 27 verified)
    v2.0 threshold n=150 → 잔여 123 → ETA ~2026-08-04 (68일)

  v1.8-live (in_game): n=27 all pending — verify by-design 제외
    (updateAccuracy prediction_type=eq.pre_game 필터, daily.ts:1306)
  v1.8-postview (post_game): n=10 all pending — 동일 by-design 제외
  총 37/65 = 57% verify 외부 cohort (실험 트랙 별도)

  per-date 최근 distribution:
    5/27: 6 pred / 1 correct / 5 pending (in_game/post_game variants)
    5/26: 7 pred / 1 correct / 1 wrong / 5 pending
    5/24: 2 pred / 2 correct
    5/19: 10 pred / 4 correct / 1 wrong / 5 pending
    5/17: 4 pred / 2 correct / 2 wrong
    5/15: 15 pred / 1 correct / 4 wrong / 10 pending
    5/14: 10 pred / 0 correct / 5 wrong / 5 pending

  CLAUDE.md drift detect (line 91 stale):
    박제: "v1.8 n=32 (+2 in 9일, velocity ~0.22/day) cycle 861"
    실측: n=27 acc=48.1% velocity 1.8/day cycle 989
    차이: definition drift 가능 (cycle 861 cohort 범위 / 측정 method 차이)
    velocity 0.22 → 1.8 = 10배 차이 = cycle 861 박제 method wrong 가능

  pipeline_runs verify mode predictions=0 every run = by-design
    (verify branch line 401 'predictionsGenerated: 0' hard-coded)
    silent drift NOT 본 issue, alert noise X

  2-chain lock distinct=3 통과 + lite cap 통과 + ship-0 emergency 0/10 통과
  + trigger 5 통과 (review-code 7회 fire 평가 대상 단독)

  silent drift family streak ~462 cycle 유지 (cycle 458 → cycle 989)

  scout #1327 / #1242 / #1206 carry-over 유지
  plan #1/#2/#6 closed_cycle 박제 carry-over evidence 정합

  alias swap state main fe9a6c4 vs prod a984246 gap=2 (사례 9 family)

todos_added:
  - CLAUDE.md line 91 v1.8 baseline 갱신 (n=27 / acc=48.1% / velocity 1.8/day / ETA 08-04 cycle 989 측정)
  - v1.8-live / v1.8-postview verify path 분리 가치 자가 의심 — 실험 cohort 57% 미verify silent waste 가능성 (heavy op-analysis 후속 결정 보류)

next_recommended_chain: |
  review-code (lite, gap=0 sweep 78 silent drift family detection momentum)
  OR fix-incident (lite, gap=5 weak — 사례 9 family alias gap=2)
  OR info-architecture-review (lite, gap=29 → 1-2 cycle 후 30-cycle 임계 trigger 9 자연 발화)
  OR operational-analysis (heavy, in_game/post_game verify path 분리 결정)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
