---
date: "2026-06-15"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "c566c6afb748e2f0bdfbcf99139fe0c2e96fe218"
---


subtype: cycle-retro
cycle: 1180
chain_selected: fix-incident (heavy)
outcome: success
pr: 1970
commit: b5f58e64e975fb6ec44b9702c7c0882f15fab9cf

cycle 1179 carry-over (verification cron silent halt 진단). 실제 진단 = MLB
predict_final type cast error spam (silent halt X, 명시적 error). KBO 사이드 정상
(6/14 v1.8 ic=True/False 박제). MLB only 명확한 fix scope.

근원: predicted_winner = INT REFERENCES teams(id) (KBO 전용 FK). MLB 팀 row
부재. mlb-pipeline.ts line 158 이 string team_code (PHI, BOS) 를 INT 컬럼에
insert 시도 → Postgres type cast 실패 → batch 전체 실패.

Fix: mlb 분기 predicted_winner=null. UI 코드 ?? '?' fallback 이미 동작 중.

검증: pnpm --filter @moneyball/kbo-data test → 929 passed (74 files).

silent drift family wave 23 (cycle 458→1180 streak ~722 cycle 유지). 5 consecutive
ship rate (1175/1176/1177/1178/1180). 다음 권장 = review-code (heavy) 또는
operational-analysis (lite).
