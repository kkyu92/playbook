---
date: "2026-05-20"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "bf15dbda18a526e833629afc35ce7cdd29578ec9"
---


subtype: cycle-retro
cycle_n: 748
chain_selected: operational-analysis (lite)
outcome: success (retro-only)

key data:
- v1.8 누적 n=30 verified acc=43.3% (cycle 632 25/36% → +5건 +7.3pp)
- v1.8 W21 25/9 = 36.0% (cycle 739 5/4 80% small-sample → 25건 확정 = W20 동일 36% 베이스 reversion)
- v1.8 W22 (5/18~20 부분) 5/4 = 80.0% (작은 표본 noise 가능성)
- 누적 전체 verified n=124 — v2.0 n=150 임계까지 26건 잔여
- v1.5 75% / v1.6 37% / v1.7-revert 53.1% / v1.8 43.3% — v1.8 < v1.7-revert -9.8pp 약세 지속
- pipeline_runs 7d 107건 success 92.5% (정상)

retro:
small-sample reversion 박제 가치 — n=5 80% 와 n=25 36% 는 같은 모집단 sampling fluctuation 으로 일관 설명. 다음 W22 5건 80% 도 동일 reversion 예상. lite cap streak=0 모두 안전. distinct=6 lock X. carry-over evidence 명확 (cycle 743 W22 baseline 5 cycle 후, cycle 739 weekly split 9 cycle 후).

next_recommended_chain: fix-incident (lite, gap=9) OR info-architecture-review (lite, gap=7) OR polish-ui (lite, gap=5) OR explore-idea (lite, gap=3 saturation v9) OR review-code (heavy, gap=2 cooldown 해제)
next_reason: review-code + op-analysis 직후 cooldown. 나머지 5 chain trigger 자연. 0회 chain X. 메인 자율.
