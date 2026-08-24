---
date: "2026-08-24"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "b1d10e16ca0cd826e0536e4be0a760c0cdbf26a7"
---


subtype: cycle-retro
cycle_n: 2519
chain_selected: review-code (heavy)
outcome: success

진단: open issue 0, approved plan 0/23(status=approved 매칭 0). 2-chain lock
없음(직전 8사이클 distinct=3). gap trigger 미도달(fix-incident 13/20,
op-analysis 14/25, lotto 11/30, info-arch 2/30). cycle 2518 carry-over 후보
중 en/mlb/matchup(596줄)+en/mlb/reviews/monthly(500줄)는 이미 cycle
2507/2510에서 감사 완료된 STALE 확인 → 신선 재스캔으로 methodology/page.tsx
(515줄, 전체 감사 이력 0건, 최근 ad-hoc fix cycle 2266) 선정.

확정 이슈: Sunday cap 문구가 WINNER_PROB_LEAN(0.55)/SUNDAY_CAP_CONFIDENCE
(0.45) raw decimal 을 % 기호 없이 노출 — about/guide/methodology 3페이지
5 occurrence. /accuracy 는 이미 정상 % 포맷 중이었음. SUNDAY_CAP_CONFIDENCE_PCT
신규 constant 추가 + 3페이지 교체 + 회귀 테스트 3 assertions.

검증: shared 218 tests + moneyball 514 files/4277 tests all pass, tsc clean,
eslint clean, pre-push 3종 pass. Direct main push (004638aa, f6f11738).

next_recommended_chain: review-code (heavy) 계속(en/mlb/matchup 596줄 —
parity fix 다수, 전체감사 이력 0 / players/[id] 323줄+EN미러) 또는
operational-analysis(gap 14/25) 또는 lotto(gap 11/30)
