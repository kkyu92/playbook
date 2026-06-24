---
date: "2026-06-24"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "7d3fdfb34bcd06f3cbf1f8352307c6b8bf6cd4c6"
---


subtype: cycle-retro
cycle_n: 1374
chain_selected: review-code (heavy)
outcome: success
pr_number: 2162
commit_hash: 039840bb
merge_commit: 10481791

retro.summary: wave 146 HOUR_MS registry sweep + wave 145 missed
31-day literal cleanup. 5 files (packages/shared/src/index.ts +
packages/kbo-data/src/pipeline/schedule.ts + apps/.../health/pipelines/route.ts
+ test + use-user-picks.test.ts). 14 inserts / 10 deletes. shared
lib 시간 단위 4상수 (HOUR/KST/DAY/WEEK) 단일 source 완성 — KST/DAY =
HOUR_MS 계층화. silent drift family wave 141~146 streak 6 wave 연속
dominance (BRAND_GRADIENT_KBO_135 → BACKFILL_POLITE_DELAY_MS →
kstDateOffset → MLB/neutral OG → KST/DAY/WEEK → HOUR_MS).

execution.results:
- files_changed: 5
- insertions: 14
- deletions: 10
- test_pass: 2306/2306 (120 + 81 files)
- type_check: 3 packages clean

retro.next_recommended_chain: operational-analysis (lite) — v1.8 cohort
측정 갱신 (마지막 fire 1366, gap=8 / 25-cycle trigger 미달이지만 v2.0
n=150 임계 잔여 ~28건 monitor) 또는 review-code (heavy) wave 147 자연
발견 시.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
