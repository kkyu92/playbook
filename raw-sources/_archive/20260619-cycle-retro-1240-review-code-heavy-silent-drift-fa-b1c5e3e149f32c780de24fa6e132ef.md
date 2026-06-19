---
date: "2026-06-19"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "b1c5e3e149f32c780de24fa6e132ef9b54a6b9cd"
---


subtype: cycle-retro
cycle_n: 1240
chain_selected: review-code (heavy)
outcome: success
pr: 2025
commit_fix: 22e0202

retro.summary: wave 48 silent drift family — non-agent layer 첫 fix. wave 41~47 (LLM agent context layer 통합 7 agent series) 직후 cycle 1239 retro next_rec 매핑한 review-code (heavy) 자연 fire. TIME_WINDOWS.recent_form 박제 (7 games) vs 실제 운영 (10 games — KBO 공식 ranking 테이블 "최근10경기" 컬럼 source + types.ts homeRecentForm + 사용자 가시 about/standings/glossary/teams/recent 모두 10) silent mismatch 정정. LLM agent prompt 가 renderTimeWindowsForLLM() 호출 시 잘못된 윈도우 보고하던 패턴 차단.

next_recommended_chain: review-code (heavy) — wave 49 후보 (잔여 non-agent silent drift: predictor.ts comment vs DEFAULT_WEIGHTS / methodology page metric desc vs MetricRegistry / pipeline daily.ts payload field naming) OR explore-idea (heavy) — plan #23 wave 종결 / 신규 product direction OR operational-analysis (lite) — cycle 1245+ cohort 재측정

skill-evolution trigger eval (cycle 1240 inclusive N-19..N=1221-1240):
  - sample size 19 / 20 ≥ 10 OK
  - review-code 9회 fire / 평가 대상 1개 = review-code (≥ 1 fire) → 미충족
  - cycle_n % 50 = 40 ≠ 0
  - 5 연속 fail: 직전 5 = success/success/success/retro-only/success → 미충족
  - chain-evolution 5건 누적 / meta-pattern "SKILL 갱신 필요" → 미충족

ship-0 emergency stop eval: 직전 10 cycle outcome 분포 = 9 success + 1 retro-only → not triggered.

자동 진행: signal next_n=17 (사용자 N=18 호출 후 1 cycle 완료).
