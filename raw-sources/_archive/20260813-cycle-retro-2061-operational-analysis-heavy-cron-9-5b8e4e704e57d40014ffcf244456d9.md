---
date: "2026-08-13"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "5b8e4e704e57d40014ffcf244456d94429d4771c"
---


subtype: cycle-retro
cycle_n: 2061
chain_selected: operational-analysis (heavy)
outcome: success

op-analysis-weekly cron 이 2026-06-15부터 매주 gh pr create 라벨 부재로
실패 → silent swallow 로 success 위장 → 9개 orphan 브랜치 방치. 라벨 생성
+ swallow 제거(PR #2918 MERGED) + 데이터 재측정(2026-08-13, v1.8 n=269
acc 54.3%) + orphan 브랜치 9개 정리. v1.8 accuracy 하락(59.9%→54.4%)은
KBO judge-agent CREDIT_EXHAUSTED 지속 + 소표본 변동 — weight 재조정
근거 없음, v1.8 유지 확정 그대로. memory/drift-cases.md 사례 20 추가.

next_recommended_chain: fix-incident (lite) 또는 review-code (lite)
