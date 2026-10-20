---
date: "2026-10-20"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "6aac97fb48251a21c3d422c685288ebd3449e675"
---


subtype: cycle-retro
cycle_n: 3409
chain_selected: review-code (heavy)
outcome: SUCCESS
commit_hash: 92ba3535

진단: open issue 0, approved plan 0/23, 2차 방어선(cycle 3408 retro 15a8fba9) OK, 직전8(3401-3408) distinct=3(review-code6+skill-evolution1+operational-analysis1). fix-incident/info-arch gap 도달하나 재확인 결과 non-actionable. cycle 3407 next_rec 계승 — packages/kbo-data/src/scrapers/ 전수감사.

발견+수정: kbo-official.ts 가 CANCEL_SC_ID 를 state_sc(live/final) 체크 뒤에 확인 — kbo-live.ts 는 반대로 cancel 을 먼저 체크하며 주석에 "kbo-official.ts 패턴 정합" 이라 명시하지만 실제론 순서 역전(silent drift). 서스펜드/우천취소 경기가 이미 live/final 로 넘어간 뒤엔 cancel 신호가 영구히 묻히는 버그. kbo-live.ts 순서로 통일 + conflict 시나리오 regression test 2건 추가.

carry-over 발견(미수정): fancy-stats.ts fetchTeamStats 의 elo/batter 동시요청이 상위 Promise.all 과 겹쳐 URL 중복 fetch(TOCTOU) — baseball-savant.ts/fangraphs-mlb.ts 엔 이미 적용된 직렬화 fix 미적용. kbo-pitcher.ts/kbo-live.ts 메인 fetch 경로 재시도 로직 부재. 다음 review-code(heavy) 추천 스코프.

검증: tsc/lint clean, pnpm test(kbo-data 1234+2/moneyball 4731) 전부 PASS. 직접 main 커밋+push(R4, 92ba3535).

skill-evolution: trigger1(10건 상시참)/trigger2/trigger3(3409%50=9)/trigger4 미충족. trigger5 — 직전20(3390-3409) review-code 14회로 미충족. marker 미박제. ship-0 — 직전10(3400-3409) success 7건으로 미충족.

메타: review-code(heavy) dominance 지속 중이나 매 사이클 신규 actionable fix 발견(models.ts/loader.ts/agents/factors/scrapers 등 silent drift family) — exhaustive-sweep 가치 있는 작업으로 판단, cooldown 미적용.
