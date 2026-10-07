---
date: "2026-10-07"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "fdbd8a86ef22d2002a7c70a476f507e8056cdf2e"
---


subtype: cycle-retro
cycle: 2945
chain_selected: fix-incident
outcome: partial

vercel ls/inspect 직접 조회로 신규 production 빌드 regression(cookies() in
generateStaticParams, /en/mlb/insights/[date]) 발견 + 수정 + PR #3128 머지
(c3ac040a). insights-data.ts 를 KBO 동일 anon-key 클라이언트로 전환, 3곳
generateStaticParams try/catch degrade 추가.

PARTIAL: 로컬 재빌드해도 cycle 2939 부터 미해결인 Supabase egress quota
billing 장애에 여전히 막힘 — 사용자 billing action 대기 지속(day 5+, 비용
가드상 자율 해결 불가). cookies() 버그는 billing 과 무관한 진짜 regression
이었고 수정 안 했으면 billing 복구 후에도 재실패했을 것 — 선행 조치 완료.

next_recommended_chain: fix-incident (billing 상태 재확인)

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
