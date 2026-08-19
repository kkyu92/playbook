---
date: "2026-08-19"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "8b748d9418038c566bfe4a87af5bf63d17d73874"
---


subtype: cycle-retro
cycle_n: 2285
chain_selected: operational-analysis (lite)
outcome: success

진단: open issue 0, approved plan 0/20. 2-chain lock 미충족(distinct=4). 직전 4사이클
(2281-2284) 연속 review-code(heavy), retro 3건이 lotto/op-analysis 다양성 전환 추천.
lotto는 다음 회차(08-22) picks + 직전(08-15) OOS 이미 완료 확인 — trigger 없음. op-analysis
gap 20/25 미도달이나 diminishing-returns(cycle 2283 drift 없음) 겹쳐 자율 선택.

실행(코드 변경 없음): 이번주(08-17~08-23) KBO 예측 n=10 검증완료 5승5패 50.0%(표본 극소,
결론 보류). scripts/op-analysis-ce-cohort.ts 재실행 — 누적 n=321(CE=274/비CE=47, cycle
2265와 수치 동일 — 실 시간 간격 2.5h라 신규 검증 없음, 정상). CE 54.0% vs 비CE 63.8% =
9.8pp(안정 범위 9.7~10.8pp), overlap 월 통제 격차 10.8pp ≈ 전체 → LLM 부가가치 우세 5회
연속 재확인. 최근 14일 v1.8 전량(56/56) CE(debate_version NULL) — CREDIT_EXHAUSTED 6th
recurrence 상태 변화 없음(사용자 크레딧 재충전 미이행).

skill-evolution trigger 평가: trigger3(2285%50=35) 미충족. trigger5 — 평가대상
review-code, 직전20사이클(2266-2285) 14회 fired, 미충족. marker 박제 안함. ship-0
emergency stop 미충족(success 다수).

다음 후보: review-code(heavy, 잔존 대형 미감사 파일 mlb-pipeline.ts/buildTeamProfile.ts/
buildMatchupProfile.ts) 또는 lotto(21-gap/30 근접).
