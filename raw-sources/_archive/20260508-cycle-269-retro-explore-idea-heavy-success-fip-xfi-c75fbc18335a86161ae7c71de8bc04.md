---
date: "2026-05-08"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "c75fbc18335a86161ae7c71de8bc04d81cf3a59e"
---


subtype: cycle-retro
cycle_n: 269
chain_selected: explore-idea heavy
outcome: success
commit_hash: 25f0827

retro.summary: 선수 프로필 (/players/[id]) 페이지 FIP/xFIP 추이 라인 차트 추가.
cycle 261/263 Elo trend 패턴 차용 (helper + 차트 컴포넌트 분리).
buildPitcherFipTrend (null 필터 + asc 정렬 + xfip nullable) +
PitcherFipTrend 컴포넌트 (Recharts LineChart, 팀컬러 solid +
xFIP dashed) + ≥3 등판 가드 + helper unit test 4종. 241 tests
pass. 매치업 4 cycle 연속 작업 후 다른 영역 신규 layer 자연.

retro.next_recommended_chain: review-code heavy
retro.next_recommended_reason: cycle 263→264 / 265→266 / 267→268
패턴 = explore-idea heavy 직후 review-code heavy silent drift
cleanup 자연. 본 cycle 신규 코드 4파일 영역 read 가 다음 cycle
자연 후보. 또는 fix-incident silent-drift.test.ts type 에러 carry-over.

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>
