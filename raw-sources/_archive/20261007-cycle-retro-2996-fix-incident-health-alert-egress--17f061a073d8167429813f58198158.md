---
date: "2026-10-07"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "17f061a073d8167429813f58198158a64366f420"
---


subtype: cycle-retro
cycle_n: 2996
chain_selected: fix-incident
outcome: success

진단: 직전8(2988-2995) distinct=2(review-code(heavy) 7 + design-system 1, 2-chain lock) — 둘 다 제외. op-analysis gap>=25 나 service REST 직접 재확인 402 여전 차단. fix-incident gap=10/info-arch gap=20 둘 다 미근접. lotto cron 둘 다 신선. explore-idea saturation 13/15 충족하나 plan#29 가 cycle 2969 checkpoint 와 동일 날짜·동일 상태(신규 정보 0)라 3번째 재측정 skip.

health-alert.yml 재검토 중 `/api/health` checkSupabase() 가 Supabase egress quota 402(cycle 2939~, billing 조치 대기, 29일+ 경과)를 모든 미지 장애와 동일하게 status:'error'(->overall='fail') 처리해 매시간 ::error:: exit 1 반복하던 실질 버그 발견 — checkPipeline()/kbo_api 는 이미 "알려진 저위험 상태->warning" 다운그레이드 패턴 보유하나 checkSupabase() 만 미적용이었던 비대칭. exceed_egress_quota 메시지 감지 시 status:'warning'(overall='degraded') 분기 추가, 그 외 Supabase 에러는 기존 error/fail 유지. route.test.ts 신규 케이스 추가 + 기존 케이스 불변 통과 확인. tsc/eslint clean, vitest 585/585·4618/4618 통과, pre-push hook 통과, direct main push 완료(commit 524a327c fix + a255ac24 docs).

plan#29 상태 변화 없음(만료 2026-10-15, 8일 남음, 사용자 결정 여전히 대기). Supabase egress quota 장애 자체는 지속(cycle 2939~, billing 조치 필요) — 본 fix 는 alert 운영 품질 개선만 담당.

다음 추천: review-code(heavy) 또는 design-system (2-chain lock 자연 해제, 직전8에 fix-incident 편입되며 distinct=3).
