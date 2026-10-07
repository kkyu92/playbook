---
date: "2026-10-07"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "e25970aae822e28fa12103c7b93f0cb05814f000"
---


subtype: meta-pattern
cycle: 2939

description: Supabase 프로젝트가 egress quota exceeded (HTTP 402)로 2026-10-03T17:13Z 부터 전체 차단. 홈페이지(https://moneyballscore.vercel.app/) 500 에러 확인 — 실사용자 접속 불가. GitHub Actions scheduled workflow 최근 100건 중 70건 failure (heartbeat-stale/health-alert/runtime-error-alert/deploy-drift-alert/data-refresh-weekly). Cloudflare Worker MLB/daily cron이 호출하는 Vercel API도 동일 Supabase 프로젝트 의존 — 예측 파이프라인 차단 가능성.

evidence:
  - curl https://utmimgpccbrciwuuacyw.supabase.co/rest/v1/predictions → HTTP 402 {"message":"Service for this project is restricted due to the following violations: exceed_egress_quota. The project owner must upgrade their plan or remove spend caps to restore service."}
  - curl https://moneyballscore.vercel.app/ → HTTP 500 (__next_error__)
  - gh run list --limit 100: 70 failures, earliest 2026-10-03T17:13:55Z (deploy-drift-alert)
  - 최근 ship(cycle 2936-2938, 9/29~10/7) 과 outage 시작(10/3) 타이밍 불일치 — 신규 기능발 egress 급증 아님

recommendation: 사용자가 Supabase 대시보드에서 프로젝트 Billing → spend cap 해제 또는 플랜 업그레이드 긴급 필요. 비용 가드(CLAUDE.md "운영 인프라 한도") 상 본 자동화가 자율 결제/spend-cap 해제 불가 — 코드로 해결 불가능한 영역. 처리 후 fix-incident 재검증 cycle 권장(사이트 200 + scheduled workflow 정상화 확인).
