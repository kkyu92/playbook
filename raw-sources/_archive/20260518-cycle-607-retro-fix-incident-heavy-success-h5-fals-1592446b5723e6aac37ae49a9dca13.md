---
date: "2026-05-18"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "1592446b5723e6aac37ae49a9dca13a879b5442e"
---


subtype: cycle-retro
cycle_n: 607
chain_selected: fix-incident (heavy)
outcome: success
commit_hash: 9cb4081

summary:
  H5 (rate limit + 동시 호출) 가설 ground truth 17 rows 검증 → falsified (rate=0/5xx=0/timeout=0). 진짜 silent fallback family =
  team-agent.ts validator strict mode HARD_LIMIT=0 + Haiku reasoning 야구 stat 수치 (ERA/FIP/wRC+) 자연 hallucination. 7건 정량화
  (5/16-17 team agent path). credit_exhausted 5건 (5/15 잔재) + no_agentError null path 5건 (5/14 cycle 386 schema parity 부족) 추가
  분류. cycle 605 spec Step B "cron stagger 30s sleep" 직접 가치 X — 신 mitigation 방향 4 후보 박제 (prompt / whitelist / severity /
  강등 라벨 세분화). v2.0 전진 영향: n=119 baseline 중 v1.8 17건 sub-classify → real-debate 10건 만 v2.0 가중치 source (cycle 606
  결론 정확). 코드 변경 0 (spec + lesson 박제 only). silent drift family streak break — fix-incident chain 11 cycle gap 후 부활
  (cycle 596 → 607 = 11 cycle).

retro_metrics:
  - dominance check: review-code 14/20 → 13/20 (cycle 587~606 → 588~607, fix-incident 1+)
  - improvement saturation: 11/15 (cycle 593~607, fix-incident 자연 redirect)
  - ship-0 emergency stop: 미발동 (success outcome 박제)
  - 4 chain cooldown: 미발동
  - 2-chain alternation lock: distinct=4 (review-code/operational-analysis/explore-idea/skill-evolution + fix-incident 1+)

next_recommended_chain: fix-incident (heavy)
next_recommended_reason:
  본 cycle 발견 mitigation option A (BASE_PROMPT "inject 외 수치 인용 금지" 단일 line) 자연 후속. team-agent.ts BASE_PROMPT 또는
  HOME/AWAY ROLE 안 명시 → validator hallucination 7건 family 차단 검증. low risk + 명확 검증 path (PR + R7 머지 + 다음 주간
  predictions 모니터).
