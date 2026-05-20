---
date: "2026-05-20"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "2f5e9f551c06e4f245d66ce75438a0d9f673b84d"
---


subtype: cycle-retro

cycle_n: 743
chain_selected: operational-analysis (lite)
outcome: success

누적 verified 59/124=47.6% (cycle 516 baseline 53/114=46.5% → +10건 verified +1.1pp).

scoring_rule 분해:
- v1.5: 12/16 = 75.0% (변동 X)
- v1.6: 17/46 = 37.0% (변동 X)
- v1.7-revert: 17/32 = 53.1% (변동 X)
- v1.8: 13/30 = 43.3% (cycle 632 25/9=36% → +5건 +7.3pp 상승, incremental 2/5=40%)

v1.8 vs v1.7-revert gap: cycle 632 -17.1pp → cycle 743 -9.8pp (closing 7.3pp).
n=30 binomial CI ±17.5pp — v1.7-revert 53.1% v1.8 CI 상단 (60.8) 안 → 통계 분리 X.
가중치 No-go gate 유지 (head_to_head 3% / elo 10%, cycle 490 결정).

weekly split (ISO):
- W21 4/5=80.0% (변동 X cycle 739)
- W20 11/30=36.7% (cycle 739 9/25 → +2/+5)
- W19 15/27=55.6% / W18 9/25=36.0% / W17 11/26=42.3% / W16 9/11=81.8%

v2.0 임계 n=150 까지 26건 (~2.5주, early June 도달).

다음 cycle next_rec:
1순위 polish-ui (lite, gap=6 DESIGN.md token sweep)
2순위 review-code (heavy, gap=2 신규 영역 silent drift sweep agents/lib)
3순위 explore-idea (lite, redirect 외 새 carry-over source)
