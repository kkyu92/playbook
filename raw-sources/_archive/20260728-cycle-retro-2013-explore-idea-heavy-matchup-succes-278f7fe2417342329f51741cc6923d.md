---
date: "2026-07-28"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "278f7fe2417342329f51741cc6923d40ccecc675"
---


subtype: cycle-retro
cycle_n: 2013
chain_selected: explore-idea (heavy)
outcome: success
pr_number: 2880
merge_commit: 8517a70f3ea0a0ca31cc36c68f4d4aaf476c7d93

retro.summary: cycle 2013 explore-idea (heavy) — matchup 페이지에 시즌별(2023~2026)
상대전적 승패 요약 추가. cycle 2011 carry-over(홈/어웨이 split 불가 → 시즌 전체 트렌드/
N시즌 비교 검토) 를 실제 DB 조회(4개 시즌, 연 800건대 확인)로 검증 후 구현.
buildSeasonHeadToHead 순수 함수 + MatchupSeasonHeadToHead 컴포넌트, 기존
profile.games 재사용 (신규 쿼리 없음). 3616 테스트 전체 통과, PR #2880 R7 --auto
squash 머지 정상 작동.

next_recommended_chain: review-code (heavy) or explore-idea
