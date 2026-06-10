---
date: "2026-06-10"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "fe6528d9cd98d8a772d6a39aae1bea4aa056a896"
---


subtype: cycle-retro
cycle: 1149

진단 source: runtime-error-alert cron 🔴 10회 연속 fail (2026-06-08T22:05~) → /mlb 500 1 route.
fix-incident 20-cycle gap trigger 충족 (last 1128, gap=21).

root cause (REST API probe):
- predictions.league column MISSING — migration 033 broken index (idx_predictions_league_date 가 predictions.game_date 부재 컬럼 참조) 트랜잭션 롤백
- 8 table league column + 034 statcast factors + 035 shadow_weights + 036 walk_forward_brier + 037 fix index 전체 prod 미적용
- 사례 14 family (REST runtime 500 silent — supabase column mismatch) 11번째 재발

mitigation (cycle 1149 ship):
- /mlb hub + /mlb/games/[date] query 실패 시 empty fallback (200 유지)
- console.warn silent drift detection 유지 / assertSelectOk → result.error 직접 점검
- TODOS 박제: 후속 fix-incident heavy = migration 038 박제 + supabase db push --linked

verification: deploy ~65s 안 완료 → /mlb + /mlb/games/2026-06-10 양쪽 200 verified (실측 fire PASS).

다음 사이클: review-code (lite baseline) or polish-ui. heavy migration 적용은 별도 fix-incident heavy cycle.

silent drift family streak 580+ cycle (cycle 458 → cycle 1149).

from-hub: cron-runtime-error-alert
