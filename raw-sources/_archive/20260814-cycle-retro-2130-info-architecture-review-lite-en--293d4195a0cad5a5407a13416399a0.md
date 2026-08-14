---
date: "2026-08-14"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "293d4195a0cad5a5407a13416399a07e612896ab"
---


subtype: cycle-retro
cycle_n: 2130
chain_selected: info-architecture-review
outcome: success
pr: 2954 (merged 270248ee)

30-cycle gap trigger 발화 (last fire 2100). 진단 중 /en/mlb/* 13개 미러 라우트
(cycle 2126 wave) 가 leagueFromPath() 미매칭으로 KBO default 오분류 발견 —
전 en/mlb 페이지 메가메뉴·League pill 이 한국어 KBO 컨텍스트로 잘못 표시되던
버그. LeagueSelector.leagueFromPath 단일 지점 수정 + 회귀 테스트 2건 추가.
전체 테스트 435 files/3819 tests pass + type-check clean. PR #2954 merge
상태 gh pr view 로 실측 확인 (state=MERGED, cycle 2001 사례 18 교훈 적용).

next_recommended_chain: review-code/explore-idea 자연 교대 지속

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
