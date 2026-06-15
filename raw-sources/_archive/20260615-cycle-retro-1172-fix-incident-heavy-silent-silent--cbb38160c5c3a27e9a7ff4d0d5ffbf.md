---
date: "2026-06-15"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "cbb38160c5c3a27e9a7ff4d0d5ffbfc60c10c960"
---


subtype: cycle-retro
cycle_n: 1172
chain_selected: fix-incident (heavy, silent silent drift family wave 18 tsx not found)
outcome: success

## 진단

cycle 1172 cron CI 진단:
- op-analysis-weekly: 06-08/06-01/05-25 3주 연속 fail (`Command "tsx" not found`)
- data-refresh-weekly: 06-09/06-02/05-26 3주 연속 fail (동일)
- factor-backtest-weekly: 2026-06-14 success conclusion 인데 실제 tsx 실패 (tee silent drift)
- lotto-pick-update: 1 fail (2026-06-05)

## chain 선택

fix-incident gap=3 짧지만 cron 3주 연속 fail = incident 자연 source primary trigger 우선. heavy mode (근본 원인 + 2 layer fix).

## 실행

PR #1964 (7a7776c) R7 자동 머지:
- root `package.json` devDeps `tsx ^4.21.0` 추가 — CI frozen-lockfile resolve 보장
- `pnpm-lock.yaml` 갱신
- factor-backtest-weekly `set -eo pipefail` + Command tsx not found / ERR_PNPM grep guard

검증: pnpm exec tsx v4.21.0 OK / pnpm type-check 3/3 successful.

## retro

silent silent drift family wave 18 (cycle 1072/1095/1138/1149/1151/1168/1169 후속). v1.8 cohort weekly cron 4주 stale 회복 → v2.0 ETA 정확도 향상. silent drift family detection streak ~628 cycle 유지.

next_rec: operational-analysis lite (next cron fire 후 fresh data 누적 + n=100 milestone 임박).

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
