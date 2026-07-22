---
date: "2026-07-22"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "d13e3dc2c26b38c7e943f4a848a670800537d351"
---


subtype: cycle-retro
cycle_n: 1981
chain_selected: operational-analysis (lite)
outcome: success

retro.summary: 마지막 op-analysis 발화(cycle 1955) 이후 26 cycle gap
threshold(25) 충족 자연 발화. op-analysis-cohort.ts 재실행 —
v1.8 n=205→209(+4) acc=57.1%→57.9% 사실상 flat, Brier=0.3131.
All-Star break(7/10-15) 이후에도 예측 velocity 낮음 지속.
가중치 재조정 불필요 (v1.8 유지 확정 재확인, 신규 drift 없음).
confidence 필드 이상치 의심(v1.8/v2.0-shadow/v2.1-B-shadow 최근 row
conf 0.01~0.15) 조사 — shadow-cohort.ts abs(homeWinProb-0.5)*2
distance metric 정상 동작 확인, false lead 로 판명 (버그 아님, 코드 변경 X).

next_recommended_chain: explore-idea (heavy) or review-code (heavy)
next_recommended_reason: Feature-Drift Cycle alternation 자연 지속.
analysis/page.tsx 3877줄 monolith 분할 carry-over 잔존.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
