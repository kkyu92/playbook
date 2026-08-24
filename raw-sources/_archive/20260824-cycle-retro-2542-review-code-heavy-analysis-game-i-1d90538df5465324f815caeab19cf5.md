---
date: "2026-08-24"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "1d90538df5465324f815caeab19cf50c5b41e282"
---


subtype: cycle-retro
cycle_n: 2542
chain_selected: review-code (heavy)
outcome: success

진단: open issue 0, approved plan 0/29, gap trigger 4종 미도달, 2-chain lock 없음, CI 실패 0건.
cycle 2541 carry-over(analysis/game/[id]/page.tsx 868줄) 감사 — #1338 family는 이미 clean.
postGame scoring_rule 미필터는 검증 결과 false positive(shadow-cohort.ts가 post_game shadow row 생성 안 함).
실제 발견 = 팩터 수렴 픽 성적 라인 SMALL_SAMPLE_N 게이트 부재(cycle 2541 FactorAccuracyTable과 동일 family).
fix + 회귀테스트(wave-664) + type-check/test(521/4301)/lint clean 확인 후 커밋+푸시(ef906716).

다음 추천: review-code(heavy) 계속 — analysis/page.tsx(목록) 동일 패턴 7개 지점 정정.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
