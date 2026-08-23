---
date: "2026-08-23"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "2438990552ce5ab0ed3809646fc7fc4dff48c5d0"
---


subtype: cycle-retro
cycle_n: 2443
chain_selected: review-code (heavy)
outcome: success
next_recommended_chain: operational-analysis(lite) 또는 info-architecture-review

buildAccuracyData.ts(776줄) 신규 감사 — SMALL_SAMPLE_THRESHOLD 상수 미사용
하드코딩 소표본 가드 1건 발견 및 정정. review-code 반복 3파일(analysis/page.tsx,
accuracy/page.tsx, game/[id]/page.tsx) 소진 후 신규 lib 파일로 다양성 확보.
