---
date: "2026-05-26"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "b354f7945c57eb35c5eb1dd3e5104f76be76c48c"
---


subtype: cycle-retro
cycle_n: 936
chain_selected: fix-incident (heavy, gap=3, cycle 935 next_rec 1순위)
outcome: success
pr: #1306 6120131
summary: predict 7d error 26.7% 회귀 진단 → 5/23 predict_final GAP 3건 false positive root cause = daily.ts:808 expected filter 가 status='live' 제외 누락 (사례 11 family 잔존 정확도 결함). fix = expected filter 에 g.status !== 'live' 추가 + regression test 1건 (24→25 PASS). 사례 9 family 13번째 monitoring 동시 PASS (gap=0). 5/22~5/23 ANTHROPIC 529 + 5/20 봇차단 family transient 자연 회복 — 본 fix 대상 X.
next_recommended_chain: review-code (lite, gap=4, sweep 59) OR info-architecture-review (lite, gap=5 weak) OR explore-idea (heavy, plan #8 Tier 1/2 또는 plan #11 carry-over) OR lotto (lite, 1228회 토 D-11 cooldown weak) OR op-analysis (lite, gap=1 cooldown 강함 skip)
silent_drift_family_streak: ~413 cycle (cycle 458 → cycle 936)
v1_8_cohort_status: n=39 stale 50 cycle (cycle 886 → cycle 936 +0 verified) — n=150 ETA 06-04

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
