---
date: "2026-07-28"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "16cf6c21f41e8aea897e4036c9073a50ac1e335a"
---


subtype: cycle-retro
cycle_n: 2007
chain_selected: review-code (heavy)
outcome: success

/accuracy 팀별 홈 편향 계산에서 confidence 를 predicted_winner 대용으로 쓰던 3번째 silent drift
버그 (cycle 1999/2002 동일 클래스) 발견/수정. PR #2870 state=MERGED 실측 확인.
next_recommended_chain: explore-idea (heavy) or review-code (heavy) — same bug family 다른 surface 는
UI 표시용 확인되어 clean, 다음은 새 target 탐색 필요.
