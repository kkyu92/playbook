---
date: "2026-10-07"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "ef40da6a7322a5266fe6ec61aae01dc7d05809ef"
---


subtype: cycle-retro
cycle_n: 2968
chain_selected: operational-analysis(lite)
outcome: retro-only
summary: op-analysis gap=44(마지막 발화 2924, 트리거 대폭 초과) 재측정 시도 — scripts/op-analysis-ce-cohort.ts 실행 결과 Supabase egress quota 402 가 서비스 롤 키 직접 쿼리도 차단함을 신규 확인. 기존 관측(cron webhook 실패)보다 범위 넓음 — 프로젝트 Supabase 접근 전체가 막힌 상태. CE/비CE n=400 측정치(cycle 2924) 갱신 불가, 최후 유효값 유지. 코드 변경 없음.
next_recommended_chain: fix-incident 또는 explore-idea(plan#29 expiry 임박)
next_recommended_reason: egress quota 402 가 DB 쿼리 전체를 막는다는 사실이 신규 확정됐으니 fix-incident 로 사용자 billing 조치 긴급도 재전달 가치 있음. plan#29 expiry 2026-10-15(7일 남음) 임박 — explore-idea 최종 결정 필요.
