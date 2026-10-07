---
date: "2026-10-07"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "c582577fa69e5f5aafbad9c8d064d0d739fd65c5"
---


subtype: cycle-retro
cycle_n: 2993
chain_selected: review-code(heavy)
outcome: success

진단: 직전8(2985-2992) distinct=3, 2-chain lock 미충족. op-analysis gap=25(2968) 임계 도달했으나 Supabase egress quota 402 재확인(cycle 2939~ 지속) — lite 전제 /weekly-review 도 동일 DB 블로커, 재확인은 신규 정보 없어 skip. fix-incident(7)/info-arch(17)/lotto(14) 미근접. explore-idea organic idea 0 (plan#29 deferred, plan#30 completed) skip.

lib/leaderboard·players·debug 저mention 영역 전수 read. buildPitcherProfile.ts 의 appearances:fipN 이 buildPitcherLeaderboard.ts 의 명시적 설계(appearancesN=FIP-null 포함 전체 등판, 주석으로 이유 설명)와 불일치 — /players/[id] "등판 X경기"가 FIP 매칭 실패 투수 과소 카운트하는 실사용자 가시 버그 발견. appearances:appearances.length 로 수정, 리더보드와 정렬. type-check/lint clean, test 585/585·4617/4617 통과. PR #3142 squash merge 완료(commit 3ce7bad5).

next_recommended: review-code(heavy) 지속 또는 plan#29 사용자 결정 대기(만료 2026-10-15, 8일 남음). Supabase egress quota 장애 지속(cycle 2939~) — op-analysis gap 25 도달에도 차단 유지.
