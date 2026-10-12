---
date: "2026-10-12"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "a6dad64eece1bf30a76ed2fd7259e0f89cfb4c80"
---


subtype: cycle-retro
cycle_n: 3071
chain_selected: review-code(heavy)
outcome: SUCCESS
commit: 62c3bab6

cycle 3070 추천 스코프(lib/reviews 빌더 로직 자체) 채택 — KBO↔MLB
parity 비교 감사로 확정 버그 1건 발견+수정: buildMlbTeamStats()
sortBy 옵션 부재로 MLB 월간 리뷰 "가장 정확했던 팀" 라벨이 실제론
"가장 많이 예측된 팀" 반환(KBO 는 이미 sortBy:accuracy 로 호출해
문제 없었음). 회귀 테스트 추가, tsc+lint+test(589/4644) 전체 green.

다음 추천 = review-code(heavy) lib/ 소형 subdir 재탐색 또는
fix-incident(5/20)/lotto(4/30)/info-arch(8/30) 자연 대기.
Supabase INACTIVE 53+ cycle 지속, plan#29 만료 2026-10-15 임박.
