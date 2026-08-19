---
date: "2026-08-19"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "3b1a68d7ae4502624c6bc4a239c5caa1d2baee79"
---


subtype: cycle-retro
cycle: 2219
chain_selected: review-code (heavy)
outcome: retro-only

cycle 2218 이 신규 shipped `/mlb/predictions` hub(377줄) 를 review-code(heavy)
로 감사. mlb_schedule 2-step 매핑/CE-fallback 필터/null 처리/팀코드 정규화/
ISR 상수/헤더·푸터 nav 배선 전부 확인 — drift 0건. CE 배너 KBO 대비 부재는
MLB 파이프라인이 LLM debate 미사용(순수 quant)이라 의도된 설계로 확인.
cancelled+missing 이중 카운트도 KBO 원본과 동일 컨벤션. 코드 변경 없음.

lotto/info-arch 30-gap trigger 둘 다 체크했으나 실익 없음 (picks/OOS 이미
박제, MLB 메가메뉴·푸터 sitemap 은 cycle 2218 자체 커밋에서 이미 동기).

next_recommended: operational-analysis or explore-idea (review-code 최근
8/20사이클 dominant — 다양성 우선)
