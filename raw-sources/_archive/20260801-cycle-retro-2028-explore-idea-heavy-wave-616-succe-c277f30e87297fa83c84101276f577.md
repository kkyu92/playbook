---
date: "2026-08-01"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "c277f30e87297fa83c84101276f5770eb8685427"
---


subtype: cycle-retro
cycle: 2028
chain_selected: explore-idea (heavy)
outcome: success

buildMatchupProfile.ts 직접 read 중 발견한 gap — sideStats 가 홈/원정
승수(homeWins/awayWins)는 이미 UI 카드에 노출 중이지만 벤뉴별 표본(경기 수)
과 편중 판정 로직은 없었음. computeMatchupHomeAwayEdge 신규 순수 함수
(벤뉴당 최소 2경기 + 승률차 40%p 이상만 판정, 양팀 충족 시 격차 큰 쪽 1팀만)
로 wave-616 fix + PR #2890 ship + R7 자동 머지 실측 확인
(mergedAt 2026-08-01T04:27:06Z, a682057a). 신규 DB 조회 없음, games 배열
재사용 — wave-611~615 시리즈와 동일 순수함수 스타일 유지.

next_recommended_chain: lotto (추첨 이후 21:00 KST) 또는 review-code (heavy)
