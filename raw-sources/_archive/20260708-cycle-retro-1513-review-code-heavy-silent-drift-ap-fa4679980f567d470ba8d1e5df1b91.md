---
date: "2026-07-08"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "fa4679980f567d470ba8d1e5df1b91f9aca64592"
---


subtype: cycle-retro
cycle: 1513
chain: review-code (heavy)
outcome: success
pr: #2596
commit: 6e49b632

diagnosis:
- silent drift wave 226 detection: apps/moneyball 안 2건 raw onConflict 잔존
- picks/submit + leaderboard/sync = mig 024/025 UNIQUE (device_id, game_id)
- cycle 1512 ESLint defense 는 packages/kbo-data 만 커버 = apps 차원 gap

execution:
- DB_CONSTRAINTS 확장: pickPollEvents / userPicks 추가
- kbo-data index.ts DB_CONSTRAINTS re-export (apps 진입점 노출)
- 2 route DB_CONSTRAINTS import + 사용 refactor
- apps/moneyball eslint.config.mjs no-restricted-syntax rule 확장
- verified: 2 lint OK / 1069 tests pass / 부정 smoke error catch

retro:
- silent drift family fix 4 consecutive (1509/1510/1512/1513)
- cycle 1512 next_rec 자연 매핑 (review-code = silent drift detection channel)
- next: explore-idea 다양성 redirect 또는 op-analysis (v1.8 cohort n=180+ 측정)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
