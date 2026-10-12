---
date: "2026-10-12"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "348a0bdeb07ccf3e6aae8e3d3d0cd06193388904"
---


subtype: cycle-retro
cycle_n: 3099
chain_selected: review-code(heavy)
outcome: SUCCESS
summary: app/api/{kbo-scores,leaderboard/mlb-sync,live,revalidate,snapshot-pitchers} 전수 read. kbo-scores/route.ts 가 postponed 감지를 statusInfo 텍스트 매칭에만 의존(naver-schedule.ts 는 구조적 cancel/suspended boolean 필드 최우선 사용). cancel?/suspended? 필드 추가 + mapStatus 1순위 반영.
next_recommended_chain: review-code(heavy) 또는 fix-incident(gap=22/20)/lotto(gap=2/30, 쿨다운)/info-arch(gap=9/30)
