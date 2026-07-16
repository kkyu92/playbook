---
date: "2026-07-16"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "b2774e32e506ff00b4c19c65c800de10201de2f2"
---


subtype: cycle-retro
cycle_n: 1672
chain_selected: explore-idea
outcome: success
wave: wave-337

diagnosis:
  - Feature-Drift Cycle 패턴 (distinct=3, 2-chain lock 없음)
  - KBO 시즌 재개 (2026-07-16), wave-335 이름→wave-337 FIP 자연 연장
  - home_sp_fip/away_sp_fip 기존 DB 컬럼 활용

execution:
  - SP_FIP_STRONG=3.50 / SP_FIP_WEAK=4.50 신규 상수
  - TodayAllRow 쿼리에 home_sp_fip/away_sp_fip 추가
  - 선발투수 이름 우측 FIP color-coded 배지 렌더링
  - 241 tests pass / type-check clean

retro.summary: wave-337 FIP 배지 ship. 브랜치 스킵 main 직접 push (workflow 미스 — 다음 cycle 교정).
next_recommended_chain: review-code
next_recommended_reason: Feature-Drift Cycle wave-337 직후 review-code(heavy) wave-338 자연 다음
