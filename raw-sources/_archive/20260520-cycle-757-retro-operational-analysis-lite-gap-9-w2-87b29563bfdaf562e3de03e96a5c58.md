---
date: "2026-05-20"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "87b29563bfdaf562e3de03e96a5c58913e23c37a"
---


subtype: cycle-retro
cycle_n: 757
chain_selected: operational-analysis (lite)
outcome: success (retro-only)

summary:
- v1.8 cumulative n=30 verified, 13 correct = 43.3% (cycle 748 unchanged, 9 cycle gap, 5/19 15건 verify 대기)
- all-time n=124 verified, 59 correct = 47.6%
- v2.0 threshold n=150 까지 26건 잔여 (scoring_rule split: v1.5 75% / v1.6 37% / v1.7-revert 53.1% / v1.8 43.3%)
- W20 (5/11-5/17) 25/9 = 36.0% 확정 / W21 (5/18-5/24) 5/4 = 80.0% small-sample early (mean reversion 예상)
- post-5/16 credit 복구 4-day 74 row 누적: real-debate 52 + credit-fail 22 = 29.7% silent fallback 지속
- model_version split: v2.0-debate 8 / v2.0-postview 20 / v1.8-postview 10 / v1.8-live 14 / v1.8 (fallback) 22
- per-day: 5/16=14 / 5/17=10 / 5/18=0 (일요일 cron silent skip — Cloudflare Workers migration 안정성 carry-over) / 5/19=15

PR: none (lite retro-only, code 변경 0건)
PASS_ship: 501 유지 (cycle 754 PR #1091 + 756 PR #1092 streak)

next_recommended_chain: explore-idea (heavy, v10 후보 D EmptyState shared) OR fix-incident (lite, gap=9) OR info-arch (lite, gap=16)
next_recommended_reason: 1순위 explore-idea heavy 후보 D — v10 spec 마지막 carry-over (cycle 752 lite spec → A 754 → B 756 → D pending). 2순위 fix-incident lite gap 9. 3순위 info-arch lite gap=16 fresh diagnose.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
