---
date: "2026-05-11"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
fingerprint: "a14d247f05931818426f7eff3bab8be4922b037f"
---


## 패턴 4건 (W20 operational-analysis + cycle 285-289 패턴)

### [quality_guard] new-page-3cycle-cleanup-pipeline
explore-idea heavy 직후 polish-ui + review-code 2사이클 cleanup 반복.
/accuracy 사례: 287(feat) → 288(token) → 289(assertSelectOk).
예방: PR 생성 직전 design token + assertSelectOk grep 체크리스트.

### [anti_pattern] confidence-inversion-high-conf-underperforms
conf≥55% → 37.5% < conf<55% → 63.2% (W20 기준).
n=89 누적에서도 동일 역전. calibration re-fit n=150 도달 후 예정.

### [data_pipeline] day-of-week-prediction-bias-sunday
일요일 ~2/13 = 15%. judge-agent Sunday cap 0.55 검토.

### [anti_pattern] head-to-head-factor-systematic-noise
W20 방향 적중 35.3% (랜덤 이하). v2.0: 5%→3% 하향 evidence 충분.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
