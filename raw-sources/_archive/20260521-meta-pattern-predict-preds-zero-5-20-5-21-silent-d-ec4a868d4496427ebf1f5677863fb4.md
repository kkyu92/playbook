---
date: "2026-05-21"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "ec4a868d4496427ebf1f5677863fb41044f2fbe5"
---


subtype: meta-pattern
cycle_n: 812
pattern: predict cron 매시간 run (success/error) 하지만 predictions_generated=0 누적

evidence:
  - cycle 775 baseline (2026-05-19) verified n=124 / acc=47.6%
  - cycle 812 (2026-05-21) verified n=124 / acc=47.6% — literally 동일
  - 마지막 verified row created_at = 2026-05-19T07:19:25 (KST 16:19) verified_at = 2026-05-19T14:17:16 (KST 23:17)
  - 5/19 KST pre_game 5건 모두 verified (4/5 적중)
  - 5/20 KST pre_game 0건 / 5/21 KST pre_game 0건
  - pipeline_runs 5/20 mode=predict 매시간 cron 진행: 10 success + 6 error (04:17~09:17 UTC), 모두 preds=0
  - pipeline_runs 5/20 mode=verify success but preds=0 (대상 부재)
  - pipeline_runs 5/21 mode=announce + 3x predict 모두 preds=0

silent_drift_family_evidence:
  - 사례 3 (2026-04-15 model_version VARCHAR overflow)
  - 사례 4 (2026-04-15 retro.ts homeCode hardcode)
  - 사례 6 (2026-04-19 Sentry 5건 동시 폭로)
  - 사례 7 (2026-04-17~19 필드 매핑 fix 가 숨은 구조 노출)
  - 사례 8 (2026-05-20 KBO Referer 봇 차단 — 같은 날짜!)
  - 사례 9 (2026-05-20 vercel .gitignore silent skip)
  - 사례 10 (2026-05-21 twitter-image runtime re-export)
  - 본 후보 (2026-05-20~21 predict preds=0) = 사례 11 후보 위치

suspected_root_causes:
  - 사례 8 후속 — `/ws/Main.asmx` Referer fix (PR #1101) 후 다른 endpoint (Naver / KBO Schedule 다른 path) 봇 차단 재발
  - shouldPredictGame window 0~3h 조건 silent skip (cycle 800 후속 측정 부재)
  - SP 미확정 매시간 모두 unset → 모든 game skip
  - 또는 5/20 KBO 휴식일 + 5/21 일정 fetch silent fail (사례 8 패턴)

recommendation:
  - 다음 cycle fix-incident (heavy) 자연 trigger
  - 1차: KBO 공식 fetchGames 직접 curl 진단 (5/20, 5/21 일정 응답 확인)
  - 2차: pipeline_runs.skipped_detail JSONB 분석 (cycle 800 migration 014 — skip reason 보존)
  - 3차: 5/20 04~09 UTC 6 error log Sentry 조회 (어떤 단계 fail)
  - 코드 fix 후 5/20~21 predictions 백필 또는 다음 verify cycle 자연 catch-up

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
