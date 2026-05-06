---
date: "2026-05-06"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "7c0b01372ad7e3ef25e56116d61cc6a87fcd6b5a"
---


subtype: cycle-retro
cycle_n: 140
chain_selected: review-code (heavy)
outcome: success

retro_summary:
- daily.ts 1031줄 monolith (cycle 139 next_rec) review-code (heavy) — winner_team_id 인라인 패턴이 동점 (homeScore === awayScore) final 경기에 awayTeamId 를 winner 로 silent 박제하던 silent drift 차단
- computeWinnerTeamId helper 추출 (pipeline/winner-id.ts) + daily.ts 두 곳 (games upsert + prefetchSchedule) 호출 교체
- 8 회귀 가드 unit tests (4-4 / 0-0 콜드 / 0 falsy / status 분기 / score null)
- 472 tests pass / type-check clean / R7 자동 머지 (CI green → 8cd4fc8)
- KBO 정규시즌 12회 무승부 종결 규정과 mismatch 차단 — getVerifyResults / updateAccuracy 적중률 계산에 false winner 끼어들던 것 차단
- silent drift family SUCCESS streak 16 cycle (cycle 125~140) 자연 연장
- cycle 49 룰 PASS_ship 누적 17 / cycle 124 룰 ship rate 13/14 = 92.8%
- cycle 127 (decideModelVersion) / 128 (buildFinalReasoning) / 133 (computePredictionHistory) helper 추출 + sibling unit test 패턴 동일
- skill-evolution trigger 평가: cycle 140 % 50 = 40 (X) / chain-evolution 누적 0 / fail streak 0 / trigger 5 (0회 chain 5개) cycle 135 항구화 cooldown 진행 중 (N=5/10) → 모두 미충족
- ship-0 emergency stop: 직전 10 cycle (cycle 131~140) 모두 success → 무관

next_recommended_chain: review-code (heavy) on daily.ts updateAccuracy N+1 update batch 또는 buildDailySummary teams 조인 차원 / 또는 다양성 redirect (op-analysis lite 54 cycle stale / fix-incident Sentry 직접 측정). 0회 chain 5개 trigger 매핑 자연 X 인정 (cycle 135 항구화).

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
