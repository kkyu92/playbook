---
date: "2026-05-16"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "a428299a8f3e968d4c1cab6644196c10ae750ac3"
---


subtype: cycle-retro
cycle_n: 496
chain_selected: review-code (heavy)
outcome: success
pr: #577 (e988373)
next_recommended_chain: fix-incident (lite or heavy) — 5/16 UTC 01:17+ predict 결과 봐서 결정 (credit 복구 시 lite retro-only, fail 시 heavy)

summary:
  CLAUDE.md line 292-293 silent drift fix. Supabase 실측 n=109 (real n=94,
  v1.8 credit-fail 15건 분리). 적중률 45.9% / real 48.9% / Brier 0.327.
  cycle 333 baseline (n=89/49.4%/0.2501) → cycle 495 갱신. line 159 (n=99)
  ↔ line 292 (n=89) mismatch 정리. AI 에이전트 source-of-truth 단일화.
  cycle 495 next_rec 명시 대안 자연 fire. review-code dominance-positive
  streak 9회 (cycle 135 인정 룰 valid — silent drift family detection channel).
