---
date: "2026-05-13"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "cc3b345a1f740830afa5c363d8b945311463800e"
---


subtype: cycle-retro
cycle_n: 355
chain_selected: explore-idea (heavy)
outcome: success
pr: https://github.com/kkyu92/moneyballscore/pull/369

retro.summary: >
  확신도별 분석(/accuracy) 신설. cycle 354 발견(보통확신 37.5% < 낮은확신 58.3% 역전)을
  사용자 가시 UI로 박제. buildConfidenceTiers() + ConfidenceTier interface + amber 역전 경고.
  Sunday cap 효과 투명 공개. 350 tests pass / typecheck green / PR #369 auto-merged.

retro.lesson: >
  judge-agent Sunday cap(0.55)이 일요일 예측을 보통확신 구간에 강제 집중 → 정확도 역전.
  n=8 일요일 표본 소규모이므로 프롬프트 튜닝보다 UI 가시화가 현시점 최선 선택.

next_recommended_chain: review-code (lite) 또는 operational-analysis (lite)
