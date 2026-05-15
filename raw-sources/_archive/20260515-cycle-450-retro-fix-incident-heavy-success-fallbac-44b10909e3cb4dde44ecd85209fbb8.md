---
date: "2026-05-15"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "44b10909e3cb4dde44ecd85209fbb890c4469b5e"
---


subtype: cycle-retro
cycle_n: 450
chain_selected: fix-incident (heavy)
outcome: success
pr_number: 482
commit_hash: b02edf9

retro:
  summary: |
    fix-incident heavy 발화 24 cycle 만에 (431, 434 이후 16 cycle gap). TODOS.md + docs/lessons/2026-05-14
    명시 후속 3건 중 postview Sentry / /accuracy fallback ratio 가시화는 cycle 384 시점에 이미 완료 +
    사용자 가시 reasoning dev 용어 차단만 잔존 = scope 좁히기 자연. helper 신규 박제 + 3 페이지 import
    분배 + DB 원본 보존 (observability/debug 안전망) 3축 동시 만족.

  key_changes:
    - lib/predictions/judgeReasoning.ts 신규 (isFallbackReasoning + presentJudgeReasoning + FALLBACK_USER_TEXT)
    - 3 페이지 import 적용 (home / predictions/[date] / analysis/game/[id])
    - DB 원본 reasoning 변경 X — observability/debug 안전망 유지
    - test 12 추가 (fallback prefix detection / user text swap / dev 용어 부재 검증)

  next_recommended_chain: skill-evolution (milestone trigger 3 충족, % 50 == 0)
  next_recommended_reason: |
    cycle 450 % 50 == 0 → milestone. skill-evolution-pending 마커 박제 → 다음 cycle 451
    skill-evolution chain 자동 발화 강제 (메인 자율 X). cycle 100/150/200/250/300/350/400
    milestone 박제 룰 따름.

  metrics:
    PASS_ship_total: 246 (cycle 124 룰 평가)
    fix-incident_gap_since_last: 16 cycles (cycle 434 → cycle 450)
    review-code_dominance_break: 449 op-analysis + 450 fix-incident = 2 cycle 연속 break
