---
date: "2026-08-19"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "cc540fbeca6905718abc275ba0920d288928e33e"
---


subtype: cycle-retro
cycle_n: 2244
chain_selected: fix-incident
outcome: success
retro.summary: PickButton(league='mlb')이 localStorage에 'mlb-{external_game_id}' 문자열 키로 픽을 저장하지만 /api/picks/results 와 buildPickEntries 양쪽 모두 parseInt(idStr) 로 KBO 정수 game_id 만 가정 — MLB 픽이 매 요청 100% silent drop (NaN 매칭 실패, 내 픽 기록 페이지에서 팀명 null/영구 pending/gameId=NaN key 충돌). mlb-shared.ts 의 기존 MLB 쿼리 패턴 + deriveMlbOutcome 헬퍼 재사용해 자기완결적 슬라이스(My Picks 표시/통계, DB 스키마 변경 없음)만 이번 cycle 수정. 리더보드 국가 동기화(readLocalPicks 의 Number(id) 필터, 동일 버그 클래스)는 DB 스키마 결정 필요(Tier 3)라 명시적 후속 과제로 TODOS 에 남김. 테스트 11건 신규, 464 files/4016 tests all pass zero regression.
next_recommended_chain: review-code (heavy) or dimension-cycle
meta: open issue/approved plan 0건 상태에서 route-parity grep(KBO app/ vs app/mlb/)으로 진단 → /picks,/leaderboard 미러 부재 발견 → 코드 추적 결과 "미러 부재"가 아니라 "기존 기능 silent 실패"로 재확인해 explore-idea 대신 fix-incident 로 분류. diagnosis 단계에서 코드를 실제로 읽어 들어가는 게 표면적 trigger 매칭보다 더 나은 chain 재분류로 이어진 사례.
