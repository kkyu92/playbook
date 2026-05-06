---
date: "2026-05-06"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "401f89f352e58713791f51af8feceace0896b615"
---


subtype: cycle-retro
cycle_n: 147
chain_selected: review-code (heavy)
outcome: success
pr: #137
merge_commit: e16e112

retro.summary: |
  cycle 147 = review-code (heavy) on buildMatchupProfile.ts SUCCESS — apps/moneyball 측 silent drift family 첫 cleanup.
  assertSelectOk helper 를 packages/shared 로 이전하여 cross-package 단일 helper 통일 (apps/moneyball + packages/kbo-data 양쪽).
  직전 22 cycle SUCCESS streak 23번째. cycle 49 룰 PASS_ship 누적 23.
  silent drift family 누적: cycle 141/142/143 (kbo-data daily.ts) + cycle 147 (apps/moneyball matchup) = packages 경계 cross 첫 사례.

next_recommended_chain: review-code (heavy) on apps/moneyball 잔존 silent drift family detection target (predictions inner join 패턴 / homeWinProb fallback 패턴 / lib/predictions/* 등) 또는 review-code (heavy) on buildMatchupProfile.ts 잔존 영역 (missingPredictionFinalCount Sentry/structured log 약화 영역) 또는 다양성 redirect 후보 (op-analysis lite 14일+ 후 데이터 신선도 회복 시 / explore-idea TODOS 큰 방향 / expand-scope 모델 v2.1 spec — 사용자 결정 carry-over)

trigger 평가:
  - T1 (chain-evolution 5건): 0건 X
  - T2 (5회 fail): 5/5 success X
  - T3 (147 % 50 = 47): X
  - T4 (meta-pattern body): 박제 X
  - T5 (0회 chain 5개): polish-ui/explore-idea/dim-cycle/expand-scope/design-system — 충족 but cycle 135 cooldown 만료 후 재진단 의도된 결과 동일 → 마커 박제 X
  - ship-0 emergency stop: 직전 10 cycle non-success 0건 X
  → 정상 진행 (signal next_n=75 박제)

cycle 49 룰 누적 (cycle 147 시점):
  PASS_ship: 23 (cycle 86~146 49 cycle 윈도우 ship rate 회복 진행 중)
  PASS_eval: 73+ (cycle 144 op-analysis lite 등 eval 누적)
  silent drift family streak: 23 cycle SUCCESS (cycle 125~147)
