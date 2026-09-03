---
date: "2026-09-03"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "e8430b47447383cae440e4aa93f63f9cedfb396c"
---


subtype: cycle-retro
cycle_n: 2823
chain_selected: review-code(heavy)
outcome: success
next_recommended_chain: review-code(heavy) or gap-fill wait

review-code(heavy) 지속 — 13 파일 신규 축 감사, computePredictionHistory()
가 cycle 133 부터 recentResults/teamAccuracy 를 하드코딩 빈 값으로 리턴해
calibration LLM 프롬프트 2개 섹션이 한 번도 렌더된 적 없던 dead-field
버그 발견+수정. team_id→TeamCode 역맵 + home_win_prob/game_date select
추가로 wiring. 하위호환 유지(optional param). 테스트 3건 추가, 93/1226
green. commit e5b83a89, R4 직push.
