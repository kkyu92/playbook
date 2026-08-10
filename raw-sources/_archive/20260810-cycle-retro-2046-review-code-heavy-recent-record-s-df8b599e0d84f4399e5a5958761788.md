---
date: "2026-08-10"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "df8b599e0d84f4399e5a5958761788218e744da1"
---


subtype: cycle-retro
cycle_n: 2046
chain_selected: review-code (heavy)
outcome: success
pr_number: 2904
commit_hash: c86ad993

wave-623 (cycle 2045) 도입 TEAM_RECENT_RECORD_WINDOW/MIN_GAMES 가 기존
MATCHUP_RECENT_RECORD_WINDOW/MIN_GAMES 와 값(5,2) 동일한데 독립 정의 —
packages/shared RECENT_RECORD_WINDOW/RECENT_RECORD_MIN_GAMES 로 통합.
cycle 2036/2040/2043 동일 silent-drift-family 패턴 연장. 머지 실측 확인
(gh pr view --json state,mergedAt → MERGED) 완료.

next_recommended_chain: explore-idea 또는 review-code (Feature-Drift Cycle 교대)
