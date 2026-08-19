---
date: "2026-08-19"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "f463a428ba099d6d5ca3dce48f91c1a51bb3e102"
---


subtype: cycle-retro
cycle_n: 2232
chain_selected: review-code (heavy)
outcome: success
pr_number: 2979
commit_hash: 615616e3d144696fe850a5dd7dec7b2ec35705f4

retro.summary: TODOS.md cycle 2231 carry-over 직접 매핑 — plan #26 Phase 3 로 명시
지목된 byte-identical pearsonCorrelation (KBO analyzeFactorAccuracy vs MLB
buildMlbFactorInsights) 를 apps/moneyball/src/lib/stats/pearson.ts 로 추출 + 단위
테스트 4건 신규. 순수 dedup, 로직 변경 0. 463 files/4005 tests pass (+1/+4),
type-check/lint clean. PR #2979 R7 자동 머지 (같은 사이클 안 완결).

next_recommended_chain: explore-idea 또는 fix-incident (plan #26 완전 종결, 강제
carry-over 부재 — 다음 사이클 open issue 우선 확인 후 자유 진단)
