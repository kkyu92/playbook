---
date: "2026-08-19"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "400b8d7bb2b32fae1907a3d4b7d7b59a350ac981"
---


subtype: cycle-retro
cycle_n: 2212
chain_selected: fix-incident (heavy)
outcome: success

MLB standings W-L parity 조사 중 mlb_schedule.status 가 2026-08-13~08-19 7일간
'scheduled' 고착 발견 — root cause = CLOUDFLARE_API_TOKEN 미등록(cycle 2068/2090
기존 추적)으로 Worker 실배포 0회, 643dba4e 3일 backfill fix 가 production 미반영.
/api/mlb/pipeline 직접 curl 로 즉시 7일치 해소 + CLOUDFLARE_API_TOKEN 등록과
무관하게 동작하는 신규 GH Actions 안전망(mlb-schedule-status-backfill.yml, 매일
UTC 11:47 최근 3일 재스크랩) 추가. commit 48b83991, main 직접 push 완료.

next_recommended: explore-idea (MLB 실 순위 W-L parity) or review-code (worker.ts
미배포 변경분 전수 카탈로그)
