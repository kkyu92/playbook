---
date: "2026-08-18"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "2760f178ba71f3f77ad40618e2ee66ab4da45b51"
---


subtype: cycle-retro
cycle_n: 2158
chain_selected: review-code (heavy)
outcome: success

TODOS cycle 2157 carry-over(검증 안 함 표시된 lineupBarrelPct 스케일 의심)를
직접 grep + migration 034 확인으로 검증 → 실제 버그(fmtPct 오용, 850% 표시)
확인 → fix(mlb) ef830dcc → CI green 실측 확인.

next_recommended_chain: explore-idea 또는 fix-incident (자유 판단, carry-over 소진)
