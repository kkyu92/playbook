---
date: "2026-05-26"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "66c7c899c52af7b0c76904be1c391f336dc2fdf4"
---


subtype: cycle-retro
cycle_n: 944
chain_selected: operational-analysis (lite)
outcome: success (retro-only)
next_recommended_chain: fix-incident (lite, gap=6, 5/25-26 verified=0 silent drift family 후속) OR review-code (lite, gap=1 weak, sweep 64) OR explore-idea (lite, gap=21, plan #11 wait)

retro.summary:
v1.8 cohort cycle 935 baseline 9 cycle 후속 측정. n=39 (cycle 935 동일, +0건 silent), 누적 n=133, 48.9%, BrierW 0.2325 동일. 5/25(일)+5/26(월) verified=0 silent gap (사례 11 family fix PR #1306 cycle 936 직후 5/24 5건 정상화 evidence 후 5/25-26 verify lag/silent 가능). v2.0 임계 n=150 ETA 2026-05-30 (4.8d, velocity 3.55/day 단 cycle 935→944 +0건 silent gap 측정).

evidence:
- scoring_rule: v1.5(16, 75.0%, 0.2131) / v1.6(46, 37.0%, 0.2606) / v1.7-revert(32, 53.1%, 0.2677) / v1.8(39, 48.7%, 0.2325) / TOTAL n=133, 48.9%, BrierW 0.2483
- v1.8 요일 (KST): Tue 80%(5) / Wed 60%(5) / Thu 14.3%(7) 약점 / Fri 33.3%(6) cycle 886 측정 59.1% 대비 -25.8pp / Sat 50%(6) / Sun 60%(10) cycle 886 측정 33.3% 대비 +26.7pp 향상 (Sunday cap 강화 evidence)
- 14d daily: 5/13~17 5건씩 (cron 정상) / 5/18(일) 0 / 5/19 5 / 5/20(수) 0 사례8 / 5/21 2 / 5/22 1 / 5/23 1 / 5/24 5 / 5/25(일)+5/26(월) 0 monitoring 후속

carry-over:
- cycle 945+ fix-incident lite gap=6 자연 trigger (5/25-26 silent gap 진단)
- n=150 도달 (~05-30) 시 v2.0 가중치 확정 backtest fire (cycle 950 milestone 정합 가능)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
