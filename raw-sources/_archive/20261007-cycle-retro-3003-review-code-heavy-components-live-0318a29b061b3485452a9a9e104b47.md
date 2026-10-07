---
date: "2026-10-07"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "0318a29b061b3485452a9a9e104b470291dac7bc"
---


subtype: cycle-retro
cycle_n: 3003
chain_selected: review-code(heavy)
outcome: retro-only
summary: 직전8(2995-3002) distinct=4, 2-chain lock 미충족. op-analysis(Supabase egress quota 402, 65일+) 차단 지속 — 재측정 noise 라 skip. fix-incident gap=3·info-arch gap=27·lotto cron 산출물 둘 다 신선 — 전부 미근접. cycle 3002 추천대로 components/live(42일+)·components/dashboard(36일+) 전수 read(16파일 ~2050줄) — ACCURACY_GOOD_RATE/ACCURACY_BASELINE/SMALL_SAMPLE_N/SMALL_SAMPLE_THRESHOLD/MIN_TEAM_PREDICTIONS 등 모든 주석 수치 claim 을 shared 상수·buildAccuracyData.ts 실제 값과 대조, ModelTuningInsights 제안가중치 공식 주석을 factor-accuracy.ts 로직과 대조, brand-500(#2d6b3f) 녹색 라벨 정확성 확인, BrierTrendChart SR_COLOR_MAP 의 CURRENT_SCORING_RULE 동적 키 충돌 없음 확인, 기존 테스트(silent-drift-cycle-2621/ScoringRuleDayHeatmap) 현재 코드와 정합 재확인. drift 0건.
next_recommended_chain: review-code(heavy) 또는 info-architecture-review (gap=27, 2-3 cycle 내 30 도달)
