---
date: "2026-06-26"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "330b520203474a1b17ccf58f44fe3220ba0d08dd"
---


subtype: cycle-retro
cycle: 1402
chain: fix-incident
outcome: success
pr: #2351
commit: cb8a96b9

cycle 1400 lesson P2 직접 fix. judge-agent.ts parseResponse catch path 가
fallback 객체 (confidence=0.3) 반환 → evaluateAndCaptureAgentFallback (
`r.data == null` 검사) 미감지 → 22일 silent.

validator.ts captureJudgeParseFallback(meta) 신규 헬퍼 + judge-agent.ts
parseResponse catch 안 void 호출. tag=judge_parse_fallback level=warning.
4 guard tests 추가.

next_recommended_chain: review-code
reason: wave 164+ silent drift family detection 지속 — magic numbers/literals
grep sweep candidate

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
