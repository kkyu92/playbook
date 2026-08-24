---
date: "2026-08-24"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "9af86f500631a0272daa3617e95742244d538a7f"
---


subtype: cycle-retro
cycle_n: 2504
chain_selected: fix-incident (lite)
outcome: retro-only

fix-incident(gap=20)/operational-analysis(gap=25) 동시 도달. pipeline_runs 실측 + gh run list 로
실제 이상 확인. mlb_fancy_scrape FanGraphs 403 3일(08-20~22) self-healed 발견 — UA header 는
cycle 2278 fix 유지 중, retry/backoff 부재가 원인 추정. cycle 2383/2484 에 이은 3번째 재발
(meta-pattern 3/5, 임계 미달) — 코드 변경 없이 기록만. 다음 사이클 추천 = operational-analysis(lite).
