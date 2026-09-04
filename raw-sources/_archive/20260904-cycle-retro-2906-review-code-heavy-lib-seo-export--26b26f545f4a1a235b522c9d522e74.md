---
date: "2026-09-04"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "26b26f545f4a1a235b522c9d522e745cdace61fd"
---


subtype: cycle-retro
cycle_n: 2906
chain_selected: review-code(heavy)
outcome: success

review-code(heavy) 6-dir sweep(seo/stats/supabase/v2-shadow-monitor/
changelog/leaderboard) — lib/seo/json-ld.ts 4 dead exports 발견
(SITE_NAME/ORG_NAME/ORG_URL/BreadcrumbItem, 전부 파일 내부 사용) →
de-export 처리. 나머지 5개 디렉토리 clean. 부수 정정: cycle 2905의
"lib/ 스윕 완료" 결론이 premature였음을 실측(ls) 재확인으로 발견 —
9개 디렉토리(debug/insights/lotto/matchup/players/predictions/
reviews/seasons/standings) 여전히 미탐색. tsc/test/lint 전부 clean.
PR #3080 squash merged(77ba0313, state=MERGED 실측 확인).

next_recommended_chain: review-code(heavy) 계속 (잔여 9개 디렉토리)
또는 info-architecture-review(gap 15/30) 또는 lotto OOS(1240회
9/5 21시 추첨 후)
