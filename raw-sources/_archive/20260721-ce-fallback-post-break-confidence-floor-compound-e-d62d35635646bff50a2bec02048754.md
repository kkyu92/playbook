---
date: "2026-07-21"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
fingerprint: "d62d35635646bff50a2bec020487547532952edb"
---


subtype: lesson
cycle: 1955
chain: operational-analysis (lite)

사례: 올스타 브레이크 후 (7/16-19, n=18) acc=27.8% vs 전체 57.1%
원인:
  - CREDIT_EXHAUSTED 6th recurrence 지속 → debate 100% fallback
  - debate_version=NULL → home_win_prob ≈ 0.5 (near-random)
  - confidence = 2*|home_win_prob-0.5| = 11-14% (floor 효과)
  - 포스트브레이크 팀 패턴 불확실성 복합
결론: CE fallback 단독으로도 정확도 baseline 이하 (50% 미만) 가능
  소표본 (n=18) 고려 필요하나 패턴 명확
박제 위치: memory/op-analysis-ce-postbreak-pattern.md 신규
다음 행동: Anthropic 크레딧 충전 (사용자 영역, carry-over)

v1.8 현황: n=205, acc=57.1%, Brier≈0.2533
