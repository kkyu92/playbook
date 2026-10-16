---
date: "2026-10-16"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "753127e869b92414074d3f2e222afb82e4e951e3"
---


subtype: cycle-retro
cycle_n: 3258
chain_selected: review-code(heavy)
outcome: success
commit_hash: 4e06a930

retro.summary: review-code(heavy) 신규 축(app/ KBO 단일-page 그룹 8개: about/privacy/terms/settings/login/community/glossary/guide) 전수 감사 — privacy/terms 법적 고지와 실제 analytics/adsense 배선 1:1 대조 clean, placeholder 3건 확인, glossary clean. about.tsx FAQS 배열 길이를 guide.tsx가 "15건" 하드코딩으로 별도 유지하던 silent drift 위험 1건 발견+수정(FAQ_COUNT export, glossary GLOSSARY_TERM_COUNT 동일 컨벤션).

next_recommended_chain: review-code(heavy) 계속(packages/kbo-data 신규 축 또는 app/ 나머지 단일-page) 또는 fix-incident(gap=18/20)/info-arch(gap=19/30)/lotto(gap=6/30, 쿨다운) 자연 대기. Supabase ENOTFOUND 5일+ 지속 — 사용자 billing 조치 필요(변화 없음).
