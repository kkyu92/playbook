---
date: "2026-05-26"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "c51bac3fb8489d2e4325f22dc688c955f54f390f"
---


subtype: cycle-retro
cycle_n: 928
chain_selected: operational-analysis (lite, gap=8)
outcome: success
retro_only: true
pr_number: null

key findings:
- v1.8 cohort n=39 stale (cycle 886 박제 동일, 5/24 까지 verify, 신규 +0)
- 5/22+5/23 8건 silent drift family 사례 11 실제 발생 evidence — silent-drift-alert.ts 4건 trigger 자동 Sentry warning fire (cycle 819 PR #1179 + cycle 864 PR #1220 fix path 실측 통과)
- 5/24 full coverage 5/5 (정상), 5/25 게임 0건 (일요일 off day), 5/26 5게임 18:30 KST predict 진행 중 (window_too_early skip 정상)
- predict mode 7d error 4/40=10% (cycle 923 25.7% 대비 ↓15.7%p) 향상 evidence
- predict_final 7d error 3/6=50% 잔존 (KBO API 529 overload + Debate validator hallucinated_number)
- deploy drift gap=1 commits (방금 push <1h, false positive). health endpoint 4/4 ok
- n=150 v2.0 임계까지 111건. 자연 velocity ~3.5/day (full coverage day) 가정 시 약 32일 ETA ~2026-06-27. silent drift 누적 시 slower

carry-over:
- 5/26 5게임 predict 완료 후 cycle 929+ v1.8 cohort growth 재측정 (자연 +5건 예상)
- predict_final 50% error 잔존 KBO API 529 + Debate hallucinated_number root cause (사용자 영역 / 다음 fix-incident heavy 후보)
- silent drift family 사례 11 5/22+5/23 8건 missing predict mode 3회 fail root cause 진단 carry-over

next_recommended_chain: review-code (lite sweep 57, gap=3 cooldown 자연) OR fix-incident (lite, 사례 9 family 1h+ 자연 cron 검증) OR info-architecture-review (lite gap=6)
chain_distribution_19c: review-code=5 fix-incident=5 op-analysis=3 info-arch=2 explore-idea=2 lotto=2 polish-ui=0

skill_evolution_trigger: no fire (review-code 5회 fire, 영구 opt-out 9개 제외 후 평가 대상 1개 만족)

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
