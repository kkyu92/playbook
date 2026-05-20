---
date: "2026-05-20"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "9430c5bc9a98640a59349803535fcd72564d4a5b"
---


subtype: cycle-retro
cycle_n: 761
chain_selected: operational-analysis (lite, gap=4 W21 mid baseline + v1.8 fresh data check)
outcome: success (retro-only)

baseline 박제 (cycle 757 → 761, 4 cycle gap):
- all-time: n=124, 47.6%, Brier 0.2475 (unchanged)
- v1.8 cohort: n=30, 43.3%, Brier 0.2241 (unchanged)
- v1.8 mv split: v2.0-debate 4/8=50.0% / v1.8 fallback 9/22=40.9% — gap +9.1pp debate evidence persistent
- scoring_rule: v1.5 12/16=75% / v1.6 17/46=37% / v1.7-revert 17/32=53.1% / v1.8 13/30=43.3%
- W21: 5/19 only 4/5=80.0% (n=5 noise) + 5/19 10건 pending + 5/20 전체 pending
- v1.8 vs v1.7-revert gap: -9.8pp (CI ±17pp n=30 binomial — statistical sep X)

verify cron throughput observation:
- cycle 757 → 761 = 4 cycle 경과 + v1.8 n=30 unchanged
- 5/19 15건 중 4건 verified / 10건 pending
- verify cron 매일 14 UTC fire = 하루 1회 throughput. 5/19 데이터 5/20 14 UTC 시작
- timing gap 정상 (cron 설계 의도)

가중치 결정:
- 변경 X (cycle 490 No-go gate 유지 head_to_head 3% / elo 10%)
- v1.8 n=30 noise area (CI ±17pp)
- v2.0 임계 n=150 까지 26건 잔여 (W22~W23 2주 후 도달 가능)

next_recommended_chain: explore-idea (heavy, v11 신규 spec scout) OR review-code (heavy, gap=2 silent drift sweep 8번째) OR polish-ui (lite, gap=7 cooldown 완전 해제)

lite scope 신규 carry-over 0건. 코드 변경 X.
