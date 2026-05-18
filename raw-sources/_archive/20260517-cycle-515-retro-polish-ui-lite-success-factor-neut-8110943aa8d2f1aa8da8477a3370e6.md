---
date: "2026-05-17"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "8110943aa8d2f1aa8da8477a3370e62d3a1c05f3"
---


subtype: cycle-retro
cycle_n: 515
chain_selected: polish-ui (lite)
outcome: success
pr: #651 (merged 241796e)

진단:
- raw color literal scan: hex 4 + rgba 4 → 7 정상 예외 (OG satori / 브랜드 컬러 / recharts) + 1 silent drift
- silent drift: DetailedFactorAnalysis.tsx:110 raw rgb(156 163 175) factor neutral border
- 2-chain alternation lock 미발동 (distinct=3)
- lite cooldown 4 chain streak=0
- skill-evolution trigger 5 explore-idea cooldown 안 (cycle 512~522)

변경:
- globals.css: --color-factor-neutral 토큰 추가 (light #9ca3af / dark #4b5563)
- DetailedFactorAnalysis.tsx:110 raw rgb → var() 교체
- DESIGN.md Color 섹션 Factor Neutral 박제

검증:
- type-check pass
- moneyball 402 tests pass
- CI green + R7 자동 squash merge 13:33:25Z

next_recommended: operational-analysis (lite, 11 사이클 전 마지막) 또는 review-code (heavy, silent drift streak 51 영역 확장)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
