---
date: "2026-10-12"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "2e98c7604935b5a898342aadd9a159ac224712d4"
---


subtype: cycle-retro
cycle_n: 3088
chain_selected: review-code(heavy)
outcome: success

packages/kbo-data/src/agents/ 15파일 신규 스코프 전수 감사(scripts/ 완료 후속). 발견 3건:
judge-agent Sonnet 모델 ID stale(claude-sonnet-4-6 → claude-sonnet-5, Haiku ID는 현재
공식 ID와 일치하는데 Sonnet만 구세대 — CE 로 뭉뚱그려 측정된 debate 실패의 일부가 실은
model_not_found 였을 가능성 플래그, 확정 아님) + dead TeamCode import 2건 수정.
calibration-agent today 파라미터 미전달은 latent 무해 — 플래그만.

검증: tsc/eslint clean, vitest 90 pass. 직접 main 커밋 fb8938bb + push.

next_recommended_chain: review-code(heavy) 신규 스코프(app/api 고커밋 route) 또는
fix-incident/lotto/info-arch 자연 대기. Supabase DNS NXDOMAIN 63+ cycle 지속,
plan #29 만료 2026-10-15 임박 — 사용자 결정 대기 유지.
