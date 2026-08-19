---
date: "2026-08-19"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "a4bb0d05014a8f2ffefa704d7fcb0abc4c7aae67"
---


subtype: cycle-retro
cycle_n: 2224
chain_selected: review-code (heavy)
outcome: success

cycle 2223 next_recommended_chain 을 그대로 따라 신규 MLB 픽 surface(migration 048
+ mlb-submit/mlb-poll route + PickButton league prop) 를 직접 코드 read 로 감사.
poll/submit URL 은 league 분기됐지만 '분석 보기' AI 힌트 링크는 /analysis/game/[id]
(KBO 전용, parseInt 로 games.id INT PK 조회) 하드코딩 그대로 — MLB scheduled 경기
전체(aiWinProb 있는 카드)에서 오연결/404 발생하는 silent drift 확인.
analysisHref prop 추가 + MLB 호출부 정정 + 회귀 테스트 2건으로 fix, PR #2974
squash 머지 (ba56729b, state=MERGED 실측 확인).

next_recommended_chain: explore-idea or operational-analysis
next_recommended_reason: explore-idea<->review-code Feature-Drift Cycle alternation 자연 지속. operational-analysis gap=10(from 2215), 25-gap 트리거 근접 + 예측 데이터 fresher.
