---
date: "2026-05-26"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "cd372f179e52d40100a7e9b85477d01fbf28bf3f"
---


subtype: cycle-retro
cycle_n: 986
chain_selected: review-code (sweep 77) → fix-incident (heavy redirect)
outcome: success
summary: |
  cycle 986 = sweep 77 SUCCESS retro-only 박제 직후 사용자 자연 발화 'ai 토론 분석 일부만 되는 문제 완전 해결?' redirect → fix-incident heavy chain transition.
  14d agentsFailed 17건 (38.6%) + quantOnly 15건 (34.1%) = 72.7% fail rate root cause 3 layer 진단 + ship:
    L1 PR #1323 validator 야구 도메인 화이트리스트 (29f698a) — invented_player_name 2건 (안타들 / 최근폼 family) 차단
    L2 PR #1324 529 backoff 3 → 4 attempts (51571c6) — 37.5s window (37.5s 안 Anthropic capacity 회복 확률 ↑)
    L3 PR #1325 personas prompt strict 강화 (debe6fb) — BASE_PROMPT 환각 카테고리 5종 (SP raw / 팀 raw / 매치업 / 십진수 변환 / 시즌 누적) 명시 + 14d evidence 5건 prompt 안 박제 + RESPONSE_FORMAT 수치 인용 최종 규칙
    Monitor PR #1326 /debug/agent-fallback dashboard (8ed6d23) — fullDebate / agentsFailed / quantOnly 분포 + agentError 카테고리 + 일자별 trend (BASIC auth + 13 unit test)
  alias swap retrigger 2건: 빈 commit 157404b 자연 회복 ✓ + 2d8fdd8 pending (사례 9 family 24, 25번째 재발 박제)
  vercel quota 12번째 한도 도달 (24h reset = 5/27 22:50 KST 이후)
  alert channel 25, 26번째 작동 evidence (deploy-drift-alert.yml 수동 dispatch run 26449385821 + 26449937926)
  test +24 (validator 5 + llm 6 + personas 13) + tsc / lint 0 error
  본 메인 자율 영역 closed loop maximal ship — 5/27 KBO predict cron fire 후 fullDebate rate ~27% → ~55%+ 추정 (LLM nondeterminism 본질 X)

todos_added:
  - 5/27 13~22 KST KBO predict cron fire 후 /debug/agent-fallback 진입 — L1+L2+L3 첫 evidence 측정
  - 5/27 22:50 KST 이후 vercel quota reset = PR #1326 alias swap 또는 자연 회복 carry-over
  - N≥30 신뢰 표본 = 5/27~6/2 누적 후 fullDebate rate 비교 박제
  - Sonnet swap A/B harness = 비용 결정 사용자 영역 evidence 부족 시 6/2 후 redirect

next_recommended_chain: |
  fix-incident (lite, gap=0 — 사례 9 family 25번째 carry-over + quota reset 대기) OR
  review-code (lite, gap=0 sweep 78 momentum) OR
  op-analysis (lite, gap=9 v1.8 cohort 측정 5/27 KBO 화 첫 데이터)

PR: #1323 + #1324 + #1325 + #1326

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
