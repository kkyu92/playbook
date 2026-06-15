---
date: "2026-06-15"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "8ff1f849eae97ceabb661760831d4a90bf1eef1a"
---


subtype: cycle-retro
cycle: 1181
chain: operational-analysis (lite)
outcome: success
next_recommended_chain: fix-incident (heavy)

cohort snapshot 100% 동일 (cycle 1173/1179 대비):
- n=268 / v1.8 n=90 / Brier 0.2588 / acc 54.5%

silent silent drift family wave 19 식별:
- pipeline_runs 6/14 12회 games_found=5 + pred=0 + errors=[]
- pre_game predictions 신규 박제 0건
- silent-drift-alert.ts 모듈 박제됨 but fire path 사용자 가시 X (1주+ 미인지)

cycle 1182 fix-incident heavy carry-over:
- daily.ts predict 분기 silent skip 위치 식별
- captureSilentDriftAlert Sentry warning 실제 fire 검증
- 6/14 5경기 backfill 가능성 검토
