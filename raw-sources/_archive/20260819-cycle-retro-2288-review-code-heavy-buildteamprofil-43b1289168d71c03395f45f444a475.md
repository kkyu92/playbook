---
date: "2026-08-19"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "43b1289168d71c03395f45f444a4752bd9d3b108"
---


subtype: cycle-retro
cycle_n: 2288
chain_selected: review-code (heavy)
outcome: success
pr: 2997 (merged e14defe5)

retro.summary: predictions/[date]/page.tsx + teams/[code]/page.tsx 전체 정독 완료(둘 다 이미 assertSelectOk 완비, drift 없음). 감사 범위 확장하여 buildTeamProfile.ts games 쿼리에 scoring_rule 필터 부재 발견 — shadow-cohort.ts 가 daily 파이프라인에서 매 경기 production/shadow row 를 동일 prediction_type='pre_game' 으로 누적 중이라, 정렬 없는 predictions?.[0] 이 임의 row 를 선택해 팀 프로필 통계(적중률/팩터평균/선발FIP)가 shadow 모델 값으로 오염될 수 있는 살아있는 버그. CURRENT_SCORING_RULE 필터 추가로 정정.

next_recommended_chain: lotto (gap 25/30 다음 사이클 근접 도달) 또는 review-code(heavy) buildMatchupProfile.ts/buildMatchupUpcoming.ts 동일 family 재확인
