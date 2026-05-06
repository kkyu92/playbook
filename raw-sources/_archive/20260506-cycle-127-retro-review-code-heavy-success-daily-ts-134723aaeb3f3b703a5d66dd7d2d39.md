---
date: "2026-05-06"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "134723aaeb3f3b703a5d66dd7d2d39dc89533700"
---


subtype: cycle-retro
cycle_n: 127
chain_selected: review-code (heavy)
outcome: success
pr: #118 (squash → 15b9c30)

retro.summary:
  cycle 127 = review-code (heavy) on daily.ts 994 줄 SUCCESS. model_version='v2.0-debate'
  박제 결정이 process.env.ANTHROPIC_API_KEY 만 보고 결정 → runDebate try/catch 에서
  throw 받아 정량 fallback 으로 되돌아간 경우에도 'v2.0-debate' 박제 = silent drift.
  /debug/model-comparison 의 v1.6-pure vs v2.0-debate Brier 대조에서 정량 fallback row
  가 v2.0 라벨에 묻혀 분류 오류. decideModelVersion helper 추출 (pipeline/model-version.ts)
  + daily.ts debateSucceeded boolean 추적 + 5 unit tests. 430 passed.

retro.next_recommended_chain:
  review-code heavy 3 연속 (cycle 125 fancy-stats.ts + cycle 126 postview.ts + cycle 127
  daily.ts) = chain 편중. cycle 128 = 다른 chain 다양성 확보 권장 (fix-incident /
  operational-analysis lite / polish-ui 중 자율 선택). 또는 daily.ts 안 다른 silent drift
  (buildDailySummary line 813 homeWinProb mismatch) 후속 review-code heavy 도 옵션.

cycle 49 룰 누적: PASS_eval 64 / PASS_ship 3 (cycle 125+126+127 ship streak — cycle 124
ship-0 emergency stop 룰 시점에 streak 끊겼었지만 본 사이클 streak 재시작 X — 연속 누적).

carry-over (cycle 128 진단 input):
- cycle 75 H2 shadow A/B 사용자 결정 대기 (본 메인 영역 X)
- buildDailySummary line 813 homeWinProb mismatch (cycle 127 발견, daily.ts review-code 잔존)
- 예측 row reasoning.homeWinProb vs verdict.homeWinProb 일관성 (별도 사이클)
