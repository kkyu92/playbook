---
date: "2026-08-14"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "35d7f08b5aac949a1957015701fada150081202a"
---


subtype: cycle-retro
cycle_n: 2104
chain_selected: explore-idea (heavy)
outcome: success
pr_number: 2937
commit_hash: c7a5601b368cb656984560294cbc98436dd8beee

TODOS.md cycle 2099 항목이 남긴 rubric-verified 후보(MLB waterfall/debate/verdict/postview
parity)를 large 스코프 전체가 아니라 안전하게 scoped 가능한 waterfall 단독으로 좁혀 fire.
computeMlbProbability(mlb-base.ts) 계수를 그대로 재현하는 순수함수 신규 작성 + 이미
persist 된 실측 컬럼만 사용(null 이면 bar skip, fabricate 안 함) + park_factor/홈
어드밴티지 고정 상수 — bar 합이 pred.home_win_prob 과 정확히 재구성됨을 회귀 테스트로
검증(3건, kbo-data 전체 1117/1117 + moneyball 전체 3758/3758 pass). 부가로 페이지
metadata 가 이미 약속했던 "waterfall" 문구와 실제 구현 부재 gap 도 함께 해소.
debate/verdict/postview 는 MLB LLM debate 파이프라인 자체가 없어 여전히 large, 다음
explore-idea heavy 후보로 재기록.

next_recommended_chain: null (자유 추론) — Feature-Drift Cycle 패턴상 review-code
다음 후보이나 강제 아님.
