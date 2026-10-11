---
date: "2026-10-11"
source: "kkyu92/moneyballscore"
type: "worker-lesson"
payload_type: "lesson"
subtype: "self-policy"
fingerprint: "29831fc638737d133c430b06b896a3aed4d9757c"
---


subtype: meta-pattern
cycle: 3019

description: |
  Supabase 운영 프로젝트(utmimgpccbrciwuuacyw, org vsqwlnoopqllzdwpczfr)가
  기존 65일+ 지속된 "exceed_egress_quota 402 degraded" (health-alert warning
  level, 코드로 tolerated) 상태에서 완전 INACTIVE 로 에스컬레이션됨.
  DNS NXDOMAIN (8.8.8.8 + 1.1.1.1 양쪽 확인) — PostgREST 응답조차 불가.
  운영 사이트 홈페이지 "경기가 없습니다" 실측 확인 (전체 DB 의존 기능 break).

evidence:
  - gh run list --workflow health-alert.yml: 2026-10-10 18:42/22:41,
    2026-10-11 01:59 KST 3연속 failure (cycle 3018 체크 시점엔 여전히
    402 reachable 상태 — 그 이후 에스컬레이션, 신규 사건)
  - curl --resolve + nslookup (8.8.8.8, 1.1.1.1): utmimgpccbrciwuuacyw.supabase.co
    NXDOMAIN
  - Supabase Management API GET /v1/projects/{ref}: status=INACTIVE
  - Supabase Management API POST /v1/projects/{ref}/restore: HTTP 402
    "organization is currently under service restrictions ... restored once
    restrictions are lifted or organization is upgraded to paid plan"

recommendation: |
  코드 수정 불필요 (health-alert 가 의도대로 loud fail 중). 사용자가 Supabase
  대시보드 billing 에서 미납/플랜 해결 후 project restore 필요 — 본 메인 자율
  결제/upgrade 절대 금지 (비용 가드). TODOS.md 상단에 URGENT 항목 박제 완료.
  해결 전까지 operational-analysis chain 의 egress-quota curl 체크가 이제
  402 가 아닌 NXDOMAIN 로 바뀌었으므로 다음 cycle 의 "fresh curl 재확인"
  로직도 이 상태 변화를 인지해야 함 (기존 402 가정 stale).
