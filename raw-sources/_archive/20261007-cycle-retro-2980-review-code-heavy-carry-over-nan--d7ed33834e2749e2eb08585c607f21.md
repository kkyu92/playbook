---
date: "2026-10-07"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "d7ed33834e2749e2eb08585c607f216880e08e52"
---


subtype: cycle-retro
cycle: 2980
chain_selected: review-code(heavy)
outcome: success

cycle 2978/2979 공통 추천 carry-over 3건(mlb-base.test.ts NaN-clamp / logistic.ts
주석 / mlb-elo.ts dead code) 재조사. "저위험" 가정 없이 직접 파헤친 결과, cycle
2977/2978이 도입한 bothPresent/pairedOrNeutral 가드가 null/undefined만 체크하고
NaN은 통과시키는 결함 발견 — 같은 비대칭-null 버그 클래스 3번째 재발. mlb-base.ts/
predictor.ts/mlb-pipeline.ts/backtest-logistic.ts 수정 + 신규 테스트 3파일. PR #3139
머지(cc6009a8). mlb-elo.ts dead code는 삭제 대신 문서화 — 삭제 이득보다 출처 인용
보존 가치가 큼.

다음 추천: explore-idea(plan#29 사용자 결정) 또는 review-code(heavy) 신규 스코프.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
