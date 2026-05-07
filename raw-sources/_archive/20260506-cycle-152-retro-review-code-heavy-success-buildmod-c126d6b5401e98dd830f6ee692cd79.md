---
date: "2026-05-06"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "c126d6b5401e98dd830f6ee692cd79203f63164a"
---


subtype: cycle-retro
cycle_n: 152
chain_selected: review-code (heavy)
outcome: success
pr_number: 142
commit_hash: 6077091

요약:
cycle 152 = review-code (heavy) on apps/moneyball/src/lib/dashboard/buildModelTuningInsights.ts.
cycle 147~151 silent drift family detection 시리즈의 apps/moneyball lib/dashboard 차원
첫 진입. predictions select 가 `.error` 미체크 + 직접 destruct → DB 오류 시 data=null
silent fallback → 빈 sample 배열 → analyzeFactorAccuracy minSamples 30 미달 보고 →
"수집 중" report 가 사용자에게 노출 (실제론 DB 오류) 패턴. assertSelectOk 통일 후
error 시 throw → /dashboard page boundary (error.tsx) 처리.

apps/moneyball 차원 silent drift family 진입 sequence (cycle 152 시점):
- lib (matchup): cycle 147 buildMatchupProfile teams + games select
- page: cycle 148 analysis page getTodayBigMatch + getYesterdayGames
- route handler: cycle 149 RSS feed route
- (cycle 150 skill-evolution 10 메타 — silent drift X)
- lib (teams): cycle 151 buildTeamProfile teams + games select
- static asset: cycle 151 opengraph-image
- lib (dashboard): cycle 152 buildModelTuningInsights predictions ← 본 PR

cycle 49 룰 누적 (cycle 152 시점):
- PASS_eval = 누적 (cycle 144 op-analysis lite + 본 cycle 152)
- PASS_ship 누적 = 27 (cycle 50 polish-ui 1번째 → 본 cycle 26번째 review-code → 27번째)
- cycle 125~152 = 28 cycle SUCCESS streak (cycle 134 fix-incident + cycle 144 op-analysis
  lite + cycle 150 skill-evolution 10 메타 외 모두 review-code)

cycle 135 dominance-positive streak 인정 룰 정확 작동:
- silent drift family target 명확 시 review-code (heavy) 자연 발화 OK
- 같은 chain N 연속 발화 + outcome=success streak ≥3 = 자가 의심 차단
- 0회 chain 5개 의도된 결과 항구화 (cycle 135/150 박제 재현)

cycle 124 룰 작동 측정 (28 cycle 윈도우 확장):
- emergency stop 0건 trigger (직전 10 cycle 모두 success)
- lite cap 0건 trigger (5 연속 retro-only X)
- ship rate 27/28 = 96.4% (cycle 144 op-analysis lite retro-only 만 ship X)

next_recommended_chain: review-code (heavy) on apps/moneyball/src/app/dashboard/page.tsx
(getOverview / getFactorErrors / getTotalPredCount 3개 함수 동시 통일) — cycle 148
analysis page 한 사이클 2개 함수 통일 패턴 따름. 또는 다양성 redirect.
