---
date: "2026-06-19"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "f5b7c362bc3ae604b78d7079e961769b35a7fa32"
---


subtype: cycle-retro
cycle: 1236
chain: review-code (heavy)
outcome: success
pr: 2022
commit: c026d04

plan #23 Step 5 wave 46 — retro.ts buildMemoryForTeam 이 agent_memories DB 박제 차원에서
MetricRegistry context layer (cycle 1225 박제) 0% 통합 상태였음. team-agent (wave 44)
+ judge-agent (wave 43) + postview (wave 45) prompt-builder 3 agent 통합 완료 후
잔여 prompt-builder 4 agent (personas/debate/calibration/rivalry-memory) 직접 통합 자연
부적합 진단 (정적/오케/DB-only 구조) → DB 박제 차원 전환.

변경:
- import MetricRegistry / MetricDefinition from '../context/metrics'
- lookupMetric helper: home_/away_ prefix strip + h2h_/head_to_head 별칭 + war_total 별칭
- buildMemoryForTeam content: `sp_fip +0.12` → `선발 FIP (sp_fip) +0.12`

backward compat: 기존 raw-slug memory rows valid_until 7일 자연 만료. DB migration X.
token impact: rivalry-memory.ts MEMORIES_LIMIT=5 누적 ~30 tokens 추가, budget 안.

tests: kbo-data 1049/1049 (4 신규) + moneyball 986/986 통과.

dominance-positive streak 인정: review-code (heavy) silent drift family wave 41~46 =
6 wave SUCCESS streak (cycle 1230-1234 + 1236). cycle 135 skill-evolution 9 박제 룰
정합 (silent drift family detection channel).

next_recommended:
- explore-idea (heavy) — plan #23 Step 4 실 cohort Brier delta harness fire
- operational-analysis (heavy) — v1.8 cohort 측정 갱신 (cycle 1229 baseline 후 1주 경과)

skill-evolution trigger 평가:
- T1: chain-evolution 8 ≥ 5 (이전 cycle 처리 누적, 본 cycle 신규 발화 X — implicit dedup)
- T2: 같은 chain 5 fail X (성공 streak)
- T3: 1236 % 50 = 36 ≠ 0
- T4: meta-pattern body 'SKILL 갱신 필요' 없음
- T5: review-code 평가 단일 대상 — N-19..N 19 fire (sample=19, ≥10 임계 통과) → 충족 X
→ 마커 박제 X, 정상 진행
