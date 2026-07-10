---
date: "2026-07-08"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "408295803078a9962f4aadddd064a5fb8dd5ca5c"
---


subtype: cycle-retro
cycle: 1509
chain_selected: fix-incident (heavy)
outcome: success

## Diagnosis

사용자 자연 발화 = active incident. Sentry/Telegram warning 반복:
`silent-drift postview games=5 predictions=0 errors=10 pattern=silent_drift_family_case11_postview_extension`

## Root cause

- postview-daily.ts:256 `onConflict='game_id,prediction_type'` = mig 030 (cycle 1013) 이후 predictions UNIQUE `(game_id, prediction_type, scoring_rule)` 3-col composite 와 mismatch
- Postgres 'no unique or exclusion constraint matching the ON CONFLICT specification' → assertWriteOk throw
- CREDIT_EXHAUSTED (2026-06-06~ 지속) → agentsFailed=true → 1 err push + upsert throw → 1 err push = 2 err/game × 5 = 10 err (사용자 alert 수치 정합)
- CREDIT_EXHAUSTED 전엔 daily.ts INSERT path 만 사용 (line 856) → onConflict path 미도달 silent (mig 030 → CREDIT_EXHAUSTED 사이 잠복)
- daily.ts predictions write = INSERT + existingSet race-check = mig 030 무영향. postview-daily.ts 단독 잔존

## Fix

- postview-daily.ts:256 onConflict → `'game_id,prediction_type,scoring_rule'`
- postview-daily.ts:14 stale 주석 갱신 (mig 030 이후 composite 3-col 반영)

## Ship

- PR #2593 → MERGED (squash) commit=8f47ede1
- R7 자동 머지 정상 작동
- tsc 신규 error 0, vitest 12/12 PASS

## Silent drift family

- wave 178 신규 카테고리 — migration 후 stale onConflict
- daily.ts / postview-daily.ts 이원 write path (INSERT vs upsert) 로 daily.ts 는 mig 030 무영향
- open issue #2592 (Scout 스키마 드리프트 방어 시스템) = 본 fix systemic 확장 후보 = explore-idea chain 후속 candidate

## Retro

- 사용자 자연 발화 alert '5/0/10' 정확한 pattern trace 로 root cause 확정 = fix-incident heavy 모드 정상 fire
- migration + code stale 조합의 dormant period (mig 030 → CREDIT_EXHAUSTED 활성화 = ~2 cycle year lag) evidence 박제
- isolated smoke X — 실제 사용자 alert + mig 030 SQL + code path trace 삼중 검증

## Next

- postview cron (18:00~00:50 KST 10분 간격) 다음 fire 시 알림 재발화 여부 monitor
- Supabase predictions post_game row insert 성공 여부 실측
- cycle 1510 = review-code (heavy) wave 225 (docs/superpowers/specs sweep carry-over from cycle 1507) 또는 fix-incident 재발화 (alert 재발 시)

🤖 Generated with [Claude Code](https://claude.com/claude-code)
