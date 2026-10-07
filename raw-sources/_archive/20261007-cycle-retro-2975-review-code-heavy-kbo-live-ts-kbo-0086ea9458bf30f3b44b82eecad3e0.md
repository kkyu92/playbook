---
date: "2026-10-07"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "0086ea9458bf30f3b44b82eecad3e01a4e942056"
---


subtype: cycle-retro
cycle_n: 2975
chain_selected: review-code(heavy)
outcome: success
pr: #3136 (474d5c45, merged)

진단: 직전8(2967-2974) distinct=4, 2-chain lock 미충족. fix-incident/operational-analysis/info-arch/lotto/design-system/explore-idea(plan#29 대기, 만료 2026-10-15) 전부 gap 미근접/저가치. cycle 2972~2974 3연속 추천한 packages/kbo-data/src/scrapers/ 선택.

발견 2건 수정: (1) kbo-live.ts 스코어 파싱 `|| 0` fallback — status=final 경기 games.home_score/away_score 영속 박제 경로라 ground-truth 오염 위험 (HIGH). (2) kbo-pitcher.ts era/hr/bb/hbp/so NaN 추적 부재 — FIP 통해 15% 가중치 팩터로 이어짐 (MEDIUM-HIGH). fancy-stats.ts parseNumWithFallback 패턴 재사용. typecheck clean, 테스트 94 files/1227 PASS.

낮은 심각도 1건(kbo-official.ts recent-form/h2h silent sentinel) 발견했으나 이번 cycle 미수정 — TODOS carry-over.

다음 사이클 추천 = plan#29 결정(만료 임박) 있으면 explore-idea, 없으면 review-code(heavy) 잔여 스코프(engine/features/factors/context/backtest/analytics).
