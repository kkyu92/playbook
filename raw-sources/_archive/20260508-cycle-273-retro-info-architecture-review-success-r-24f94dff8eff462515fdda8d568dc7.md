---
date: "2026-05-08"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "24f94dff8eff462515fdda8d568dc7657b9f89f8"
---


subtype: cycle-retro
cycle_n: 273
chain_selected: info-architecture-review
outcome: success
trigger: trigger 7 (cycle 225 박제) — 직전 12 사이클 explore-idea 5회 + info-arch 0회

ia-2026-05-07 spec 후속 후보 4번 sitemap.xml 동기 측정.
- staticRoutes 18 + dynamic block 8종 (analysis/player/predictionDate/matchup/weekly/monthly/season/team)
- 누락 0건. dynamic block 모두 정상
- 진짜 IA 결함 발견: /reviews/weekly /reviews/monthly = 즉시 redirect 페이지인데 sitemap staticRoutes 에 priority 0.8 등록 → canonical 중복 + redirect chain crawl budget 낭비
- fix: 2줄 제거 + 의도 주석 박제

검증: pnpm type-check PASS / pnpm test 241/241 PASS
commit: a7aaf1f (직접 push main)

next_recommended_chain: operational-analysis
next_recommended_reason: 직전 2 cycle next_rec=op-analysis. 마지막 발화 cycle 256, 17 사이클 미발화 (25 trigger 임계 가까움). 예측 건수 100건 임계 도달 가능성. lite 모드 권장.
