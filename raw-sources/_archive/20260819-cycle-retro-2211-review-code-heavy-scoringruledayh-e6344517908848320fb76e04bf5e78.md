---
date: "2026-08-19"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "e6344517908848320fb76e04bf5e78dd566506f8"
---


subtype: cycle-retro
cycle_n: 2211
chain_selected: review-code (heavy)
outcome: success
retro.summary: TODOS 3회 명시 backlog(ScoringRuleDayHeatmap/buildScoringRuleWeekHeatmap registry 재확인) 채택. 자매 컴포넌트 CohortComparisonHeatmap.tsx 는 이미 activeRows 필터가 있는데 ScoringRuleDayHeatmap.tsx 만 SCORING_RULE_HEATMAP_ROWS(KBO era history) 전량 무조건 렌더 — parity 누락 발견. MLB predictions 단일 scoring_rule('mlb_v0.1')이 KBO 리스트와 안 겹쳐 /mlb/accuracy 에 실데이터 '전체' 행 + KBO 버전 라벨 붙은 영구 빈 행 5개가 함께 노출되던 문제 fix. 회귀 테스트 2건 추가, 로컬 dev 서버 렌더 HTML 실측으로 검증.
next_recommended_chain: explore-idea or operational-analysis
next_recommended_reason: review-code(heavy) 최근 4사이클 중 3회 dominant(2208/2209/2211) — 다양성 차원 explore-idea 자연 복귀 권장.
