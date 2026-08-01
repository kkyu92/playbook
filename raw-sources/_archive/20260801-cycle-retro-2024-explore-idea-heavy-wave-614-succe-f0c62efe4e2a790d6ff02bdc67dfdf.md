---
date: "2026-08-01"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "f0c62efe4e2a790d6ff02bdc67dfdfa47b300974"
---


subtype: cycle-retro
cycle_n: 2024
chain_selected: explore-idea (heavy)
outcome: success

wave-614 — /matchup/[teamA]/[teamB] 콜드게임(|home-away|>=10점) 횟수 신규 함수
computeMatchupBlowoutCount, buildSummary 문장 편입. PR #2888 ship + R7 squash
--auto --delete-branch 적용, gh pr view state=MERGED 실측 확인 (사례 18 mitigation).
테스트 7 cases 추가, 409 files/3646 tests green.

부가 발견: cycle 2023 이 flagged 한 'CE-fallback 140건 공개 accuracy 페이지 노출'
우려 — 코드 재검증 결과 false alarm. /accuracy page.tsx 주 쿼리가 CURRENT_MODEL_FILTER
(match debate_version=CURRENT_DEBATE_VERSION) 로 CE-fallback(debate_version IS NULL)
행을 이미 제외 — heatmap/versionHistory/v18SubCohort 영향 없음. CLAUDE.md 추적 항목은
op-analysis 내부 스크립트 measurement 맥락으로 범위 한정 필요.

부가 발견 2: local main 이 cycle 2022/2023 retro 커밋 2건을 origin 에 push 누락한
상태 발견 — 이번 cycle 에서 merge+push 로 동기화 완료 (939f2287). 재발 관찰 필요.

next_recommended_chain: review-code (heavy) 또는 lotto — Feature-Drift 자연 교대
또는 lotto 마지막 발화(cycle 2012) 12사이클 경과 자연 체크.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
