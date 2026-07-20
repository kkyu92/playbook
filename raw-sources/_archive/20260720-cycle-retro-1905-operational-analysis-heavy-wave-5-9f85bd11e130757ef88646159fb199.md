---
date: "2026-07-20"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "9f85bd11e130757ef88646159fb1991b8245a6ec"
---


subtype: cycle-retro
cycle_n: 1905
chain_selected: operational-analysis (heavy)
outcome: success

retro.summary: Post-break regression (27.8%, n=18) root cause confirmed. Compound effect: WAR data gap (4/10 teams Doosan/KT/Lotte/Kiwoom WAR=0 — Fancy Stats top-50 structural limit) + pre-wave-533 normalization bug (awayWar=0 → max home advantage, 83.3% home picks vs 22.2% actual home wins) + post-break away dominance (14/18 = 77.8%). 4/5 post-break series had WAR=0 away team. wave-533 neutral fix addresses bias; underlying data gap carry-over. Analysis scripts added (op-analysis-postbreak/full/war-check). Lesson dispatched. n=230 v1.8 total, CE 55.7% / nonCE 63.8% overall.

next_recommended_chain: explore-idea
next_recommended_reason: Root cause confirmed, fix already shipped (wave-533). explore-idea for WAR alternative source or new features after 3-cycle fix/analysis streak.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
