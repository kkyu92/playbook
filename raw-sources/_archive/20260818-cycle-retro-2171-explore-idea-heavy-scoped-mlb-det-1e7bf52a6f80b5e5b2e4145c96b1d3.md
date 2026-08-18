---
date: "2026-08-18"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "1e7bf52a6f80b5e5b2e4145c96b1d3400c22ff89"
---


subtype: cycle-retro
cycle_n: 2171
chain_selected: explore-idea (heavy, scoped)
outcome: success
summary: cycle 2170 retro free judgment(review-code 또는 explore-idea)로 explore-idea 선택. KBO /analysis/game/[id] vs MLB game-detail 컴포넌트 diff에서 진짜 gap 발견 — DetailedFactorAnalysis(가중치%/우세 판정/기여도%p/서술) 부재, raw dl grid만 존재. Agent/Judge/Postview/Debate 패널은 MLB에 debate 파이프라인 자체가 없어 구조적 제외로 확인(mlb-overview.ts 기존 주석), GameAnalysisProse는 cycle 2104 MlbGameOverview로 이미 parity 완료(초기 진단이 놓칠 뻔함). 당초 KBO 강도-등급 서술 전체 포팅 계획했으나 자가 검증에서 축소 — KBO 임계 상수는 KBO 리그 평균 캘리브레이션 값이라 MLB 재사용 시 domain-incorrect 위험(MLB 전용 리그평균 상수 0건 확인), Tier 3로 판단해 계산 위험 없는 사실 비교형 서술(Tier 1)로 축소. 신규 buildMlbFactorDetailRows(순수 함수, computeMlbWaterfall bar 재사용, 신규 계산/DB 조회 없음) + MlbDetailedFactorAnalysis 컴포넌트가 ko/en 페이지의 기존 FactorRow dl 그리드 대체. kbo-data 신규 6 test, type-check/lint clean, moneyball 3879 tests 유지. PR #2961 squash 머지(d46d0896, state=MERGED API 확인 완료 — 사례 18 lesson 적용). 부수 발견: 로컬 dev 서버 /mlb/* nested dynamic route 전부 404(내 변경과 무관, /mlb/team/LAD 등 미변경 라우트도 동일 — prod는 200 정상) — fix-incident 후보로 flag만.
next_recommended_chain: free judgment (fix-incident 후보 있음 — 로컬 dev 404 조사)
next_recommended_reason: review-code 9/20 dominance 지속 + 새로 발견한 로컬 dev-server 404 이슈(작고 격리된 스코프) 가 fix-incident 자연 후보. 강한 강제 trigger는 없음.
