---
date: "2026-07-14"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "2f13383818259bdb797e2330c6585b8bc7585e7d"
---


subtype: cycle-retro
cycle: 1662
chain: operational-analysis (heavy)
outcome: success
trigger: op-analysis 26-cycle gap (SKILL ≥25 trigger) + prev lite=success → heavy

summary:
- n=187 stable (All-Star break 7/10-15, 7/16 시즌 재개)
- acc=59.9%, Brier=0.2434 — v1.8 benchmarks holding
- CE gap 5.3pp (nCE 63.8% vs CE 58.6%): Bootstrap CI [-11.1pp, 20.9pp], P>0=74.6% — NOT statistically significant at 95%
- HOME_ADVANTAGE: measured 2.0pp (n=2500) vs constant 1.5pp — 0.5pp diff → no change
- Monthly CE: May 36%(n=11) → June 62%(n=95) → July 56%(n=34) — CE improving trend, July dip pre-break
- CREDIT_EXHAUSTED: July CE 97%, debate=None dominant
- Verify pipeline working correctly (20 unverified = in_game/post_game by design)
- No code changes

decisions:
- HOME_ADVANTAGE=0.015 유지 (0.5pp noise)
- v1.8 유지 확정 (benchmarks stable)
- CE gap: statistically not confirmed at n=47 non-CE (user domain: credit top-up)

next_chain: explore-idea (heavy)
next_reason: Feature-Drift Cycle turn + 7/16 시즌 재개 자연 시점

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
