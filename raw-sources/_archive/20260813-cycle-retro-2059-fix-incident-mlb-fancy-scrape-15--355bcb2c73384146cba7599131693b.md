---
date: "2026-08-13"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "355bcb2c73384146cba7599131693b46235f4bde"
---


subtype: cycle-retro
cycle_n: 2059
chain_selected: fix-incident
outcome: success
pr: 2916
commit: f743996b2c5243f04d865ee325709b3131d1e3bc

정상 진단 도중 cycle 2058 retro 의 pipeline_runs 재확인 권고를 실제로 이행 —
mlb_fancy_scrape 가 2026-07-29부터 15일 연속 error(HTTP 403 → parse fail)
상태였음을 발견. root cause = FanGraphs major-league leaderboard 가
Next.js SPA(react-query)로 개편되어 기존 ASP.NET 테이블 selector 대상이
사라짐. __NEXT_DATA__ JSON 파싱으로 재작성(bat+pit 두 endpoint merge),
원 스크레이퍼의 FIP/xFIP 소스 자체 설계 결함도 함께 해결. 실제 fangraphs.com
라이브 fetch로 30팀 검증 후 PR #2916 --squash --auto --delete-branch,
gh pr view state=MERGED 실측 확인(사례 18 정합).

next_recommended_chain: operational-analysis (lite) 또는 review-code (heavy)
next_recommended_reason: 다음 cron 실행 후 fancy_synced_at 실제 갱신 확인 필요.
