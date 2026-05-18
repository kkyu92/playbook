---
date: "2026-05-18"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "4296a6b710e44a23f06d2eedb8856f167f781e6b"
---


subtype: cycle-retro
cycle_n: 565
chain_selected: review-code (heavy)
outcome: success
pr_number: 776
commit_hash: 8f1d139

summary:
postview-daily.ts (319 line) JSDoc 8 stale marker 제거:
- Phase v4-3 Task 5 라벨 1곳 (file header)
- cycle 161 silent drift family 4곳 (games select / pre_game select / existing post check / teams lookup)
- cycle 334 fix scoring_rule 상속 1곳
- cycle 384 fix-incident heavy + PR #372 패턴 1곳 (agentsFailed 차단)
- cycle 171 silent drift family write 측 4번째 진입 1곳 (upsert)
- cycle 379 silent drift family fix 1곳 (resolveOriginalHomeWinProb JSDoc bug history)

WHY 시맨틱 보존:
- assertSelectOk fail-loud (silent skip 차단)
- ANTHROPIC credit 소진 → fallback verdict silent label (errors push + version 강등)
- assertWriteOk fail-loud (unique violation/RLS silent skip → 무한 재시도 + 토큰 낭비)
- reasoning.homeWinProb 누락 → factor attribution 깨진 채 agent_memories 학습 (invariant)

검증:
- type-check PASS / 619 tests PASS (49 files) / grep stale marker 0건
- diff +15 -17 (32 line)

phase 7축 pipeline layer 진행:
- cycle 562 daily.ts (1st)
- cycle 564 live.ts (2nd)
- cycle 565 postview-daily.ts (3rd, 본 cycle)

next_recommended_chain: review-code (heavy) — backfill-* (sp/season/records/weather) 또는 backtest-* 잔존 파일 sweep
next_recommended_reason: pipeline layer 잔존 후보 8개 파일 grep 측정 필요. dominance streak 87 cycle 누적 — 2-chain lock 재발 시 explore-idea 또는 polish-ui carry-over 자연 redirect

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
