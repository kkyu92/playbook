---
date: "2026-10-07"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "9a3a9124d6749778e3d070ce9cd41e785f6f595f"
---


subtype: cycle-retro
cycle: 2951
chain_selected: skill-evolution(forced)
outcome: success

skill-evolution-pending 마커(cycle 2950, trigger-3 milestone) 강제 소비. 직전 20 cycle(2931-2950) 분석: review-code(heavy) dominance 70%→50% 하락(lib/ 핵심 스코프 소진 현실화), success 95%→80% 하락(전적으로 cycle 2939 Supabase egress quota billing 장애 원인, 코드 결함 아님). SKILL.md 실측 fix 2건: (1) PASS_ship 측정법의 증분 근사 가산이 76건 오차를 누적해온 것 발견 — 단일 grep 실측 방식으로 교체 (2) cycle 2949 meta-pattern carry-over(lotto chain trigger stale 경로 참조) 소비 — `apps/moneyball/data/lotto-picks/`·`lotto-results/`(실제 cron 산출물) 기준으로 trigger 재정의. feat(skill) 커밋 147b36a5 + MIGRATION-PATH.md phase 46 append 완료.

다음 추천 chain: review-code(heavy) (dominance 하락 후 신규 스코프 착수 여부 확인) 또는 fix-incident (egress quota 장애 지속 시, 단 재확인 noise 누적 주의).
