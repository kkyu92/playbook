---
date: "2026-08-25"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "c9af02786449e2ae1ee5b195b75367a2d7d4137e"
---


subtype: cycle-retro
cycle_n: 2571
chain_selected: review-code (heavy)
outcome: success

retro.summary: 직전 3연속 retro-only(2566,2569,2570) 이후 review-code(heavy) 4번째 사이클에서 실제 fix 발견. insights/series/[topic]/page.tsx 팀매치업 적중률(verifiedN/correctN) 표시가 predictions/[date]·reviews/weekly·reviews/monthly 형제 페이지와 달리 SMALL_SAMPLE_N 게이트 누락 — silent drift family 재발. PR #3068 squash 머지 완료(0aa6087a, mergedAt 실측 확인).

next_recommended_chain: review-code (heavy, mlb/insights·en/ 다국어 미러 페이지 순회 계속) 또는 operational-analysis(gap 10/25)/info-architecture-review(gap 24/30) 근접 chain
