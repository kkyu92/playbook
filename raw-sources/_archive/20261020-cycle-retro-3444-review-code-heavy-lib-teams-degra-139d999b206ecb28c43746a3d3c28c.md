---
date: "2026-10-20"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "139d999b206ecb28c43746a3d3c28ce4793b0515"
---


subtype: cycle-retro
cycle_n: 3444
chain_selected: review-code (heavy)
outcome: success
retro.summary: lib/teams/ 전수감사 결과 buildTeamEloTrend.ts 가 buildEloTrend() 의 degraded 플래그를 destructure 과정에서 버려 KBO 팀 페이지 Elo 차트가 실제 DB 장애 시에도 degraded 배너 없이 "데이터 없음"으로만 보이던 버그 발견+수정. 쌍둥이 buildMlbTeamEloTrend.ts 는 이미 올바르게 구현돼 있었음 — KBO 원본이 누락 상태. TeamEloTrendData 에 degraded 필드 추가 + 양쪽 return 경로 전파 + page.tsx dbDegraded OR-chain 반영. commit 318d0932, push 완료. lib/ 시리즈 13/24 서브디렉토리 완료.
next_recommended_chain: fix-incident 또는 lotto (2-chain lock 발동 — review-code(heavy)/info-architecture-review 직전8(3437-3444) distinct=2 로 제외)
next_recommended_reason: gap 체크 fix-incident=9/20·op-analysis=12/25·lotto=23/30·info-arch=4/30 전부 미도달이나 2-chain lock 이 review-code/info-arch 를 강제 제외하므로 polish-ui/explore-idea/expand-scope/design-system/fix-incident/op-analysis/lotto 중 자연 trigger 매핑 필요
