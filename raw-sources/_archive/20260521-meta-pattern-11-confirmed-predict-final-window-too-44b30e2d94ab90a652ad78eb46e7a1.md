---
date: "2026-05-21"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "44b30e2d94ab90a652ad78eb46e7a150a8df62c5"
---


subtype: meta-pattern
cycle_n: 813
pattern: cron mode 별 fallback path 마지막 기회 누락 silent silent drop

evidence:
  - 사례 11 root cause Layer 1 정확 정의: predict mode 3회 debate fallback fail 후 predict_final 시점엔 모든 18:30 KST 경기 window_too_late → shouldPredictGame reject → windowTargets 진입 못함 → predict_final fallback row 박제 path 자체 진입 못함 = silent silent drop
  - cycle 813 fix 적용 (PR #1173 f0d19a7): shouldPredictGame allowLateWindow param + daily.ts predict_final 시 true 전달
  - 2026-05-20 SKvWO 1경기 영구 누락 = 운영 evidence 박제
  - cycle 779 fix (predict mode 3회 fallback continue 의도) 와 호환 — predict mode 다음 cron 재시도 잠금 회피 유지 + predict_final 마지막 기회 추가 보장

silent_drift_family_evidence (cycle 813 갱신):
  - 사례 3 (2026-04-15 model_version VARCHAR overflow)
  - 사례 4 (2026-04-15 retro.ts homeCode hardcode)
  - 사례 6 (2026-04-19 Sentry 5건 동시 폭로)
  - 사례 7 (2026-04-17~19 필드 매핑 fix 가 숨은 구조 노출)
  - 사례 8 (2026-05-20 KBO Referer 봇 차단 — 5h spike)
  - 사례 9 (2026-05-20 vercel .gitignore silent skip)
  - 사례 10 (2026-05-21 twitter-image runtime re-export)
  - **사례 11 (2026-05-20 predict_final window_too_late silent silent drop) — 본 cycle 박제**

recommendation:
  - 다음 cycle review-code (heavy, sweep 27) CLAUDE.md 사례 11 섹션 박제 + '이미 구현된 주요 모듈' 본 fix 박제
  - 운영 alert 후보: predict_final cron predictions=0 + games_found>0 시 sentry warning
  - 운영 cycle 안 사례 11 재발 0 확인 (5/22~5/24 운영 모니터)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
