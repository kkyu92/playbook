---
date: "2026-06-19"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "045eacd6993fbba349f552d32d96aaad30d8b747"
---


subtype: cycle-retro
chain: review-code (heavy)
cycle: 1277
outcome: success

Direction A from cycle 1276 post-wave-74 redirect spec executed. EN MLB pages 14-factor / KBO 10 + Statcast 4 / 14 factors hardcoded 다수 (8 file × multi-line) → MLB_FACTOR_COUNTS registry direct import (`packages/kbo-data/src/factors/mlb-base.ts`) + template literal 대체. wave 71-74 pattern 정합.

PR #2061 (merge commit 15790bf, 14 file +51 -38) — R7 auto-squash + delete-branch.

test 강화: en-mlb-pages.test.ts "14 factors title" 검사 → "factor count from MLB_FACTOR_COUNTS registry" 검사 + literal "14-factor" no-match assert. silent drift 재발 차단 layer.

검증:
- pnpm test --run en-mlb-pages = 54 PASS
- tsc --noEmit = clean
- grep -E "14[- ]factor|KBO 10 \+ Statcast 4" apps/moneyball/src/app/en/mlb (excl __tests__) = 0 hit

next_recommended: review-code (heavy) wave 76 (KBO matchup/teams 'KBO 10팀' Direction B candidate, KBO_TEAMS.length import sweep) 또는 explore-idea (saturation 누적) 또는 info-architecture-review (cycle 1252 → 25 cycle gap, trigger 9 30-cycle 도달 cycle 1282 5 cycle 남음).

skill-evolution: trigger 5개 모두 미충족 (milestone 1300 다음).

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
