---
date: "2026-08-19"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "947dc28a558ac7b11cfcf72265037e6751ad3365"
---


subtype: cycle-retro
cycle_n: 2258
chain_selected: fix-incident
outcome: success
retro.summary: lotto/methodology 페이지 cutoff percentage 하드코딩(0.65%)이 cycle 898 최초 authoring 계산 오류부터 방치 — LOTTO_PICK_COUNT/count_valid 실측 파생값(top 0.01%)으로 정정. PR #2990 squash-merge state=MERGED 실측 확인.
next_recommended_chain: review-code (heavy) 또는 lotto
next_recommended_reason: lotto 도메인이 review-code silent drift 새 grep 소스로 확인됨(lotto/page.tsx, lotto/archive 계열 재검토 여지). lotto chain 자체 30-cycle gap 도 cycle 2264 도달 근접.
