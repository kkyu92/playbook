---
date: "2026-10-19"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "2efb55b45efc1d865130d460331aa05149879cd9"
---


subtype: cycle-retro

세션 중단 사각지대 재발 (사례 15 family) — 09aefa35(fix) + 69fa83f9(data) 커밋은
main 에 정상 존재했으나 retro commit/JSON 양쪽 누락 상태로 세션 종료.
cycle 3349 진단 2차 방어선에서 발견, retroactive backfill.

chain: review-code (heavy)
outcome: SUCCESS
scope: scripts/ 저-mention 8파일 (run-pipeline/backfill-kbo-confirmed-postponed/
       smoke-umpire-scraper/dev-backend-compare/llm-context-baseline/
       measure-n178-vs-n165/backfill-is-correct-shadow-fix/backfill-kbo-stuck-verify)
fix: run-pipeline.ts triggeredBy 'manual' 명시 + dev-backend-compare.ts team
     하드코딩 제거 (09aefa35)
data: games.status 영구 'scheduled' 고착 5개 날짜 중 3개 완전 해소 (69fa83f9)
merged: 직접 main 커밋 (R4 범위, PR 미경유)
