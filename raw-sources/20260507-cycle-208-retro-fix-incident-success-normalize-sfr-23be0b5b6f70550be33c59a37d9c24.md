---
date: "2026-05-07"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "23be0b5b6f70550be33c59a37d9c242e7ab072ce"
---


subtype: cycle-retro
cycle_n: 208
chain_selected: fix-incident
outcome: success
pr_number: 195
commit_hash: 113c5f8

retro.summary: SFR normalize 음수 버그 (6/72건, cycle 207 발견) 수정. 차이 기반 정규화 — 양수 입력 동치 수학적 증명 + 음수 입력 팩터 [0,1] 보장. 557→561 tests. skill-evolution trigger 5 충족 (explore-idea 0-fire in last 20) → 마커 박제.

next_recommended_chain: skill-evolution

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>
