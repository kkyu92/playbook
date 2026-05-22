---
date: "2026-05-22"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "1dc36a830245f68dcf5a4692e6c3b0a79a2e3b49"
---


subtype: cycle-retro
cycle_n: 864
chain_selected: fix-incident (heavy, op-analysis-discovered)
outcome: success
pr: #1220 c18d05e

retro.summary:
op-analysis heavy 직접 측정 (v1.8 cohort split + Brier + ETA + 7일 predict_final 분석) 부수 발견으로 silent_drift_alert 86% false positive bug fix.

측정 결과 (v1.8 cohort n=32, cycle 864):
- real-debate: n=10, acc=50.0%, Brier=0.2988 (mean_conf=0.436)
- credit-fail: n=22, acc=40.9%, Brier=0.1924 (mean_conf=0.418)
- TOTAL: acc=43.8%, Brier=0.2256 (vs cycle 775 baseline n=30/43.3%/0.2241)
- velocity: +2 rows in 9 days = 0.22/day → n=150 ETA ~531 days

silent_drift_alert false positive evidence:
- predict_final 직전 7일 7회 실행 → 6회 alert (86%)
- 6회 모두 false positive: predict mode 가 아침에 박제 → predict_final existingSet cover → predictionsGenerated=0 정상 동작인데 alert
- 기존 shouldAlertSilentDrift = predictionsGenerated===0 only check (existingSet 미고려)

fix scope (PR #1220):
- SilentDriftAlertMeta.existingPredictionsCount?: number 추가
- shouldAlertSilentDrift = (predictionsGenerated + existing) < gamesFound
- daily.ts mutable holder + existingSet.size 동기
- 5 신규 test + 2 정정 (8→13 tests)

next_recommended_chain: review-code (heavy, sweep 43 — CLAUDE.md 사례 11 alert false positive evidence + 본 fix coverage 박제) OR explore-idea (lite, plan #4 TabPFN carry-over) OR lotto (lite, 2026-05-23 추첨 D-day OOS 검증)

evidence:
- cycle 861 op-analysis lite SUCCESS carry-over: credit-fail/real label split 미측정
- cycle 863 retro next_rec: op-analysis heavy 명시
- 본 cycle 864 op-analysis 직접 측정 + bug discovery + fix-incident redirect = chain pool 자연 진화 (op-analysis heavy → fix discovery → fix-incident ship)

silent drift family streak ~328 cycle (cycle 458 → cycle 864) 유지. alert channel 정정 첫 사례 — cycle 819 PR #1179 인프라 박제 후 첫 실측 정정 (false positive 6 fires 기반 evidence-driven fix).

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
