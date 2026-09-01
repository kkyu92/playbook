---
date: "2026-09-01"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "d69e33a237d125ffa1064687aafd803ea09e4ece"
---


subtype: cycle-retro
cycle_n: 2687
chain_selected: review-code(heavy)
outcome: SUCCESS
retro.summary: fancy-stats.ts 526줄 정독 → fetchPitcherStats() merge 로직이 Fancy Stats era/innings stub 0 을 KBO 공식 실값이 있어도 채택하지 않는 silent drift 발견(xfip fallback/winPct stub family 8번째 변종, 이번은 dead-field 정리가 아닌 실제 버그 fix). mergePitcherStats() 순수 함수 분리 + KBO 매칭 시 채움 + 단위 테스트 3건 추가. tsc/lint/전체 vitest(kbo-data 1218 + moneyball 4483) green. main commit+push ff776db9.
next_recommended_chain: review-code(heavy)
next_recommended_reason: silent-drift-alert.ts(440줄, cycle 2653/2685/2687 3연속 carry-over 미착수) 정독 우선권. 대안 = fix-incident(5/20)/op-analysis(22/25 근접)/lotto(29/30 근접) gap 자연 대기.
