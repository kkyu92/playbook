---
date: "2026-08-24"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "ca590c98bf19e63c364f746e82f58699c3f4cce4"
---


subtype: cycle-retro
cycle_n: 2514
chain_selected: review-code (heavy)
outcome: success

teams/[code]/page.tsx 중복 감사(cycle 2470 이미 완료, 무변경 확인) 조기 발견 후
seasons/[year] 로 재타겟. buildSeasonSummary.ts/page.tsx 의 new Date().getFullYear()
가 서버 로컬(UTC) 기준이라 KST 연도 경계(12/31 15:00~23:59 UTC)에 시즌 진행 판정이
하루 늦게 갱신되는 KST_OFFSET_MS family 신규 케이스 발견·정정.

메타: cycle 2513 의 "잔존 미감사 후보" 추천 목록(debug/pipeline 등)이 실제로는
전부 이미 감사 완료 상태(cycle 2269/2485/2261)였음 — carry-over 추천을 실측
검증 없이 그대로 신뢰하면 중복 작업 위험. git log grep 으로 재검증하는 습관이
이번 사이클 낭비를 조기 차단.

next_recommended_chain: review-code (heavy) 계속 (about/page.tsx 427줄 미감사)
또는 explore-idea (다양성 회복)
