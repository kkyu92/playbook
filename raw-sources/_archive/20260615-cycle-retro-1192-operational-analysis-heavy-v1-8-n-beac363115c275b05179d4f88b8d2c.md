---
date: "2026-06-15"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "beac363115c275b05179d4f88b8d2c81436e1123"
---


subtype: cycle-retro
cycle: 1192
chain: operational-analysis (heavy)
outcome: success
pr: 1980

direction A.2 검증 결론:
- v1.8 cycle 1192: n=90 / 58.9% / Brier 0.2588 = cycle 1187 baseline ZERO delta
- baseline 측정 ~1시간 전 → 측정 간격 부족 → capacity ceiling 가설 inconclusive
- KBO predict mode pattern = predict_window gating 의도 작동 (silent layer KBO 가설 reject)
- 신규 v1.8 5d: 15건 / 57.1% 일관 (velocity ~3/day, baseline velocity ~3.5/day 일관)

NEW silent drift family wave 21 (MLB predict_final):
- 24h 56 runs 100% status=error
- 49× "predictions insert: invalid input syntax for type integer: PHI"
- 7× "predictions upsert: there is no unique or exclusion constraint matching the ON CONFLICT specification"
- 사용자 가시 MLB 예측 전체 silent

decisions:
- v1.8 n=150 ETA 재확정: 2026-07-02 (현 velocity ~3.5/day, cycle 1148 박제 일관)
- A.2 재측정: ≥7 cycle 후 / ≥2026-06-18
- 다음 cycle 강력 권장: fix-incident heavy (MLB wave 21 박제)
- predicate fix #1979: KBO 0건 fire / MLB 56건 fire trigger — 사용자 Telegram 수신 evidence carry-over

next_recommended_chain: fix-incident (heavy)
next_recommended_reason: MLB silent drift family wave 21 — 명시적 schema mismatch evidence + 사용자 가시 critical + 1 cycle 안 fix scope

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
