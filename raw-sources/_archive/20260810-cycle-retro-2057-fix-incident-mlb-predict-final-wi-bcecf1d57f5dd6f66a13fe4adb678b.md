---
date: "2026-08-10"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "bcecf1d57f5dd6f66a13fe4adb678b5726c77411"
---


subtype: cycle-retro
cycle_n: 2057
chain_selected: fix-incident
outcome: success
pr_number: 2914
commit_hash: 5bbc8f5c

plan #24 Phase 2b(Elo 추이) 착수 전 gating 질문(scoring_rule 실측) 조사 중
훨씬 큰 결함 발견 — DB 실측 결과 MLB 예측 전량(725건) home_win_prob=0.556
flat, mlb_predict_final 이 mlb_team_stats 를 아예 조회 안 하고 14개 팩터
전부 symmetric 고정 placeholder 만 사용(cycle 1985 는 스크래퍼만 연결, 소비
wiring 누락 — 사례 20). 자율 pivot(Phase 2b UI 작업보다 CLAUDE.md 핵심 규칙
위반 정정이 압도적 우선).

원인 2건 분리: FanGraphs(woba/fip/xfip/war)=Cloudflare Turnstile 완전 차단
(curl 403, 코드 수정 불가, carry-over) / Savant(xwoba/barrel_pct)=CSV
스키마 변경(type=team 단일 엔드포인트 폐지 → type=batter-team 2개 분리 +
quote/BOM 추가, 수정 가능). baseball-savant.ts 재작성 + team code 매핑
(AZ→ARI/CWS→CHW/KC→KCR/SD→SDP/SF→SFG/TB→TBR/WSH→WSN) 실네트워크 검증
완료(30팀). mlb-pipeline.ts runPredictFinal 이 mlb_team_stats 실측 조회하도록
wiring + MLB_TEAMS.parkPf(기존 존재, 미사용) 를 park_factor 에 연결.

pnpm test(kbo-data) 1082 passed, type-check/lint clean. PR #2914 R7
자동 머지 확인(gh pr view state=MERGED 실측, 사례 18 교훈 정합 — 완료
서술 전 실제 확인).

plan #24 Phase 2b 는 MLB Elo rating 시스템 자체 부재(home_elo/away_elo
전량 NULL, ELO_NEUTRAL 고정) 로 blocked 확인 — plan 문서 갱신, UI 문제가
아니라 팩터 계산 엔진 신규 구현 필요(별도 scope).

skill-evolution trigger 3(%50==0, 2057%50=7 미충족)/5(review-code 5회
발화, 미충족) 모두 정상 — 강제 발화 없음. next_recommended_chain:
fix-incident(lite) 또는 operational-analysis(lite) — 다음 크론 사이클
(mlb_savant_scrape 20:17 KST / mlb_predict_final 익일 10:17 KST) 실제
동작 결과 재확인.
