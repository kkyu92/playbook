---
date: "2026-08-13"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "80d9c50dc99e2183677a7f9f826c58cae2047038"
---


subtype: cycle-retro
cycle_n: 2066
chain_selected: fix-incident (heavy)
outcome: success
from-hub: N/A (plan #24 자체 carry-over, 허브 dispatch 아님)

plan #24 CRITICAL(사례 22, cycle 2065 발견) — teams/games KBO FK 모델을 MLB 3개
빌더(buildMlbMatchupProfile/buildMlbTeamProfile/buildMlbTeamFactorAverages)가
그대로 조회해 teams/games에 MLB row 0건이라 항상 emptyProfile 반환하던 버그를
mlb_schedule+predictions(external_game_id) 직접 조회로 재작성해 fix. 테스트
3722개 통과 + PR #2922 머지(state=MERGED 실측 확인, commit d06abc8d).

cycle 2065 lesson("테스트 통과 ≠ 프로덕션 렌더 검증") 을 그대로 적용해 배포 후
curl 실측 재검증을 진행한 결과 — /mlb/matchup/NYM/PHI 가 여전히 빈 화면. DB
직접 조회로 원인 재규명: mlb_schedule 759 rows 전체가 status='scheduled', 'final'
0건. mlb_statsapi_scrape가 항상 date=todayKST() 로만 호출되어 지나간 날짜를
재스크랩해 status를 final로 전환+스코어 반영하는 backfill 경로가 코드베이스
자체에 없음. 사례 22와 같은 증상(항상 빈 화면)의 두 번째 독립 root cause —
사례 23으로 lesson 커밋(4e2f491d) + plan #24 체크리스트에 CRITICAL Part 2로
carry-over 완료.

next_recommended_chain: fix-incident (heavy) — mlb_schedule backfill 경로 신규 구현
