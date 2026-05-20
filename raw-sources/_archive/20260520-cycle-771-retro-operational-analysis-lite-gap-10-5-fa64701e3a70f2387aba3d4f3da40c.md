---
date: "2026-05-20"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "fa64701e3a70f2387aba3d4f3da40cf5e3a8b123"
---


subtype: cycle-retro
cycle_n: 771
chain_selected: operational-analysis (lite)
outcome: success

retro:
  - KBO Referer fix curl 검증 PASS (Referer + UA → 정상 JSON / Referer 없이 → HTML 봇 차단). PR #1101 prod 작동 확인.
  - pipeline_runs 7d: 5/20 0~04 UTC 5건 error (KBO API parse error HTML) / 5/19 14건 success/partial / 5/18 14건 success. fix 머지 (5/20 ~05 UTC) 이후 cron fire 아직 없음 — 다음 fire (05~13 UTC) 대기.
  - v1.8 verified n=30 (13/30=43.3%). cycle 632 25 cohort 36.0% → 30 cohort 43.3% = +7.3pp / +5건 (신선 데이터 정확률 ↑).
  - scoring_rule 누적: NULL 86 / v1.5 40 (75.0%) / v1.6 126 (37.0%) / v1.7-revert 35 (53.1%) / v1.8 74 (43.3%).
  - 5/19 경기 5건 (13:00~13:02 UTC created) 가 5/20 verify 대상이지만 5/20 cron 사망으로 미진행. fix 후 14:17 UTC verify 정상 fire 시 v1.8 n=35 도달 예상.

next_recommended_chain: explore-idea (heavy, v11 후보 D/E/F 잔존 cycle 762 inventory carry-over) OR review-code (heavy, gap=1 cycle 771 measurement CLAUDE.md sync) OR operational-analysis (lite, 5/20 14:17 verify fire 후 v1.8 n=35+ 재측정)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
