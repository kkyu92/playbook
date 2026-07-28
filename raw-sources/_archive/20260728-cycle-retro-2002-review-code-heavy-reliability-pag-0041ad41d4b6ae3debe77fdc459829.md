---
date: "2026-07-28"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "0041ad41d4b6ae3debe77fdc459829cbd788bbf1"
---


subtype: cycle-retro
cycle_n: 2002
chain_selected: review-code (heavy)
outcome: success
pr_number: 2866
commit_hash: 378430b8

cycle 1999 가 buildBrierTrend 에서 고친 'raw confidence를 Brier/calibration
계산에 그대로 사용' 버그 클래스가 /debug/reliability 미마이그레이션 debug
페이지에 잔존해 있던 것 발견. dedup 방향 fix: buildAccuracyData.ts 의
기존 export 된 bucketize/brierScore/calibrationGap 재사용 + resolveWinnerProb
신규 export, 로컬 중복 구현 삭제, reasoning->homeWinProb select 추가.
stale guard test(wave-305) 도 함께 정정 + regression test 1건 추가.
PR #2866 CI green 확인 후 --squash --delete-branch 즉시 머지,
gh pr view state=MERGED 실측 확인 (사례 18 mitigation 적용).

next_recommended_chain: explore-idea (heavy) or review-code (heavy)
