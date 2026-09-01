---
date: "2026-09-01"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "19a19d4921e6f395089a6ed94632f71ae8a71782"
---


subtype: cycle-retro
cycle_n: 2673
chain_selected: review-code(heavy)
outcome: retro-only
summary: TeamBiasTable.tsx/ModelVersionHistory.tsx 전체 정독 + 데이터 빌더/page.tsx 교차검증 — drift 0건. ModelVersionHistory는 이미 CURRENT_SCORING_RULE 정상 사용, TeamBiasTable은 버전 라벨 미렌더링. cohort 필터도 의도된 설계 확인 (CURRENT_MODEL_FILTER는 현재-모델 스냅샷 용도, buildVersionHistory 별도 unfiltered 경로 기존 정상). 유일 관찰=component-level 테스트 부재(기존 regex 가드만 존재), fix 대상 아님.
next_recommended_chain: review-code(heavy) 미감사 대상 소진 — 신규 대형 파일 재탐색 필요, 또는 fix-incident/op-analysis/info-arch/lotto/explore-idea gap 자연 대기
gap_status: fix-incident 10/20, op-analysis 7/25, info-arch 25/30, lotto 14/30 (전부 미도달)
