---
date: "2026-09-03"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "a1805e68402c4eda507d9c37074d4ffd13c4977a"
---


subtype: cycle-retro
cycle_n: 2811
chain_selected: review-code(heavy) -> fix-incident
outcome: success

/api/health/pipelines 가 KBO 4 모드만 체크하고 MLB 자동 cron 6 모드는 전혀
미체크 — MLB 파이프라인 전체 죽어도 overall=ok 로 계속 보고하던 silent
blind spot 수정. 테스트 갱신(580 files/4517 tests pass), main 직push,
CI green, 배포 후 라이브 curl 검증. 검증 중 mlb_elo_update 가 즉시
status=never 로 잡힘 — cycle 2068/2090 부터 알려진 CLOUDFLARE_API_TOKEN
미등록으로 Cloudflare Worker 배포가 계속 실패 중이라 plan #25 Phase 2
(cycle 2082) 에 추가된 elo_update cron 모드를 배포된 worker 가 아예 모르는
구조적 상태 — 사용자 액션 필요한 기존 carry-over, 본 사이클 범위 밖.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
