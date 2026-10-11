---
date: "2026-10-11"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "2ff6c8a0281631dd8bb99e3f9760f1f394e5604c"
---


subtype: cycle-retro
cycle: 3020
chain: fix-incident
outcome: partial

lotto-result-update cron 이 10-10/10-11 양쪽 run 모두 "최신 회차 조회 실패" 로
1245회(10/10 draw) 미반영. 원인 = scripts/lotto.ts update()가 getLatestRound()
(lottolyzer 단일 source) 실패 시 dhlottery round-probe 없이 즉시 bail하는
구조적 single point of failure. dhlottery 직접 probe + lottolyzer per-round
scrape 2차 fallback(기존 result-md 패턴 재사용) 구현 — 커밋 2건(f3f6ee09,
db6cb5ea), pnpm test 585/585 PASS, workflow_dispatch 2회 실측 fire 양쪽
success로 코드 경로 검증(크래시 없음, 양쪽 fallback 분기 실행 확인).

단 실제 1245회 데이터 복구는 미달성 — dhlottery.co.kr 과 lottolyzer.com
양쪽 모두 GH Actions runner 에서 현재 도달 불가(로그 "lottolyzer 페이지 1
실패" 확인). Supabase 건(cycle 3019)과 달리 사용자 조치 불필요 — 외부
두 사이트 동시 일시 장애로 추정, cron 하루 3회 재시도로 복구 시 자동
catch-up(probe 범위 5주치 커버). outcome=partial.

다음 사이클 추천 = operational-analysis(마지막 발화 cycle 2924, 96 cycle
경과 — 25-cycle trigger 대폭 초과).
