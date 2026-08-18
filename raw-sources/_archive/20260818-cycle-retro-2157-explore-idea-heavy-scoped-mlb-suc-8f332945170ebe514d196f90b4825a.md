---
date: "2026-08-18"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "8f332945170ebe514d196f90b4825a1df26addcc"
---


subtype: cycle-retro
cycle_n: 2157
chain_selected: explore-idea (heavy, scoped)
outcome: success
retro.summary: review-code monolith 감사 시리즈 소진 + fix-incident 트리거 부재(CI/deploy/i18n sweep 재검증 전부 clean) 상황에서 explore-idea 자연 선택. TODOS stale "다음 후보" 포인터 재신뢰 대신(cycle 2152 lesson) Explore agent 로 처음부터 재탐색해 mlb_team_stats 의 미소비 batted-ball 6컬럼(pull/cent/oppo/gb/fb/hard_hit pct) 발견, MLB 팀 프로필 페이지(KO/EN)에 타구 프로파일 배지로 노출. 구현 중 fmtPct(0-1 fraction 가정) vs mlb_team_stats(0-100 raw scale) 스케일 불일치 발견해 fmtRawPct 신규 작성으로 회피 — 부가로 기존 lineupBarrelPct 도 동일 클래스 버그 가능성 발견(미검증, TODOS에 review-code 후보로 기록). 신규 테스트 3건, lint/tsc/vitest(445/3870) 전부 clean, main 직접 commit+push(ad97c50b), CI green 실측 확인.
next_recommended_chain: review-code 또는 explore-idea 자유 판단
next_recommended_reason: lineupBarrelPct 스케일 검증이 review-code 자연 후보. explore-idea saturation 12/15 도달 예상(이번 cycle 포함) — 다음 diagnosis 재확인 필요.
