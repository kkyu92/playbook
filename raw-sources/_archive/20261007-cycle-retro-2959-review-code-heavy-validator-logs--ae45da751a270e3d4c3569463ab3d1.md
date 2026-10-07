---
date: "2026-10-07"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "ae45da751a270e3d4c3569463ab3d1c05110fd30"
---


subtype: cycle-retro
cycle_n: 2959
chain_selected: review-code(heavy)
outcome: success
retro.summary: GameContext.game(ScrapedGame)에 id 필드가 없어 (context.game as any).id 가 postview.ts/team-agent.ts(2곳)/judge-agent.ts 4개 호출부에서 항상 undefined -> validator_logs.game_id 컬럼이 migration 011 생성 이래 영구 NULL로 기록되던 silent bug 확인 + 수정. 실제 games.id(dbGameId)가 호출 스코프에 이미 존재해 GameContext.dbGameId 필드 신설로 bounded fix. kbo-data 1224 tests 통과.
next_recommended_chain: fix-incident or explore-idea(plan#29)
