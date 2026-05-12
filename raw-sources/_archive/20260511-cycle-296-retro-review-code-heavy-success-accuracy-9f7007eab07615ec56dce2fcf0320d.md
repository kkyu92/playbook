---
date: "2026-05-11"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "9f7007eab07615ec56dce2fcf0320da83561a61e"
---


subtype: cycle-retro
cycle_n: 296
chain_selected: review-code heavy
outcome: success
pr: 285
commit: dc26efd

retro.summary: accuracy/page.tsx 685→515줄. buildRecentForm/buildDayOfWeek/buildWeeklyTrend/bucketize/brierScore/calibrationGap 6개 함수를 lib/accuracy/buildAccuracyData.ts 추출. buildRecentForm limit 하드코딩 fix + getWeekStart KST 불일치 fix. 26 unit tests 신규 (267 total green).
next_recommended_chain: polish-ui
