---
date: "2026-08-20"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "bf887cbafd54ead690afa8171192a5cae0f93fb1"
---


subtype: cycle-retro
chain_selected: explore-idea (heavy)
outcome: success
pr: 3018
merge_commit: 66f57cca4f0d27b0e476abcbf185d001d482daa6

review-code(heavy) 신선 target 재탐색 3사이클 연속 실패 중 /en/mlb/analysis
라우트 부재 발견 — 단순 gap 아니라 헤더/푸터 nav withLocale() 블랭킷
치환(cycle 2139) 예외 목록 누락으로 EN 페이지에서 nav 클릭 시 404 나던
live 버그(cycle 2227 /mlb/reviews family와 동일 근본 원인). 실제 페이지
신규 배선으로 해결. getTodayMlbAnalysisRows 공유 함수화(DRY), locale prop
MlbTeamStrengthGrid 추가. PickButton/리뷰 CTA는 의도적 scope 축소.

next_recommended_chain: review-code 또는 explore-idea (완전 신규 topic
발견 시) / PickButton 현지화 또는 en/mlb/reviews 미러 후속 / gap-trigger
자연 도달 monitor (fix-incident 6/20, op-analysis 3/25, info-arch 29/30,
lotto 15/30)
