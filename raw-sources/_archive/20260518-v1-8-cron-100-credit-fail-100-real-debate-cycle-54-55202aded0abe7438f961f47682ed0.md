---
date: "2026-05-18"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "55202aded0abe7438f961f47682ed05d38c5138f"
---


subtype: lesson
source: cycle 542 operational-analysis (lite)
sample_n: v1.8 25건 (credit-fail 15 + real-debate 10)

패턴:
- 평일 (5/13 Wed / 5/14 Thu / 5/15 Fri) v1.8 prediction 15건 모두 16:17 KST 생성 + conf=0.3 credit-fail (Anthropic API 무응답 fallback 추정)
- 주말 (5/16 Sat / 5/17 Sun) v1.8 prediction 10건 모두 11:18 또는 14:18 KST 생성 + conf=0.45~0.58 real-debate (정상 응답)
- 표본 평일 15 / 주말 10 = 모두 일관 (anecdote X, preliminary signal)

원인 가설:
1. 평일 18:30 KST 경기 → 16:30 KST predict cron 시점에 Anthropic API timing 충돌 (Vercel cron 또는 worker fire window)
2. Anthropic credit 한도 평일 만료 + 주말 reset 윈도우 (계정 reset cycle 가설 — 사용자 측 monthly reset 일 확인 필요)
3. Cloudflare Worker 평일 evening cron 만 timeout (network/dispatch retry 부족)

기각된 가설:
- "v1.8 모델 자체 신뢰도 낮음" — credit-fail 은 모델 응답 자체가 X (lottery fallback), 모델 신뢰도 무관
- "주말 데이터 품질 더 좋음" — credit-fail 은 데이터 품질 무관, API 호출 성공 여부 binary

영향 (현재 운영 데이터 오염):
- v1.8 평일 5게임/일 = lottery prediction (confidence=0.3 = 균등 사전 분포)
- 적중률 측정에 v1.8 credit-fail 15건 포함 시 36.0% / 분리 시 real-debate 만 50.0%
- 사용자 가시 가치 = 평일 prediction 5건/일 효과 X (lottery 와 동일)

actionable next steps (다음 fix-incident chain 후보):
1. Vercel cron logs (UTC 07:17~07:18 = 평일 16:17 KST) Anthropic API response 확인
2. Cloudflare Worker logs sp_confirmation_log + daily.ts mode=predict trigger 시각 측정
3. ANTHROPIC_API_KEY 한도/billing status 확인 (Anthropic Console)
4. retry/fallback 로직 검토 — packages/kbo-data/src/agents/llm.ts callLLM exponential backoff 3x 가 평일만 모두 소진되는지 측정

박제 위치:
- 본 commit body
- cycle 542 cycle_state.execution.results.extract-pattern

후속 cycle trigger:
- 다음 cycle fix-incident lite (Vercel logs 확인 only) 또는 heavy (retry 로직 변경 + R7 머지) 가능
- 본 cycle = operational-analysis lite (lesson + retro only, 코드 변경 X) — 신규 코드 미생성

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
