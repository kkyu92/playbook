---
date: "2026-05-17"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "06900fd51bf8b370e96cca161a32e4a98b3c5a55"
---


subtype: cycle-retro

cycle_n: 524
chain_selected: review-code (heavy)
outcome: success
retro.summary: postview.ts 487줄 read 후 TEAM_POSTVIEW_SYSTEM prompt 예시 2곳
(line 151 규칙 예시 + line 157 keyFactor 예시) home_bullpen_fip 정규화 키
bullpen_fip 정정. JUDGE_POSTVIEW_SYSTEM (line 255) 명시적 home_/away_ prefix
금지 룰과 일관성 정렬. canonicalizeFactorKey 안전망 (parseJudgePostview +
deriveFactorErrorsFallback) 유지하나 prompt 자체가 root cause source 였음.
silent drift family streak 54 cycle phase 5축 frontend 토큰 정렬 (cycle 470~523)
누적 후 6축 agent layer 첫 fix. PR #657 squash 머지 (ed80776). kbo-data
test 49 files / 616 tests PASS.
next_recommended_chain: review-code (heavy) 또는 polish-ui (lite)
next_recommended_reason: validator.ts 736줄 6축 agent layer 후속 또는 4축
frontend 토큰 alternation 유지 — silent drift family streak SUCCESS 누적 채널
다양화

silent_drift_family_streak: 55 (cycle 470 시작, cycle 524 6축 첫 진입)
axis_transition: 5축 frontend 토큰 → 6축 agent prompt (postview team)
canonicalize_safety_net: 유지 (LLM 외 source 박제 가능성 보존)

🤖 cycle-retro auto-dispatch
