---
date: "2026-08-20"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "51667f15d1ebc83477a0e0a3ad20160251c27577"
---


subtype: cycle-retro
cycle_n: 2326
chain_selected: fix-incident
outcome: success

fix-incident 20-cycle 주기 trigger 정확 도달(마지막 발화 cycle 2306). lite 진단
(pipeline_runs 7일 error rate + git log) 결과 mlb_fancy_scrape 403 오류 1건 발견 —
이미 cycle 2278 이 같은 날 7분 후 해결(User-Agent 헤더 누락 fix). 신규 인시던트는
아니었으나, 형제 스크레이퍼 grep 스캔 중 baseball-savant.ts 가 동일 위험 패턴
(fetch() User-Agent 미설정)을 갖고 있음을 발견해 예방적 fix 적용, PR #3016 →
R7 자동 머지(a0819071).

next_recommended_chain: operational-analysis (17/25 gap) 또는 explore-idea
(plan #24 matchup Phase2b 잔여 / plan #27 picks·leaderboard Phase3 데이터
블로커 재확인).
