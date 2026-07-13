---
date: "2026-07-13"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "9bb5f0e12206f9f90d8131352c069b92bf3f78b8"
---


subtype: cycle-retro
cycle: 1581
chain_selected: review-code (heavy)
outcome: success
next_recommended_chain: review-code (heavy) or explore-idea (lite)

trigger:
- silent drift family wave-262~271 9-wave 사용자 가시 metadata/JSX sweep 이후 새 detection dimension (cycle 1579 spec 옵션 3) 자연 매핑
- HOME_ELO_BONUS registry constant (24) + 파생 approximate 승률 string "3.4%" 4 지점 하드코딩 evidence
- 2-chain lock X (distinct=3), lite cap X, skill-evolution marker X

execution:
- registry: HOME_ELO_BONUS_WIN_PROB_PCT = 3.4 신규 (packages/shared/src/index.ts:512) + Elo 400 도출 주석
- surface 4 지점: mlb/factors (한글 range + description) + en/mlb/factors (영문 range + description)
- guard: packages/shared/src/index.test.ts wave 272 test (HOME_ELO_BONUS pin + derivedPct ±0.2 assert)
- test pass: shared 179 + moneyball 1875
- commit ea7beaea → PR #2647 → R7 auto-merge activated (squash + --auto + --delete-branch)

findings:
- wave-262~271 9-wave core metric (Elo/144/720/2430/HOME_ADVANTAGE) sweep 이후 새 카테고리 "registry constant + 파생 approximate string" pattern 첫 발견 = silent drift family 자연 종료 신호 X, family 연장
- wave-271 spec 옵션 3 (새 detection dimension) 자연 매핑 evidence — cycle 1579 explore-idea (lite) spec draft 가 cycle 1581 review-code (heavy) target 로 자연 이행
- 3.4% approximate 소수점 반올림 = 3.45% 실제 → 표시값 3.4% 유지 (user-visible 값 보존, registry sync 만 강제)

next_options:
1. wave-273 후속 grep: 다른 registry constant + 파생 approximate string 후보 (HOME_ADVANTAGE + 유도 %pp / SUNDAY_CAP_CONFIDENCE 소수점 표시 등)
2. silent drift family 자연 slowdown monitor (wave-273 evidence 부재 시 자연 종료 인정)
3. explore-idea (lite) wave-273+ 후보 discovery spec draft

self_verification:
  rubric: "5축 (가치=medium / 시간 비용=small / risk=0 / 자율 가능=yes / 의존성=none)"
  tier: 1
  baseline_test_pass: 178→179 (shared) + 1875 (moneyball)

Co-authored-by: Claude Opus 4.7 <noreply@anthropic.com>
