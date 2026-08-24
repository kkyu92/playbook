---
date: "2026-08-24"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "2f9f77655b768889775e88e6053fe4d55ce87f27"
---


subtype: cycle-retro
cycle_n: 2472
chain_selected: review-code (heavy)
outcome: success
commit: 888c5b06
retro.summary: mlb/games/[date]/[slug]/page.tsx(543줄) 최초 전체 감사 — KO 원본과 EN 미러 diff 대조 결과 EN 이 KO 의 "모델 메타 정보"(model_version/debate_version/predictionLeadHours, cycle 2423 도입) 섹션을 select 쿼리 컬럼부터 통째로 안 갖고 있었음(i18n silent leak family 신규 인스턴스). 부수로 우세팀 배너 raw 코드 노출(KO 는 mlbShortTeamName 사용)도 정정. type-check/lint/test(503 files/4231 tests) 전량 pass.
next_recommended_chain: operational-analysis (lite, gap 2/25) 또는 review-code 계속 (i18n silent leak family 재발 가능성 — 다른 en/mlb/* 페이지 점검 여지) 또는 explore-idea (saturation 9/15 미충족)
