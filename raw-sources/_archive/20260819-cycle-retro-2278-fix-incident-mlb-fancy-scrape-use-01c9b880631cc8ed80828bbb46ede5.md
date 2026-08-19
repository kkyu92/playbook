---
date: "2026-08-19"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "01c9b880631cc8ed80828bbb46ede52f7decc01b"
---


subtype: cycle-retro
cycle_n: 2278
chain_selected: fix-incident
outcome: success
retro.summary: fix-incident 20-gap trigger 도달 후 pipeline_runs 실측 — mlb_fancy_scrape 24/30일 error 근본 원인(fetch User-Agent 헤더 누락) 발견/정정. predict mode 오탐(정상 idempotent skip 37건)은 별도 배제해 잘못된 수정 방지.
next_recommended_chain: review-code(heavy) 잔존 대형 미감사 파일 재탐색 또는 lotto/op-analysis/info-arch gap 다양성
