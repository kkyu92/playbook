---
date: "2026-05-18"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
fingerprint: "9cb4081457db03fc544ad1b5dc622614e667d32f"
---


subtype: lesson
chain: fix-incident (heavy)
trigger: cycle 605 spec Step B 명시 + cycle 606 next_rec confirmed
result:
  - H5 falsified: v1.8 silent fallback 17 rows ground truth 중 rate_limit_error 0 / server_error 0 / timeout 0
  - 진짜 family 정량화: validator hallucinated_number:hard 7 (5/16-17 team-agent path) + credit_exhausted 5 (5/15 잔재) + no_agentError null path 5 (5/14 schema parity 부재)
  - cycle 605 spec Step B "cron stagger 30s sleep" 직접 가치 X. 신 mitigation 방향 4 후보 박제:
    A. BASE_PROMPT "inject 외 수치 인용 금지" 단일 line (low risk, 다음 cycle 후보)
    B. NUMERIC_WHITELIST 확장 (medium risk)
    C. severity 변경 (high risk)
    D. 강등 라벨 mv='v1.8-vfail/credit/other' 세분화 (zero-risk observability)
v2.0 영향:
  - n=119 baseline 중 v1.8 17건 sub-classify → real-debate 10건 만 v2.0 가중치 source (cycle 606 결론 정확)
  - n=150 임계 도달 후 backtest harness 진입 시 sub-cohort 명시 의무

evidence:
  - Supabase REST query: predictions where scoring_rule='v1.8' AND model_version='v1.8' AND verified_at IS NOT NULL LIMIT 50 → 17 rows
  - reasoning.debate.agentError 분류 정확 분포

related:
  - docs/lessons/2026-05-16-v18-credit-recovery-validator-hard-fail.md (cycle 502 단일 사례 첫 박제)
  - docs/superpowers/specs/2026-05-18-cycle-605-v2-transition-roadmap.md (Step B 정정 대상)
