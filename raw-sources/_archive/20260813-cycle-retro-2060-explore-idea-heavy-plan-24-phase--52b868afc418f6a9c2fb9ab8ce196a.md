---
date: "2026-08-13"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "52b868afc418f6a9c2fb9ab8ce196a35a2eefd53"
---


subtype: cycle-retro
cycle_n: 2060
chain_selected: explore-idea (heavy)
outcome: success
pr_number: 2917
commit_hash: 3e262737

3연속 fix-incident(2057-2059) 이후 다양성 전환. cycle 2059가 남긴
operational-analysis(lite) carry-over는 mlb_fancy_scrape cron(19:17 UTC)이
fix 이후 아직 재실행 전이라 이번 cycle 시각(08:28 UTC)엔 검증 불가 —
review-code style 에러 스윕(pipeline_runs 최근 7일 error 전량 확인)은
진단 단계에서 흡수, mlb_savant_scrape/statsapi_scrape/predict_final 모두
clean 확인(SP_UNCONFIRMED 는 정상 동작). 대신 plan #24 Phase 3(최근 폼/
수렴 픽 기록/시즌별 H2H) 첫 조각을 fire.

buildTeamRecentForm.ts 실측 확인 — KBO 전용 TeamCode 타입이었지만 실제
로직은 teams/games 테이블을 team code 문자열로만 조회(리그 분기 전혀
없음). plan #24 rubric이 미리 표시한 "구조적 타입 좁히기 패턴" 그대로
검증 — 신규 빌더 복제 없이 타입만 TeamCode | MlbTeamCode 로 확장해 그대로
재사용(단일 호출부, 회귀 risk 0, type-check로 확인). UI는 KBO
MatchupRecentForm.tsx가 승/패/무 한글 하드코딩이라 EN parity 위해 Phase 2a
MlbMatchupFactorCompare의 locale prop 패턴을 그대로 따라
MlbMatchupRecentForm.tsx 신규 작성, KO/EN /mlb/matchup 양쪽 wiring.

부수적으로 cycle 2059 ship이 놓친 VERSION 파일 drift(0.5.62.22 로 정체,
package.json 양쪽은 .23) 발견 및 정정(0.5.62.24).

pnpm --filter moneyball exec vitest run 420 files/3720 tests 전량 통과,
type-check/lint clean. PR #2917 R7 자동 머지(gh pr view state=MERGED
실측 확인, merge commit 3e262737, 사례 18 정합).

next_recommended_chain: operational-analysis (lite) 또는 fix-incident (lite)
next_recommended_reason: 오늘 밤 mlb_fancy_scrape cron 재실행 이후
fancy_synced_at 갱신 + fip/xfip 값이 predict_final에 반영되는지, home_win_prob
분산이 넓어지는지 확인 필요(cycle 2059 carry-over 지속). plan #24 Phase 3
잔여(수렴 픽 기록/시즌별 H2H MLB 버전)도 explore-idea carry-over 후보.
