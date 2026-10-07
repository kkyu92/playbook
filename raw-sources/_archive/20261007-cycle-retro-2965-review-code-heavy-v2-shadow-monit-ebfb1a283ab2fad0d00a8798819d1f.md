---
date: "2026-10-07"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "ebfb1a283ab2fad0d00a8798819d1ff3c256e983"
---


subtype: cycle-retro
cycle_n: 2965
chain_selected: review-code(heavy)
outcome: success
retro.summary: v2-shadow-monitor/loader.ts listCohortFiles() 가 cohort markdown 파일명을 순수 문자열 sort/reverse 로 "최신" 판정하던 latent 버그 수정 — 같은 날짜 안 cycle 번호 자릿수 경계(99->100) 교차 시 과거 cohort 를 silent 하게 최신으로 serve 할 위험. 날짜+숫자 cycle 비교 comparator 로 교체 + 전용 테스트 3건 추가. 나머지 감사 스코프(weather/hub-dispatch/feature-flags/tabpfn-export/tabpfn-import/changelog) 는 dead code/stale comment/TODO 전부 0건 clean.
next_recommended_chain: fix-incident 또는 explore-idea(plan#29 expiry 2026-10-15 임박)
next_recommended_reason: fix-incident gap 19/20 근접(단 CI 전부 정상이라 noise 주의). egress quota 402 는 billing 대기 지속, 재확인해도 신규 정보 없음. plan#29 Tier4 유지중이나 expiry 임박 — 다음 1~2 사이클 안 explore-idea 로 최종 결정 필요. 2-chain lock 미발동 상태이므로 polish-ui/design-system 도 자연 후보.
