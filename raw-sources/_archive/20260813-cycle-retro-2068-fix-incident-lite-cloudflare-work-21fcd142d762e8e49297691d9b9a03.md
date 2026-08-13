---
date: "2026-08-13"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "21fcd142d762e8e49297691d9b9a03ed7f5f6f97"
---


subtype: cycle-retro
cycle_n: 2068
chain_selected: fix-incident (lite)
outcome: success

cycle 2067 retro carry-over("cloudflare-worker wrangler deploy blocked locally")를
직접 처리. root cause 규명 결과 단순 toolchain 문제를 넘어 로컬 wrangler OAuth
세션이 2026-06-12 이후 무효화되어 그 뒤 3개 worker.ts 커밋(cron fire count fix/
Sentry capture/오늘 mlb_schedule KST backfill fix)이 실제 Cloudflare Worker
런타임에 ~2개월간 미배포로 추정되는 사례 25 발견. pnpm-workspace.yaml 편입 +
onlyBuiltDependencies 로 toolchain 자체는 복구, GH Actions 자동 배포 CI 신규
추가로 재발 구조적 차단. auth 자체(CLOUDFLARE_API_TOKEN secret 등록)는 사용자
영역 carry-over. PR #2923 merged(77b4d5a4) + lesson 사례 25(a9a3be48) 직접 push.

next_recommended_chain: fix-incident (lite) 또는 explore-idea (plan #24 Phase 4)
next_recommended_reason: 사용자가 CLOUDFLARE_API_TOKEN secret 등록 후 실제 배포
성공 확인 필요(사용자 영역) — 그 전까진 plan #24 Phase 4 계속 진행 가능(사례
22/23/24 코드 fix 자체는 이미 prod 검증 완료, 배포 파이프라인은 별개 concern).
