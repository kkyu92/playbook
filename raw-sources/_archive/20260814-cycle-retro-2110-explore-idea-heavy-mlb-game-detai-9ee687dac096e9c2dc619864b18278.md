---
date: "2026-08-14"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "9ee687dac096e9c2dc619864b18278d7e10119d1"
---


subtype: cycle-retro
cycle_n: 2110
chain_selected: explore-idea (heavy)
outcome: success
pr: #2941

TODOS cycle 2098/2099 이 남긴 "KBO 나머지 parity(waterfall/debate/verdict/postview)"
후보를 조사 — debate/verdict/postview 는 MLB 파이프라인에 애초에 없는 LLM 단계(순수
정량 모델, reasoning/confidence/debate_version 컬럼 자체 부재)라 컴포넌트 wiring
문제가 아니라 신규 파이프라인 필요 스코프임을 확인, 별도 후보로 분리. 대신 cycle 2104
computeMlbWaterfall bar 를 재사용해 즉시 착수 가능한 GameAnalysisProse-parity "AI
종합 분석 요약" 섹션만 신규 작성 + KO 페이지에 배선(EN 은 bar label 한글 하드코딩
pre-existing 제약으로 의도적 미배선, TODOS 후속 기록).

next_recommended_chain: fix-incident 또는 review-code (fix-incident gap→20 근접, cycle 2115 도달 예상)
