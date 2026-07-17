---
date: "2026-07-17"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "f4eb3ab2a9537b0ceb75ad3903cb7ae838fcc900"
---


subtype: cycle-retro
cycle_n: 1735
chain_selected: review-code
chain_subtype: heavy
outcome: success
wave: wave-391
diagnosis_summary: Feature-Drift Cycle explore-idea→review-code 자연 교대. wave-390 computeCompositeDuel 추출 후 인라인 115줄 미교체 silent drift 발견
execution_summary: gamesWithRank compositeDuelHomeWins/compositeDuelAwayWins 추가 + 인라인→10줄 교체 + 6개 테스트 파일 경로 수정 (2387 pass, lint clean)
retro_summary: 헬퍼 추출 시 callsite 즉시 교체 필수. 중복 재계산 방지.
next_recommended_chain: explore-idea (heavy)
next_recommended_reason: Feature-Drift Cycle — review-code 직후 explore-idea 교대 자연
