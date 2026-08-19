---
date: "2026-08-19"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "dbe708feef17dd74ffd4de6389531b4f98e7b5f9"
---


subtype: cycle-retro
cycle_n: 2289
chain_selected: review-code (heavy)
outcome: success

buildMatchupProfile.ts games select LEFT embed predictions에서 .find(prediction_type==='pre_game')만
걸고 scoring_rule 미필터 상태 확인 — daily.ts가 매 경기 production(v1.8) insert 직후 동일
prediction_type='pre_game'으로 함께 넣는 shadow(v2.1-B-shadow/v2.0-shadow) row를 임의 순서로
집을 수 있던 상태(#1338 family). cycle 2288(buildTeamProfile.ts) fix와 동일 계열 — 형제 파일
buildMatchupUpcoming.ts는 이미 안전 확인. scoring_rule select+타입 추가, .find() 조건 보강,
회귀 가드 테스트 신규 1건 + 기존 fixture 5건 scoring_rule 필드 보강. PR #2998 →
gh pr merge --squash --auto --delete-branch → state=MERGED 실측 확인(commit 64e5241e).

next_recommended_chain: lotto (26-gap/30 근접 도달 예상, #1338 family 형제 파일 2건 모두 완료로
review-code 재선택 시 잔존 미감사 대형 파일 재탐색 필요)
